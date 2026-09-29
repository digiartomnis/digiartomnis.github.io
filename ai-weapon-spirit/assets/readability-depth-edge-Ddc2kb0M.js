var e={hash:`667afff6`,wgsl:`struct FullscreenOutput {
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

fn outlineSampleCoverage(pixel_2: vec2<i32>, foreground: f32) -> f32 {
    return 1f;
}

fn sampleLinearDepth(pixel_3: vec2<i32>, dimensions: vec2<i32>) -> f32 {
    let safePixel = clamp(pixel_3, vec2(0i), (dimensions - vec2(1i)));
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

fn surfaceDepthSlope(pixel_4: vec2<i32>, dimensions_2: vec2<i32>, center: f32) -> vec2<f32> {
    var slope: vec2<f32>;

    let reciprocal = (1f / center);
    let _e9 = sampleLinearDepth((pixel_4 - vec2<i32>(1i, 0i)), dimensions_2);
    let _e17 = sampleLinearDepth((pixel_4 - vec2<i32>(0i, 1i)), dimensions_2);
    let backward = vec2<f32>((reciprocal - (1f / _e9)), (reciprocal - (1f / _e17)));
    let _e26 = sampleLinearDepth((pixel_4 + vec2<i32>(1i, 0i)), dimensions_2);
    let _e34 = sampleLinearDepth((pixel_4 + vec2<i32>(0i, 1i)), dimensions_2);
    let forward = vec2<f32>(((1f / _e26) - reciprocal), ((1f / _e34) - reciprocal));
    slope = select(forward, backward, (abs(backward) < abs(forward)));
    let _e44 = slope;
    slope = select(_e44, forward, (pixel_4 == vec2(0i)));
    let _e49 = slope;
    slope = select(_e49, backward, (pixel_4 == (dimensions_2 - vec2(1i))));
    let _e55 = slope;
    return clamp(_e55, vec2((-(reciprocal) * 0.05f)), vec2((reciprocal * 0.05f)));
}

fn outerInk(pixel_5: vec2<i32>, offset: vec2<i32>, dimensions_3: vec2<i32>, center_1: f32, slope_1: vec2<f32>, referenceRadius: f32) -> f32 {
    let samplePixel = clamp((pixel_5 + offset), vec2(0i), (dimensions_3 - vec2(1i)));
    let _e10 = sampleLinearDepth(samplePixel, dimensions_3);
    let _e14 = p.depth.y;
    let predicted = (1f / max((1f / _e14), ((1f / center_1) + dot(slope_1, vec2<f32>((samplePixel - pixel_5))))));
    let gap = max(0f, min((center_1 - _e10), (predicted - _e10)));
    let _e36 = p.depth.z;
    let _e40 = p.depth.w;
    let threshold = (_e36 + (_e10 * _e40));
    let _e46 = p.caseStyle.z;
    let edge_1 = smoothstep(threshold, (threshold * max(1.05f, _e46)), gap);
    if (edge_1 <= 0f) {
        return 0f;
    }
    let distanceFade = smoothstep(24f, 70f, _e10);
    let support = (referenceRadius * mix(1f, 0.48f, distanceFade));
    let width = (support * 0.6f);
    let distance_ = max(0f, (length(vec2<f32>(offset)) - 0.5f));
    let coverage = (1f - smoothstep(max(0f, (width - 0.75f)), (width + 0.75f), distance_));
    let _e80 = outlineSampleCoverage(samplePixel, _e10);
    return (((edge_1 * coverage) * _e80) * mix(1f, 0.3f, distanceFade));
}

fn crossInk(pixel_6: vec2<i32>, step_1: i32, dimensions_4: vec2<i32>, center_2: f32, slope_2: vec2<f32>, referenceRadius_1: f32) -> f32 {
    let _e9 = outerInk(pixel_6, vec2<i32>(-(step_1), 0i), dimensions_4, center_2, slope_2, referenceRadius_1);
    let _e12 = outerInk(pixel_6, vec2<i32>(step_1, 0i), dimensions_4, center_2, slope_2, referenceRadius_1);
    let _e16 = outerInk(pixel_6, vec2<i32>(0i, -(step_1)), dimensions_4, center_2, slope_2, referenceRadius_1);
    let _e19 = outerInk(pixel_6, vec2<i32>(0i, step_1), dimensions_4, center_2, slope_2, referenceRadius_1);
    return max(max(_e9, _e12), max(_e16, _e19));
}

fn worldAt(uv: vec2<f32>, depth: f32) -> vec3<f32> {
    let _e3 = p.inverseViewProjection;
    let world = (_e3 * vec4<f32>(((uv.x * 2f) - 1f), (1f - (uv.y * 2f)), depth, 1f));
    return (world.xyz / vec3(world.w));
}

fn waterReflection(scene_1: vec3<f32>, uv_1: vec2<f32>, rawDepth: f32, dimensions_5: vec2<i32>, surfaceNormal: vec3<f32>) -> vec3<f32> {
    var local_2: bool;
    var previousDistance: f32 = 0.035f;
    var i: u32 = 0u;
    var local_3: bool;
    var local_4: bool;
    var local_5: bool;
    var low: f32;
    var high: f32;
    var hitUV: vec2<f32>;
    var hitDepth: f32;
    var hitDistance: f32;
    var refine: u32;
    var local_6: bool;
    var local_7: bool;

    let _e5 = p.water.y;
    if (_e5 <= 0f) {
        return scene_1;
    }
    let _e11 = worldAt(uv_1, rawDepth);
    let _e16 = p.water.x;
    let _e22 = p.caseStyle.w;
    if !((abs((_e11.y - _e16)) > _e22)) {
        let _e28 = p.eye.y;
        local_2 = (_e28 <= _e11.y);
    } else {
        local_2 = true;
    }
    let _e34 = local_2;
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
            let distance_1 = (0.035f + ((_e78 * fraction_1) * fraction_1));
            let point_1 = (start + (direction * distance_1));
            let _e87 = p.viewProjection;
            let clip = (_e87 * vec4<f32>(point_1, 1f));
            if (clip.w <= 0f) {
                break;
            }
            let projected = vec2<f32>((((clip.x / clip.w) * 0.5f) + 0.5f), (0.5f - ((clip.y / clip.w) * 0.5f)));
            if !(any((projected <= vec2(0.003f)))) {
                local_3 = any((projected >= vec2(0.997f)));
            } else {
                local_3 = true;
            }
            let _e121 = local_3;
            if _e121 {
                break;
            }
            let pixel_7 = clamp(vec2<i32>((projected * vec2<f32>(dimensions_5))), vec2(0i), (dimensions_5 - vec2(1i)));
            let _e132 = sceneDepth(pixel_7);
            let sampleUV = ((vec2<f32>(pixel_7) + vec2(0.5f)) / vec2<f32>(dimensions_5));
            let _e139 = worldAt(sampleUV, _e132);
            if (_e132 > 0.000001f) {
                let _e146 = p.water.x;
                let _e150 = p.caseStyle.w;
                local_4 = (_e139.y > (_e146 + _e150));
            } else {
                local_4 = false;
            }
            let _e156 = local_4;
            if _e156 {
                let _e158 = linearDepth(_e132);
                local_5 = (clip.w >= _e158);
            } else {
                local_5 = false;
            }
            let _e163 = local_5;
            if _e163 {
                let _e165 = previousDistance;
                low = _e165;
                high = distance_1;
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
                    local_6 = (separation < 0.35f);
                } else {
                    local_6 = false;
                }
                let _e236 = local_6;
                if _e236 {
                    let _e241 = p.water.x;
                    let _e245 = p.caseStyle.w;
                    local_7 = (_e228.y > (_e241 + _e245));
                } else {
                    local_7 = false;
                }
                let _e251 = local_7;
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
            previousDistance = distance_1;
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
    var edge: f32 = 0f;
    var step_: i32 = 1i;
    var local_1: bool;

    let _e6 = textureSample(sceneTexture, sceneSampler, in.uv);
    scene = _e6.xyz;
    let dimensionsU = textureDimensions(depthTexture);
    let dimensions_6 = vec2<i32>(dimensionsU);
    let centerPixel = clamp(vec2<i32>((in.uv * vec2<f32>(dimensionsU))), vec2(0i), (dimensions_6 - vec2(1i)));
    let _e22 = sceneDepth(centerPixel);
    let _e24 = worldAt(in.uv, _e22);
    let _e25 = dpdx(_e24);
    let _e26 = dpdy(_e24);
    let surfaceNormal_1 = normalize(cross(_e25, _e26));
    let _e34 = p.caseStyle.x;
    if (in.uv.x < _e34) {
        let _e36 = scene;
        return vec4<f32>(_e36, 1f);
    }
    if (_e22 > 0.000001f) {
        let _e41 = scene;
        let _e43 = waterReflection(_e41, in.uv, _e22, dimensions_6, surfaceNormal_1);
        scene = _e43;
    }
    let _e47 = p.caseStyle.y;
    if !((_e47 < 0.5f)) {
        let _e54 = p.edge.w;
        local = (_e54 <= 0f);
    } else {
        local = true;
    }
    let _e60 = local;
    if _e60 {
        let _e61 = scene;
        return vec4<f32>(_e61, 1f);
    }
    let _e64 = inkResolutionScale(dimensions_6);
    let _e65 = outlineDepth(centerPixel);
    let _e66 = linearDepth(_e65);
    let _e70 = p.caseStyle.y;
    let referenceRadius_2 = (_e70 * _e64);
    let reach = ((referenceRadius_2 * 0.6f) + 1.25f);
    let radius = i32(floor(reach));
    let diagonalRadius = i32(floor((reach * 0.707107f)));
    let _e82 = surfaceDepthSlope(centerPixel, dimensions_6, _e66);
    loop {
        let _e84 = step_;
        if (_e84 <= 12i) {
        } else {
            break;
        }
        {
            let _e87 = step_;
            if (_e87 > radius) {
                break;
            }
            let _e90 = edge;
            let _e91 = step_;
            let _e92 = crossInk(centerPixel, _e91, dimensions_6, _e66, _e82, referenceRadius_2);
            edge = max(_e90, _e92);
            let diagonal = step_;
            if (diagonal <= diagonalRadius) {
                let _e97 = outerInk(centerPixel, vec2<i32>(diagonal, diagonal), dimensions_6, _e66, _e82, referenceRadius_2);
                let _e100 = outerInk(centerPixel, vec2<i32>(diagonal, -(diagonal)), dimensions_6, _e66, _e82, referenceRadius_2);
                let _e103 = outerInk(centerPixel, vec2<i32>(-(diagonal), diagonal), dimensions_6, _e66, _e82, referenceRadius_2);
                let _e107 = outerInk(centerPixel, vec2<i32>(-(diagonal), -(diagonal)), dimensions_6, _e66, _e82, referenceRadius_2);
                let _e108 = edge;
                edge = max(_e108, max(max(_e97, _e100), max(_e103, _e107)));
            }
            let _e113 = step_;
            if ((_e113 % 2i) == 0i) {
                let _e118 = step_;
                local_1 = ((f32(_e118) * 1.118034f) < reach);
            } else {
                local_1 = false;
            }
            let _e126 = local_1;
            if _e126 {
                let _e127 = step_;
                let half = (_e127 / 2i);
                let _e130 = edge;
                let _e131 = step_;
                let _e133 = outerInk(centerPixel, vec2<i32>(_e131, half), dimensions_6, _e66, _e82, referenceRadius_2);
                edge = max(_e130, _e133);
                let _e135 = edge;
                let _e136 = step_;
                let _e139 = outerInk(centerPixel, vec2<i32>(_e136, -(half)), dimensions_6, _e66, _e82, referenceRadius_2);
                edge = max(_e135, _e139);
                let _e141 = edge;
                let _e142 = step_;
                let _e145 = outerInk(centerPixel, vec2<i32>(-(_e142), half), dimensions_6, _e66, _e82, referenceRadius_2);
                edge = max(_e141, _e145);
                let _e147 = edge;
                let _e148 = step_;
                let _e152 = outerInk(centerPixel, vec2<i32>(-(_e148), -(half)), dimensions_6, _e66, _e82, referenceRadius_2);
                edge = max(_e147, _e152);
                let _e154 = edge;
                let _e155 = step_;
                let _e157 = outerInk(centerPixel, vec2<i32>(half, _e155), dimensions_6, _e66, _e82, referenceRadius_2);
                edge = max(_e154, _e157);
                let _e159 = edge;
                let _e160 = step_;
                let _e163 = outerInk(centerPixel, vec2<i32>(half, -(_e160)), dimensions_6, _e66, _e82, referenceRadius_2);
                edge = max(_e159, _e163);
                let _e165 = edge;
                let _e167 = step_;
                let _e169 = outerInk(centerPixel, vec2<i32>(-(half), _e167), dimensions_6, _e66, _e82, referenceRadius_2);
                edge = max(_e165, _e169);
                let _e171 = edge;
                let _e173 = step_;
                let _e176 = outerInk(centerPixel, vec2<i32>(-(half), -(_e173)), dimensions_6, _e66, _e82, referenceRadius_2);
                edge = max(_e171, _e176);
            }
            let _e178 = edge;
            if (_e178 >= 1f) {
                break;
            }
        }
        continuing {
            let _e181 = step_;
            step_ = (_e181 + 1i);
        }
    }
    let _e184 = edge;
    if (_e184 <= 0f) {
        let _e187 = scene;
        return vec4<f32>(_e187, 1f);
    }
    let paper = (vec2<f32>(centerPixel) / vec2(_e64));
    let _e196 = inkGrain((paper / vec2(18f)));
    let density = mix(0.92f, 1f, _e196);
    let _e200 = edge;
    let _e205 = p.edge.w;
    let coverage_1 = ((_e200 * density) * _e205);
    let _e209 = p.edge;
    let ink = (_e209.xyz * mix(0.88f, 1.06f, _e196));
    let _e215 = scene;
    let outlined = mix(_e215, ink, coverage_1);
    return vec4<f32>(outlined, 1f);
}
`},t=[{label:`@group(1)`,entries:[{binding:0,visibility:2,texture:{sampleType:`float`,viewDimension:`2d`,multisampled:!1}},{binding:1,visibility:2,sampler:{type:`filtering`}},{binding:2,visibility:2,buffer:{type:`uniform`,hasDynamicOffset:!1,minBindingSize:0}},{binding:3,visibility:2,texture:{sampleType:`depth`,viewDimension:`2d`,multisampled:!1}},{binding:4,visibility:0,sampler:{type:`non-filtering`}}]}],n=0;export{t as n,n as r,e as t};