var e={hash:`b8d60a3e`,wgsl:`struct FullscreenOutput {
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
    return ((nearPlane * farPlane) / max(0.00001f, (nearPlane + (ndcDepth * (farPlane - nearPlane)))));
}

fn sceneDepth(pixel: vec2<i32>) -> f32 {
    let _e3 = textureLoad(depthTexture, pixel, 0i);
    return _e3;
}

fn outlineDepth(pixel_1: vec2<i32>) -> f32 {
    let _e3 = textureLoad(depthTexture, pixel_1, 0i);
    return _e3;
}

fn sampleLinearDepth(pixel_2: vec2<i32>, dimensions: vec2<i32>) -> f32 {
    let safePixel = clamp(pixel_2, vec2(0i), (dimensions - vec2(1i)));
    let _e8 = outlineDepth(safePixel);
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

fn surfaceDepthSlope(pixel_3: vec2<i32>, dimensions_2: vec2<i32>, center: f32) -> vec2<f32> {
    var slope: vec2<f32>;

    let reciprocal = (1f / center);
    let _e9 = sampleLinearDepth((pixel_3 - vec2<i32>(1i, 0i)), dimensions_2);
    let _e17 = sampleLinearDepth((pixel_3 - vec2<i32>(0i, 1i)), dimensions_2);
    let backward = vec2<f32>((reciprocal - (1f / _e9)), (reciprocal - (1f / _e17)));
    let _e26 = sampleLinearDepth((pixel_3 + vec2<i32>(1i, 0i)), dimensions_2);
    let _e34 = sampleLinearDepth((pixel_3 + vec2<i32>(0i, 1i)), dimensions_2);
    let forward = vec2<f32>(((1f / _e26) - reciprocal), ((1f / _e34) - reciprocal));
    slope = select(forward, backward, (abs(backward) < abs(forward)));
    let _e44 = slope;
    slope = select(_e44, forward, (pixel_3 == vec2(0i)));
    let _e49 = slope;
    slope = select(_e49, backward, (pixel_3 == (dimensions_2 - vec2(1i))));
    let _e55 = slope;
    return clamp(_e55, vec2((-(reciprocal) * 0.05f)), vec2((reciprocal * 0.05f)));
}

fn outerInk(pixel_4: vec2<i32>, offset: vec2<i32>, dimensions_3: vec2<i32>, center_1: f32, slope_1: vec2<f32>, step_1: i32, referenceRadius: f32) -> vec2<f32> {
    let samplePixel = clamp((pixel_4 + offset), vec2(0i), (dimensions_3 - vec2(1i)));
    let _e10 = sampleLinearDepth(samplePixel, dimensions_3);
    let _e14 = p.depth.y;
    let predicted = (1f / max((1f / _e14), ((1f / center_1) + dot(slope_1, vec2<f32>((samplePixel - pixel_4))))));
    let gap = max(0f, min((center_1 - _e10), (predicted - _e10)));
    let _e36 = p.depth.z;
    let _e40 = p.depth.w;
    let threshold = (_e36 + (_e10 * _e40));
    let _e46 = p.caseStyle.z;
    let edge_1 = smoothstep(threshold, (threshold * max(1.05f, _e46)), gap);
    if (edge_1 <= 0f) {
        return vec2(0f);
    }
    let distanceFade = smoothstep(24f, 70f, _e10);
    let radius = max(1i, i32(round((referenceRadius * mix(1f, 0.48f, distanceFade)))));
    if (step_1 > radius) {
        return vec2(0f);
    }
    let coreRadius = max(1i, i32(round((f32(radius) * 0.76f))));
    let fadedEdge = (edge_1 * mix(1f, 0.3f, distanceFade));
    return vec2<f32>(select(0f, fadedEdge, (step_1 <= coreRadius)), fadedEdge);
}

fn crossInk(pixel_5: vec2<i32>, step_2: i32, dimensions_4: vec2<i32>, center_2: f32, slope_2: vec2<f32>, referenceRadius_1: f32) -> vec2<f32> {
    let _e9 = outerInk(pixel_5, vec2<i32>(-(step_2), 0i), dimensions_4, center_2, slope_2, step_2, referenceRadius_1);
    let _e12 = outerInk(pixel_5, vec2<i32>(step_2, 0i), dimensions_4, center_2, slope_2, step_2, referenceRadius_1);
    let _e16 = outerInk(pixel_5, vec2<i32>(0i, -(step_2)), dimensions_4, center_2, slope_2, step_2, referenceRadius_1);
    let _e19 = outerInk(pixel_5, vec2<i32>(0i, step_2), dimensions_4, center_2, slope_2, step_2, referenceRadius_1);
    return max(max(_e9, _e12), max(_e16, _e19));
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
            let pixel_6 = clamp(vec2<i32>((projected * vec2<f32>(dimensions_5))), vec2(0i), (dimensions_5 - vec2(1i)));
            let _e132 = sceneDepth(pixel_6);
            let sampleUV = ((vec2<f32>(pixel_6) + vec2(0.5f)) / vec2<f32>(dimensions_5));
            let _e139 = worldAt(sampleUV, _e132);
            if (_e132 > 0.000001f) {
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
                    let edge_2 = min(min(_e253, (1f - _e255)), min(_e260, (1f - _e262)));
                    let _e273 = p.water.z;
                    let _e279 = p.water.z;
                    let _e280 = high;
                    let confidence = (smoothstep(0.015f, 0.08f, edge_2) * (1f - smoothstep((_e273 * 0.7f), _e279, _e280)));
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
    var edge: vec2<f32> = vec2(0f);
    var lastDiagonal: i32 = 0i;
    var step_: i32 = 1i;

    let _e8 = textureSample(sceneTexture, sceneSampler, in.uv);
    scene = _e8.xyz;
    let dimensionsU = textureDimensions(depthTexture);
    let dimensions_6 = vec2<i32>(dimensionsU);
    let centerPixel = clamp(vec2<i32>((in.uv * vec2<f32>(dimensionsU))), vec2(0i), (dimensions_6 - vec2(1i)));
    let _e24 = sceneDepth(centerPixel);
    let _e26 = worldAt(in.uv, _e24);
    let _e27 = dpdx(_e26);
    let _e28 = dpdy(_e26);
    let surfaceNormal_1 = normalize(cross(_e27, _e28));
    let _e36 = p.caseStyle.x;
    if (in.uv.x < _e36) {
        let _e38 = scene;
        return vec4<f32>(_e38, 1f);
    }
    if (_e24 > 0.000001f) {
        let _e43 = scene;
        let _e45 = waterReflection(_e43, in.uv, _e24, dimensions_6, surfaceNormal_1);
        scene = _e45;
    }
    let _e49 = p.caseStyle.y;
    if !((_e49 < 0.5f)) {
        let _e56 = p.edge.w;
        local = (_e56 <= 0f);
    } else {
        local = true;
    }
    let _e62 = local;
    if _e62 {
        let _e63 = scene;
        return vec4<f32>(_e63, 1f);
    }
    let _e66 = inkResolutionScale(dimensions_6);
    let _e67 = outlineDepth(centerPixel);
    let _e68 = linearDepth(_e67);
    let _e72 = p.caseStyle.y;
    let referenceRadius_2 = (_e72 * _e66);
    let radius_1 = max(1i, i32(round(referenceRadius_2)));
    let _e78 = surfaceDepthSlope(centerPixel, dimensions_6, _e68);
    loop {
        let _e80 = step_;
        if (_e80 <= 12i) {
        } else {
            break;
        }
        {
            let _e83 = step_;
            if (_e83 > radius_1) {
                break;
            }
            let _e86 = edge;
            let _e87 = step_;
            let _e88 = crossInk(centerPixel, _e87, dimensions_6, _e68, _e78, referenceRadius_2);
            edge = max(_e86, _e88);
            let _e90 = step_;
            let diagonal = max(1i, i32(round((f32(_e90) * 0.707107f))));
            let _e99 = lastDiagonal;
            if (diagonal > _e99) {
                let _e102 = step_;
                let _e103 = outerInk(centerPixel, vec2<i32>(diagonal, diagonal), dimensions_6, _e68, _e78, _e102, referenceRadius_2);
                let _e106 = step_;
                let _e107 = outerInk(centerPixel, vec2<i32>(diagonal, -(diagonal)), dimensions_6, _e68, _e78, _e106, referenceRadius_2);
                let _e110 = step_;
                let _e111 = outerInk(centerPixel, vec2<i32>(-(diagonal), diagonal), dimensions_6, _e68, _e78, _e110, referenceRadius_2);
                let _e115 = step_;
                let _e116 = outerInk(centerPixel, vec2<i32>(-(diagonal), -(diagonal)), dimensions_6, _e68, _e78, _e115, referenceRadius_2);
                let _e117 = edge;
                edge = max(_e117, max(max(_e103, _e107), max(_e111, _e116)));
                lastDiagonal = diagonal;
            }
            let _e123 = edge.x;
            if (_e123 >= 1f) {
                break;
            }
        }
        continuing {
            let _e126 = step_;
            step_ = (_e126 + 1i);
        }
    }
    let _e130 = edge.y;
    if (_e130 <= 0f) {
        let _e133 = scene;
        return vec4<f32>(_e133, 1f);
    }
    let paper = (vec2<f32>(centerPixel) / vec2(_e66));
    let _e142 = inkGrain((paper / vec2(18f)));
    let _e155 = inkGrain((vec2<f32>((paper.x + (paper.y * 0.24f)), (paper.y * 1.8f)) / vec2(3f)));
    let _e157 = edge.y;
    let rim = (_e157 * mix(0.6f, 0.78f, _e155));
    let density = mix(0.92f, 1f, _e142);
    let _e166 = edge.x;
    let _e172 = p.edge.w;
    let coverage = ((max(_e166, rim) * density) * _e172);
    let _e176 = p.edge;
    let ink = (_e176.xyz * mix(0.88f, 1.06f, _e142));
    let _e182 = scene;
    let outlined = mix(_e182, ink, coverage);
    return vec4<f32>(outlined, 1f);
}
`},t=[{label:`@group(1)`,entries:[{binding:0,visibility:2,texture:{sampleType:`float`,viewDimension:`2d`,multisampled:!1}},{binding:1,visibility:2,sampler:{type:`filtering`}},{binding:2,visibility:2,buffer:{type:`uniform`,hasDynamicOffset:!1,minBindingSize:0}},{binding:3,visibility:2,texture:{sampleType:`depth`,viewDimension:`2d`,multisampled:!1}},{binding:4,visibility:0,sampler:{type:`non-filtering`}}]}],n=0;export{t as n,n as r,e as t};