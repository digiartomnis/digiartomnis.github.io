#define_import_path ai_weapon_spirit_vfx::cinder_mesh

// Saved comic printing: color is authored in linear space. Alpha stays premultiplied.
fn cinder_print(value: vec4<f32>, pixel: vec2<f32>, tint: vec4<f32>, print: vec4<f32>) -> vec4<f32> {
  if (value.a <= 0.00001) { discard; }
  let straight = max(value.rgb / value.a, vec3<f32>(0.0));
  let brightness = max(max(straight.r, straight.g), straight.b);
  let shade = mix(clamp(brightness, 0.2, 1.6), floor(clamp(brightness, 0.0, 1.5) * 3.0) / 3.0 + 0.22, print.z);
  var color = mix(straight, tint.rgb * shade, tint.a);
  let grid = pixel / max(4.0, print.w);
  let cell = fract(vec2<f32>(grid.x + grid.y * 0.22, grid.y)) - vec2<f32>(0.5);
  let radius = mix(0.12, 0.32, 1.0 - clamp(brightness, 0.0, 1.0));
  let dots = 1.0 - smoothstep(radius - 0.035, radius + 0.035, length(cell));
  let line1 = 1.0 - smoothstep(0.06, 0.15, abs(fract(grid.x + grid.y) - 0.5));
  let line2 = 1.0 - smoothstep(0.06, 0.15, abs(fract(grid.x - grid.y) - 0.5));
  let hatch = max(line1, line2 * (1.0 - smoothstep(0.3, 0.8, brightness)));
  color = mix(color, vec3<f32>(0.006, 0.004, 0.015), max(dots * print.x, hatch * print.y) * 0.9);
  return vec4<f32>(color * value.a, value.a);
}
fn cinder_hash(p: vec2<f32>) -> f32 {
  return fract(sin(dot(p, vec2<f32>(127.1, 311.7))) * 43758.5453);
}

fn cinder_noise(p: vec2<f32>) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(cinder_hash(i), cinder_hash(i + vec2<f32>(1.0, 0.0)), u.x),
    mix(cinder_hash(i + vec2<f32>(0.0, 1.0)), cinder_hash(i + vec2<f32>(1.0, 1.0)), u.x),
    u.y
  );
}

fn cinder_mod289v3(x: vec3<f32>) -> vec3<f32> {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
fn cinder_mod289v4(x: vec4<f32>) -> vec4<f32> {
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}
fn cinder_permute289(x: vec4<f32>) -> vec4<f32> {
  return cinder_mod289v4(((x * 34.0) + 1.0) * x);
}
fn cinder_taylor_inv_sqrt4(r: vec4<f32>) -> vec4<f32> {
  return 1.79284291400159 - 0.85373472095314 * r;
}

fn cinder_snoise(v: vec3<f32>) -> f32 {
  let C = vec2<f32>(1.0 / 6.0, 1.0 / 3.0);
  let D = vec4<f32>(0.0, 0.5, 1.0, 2.0);

  var i = floor(v + dot(v, C.yyy));
  let x0 = v - i + dot(i, C.xxx);

  let g = step(x0.yzx, x0.xyz);
  let l = 1.0 - g;
  let i1 = min(g.xyz, l.zxy);
  let i2 = max(g.xyz, l.zxy);

  let x1 = x0 - i1 + C.xxx;
  let x2 = x0 - i2 + C.yyy;
  let x3 = x0 - D.yyy;

  i = cinder_mod289v3(i);
  let p = cinder_permute289(cinder_permute289(cinder_permute289(
      i.z + vec4<f32>(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4<f32>(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4<f32>(0.0, i1.x, i2.x, 1.0));

  let n_ = 0.142857142857;
  let ns = n_ * D.wyz - D.xzx;

  let j = p - 49.0 * floor(p * ns.z * ns.z);

  let x_ = floor(j * ns.z);
  let y_ = floor(j - 7.0 * x_);

  let x = x_ * ns.x + ns.yyyy;
  let y = y_ * ns.x + ns.yyyy;
  let h = 1.0 - abs(x) - abs(y);

  let b0 = vec4<f32>(x.xy, y.xy);
  let b1 = vec4<f32>(x.zw, y.zw);

  let s0 = floor(b0) * 2.0 + 1.0;
  let s1 = floor(b1) * 2.0 + 1.0;
  let sh = -step(h, vec4<f32>(0.0));

  let a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  let a1 = b1.xzyw + s1.xzyw * sh.zzww;

  var p0 = vec3<f32>(a0.xy, h.x);
  var p1 = vec3<f32>(a0.zw, h.y);
  var p2 = vec3<f32>(a1.xy, h.z);
  var p3 = vec3<f32>(a1.zw, h.w);

  let norm = cinder_taylor_inv_sqrt4(
    vec4<f32>(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3))
  );
  p0 = p0 * norm.x;
  p1 = p1 * norm.y;
  p2 = p2 * norm.z;
  p3 = p3 * norm.w;

  var m = max(
    0.6 - vec4<f32>(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)),
    vec4<f32>(0.0)
  );
  m = m * m;
  return 42.0 * dot(
    m * m,
    vec4<f32>(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3))
  );
}

fn cinder_fbm3(p: vec3<f32>) -> f32 {
  var v = 0.0;
  var a = 0.5;
  var q = p;
  for (var i = 0; i < 3; i = i + 1) {
    v = v + a * cinder_snoise(q);
    q = q * 2.02;
    a = a * 0.5;
  }
  return v;
}

fn cinder_fbm4(p: vec3<f32>) -> f32 {
  var v = 0.0;
  var a = 0.5;
  var q = p;
  for (var i = 0; i < 4; i = i + 1) {
    v = v + a * cinder_snoise(q);
    q = q * 2.03 + vec3<f32>(17.3, 5.1, 9.7);
    a = a * 0.5;
  }
  return v;
}

fn cinder_ridged(p: vec3<f32>) -> f32 {
  var v = 0.0;
  var a = 0.5;
  var q = p;
  for (var i = 0; i < 4; i = i + 1) {
    v = v + a * (1.0 - abs(cinder_snoise(q)));
    q = q * 2.06;
    a = a * 0.5;
  }
  return v;
}

fn cinder_fresnel(viewDir: vec3<f32>, normal: vec3<f32>, power: f32, scale: f32) -> f32 {
  let nv = normalize(viewDir);
  let nn = normalize(normal);
  return clamp(scale * pow(1.0 - abs(dot(nv, nn)), power), 0.0, 4.0);
}

fn cinder_dissolve(n: f32, threshold: f32, edgeWidth: f32) -> vec2<f32> {
  let hard = step(threshold, n);
  let edge = clamp(smoothstep(threshold, threshold + edgeWidth, n) - hard, 0.0, 1.0);
  return vec2<f32>(hard, edge);
}

fn cinder_gradient4(
  c0: vec3<f32>, c1: vec3<f32>, c2: vec3<f32>, c3: vec3<f32>, t: f32
) -> vec3<f32> {
  let a = mix(c0, c1, smoothstep(0.0, 0.34, t));
  let b = mix(a, c2, smoothstep(0.30, 0.68, t));
  return mix(b, c3, smoothstep(0.64, 1.0, t));
}

struct VertexInput {
  @location(0) geometry_position: vec3<f32>,
  @location(1) geometry_normal: vec3<f32>,
  @location(2) geometry_uv: vec2<f32>,
  @location(3) geometry_tangent: vec4<f32>,
  @location(4) center: vec3<f32>,
  @location(5) right: vec3<f32>,
  @location(6) up: vec3<f32>,
  @location(7) forward: vec3<f32>,
  @location(8) particle_color: vec4<f32>,
  @location(9) base_color: vec4<f32>,
  @location(10) emissive_intensity: vec4<f32>,
  @location(11) surface: vec4<f32>,
};


struct CinderMeshOut {
 @builtin(position) position: vec4<f32>,
 @location(0) color: vec4<f32>,
 @location(1) normal: vec3<f32>,
 @location(2) emissive_intensity: vec4<f32>,
 @location(3) surface: vec4<f32>,
 @location(4) local: vec3<f32>,
 @location(5) uv: vec2<f32>,
 @location(6) disp: f32,
 @location(7) tint: vec4<f32>,
};
fn project_cinder_mesh(input: VertexInput, shell: bool) -> CinderMeshOut {
 var output: CinderMeshOut;
 var p = input.geometry_position;
 var displacement = 0.0;
 if (shell) {
   let life = input.particle_color.r;
   let np = normalize(p) * (1.6 + life * 1.4) + input.particle_color.g * 13.0 - vec3<f32>(0.0, life * 0.6, 0.0);
   displacement = cinder_fbm4(np) * 0.6 + cinder_ridged(np * 1.3) * 0.4;
   p += normalize(p) * displacement * input.particle_color.b * (0.35 + life * 0.9);
 }
 output.position = vec4<f32>(input.center + (input.right * p.x + input.up * p.y + input.forward * p.z) * input.surface.y, 1.0);
 output.normal = normalize(input.right * input.geometry_normal.x + input.up * input.geometry_normal.y + input.forward * input.geometry_normal.z);
 output.color = input.particle_color;
 output.tint = input.base_color;
 output.emissive_intensity = input.emissive_intensity;
 output.surface = input.surface;
 output.local = input.geometry_position;
 output.uv = input.geometry_uv;
 output.disp = displacement;
 return output;
}
@vertex fn vs_main(input: VertexInput) -> CinderMeshOut { return project_cinder_mesh(input, input.surface.x == 0.125 || input.surface.x == 0.25); }
fn cinder_rock_shade(input: CinderMeshOut) -> vec4<f32> {
  let normal = normalize(input.normal);
  let viewDirection = vec3<f32>(0.0, 0.0, 1.0);
  let seed = input.color.r;
  let heat = input.color.g;
  let charge = input.color.b;
  let visibility = input.color.a;
  let p = input.local * (3.4 + seed * 0.7);
  let field = sin(p.x * 2.3 + sin(p.z * 1.7))
            + sin(p.y * 2.7 + p.x * 0.8)
            + sin(p.z * 3.1 - p.y * 1.2 + seed * 9.0);
  let distance = abs(field) / 3.0;
  let width = 0.055 * (1.0 + charge * 0.8);
  let fissure = 1.0 - smoothstep(width * 0.35, width, distance);
  let lip = 1.0 - smoothstep(width, width * 2.5, distance);
  let core = 1.0 - smoothstep(0.0, width * 0.42, distance);
  let lightDirection = normalize(vec3<f32>(0.35, 0.72, 0.55));
  let diffuse = 0.18 + 0.82 * max(dot(normal, lightDirection), 0.0);
  let facet = 0.72 + 0.28 * cinder_hash(floor(normal.xy * 19.0) + seed);
  var rock = mix(vec3<f32>(0.21, 0.16, 0.12), vec3<f32>(0.035, 0.022, 0.016), lip * 0.88);
  rock *= diffuse * facet;
  let flow = 0.68 + 0.32 * sin(seed * 31.0 + charge * 9.0 + p.y * 3.0);
  let magma = mix(vec3<f32>(1.0, 0.12, 0.005), vec3<f32>(4.2, 2.4, 0.62), core)
            * fissure * heat * flow;

  let rim = pow(1.0 - abs(dot(normal, viewDirection)), 2.2) * charge * charge;
  let rgb = rock * (1.0 - fissure * 0.9) + magma + vec3<f32>(1.0, 0.12, 0.01) * rim;
  
  return vec4<f32>(rgb * visibility, visibility);
}

const CINDER_SHELL_HOT: vec3<f32> = vec3<f32>(1.0, 0.89627, 0.63076);
const CINDER_SHELL_MID: vec3<f32> = vec3<f32>(1.0, 0.43415, 0.02732);
const CINDER_SHELL_EDGE: vec3<f32> = vec3<f32>(1.0, 0.04667, 0.00518);

fn cinder_burst_shade(
  input: CinderMeshOut,
  cA: vec3<f32>, cB: vec3<f32>, cC: vec3<f32>,
  intensity: f32,
  fresnelScale: f32
) -> vec4<f32> {
  let fres = cinder_fresnel(
    vec3<f32>(0.0, 0.0, 1.0), input.normal, 2.2, fresnelScale
  );
  
  let heat = clamp(input.disp * 0.5 + 0.5, 0.0, 1.0);
  
  let dis = cinder_dissolve(heat, input.color.r * 1.15 - 0.15, 0.3);
  var color = cinder_gradient4(cA, cB, cC, cC * 0.15, 1.0 - heat) + dis.y * cA * 3.0;
  
  let alpha = clamp(
    input.color.a * (1.0 - input.color.r) * (0.55 + fres * 0.8) * dis.x, 0.0, 1.0
  );
  
  let soft = alpha;
  return vec4<f32>(color * intensity * soft, soft);
}

fn cinder_burst_outer_shade(input: CinderMeshOut) -> vec4<f32> {
  return cinder_burst_shade(
    input, CINDER_SHELL_HOT, CINDER_SHELL_MID, CINDER_SHELL_EDGE, 1.0, 1.1
  );
}

fn cinder_burst_inner_shade(input: CinderMeshOut) -> vec4<f32> {
  return cinder_burst_shade(
    input, CINDER_SHELL_HOT, CINDER_SHELL_HOT, CINDER_SHELL_MID, 2.2, 1.0
  );
}

fn cinder_shell_shard_shade(input: CinderMeshOut) -> vec4<f32> {
  let normal = normalize(input.normal);
  let viewDirection = vec3<f32>(0.0, 0.0, 1.0);
  let seed = input.color.r;
  let heat = input.color.g;
  let visibility = input.color.a;
  let rim = pow(1.0 - abs(dot(normal, viewDirection)), 1.35);
  let alpha = visibility * (0.22 + rim * 0.58) * mix(0.45, 1.0, heat);
  let color = mix(vec3<f32>(1.0, 0.24, 0.025), vec3<f32>(2.4, 1.22, 0.35), seed);
  let soft = alpha;
  return vec4<f32>(color * soft, soft);
}

fn cinder_core_shard_shade(input: CinderMeshOut) -> vec4<f32> {
  let normal = normalize(input.normal);
  let seed = input.color.r;
  let heat = input.color.g;
  let visibility = input.color.a;
  let light = 0.25 + 0.75 * max(dot(normal, normalize(vec3<f32>(0.35, 0.8, 0.45))), 0.0);

  let grain = cinder_noise(input.uv * 5.5 + seed * 17.0);
  let coolingRock = vec3<f32>(0.055, 0.026, 0.012) * light * (.78 + grain * .44);
  let molten = mix(vec3<f32>(1.0, 0.12, 0.008), vec3<f32>(3.2, 1.45, 0.32), seed);
  let hotPatch = smoothstep(.34,.72,grain + heat * .42);
  let color = mix(coolingRock, molten * (.6 + light * .4), heat * heat * hotPatch);
  
  return vec4<f32>(color * visibility, visibility);
}

fn cinder_scorch_mesh_shade(input: CinderMeshOut) -> vec4<f32> {

  let c = input.local.xz;
  let life = input.color.r;
  let seed = input.color.g;
  let age = input.color.b;
  let d = length(c);

  let n = cinder_fbm3(vec3<f32>(c * 2.4, seed * 13.0));

  let burn = smoothstep(1.0, 0.15, d + n * 0.45);

  let drift = seed * 9.0 + age * 0.35;
  let embers = pow(max(cinder_snoise(vec3<f32>(c * 6.0, drift)), 0.0), 4.0);
  
  let alpha = input.color.a * burn * 0.85;

  let colorA = vec3<f32>(0.00402, 0.00273, 0.00212)
    * (1.0);
  let colorB = vec3<f32>(1.0, 0.14413, 0.00605);
  var rgb = mix(colorA, colorB, embers * (1.0 - life));
  rgb = rgb + embers * colorB * 2.5 * (1.0 - smoothstep(0.0, 0.6, life));
  return vec4<f32>(rgb * alpha, alpha);
}

const CINDER_SEAM_COLOR: vec3<f32> = vec3<f32>(0.00402, 0.00273, 0.00212);
const CINDER_RED_COLOR: vec3<f32> = vec3<f32>(1.0, 0.04667, 0.00518);
const CINDER_ORANGE_COLOR: vec3<f32> = vec3<f32>(1.0, 0.14413, 0.00605);
const CINDER_WHITE_COLOR: vec3<f32> = vec3<f32>(1.0, 0.89627, 0.63076);

fn cinder_seam_cap(along: f32) -> f32 {
  return max(1.0 - abs(along), 0.0);
}

fn cinder_lip_shade(input: CinderMeshOut) -> vec4<f32> {
  let normal = normalize(input.normal);
  let visibility = input.color.a;
  let lightDirection = normalize(vec3<f32>(0.35, 0.72, 0.55));
  let diffuse = 0.16 + 0.84 * max(dot(normal, lightDirection), 0.0);

  let charred = vec3<f32>(0.00857, 0.00651, 0.00478);
  let rgb = charred * (diffuse);
  return vec4<f32>(rgb * visibility, visibility);
}


fn cinder_fissure_shade(input: CinderMeshOut, glow: bool) -> vec4<f32> {
 let age = input.color.r;
 let across = abs(input.uv.y * 2.0 - 1.0);
 let front = smoothstep(0.0, 0.58, age);
 let open = 1.0 - smoothstep(front - 0.08, front, input.uv.x);
 let fade = 1.0 - smoothstep(4.0, 6.5, age);
 let core = 1.0 - smoothstep(0.1, select(0.42, 1.0, glow), across);
 let pulse = 0.78 + 0.22 * sin(age * 6.0 + input.uv.x * 17.0);
 let alpha = open * fade * core * select(0.85, 0.18, glow);
 return vec4<f32>(vec3<f32>(1.0, 0.25, 0.025) * pulse * alpha, alpha);
}

// Variant order follows FRAGMENT_KINDS.mesh in the material authoring toolbox.
@fragment fn fs_main(input: CinderMeshOut) -> @location(0) vec4<f32> {
  var shaded: vec4<f32>;
  switch i32(round(input.surface.x * 8.0)) {
    case 0: { shaded = cinder_rock_shade(input); }
    case 1: { shaded = cinder_burst_outer_shade(input); }
    case 2: { shaded = cinder_burst_inner_shade(input); }
    case 3: { shaded = cinder_core_shard_shade(input); }
    case 4: { shaded = cinder_shell_shard_shade(input); }
    case 5: { shaded = cinder_scorch_mesh_shade(input); }
    case 6: { shaded = cinder_lip_shade(input); }
    case 7: { shaded = cinder_fissure_shade(input, false); }
    default: { shaded = cinder_fissure_shade(input, true); }
  }
  // Saved comic lab_finish gain, with non-emissive rock/scorch protected.
  let peak = max(max(shaded.r, shaded.g), shaded.b) / max(shaded.a, 0.000001);
  let variant = i32(round(input.surface.x * 8.0));
  let stone = variant == 0 || variant == 3 || variant == 4 || variant == 5 || variant == 6;
  let mask = select(1.0, smoothstep(0.025, 0.18, peak), stone);
  shaded = vec4<f32>(shaded.rgb * mix(1.0, input.surface.z, mask), shaded.a);
  // Palette remains editable while the cooling rock recovers its dark carbon
  // color. A fixed comic shade floor must not repaint cold shards bright orange.
  var tint = input.tint;
  if (variant == 3) { tint.a *= smoothstep(.08,.55,input.color.g); }
  return cinder_print(shaded, input.position.xy, tint, input.emissive_intensity);
}
