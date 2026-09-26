var e={hash:`40b4fc6f`,wgsl:`struct FullscreenOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv: vec2<f32>,
}

struct ReadabilityParams {
    depth: vec4<f32>,
    edge: vec4<f32>,
    caseStyle: vec4<f32>,
    viewProjection: mat4x4<f32>,
    inverseViewProjection: mat4x4<f32>,
    eye: vec4<f32>,
    water: vec4<f32>,
}

@group(1) @binding(0) 
var sceneTexture: texture_2d<f32>;
@group(1) @binding(1) 
var sceneSampler: sampler;
@group(1) @binding(2) 
var<uniform> p: ReadabilityParams;
@group(1) @binding(3) 
var depthTexture: texture_depth_2d;
@group(1) @binding(4) 
var depthSampler: sampler;

fn linearDepth(ndcDepth: f32) -> f32 {
    let nearPlane = p.depth.x;
    let farPlane = p.depth.y;
    return ((nearPlane * farPlane) / max(0.00001f, (farPlane - (ndcDepth * (farPlane - nearPlane)))));
}

fn sceneDepth(pixel: vec2<i32>) -> f32 {
    let _e3 = textureLoad(depthTexture, pixel, 0i);
    return _e3;
}

fn sampleLinearDepth(pixel_1: vec2<i32>, dimensions: vec2<i32>) -> f32 {
    let safePixel = clamp(pixel_1, vec2(0i), (dimensions - vec2(1i)));
    let _e8 = sceneDepth(safePixel);
    let _e9 = linearDepth(_e8);
    return _e9;
}

fn inkResolutionScale(dimensions_1: vec2<i32>) -> f32 {
    return clamp((f32(min(dimensions_1.x, dimensions_1.y)) / 900f), 0.625f, 2f);
}

fn inkHash(cell: vec2<f32>) -> f32 {
    var q: vec3<f32>;

    q = fract((vec3<f32>(cell.x, cell.y, cell.x) * 0.1031f));
    let _e9 = q;
    let _e10 = q;
    let _e11 = q;
    q = (_e9 + vec3(dot(_e10, (_e11.yzx + vec3(33.33f)))));
    let _e20 = q.x;
    let _e22 = q.y;
    let _e25 = q.z;
    return fract(((_e20 + _e22) * _e25));
}

fn inkGrain(point: vec2<f32>) -> f32 {
    let cell_1 = floor(point);
    let fraction = fract(point);
    let weight = ((fraction * fraction) * (vec2(3f) - (2f * fraction)));
    let _e10 = inkHash(cell_1);
    let _e15 = inkHash((cell_1 + vec2<f32>(1f, 0f)));
    let _e22 = inkHash((cell_1 + vec2<f32>(0f, 1f)));
    let _e26 = inkHash((cell_1 + vec2(1f)));
    return mix(mix(_e10, _e15, weight.x), mix(_e22, _e26, weight.x), weight.y);
}

fn surfaceDepthSlope(pixel_2: vec2<i32>, dimensions_2: vec2<i32>, center: f32) -> vec2<f32> {
    var slope: vec2<f32>;

    let reciprocal = (1f / center);
    let _e9 = sampleLinearDepth((pixel_2 - vec2<i32>(1i, 0i)), dimensions_2);
    let _e17 = sampleLinearDepth((pixel_2 - vec2<i32>(0i, 1i)), dimensions_2);
    let backward = vec2<f32>((reciprocal - (1f / _e9)), (reciprocal - (1f / _e17)));
    let _e26 = sampleLinearDepth((pixel_2 + vec2<i32>(1i, 0i)), dimensions_2);
    let _e34 = sampleLinearDepth((pixel_2 + vec2<i32>(0i, 1i)), dimensions_2);
    let forward = vec2<f32>(((1f / _e26) - reciprocal), ((1f / _e34) - reciprocal));
    slope = select(forward, backward, (abs(backward) < abs(forward)));
    let _e44 = slope;
    slope = select(_e44, forward, (pixel_2 == vec2(0i)));
    let _e49 = slope;
    slope = select(_e49, backward, (pixel_2 == (dimensions_2 - vec2(1i))));
    let _e55 = slope;
    return clamp(_e55, vec2((-(reciprocal) * 0.05f)), vec2((reciprocal * 0.05f)));
}

fn discontinuity(pixel_3: vec2<i32>, offset: vec2<i32>, dimensions_3: vec2<i32>, center_1: f32, slope_1: vec2<f32>) -> f32 {
    let samplePixel = clamp((pixel_3 + offset), vec2(0i), (dimensions_3 - vec2(1i)));
    let _e10 = sampleLinearDepth(samplePixel, dimensions_3);
    let _e14 = p.depth.y;
    let predicted = (1f / max((1f / _e14), ((1f / center_1) + dot(slope_1, vec2<f32>((samplePixel - pixel_3))))));
    return max(0f, min((_e10 - center_1), (_e10 - predicted)));
}

fn crossDiscontinuity(pixel_4: vec2<i32>, radius: i32, dimensions_4: vec2<i32>, center_2: f32, slope_2: vec2<f32>) -> f32 {
    let _e8 = discontinuity(pixel_4, vec2<i32>(-(radius), 0i), dimensions_4, center_2, slope_2);
    let _e11 = discontinuity(pixel_4, vec2<i32>(radius, 0i), dimensions_4, center_2, slope_2);
    let _e15 = discontinuity(pixel_4, vec2<i32>(0i, -(radius)), dimensions_4, center_2, slope_2);
    let _e18 = discontinuity(pixel_4, vec2<i32>(0i, radius), dimensions_4, center_2, slope_2);
    return max(max(_e8, _e11), max(_e15, _e18));
}

fn worldAt(uv: vec2<f32>, depth: f32) -> vec3<f32> {
    let _e3 = p.inverseViewProjection;
    let world = (_e3 * vec4<f32>(((uv.x * 2f) - 1f), (1f - (uv.y * 2f)), depth, 1f));
    return (world.xyz / vec3(world.w));
}

fn waterReflection(scene_1: vec3<f32>, uv_1: vec2<f32>, rawDepth: f32, dimensions_5: vec2<i32>, surfaceNormal: vec3<f32>) -> vec3<f32> {
    var local_1: bool;
    var previousDistance: f32 = 0.035f;
    var i: u32 = 0u;
    var local_2: bool;
    var local_3: bool;
    var local_4: bool;
    var low: f32;
    var high: f32;
    var hitUV: vec2<f32>;
    var hitDepth: f32;
    var hitDistance: f32;
    var refine: u32;
    var local_5: bool;
    var local_6: bool;

    let _e5 = p.water.y;
    if (_e5 <= 0f) {
        return scene_1;
    }
    let _e11 = worldAt(uv_1, rawDepth);
    let _e16 = p.water.x;
    let _e22 = p.caseStyle.w;
    if !((abs((_e11.y - _e16)) > _e22)) {
        let _e28 = p.eye.y;
        local_1 = (_e28 <= _e11.y);
    } else {
        local_1 = true;
    }
    let _e34 = local_1;
    if _e34 {
        return scene_1;
    }
    let _e37 = p.eye;
    let incident = normalize((_e11 - _e37.xyz));
    let normal = (surfaceNormal * select(-1f, 1f, (surfaceNormal.y >= 0f)));
    if (normal.y < 0.75f) {
        return scene_1;
    }
    let direction = reflect(incident, normal);
    let start = (_e11 + vec3<f32>(0f, 0.025f, 0f));
    let _e61 = p.water.w;
    let count = u32(_e61);
    loop {
        let _e64 = i;
        if (_e64 < 40u) {
        } else {
            break;
        }
        {
            let _e67 = i;
            if (_e67 >= count) {
                break;
            }
            let _e69 = i;
            let fraction_1 = (f32((_e69 + 1u)) / f32(count));
            let _e78 = p.water.z;
            let distance_ = (0.035f + ((_e78 * fraction_1) * fraction_1));
            let point_1 = (start + (direction * distance_));
            let _e87 = p.viewProjection;
            let clip = (_e87 * vec4<f32>(point_1, 1f));
            if (clip.w <= 0f) {
                break;
            }
            let projected = vec2<f32>((((clip.x / clip.w) * 0.5f) + 0.5f), (0.5f - ((clip.y / clip.w) * 0.5f)));
            if !(any((projected <= vec2(0.003f)))) {
                local_2 = any((projected >= vec2(0.997f)));
            } else {
                local_2 = true;
            }
            let _e121 = local_2;
            if _e121 {
                break;
            }
            let pixel_5 = clamp(vec2<i32>((projected * vec2<f32>(dimensions_5))), vec2(0i), (dimensions_5 - vec2(1i)));
            let _e132 = sceneDepth(pixel_5);
            let sampleUV = ((vec2<f32>(pixel_5) + vec2(0.5f)) / vec2<f32>(dimensions_5));
            let _e139 = worldAt(sampleUV, _e132);
            if (_e132 < 0.999999f) {
                let _e146 = p.water.x;
                let _e150 = p.caseStyle.w;
                local_3 = (_e139.y > (_e146 + _e150));
            } else {
                local_3 = false;
            }
            let _e156 = local_3;
            if _e156 {
                let _e158 = linearDepth(_e132);
                local_4 = (clip.w >= _e158);
            } else {
                local_4 = false;
            }
            let _e163 = local_4;
            if _e163 {
                let _e165 = previousDistance;
                low = _e165;
                high = distance_;
                hitUV = projected;
                hitDepth = _e132;
                hitDistance = clip.w;
                refine = 0u;
                loop {
                    let _e174 = refine;
                    if (_e174 < 5u) {
                    } else {
                        break;
                    }
                    {
                        let _e177 = low;
                        let _e178 = high;
                        let mid = ((_e177 + _e178) * 0.5f);
                        let _e184 = p.viewProjection;
                        let midClip = (_e184 * vec4<f32>((start + (direction * mid)), 1f));
                        let midUV = vec2<f32>((((midClip.x / midClip.w) * 0.5f) + 0.5f), (0.5f - ((midClip.y / midClip.w) * 0.5f)));
                        let midPixel = clamp(vec2<i32>((midUV * vec2<f32>(dimensions_5))), vec2(0i), (dimensions_5 - vec2(1i)));
                        let _e214 = sceneDepth(midPixel);
                        let _e216 = linearDepth(_e214);
                        if (midClip.w >= _e216) {
                            high = mid;
                            hitUV = midUV;
                            hitDepth = _e214;
                            hitDistance = midClip.w;
                        } else {
                            low = mid;
                        }
                    }
                    continuing {
                        let _e219 = refine;
                        refine = (_e219 + 1u);
                    }
                }
                let _e222 = hitDistance;
                let _e223 = hitDepth;
                let _e224 = linearDepth(_e223);
                let separation = (_e222 - _e224);
                let _e226 = hitUV;
                let _e227 = hitDepth;
                let _e228 = worldAt(_e226, _e227);
                if (separation >= 0f) {
                    local_5 = (separation < 0.35f);
                } else {
                    local_5 = false;
                }
                let _e236 = local_5;
                if _e236 {
                    let _e241 = p.water.x;
                    let _e245 = p.caseStyle.w;
                    local_6 = (_e228.y > (_e241 + _e245));
                } else {
                    local_6 = false;
                }
                let _e251 = local_6;
                if _e251 {
                    let _e253 = hitUV.x;
                    let _e255 = hitUV.x;
                    let _e260 = hitUV.y;
                    let _e262 = hitUV.y;
                    let edge = min(min(_e253, (1f - _e255)), min(_e260, (1f - _e262)));
                    let _e273 = p.water.z;
                    let _e279 = p.water.z;
                    let _e280 = high;
                    let confidence = (smoothstep(0.015f, 0.08f, edge) * (1f - smoothstep((_e273 * 0.7f), _e279, _e280)));
                    let fresnel = (0.55f + (0.45f * pow((1f - clamp(dot(-(incident), normal), 0f, 1f)), 5f)));
                    let _e298 = hitUV;
                    let _e302 = textureSampleLevel(sceneTexture, sceneSampler, _e298, 0f);
                    let reflected = _e302.xyz;
                    let _e312 = p.water.y;
                    return mix(scene_1, ((reflected * 0.88f) + (scene_1 * 0.12f)), ((_e312 * confidence) * fresnel));
                }
                return scene_1;
            }
            previousDistance = distance_;
        }
        continuing {
            let _e316 = i;
            i = (_e316 + 1u);
        }
    }
    return scene_1;
}

@vertex 
fn vs_main(@builtin(vertex_index) index: u32) -> FullscreenOutput {
    var x: f32 = -1f;
    var y: f32 = -1f;
    var out: FullscreenOutput;

    if (index == 1u) {
        x = 3f;
    }
    if (index == 2u) {
        y = 3f;
    }
    let _e12 = x;
    let _e13 = y;
    out.position = vec4<f32>(_e12, _e13, 0f, 1f);
    let _e18 = x;
    let _e23 = y;
    out.uv = vec2<f32>(((_e18 + 1f) * 0.5f), (1f - ((_e23 + 1f) * 0.5f)));
    let _e31 = out;
    return _e31;
}

@fragment 
fn fs_main(in: FullscreenOutput) -> @location(0) vec4<f32> {
    var scene: vec3<f32>;
    var local: bool;

    let _e4 = textureSample(sceneTexture, sceneSampler, in.uv);
    scene = _e4.xyz;
    let dimensionsU = textureDimensions(depthTexture);
    let dimensions_6 = vec2<i32>(dimensionsU);
    let centerPixel = clamp(vec2<i32>((in.uv * vec2<f32>(dimensionsU))), vec2(0i), (dimensions_6 - vec2(1i)));
    let _e20 = sceneDepth(centerPixel);
    let _e22 = worldAt(in.uv, _e20);
    let _e23 = dpdx(_e22);
    let _e24 = dpdy(_e22);
    let surfaceNormal_1 = normalize(cross(_e23, _e24));
    let _e32 = p.caseStyle.x;
    if (in.uv.x < _e32) {
        let _e34 = scene;
        return vec4<f32>(_e34, 1f);
    }
    if (_e20 >= 0.999999f) {
        let _e39 = scene;
        return vec4<f32>(_e39, 1f);
    }
    let _e42 = scene;
    let _e44 = waterReflection(_e42, in.uv, _e20, dimensions_6, surfaceNormal_1);
    scene = _e44;
    let _e48 = p.caseStyle.y;
    if !((_e48 < 0.5f)) {
        let _e55 = p.edge.w;
        local = (_e55 <= 0f);
    } else {
        local = true;
    }
    let _e61 = local;
    if _e61 {
        let _e62 = scene;
        return vec4<f32>(_e62, 1f);
    }
    let _e65 = inkResolutionScale(dimensions_6);
    let _e66 = linearDepth(_e20);
    let distanceFade = smoothstep(24f, 70f, _e66);
    let _e73 = p.caseStyle.y;
    let radius_1 = max(1i, i32(round(((_e73 * _e65) * mix(1f, 0.48f, distanceFade)))));
    let coreRadius = max(1i, i32(round((f32(radius_1) * 0.76f))));
    let _e90 = surfaceDepthSlope(centerPixel, dimensions_6, _e66);
    let diagonal = max(1i, i32(round((f32(radius_1) * 0.707107f))));
    let _e99 = discontinuity(centerPixel, vec2<i32>(diagonal, diagonal), dimensions_6, _e66, _e90);
    let _e102 = discontinuity(centerPixel, vec2<i32>(diagonal, -(diagonal)), dimensions_6, _e66, _e90);
    let _e105 = discontinuity(centerPixel, vec2<i32>(-(diagonal), diagonal), dimensions_6, _e66, _e90);
    let _e109 = discontinuity(centerPixel, vec2<i32>(-(diagonal), -(diagonal)), dimensions_6, _e66, _e90);
    let _e110 = crossDiscontinuity(centerPixel, radius_1, dimensions_6, _e66, _e90);
    let outerGap = max(_e110, max(max(_e99, _e102), max(_e105, _e109)));
    let _e118 = p.depth.z;
    let _e122 = p.depth.w;
    let threshold = (_e118 + (_e66 * _e122));
    let _e128 = p.caseStyle.z;
    let responseEnd = (threshold * max(1.05f, _e128));
    let outer = smoothstep(threshold, responseEnd, outerGap);
    if (outer <= 0f) {
        let _e135 = scene;
        return vec4<f32>(_e135, 1f);
    }
    let _e138 = crossDiscontinuity(centerPixel, coreRadius, dimensions_6, _e66, _e90);
    let core = smoothstep(threshold, responseEnd, _e138);
    let paper = (vec2<f32>(centerPixel) / vec2(_e65));
    let _e146 = inkGrain((paper / vec2(18f)));
    let _e159 = inkGrain((vec2<f32>((paper.x + (paper.y * 0.24f)), (paper.y * 1.8f)) / vec2(3f)));
    let rim = (outer * mix(0.6f, 0.78f, _e159));
    let density = mix(0.92f, 1f, _e146);
    let _e172 = p.edge.w;
    let coverage = (((max(core, rim) * density) * _e172) * mix(1f, 0.3f, distanceFade));
    let _e180 = p.edge;
    let ink = (_e180.xyz * mix(0.88f, 1.06f, _e146));
    let _e186 = scene;
    let outlined = mix(_e186, ink, coverage);
    return vec4<f32>(outlined, 1f);
}
`},t=[{label:`@group(1)`,entries:[{binding:0,visibility:2,texture:{sampleType:`float`,viewDimension:`2d`,multisampled:!1}},{binding:1,visibility:2,sampler:{type:`filtering`}},{binding:2,visibility:2,buffer:{type:`uniform`,hasDynamicOffset:!1,minBindingSize:0}},{binding:3,visibility:2,texture:{sampleType:`depth`,viewDimension:`2d`,multisampled:!1}},{binding:4,visibility:0,sampler:{type:`non-filtering`}}]}],n=0;export{t as n,n as r,e as t};