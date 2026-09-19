// Readability candidate: a WebGPU fullscreen pass installed through the
// ForgeAX URP postEffects seam. Edge radius is a live uniform controlled by
// the workbench slider; changing it does not recompile this shader.

struct FullscreenOutput {
  @builtin(position) position : vec4<f32>,
  @location(0) uv : vec2<f32>,
};

struct ReadabilityParams {
  // near, far, absolute threshold in metres, depth-relative threshold
  depth : vec4<f32>,
  // display-space edge colour and maximum coverage
  edge : vec4<f32>,
  // split position, sample radius in pixels, response span, optical swell bound
  caseStyle : vec4<f32>,
  viewProjection : mat4x4<f32>,
  inverseViewProjection : mat4x4<f32>,
  // Camera and reconstructed positions share an XZ-relative world frame.
  // World Y stays absolute, so water/shore tests and ray metres are unchanged.
  eye : vec4<f32>,
  // optical plane height, strength, maximum ray metres, sample budget
  water : vec4<f32>,
};

@group(1) @binding(0) var sceneTexture : texture_2d<f32>;
@group(1) @binding(1) var sceneSampler : sampler;
@group(1) @binding(2) var<uniform> p : ReadabilityParams;
@group(1) @binding(3) var depthTexture : texture_depth_2d;
@group(1) @binding(4) var depthSampler : sampler;

@vertex
fn vs_main(@builtin(vertex_index) index : u32) -> FullscreenOutput {
  var x = -1.0;
  var y = -1.0;
  if (index == 1u) { x = 3.0; }
  if (index == 2u) { y = 3.0; }
  var out : FullscreenOutput;
  out.position = vec4<f32>(x, y, 0.0, 1.0);
  out.uv = vec2<f32>((x + 1.0) * 0.5, 1.0 - (y + 1.0) * 0.5);
  return out;
}

fn linearDepth(ndcDepth : f32) -> f32 {
  let nearPlane = p.depth.x;
  let farPlane = p.depth.y;
  return nearPlane * farPlane
    / max(0.00001, farPlane - ndcDepth * (farPlane - nearPlane));
}

fn sceneDepth(pixel : vec2<i32>) -> f32 {
  return textureLoad(depthTexture, pixel, 0);
}

fn sampleLinearDepth(pixel : vec2<i32>, dimensions : vec2<i32>) -> f32 {
  let safePixel = clamp(pixel, vec2<i32>(0), dimensions - vec2<i32>(1));
  let ndcDepth = sceneDepth(safePixel);
  return linearDepth(ndcDepth);
}

fn worldAt(uv : vec2<f32>, depth : f32) -> vec3<f32> {
  let world = p.inverseViewProjection * vec4<f32>(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, depth, 1.0);
  return world.xyz / world.w;
}

// A water-only screen-space ray. Reads the renderer-owned scene snapshot;
// never samples our output, allocates history, or renders another camera.
fn waterReflection(scene : vec3<f32>, uv : vec2<f32>, rawDepth : f32,
  dimensions : vec2<i32>, surfaceNormal : vec3<f32>) -> vec3<f32> {
  if (p.water.y <= 0.0) { return scene; }
  let measured = worldAt(uv, rawDepth);
  // The native transparent surface writes its displaced optical depth. The
  // bound includes the Pack's maximum swell and MSAA reconstruction tolerance;
  // dry terrain starts above this band, while the real bed is below it.
  if (abs(measured.y - p.water.x) > p.caseStyle.w || p.eye.y <= measured.y) { return scene; }
  let origin = measured;
  let incident = normalize(origin - p.eye.xyz);
  let normal = surfaceNormal * select(-1.0, 1.0, surfaceNormal.y >= 0.0);
  if (normal.y < .75) { return scene; }
  let direction = reflect(incident, normal);
  let start = origin + vec3<f32>(0.0, .025, 0.0);
  var previousDistance = .035;
  let count = u32(p.water.w);
  for (var i = 0u; i < 28u; i += 1u) {
    if (i >= count) { break; }
    let fraction = f32(i + 1u) / f32(count);
    let distance = .035 + p.water.z * fraction * fraction;
    let point = start + direction * distance;
    let clip = p.viewProjection * vec4<f32>(point, 1.0);
    if (clip.w <= 0.0) { break; }
    let projected = vec2<f32>(clip.x / clip.w * .5 + .5, .5 - clip.y / clip.w * .5);
    if (any(projected <= vec2<f32>(.003)) || any(projected >= vec2<f32>(.997))) { break; }
    let pixel = clamp(vec2<i32>(projected * vec2<f32>(dimensions)), vec2<i32>(0), dimensions - vec2<i32>(1));
    let depth = sceneDepth(pixel);
    let sampleUV = (vec2<f32>(pixel) + .5) / vec2<f32>(dimensions);
    let sampleWorld = worldAt(sampleUV, depth);
    // A neighbouring wave is not the object being reflected. Continuing here
    // also avoids self-reflection when the origin lies in a trough.
    if (depth < .999999 && sampleWorld.y > p.water.x + p.caseStyle.w && clip.w >= linearDepth(depth)) {
      var low = previousDistance;
      var high = distance;
      var hitUV = projected;
      var hitDepth = depth;
      var hitDistance = clip.w;
      // Refine a crossing, then reject unrelated foreground silhouettes.
      for (var refine = 0u; refine < 5u; refine += 1u) {
        let mid = (low + high) * .5;
        let midClip = p.viewProjection * vec4<f32>(start + direction * mid, 1.0);
        let midUV = vec2<f32>(midClip.x / midClip.w * .5 + .5, .5 - midClip.y / midClip.w * .5);
        let midPixel = clamp(vec2<i32>(midUV * vec2<f32>(dimensions)), vec2<i32>(0), dimensions - vec2<i32>(1));
        let midDepth = sceneDepth(midPixel);
        if (midClip.w >= linearDepth(midDepth)) {
          high = mid; hitUV = midUV; hitDepth = midDepth; hitDistance = midClip.w;
        } else { low = mid; }
      }
      let separation = hitDistance - linearDepth(hitDepth);
      let hitWorld = worldAt(hitUV, hitDepth);
      if (separation >= 0.0 && separation < .35 && hitWorld.y > p.water.x + p.caseStyle.w) {
        let edge = min(min(hitUV.x, 1.0 - hitUV.x), min(hitUV.y, 1.0 - hitUV.y));
        let confidence = smoothstep(.015, .08, edge) * (1.0 - smoothstep(p.water.z * .7, p.water.z, high));
        let fresnel = .55 + .45 * pow(1.0 - clamp(dot(-incident, normal), 0.0, 1.0), 5.0);
        let reflected = textureSampleLevel(sceneTexture, sceneSampler, hitUV, 0.0).rgb;
        return mix(scene, reflected * .88 + scene * .12, p.water.y * confidence * fresnel);
      }
      // Only one refinement per ray: at most budget + 5 depth queries.
      return scene;
    }
    previousDistance = distance;
  }
  return scene;
}

@fragment
fn fs_main(in : FullscreenOutput) -> @location(0) vec4<f32> {
  var scene = textureSample(sceneTexture, sceneSampler, in.uv).rgb;
  let dimensionsU = textureDimensions(depthTexture);
  let dimensions = vec2<i32>(dimensionsU);
  let centerPixel = clamp(
    vec2<i32>(in.uv * vec2<f32>(dimensionsU)),
    vec2<i32>(0),
    dimensions - vec2<i32>(1),
  );
  let rawCenter = sceneDepth(centerPixel);
  let world = worldAt(in.uv, rawCenter);
  // Derivatives run uniformly before any branch. Reflect the actual moving
  // optical mesh rather than introducing an unrelated second wave pattern.
  let surfaceNormal = normalize(cross(dpdx(world), dpdy(world)));
  if (in.uv.x < p.caseStyle.x) {
    return vec4<f32>(scene, 1.0);
  }
  if (rawCenter >= 0.999999) {
    return vec4<f32>(scene, 1.0);
  }
  scene = waterReflection(scene, in.uv, rawCenter, dimensions, surfaceNormal);
  if (p.caseStyle.y < 0.5) { return vec4<f32>(scene, 1.0); }

  let radius = max(1, i32(round(p.caseStyle.y)));
  let center = linearDepth(rawCenter);
  let left = sampleLinearDepth(centerPixel - vec2<i32>(radius, 0), dimensions);
  let right = sampleLinearDepth(centerPixel + vec2<i32>(radius, 0), dimensions);
  let up = sampleLinearDepth(centerPixel - vec2<i32>(0, radius), dimensions);
  let down = sampleLinearDepth(centerPixel + vec2<i32>(0, radius), dimensions);

  // Only colour the nearer surface. This avoids a bright halo floating in
  // the background while still separating overlapping monsters and step lips.
  let fartherNeighbour = max(max(left, right), max(up, down));
  let gap = max(0.0, fartherNeighbour - center);
  let threshold = p.depth.z + center * p.depth.w;
  let responseEnd = threshold * max(1.05, p.caseStyle.z);
  let coverage = smoothstep(threshold, responseEnd, gap) * p.edge.a;
  let outlined = mix(scene, p.edge.rgb, coverage);
  return vec4<f32>(outlined, 1.0);
}
