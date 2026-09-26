var e={hash:`553dc4d9`,wgsl:`struct Out {
    @builtin(position) position: vec4<f32>,
    @location(0) uv: vec2<f32>,
}

struct SeedEffect {
    centerRadius: vec4<f32>,
    eyeStrength: vec4<f32>,
    clock: vec4<f32>,
}

struct Params {
    inverseViewProjection: mat4x4<f32>,
    effects: array<SeedEffect, 6>,
}

@group(1) @binding(0) 
var sceneColor: texture_2d<f32>;
@group(1) @binding(1) 
var sceneSampler: sampler;
@group(1) @binding(2) 
var<uniform> p: Params;
@group(1) @binding(3) 
var sceneDepth: texture_depth_2d;
@group(1) @binding(4) 
var depthSampler: sampler;

fn worldAt(uv_1: vec2<f32>, depth: f32) -> vec3<f32> {
    let _e3 = p.inverseViewProjection;
    let w = (_e3 * vec4<f32>(((uv_1.x * 2f) - 1f), (1f - (uv_1.y * 2f)), depth, 1f));
    return (w.xyz / vec3(w.w));
}

@vertex 
fn vs_main(@builtin(vertex_index) index: u32) -> Out {
    var o: Out;

    let x = select(-1f, 3f, (index == 1u));
    let y = select(-1f, 3f, (index == 2u));
    o.position = vec4<f32>(x, y, 0f, 1f);
    o.uv = vec2<f32>(((x + 1f) * 0.5f), (1f - ((y + 1f) * 0.5f)));
    let _e28 = o;
    return _e28;
}

@fragment 
fn fs_main(i: Out) -> @location(0) vec4<f32> {
    var local: bool;
    var uv: vec2<f32>;
    var highlight: vec3<f32> = vec3(0f);
    var index_1: u32 = 0u;
    var local_1: bool;
    var local_2: bool;

    let original = textureSampleLevel(sceneColor, sceneSampler, i.uv, 0f);
    let _e14 = p.effects[0].eyeStrength.w;
    if (_e14 <= 0f) {
        let _e22 = p.effects[0].clock.z;
        local = (_e22 <= 0f);
    } else {
        local = false;
    }
    let _e28 = local;
    if _e28 {
        return original;
    }
    let dimensions = textureDimensions(sceneDepth);
    let pixel = clamp(vec2<i32>((i.uv * vec2<f32>(dimensions))), vec2(0i), (vec2<i32>(dimensions) - vec2(1i)));
    let _e45 = textureLoad(sceneDepth, pixel, 0i);
    let _e46 = worldAt(i.uv, _e45);
    let _e51 = p.effects[0].eyeStrength;
    let ray = normalize((_e46 - _e51.xyz));
    uv = i.uv;
    loop {
        let _e58 = index_1;
        if (_e58 < 6u) {
        } else {
            break;
        }
        {
            let _e63 = index_1;
            let effect = p.effects[_e63];
            if (effect.eyeStrength.w <= 0f) {
                local_1 = (effect.clock.z <= 0f);
            } else {
                local_1 = false;
            }
            let _e77 = local_1;
            if _e77 {
                break;
            }
            let toCentre = (_e46.xz - effect.centerRadius.xz);
            let proximity = (1f - smoothstep((effect.centerRadius.w * 0.4f), (effect.centerRadius.w * 2.8f), length(toCentre)));
            let kick = ((sin((effect.clock.x * 96f)) * effect.clock.z) * proximity);
            let _e103 = uv;
            uv = clamp((_e103 + (vec2<f32>((kick * 0.25f), (-(kick) * 0.65f)) / vec2<f32>(dimensions))), vec2(0.001f), vec2(0.999f));
            let offset = (effect.eyeStrength.xyz - effect.centerRadius.xyz);
            let b = dot(offset, ray);
            let d = (((b * b) - dot(offset, offset)) + (effect.centerRadius.w * effect.centerRadius.w));
            if (d <= 0f) {
                continue;
            }
            let distance_ = (-(b) - sqrt(d));
            if !((distance_ <= 0f)) {
                local_2 = (length((_e46 - effect.eyeStrength.xyz)) < distance_);
            } else {
                local_2 = true;
            }
            let _e149 = local_2;
            if _e149 {
                continue;
            }
            let hit = (effect.eyeStrength.xyz + (ray * distance_));
            if (hit.y < effect.clock.y) {
                continue;
            }
            let normal = normalize((hit - effect.centerRadius.xyz));
            let facing = abs(dot(normal, -(ray)));
            let rim = pow((1f - facing), 2f);
            let ripple = sin(((((hit.y * 21f) + (hit.x * 13f)) - (hit.z * 17f)) - (effect.clock.x * 38f)));
            let azimuth = atan2(normal.z, normal.x);
            let tearPattern = clamp((((0.1f + (0.58f * (1f - normal.y))) + (0.13f * sin(((azimuth * 3f) + (normal.y * 4f))))) + (0.07f * sin(((azimuth * 7f) - (normal.y * 3f))))), 0.075f, 0.94f);
            let shell = (1f - smoothstep((tearPattern - 0.055f), (tearPattern + 0.085f), effect.clock.w));
            let shift = (((((vec2<f32>((normal.x + (normal.z * 0.35f)), -(normal.y)) * effect.eyeStrength.w) * (0.25f + (rim * 0.75f))) * (1f + (ripple * 0.35f))) * shell) / vec2<f32>(dimensions));
            let _e252 = uv;
            uv = clamp((_e252 + shift), vec2(0.001f), vec2(0.999f));
            let stroke = smoothstep(0.18f, 0.85f, (0.5f + (0.5f * sin((((normal.x * 8f) + (normal.z * 6f)) - (effect.clock.x * 11f))))));
            let rimTint = mix(vec3<f32>(0.07f, 0.17f, 0.018f), vec3<f32>(0.24f, 0.34f, 0.035f), stroke);
            let tearEdge = ((1f - smoothstep(0.018f, 0.085f, abs((effect.clock.w - tearPattern)))) * smoothstep(0f, 0.12f, effect.clock.w));
            let _e304 = highlight;
            highlight = (_e304 + (((((((rimTint * rim) * (0.15f + (0.85f * stroke))) * effect.eyeStrength.w) / vec3(9f)) * shell) + ((((vec3<f32>(0.12f, 0.19f, 0.015f) * tearEdge) * shell) * effect.eyeStrength.w) / vec3(9f))) + (((vec3<f32>(0.035f, 0.045f, 0.012f) * proximity) * effect.clock.z) / vec3(9f))));
        }
        continuing {
            let _e345 = index_1;
            index_1 = (_e345 + 1u);
        }
    }
    let _e347 = uv;
    let _e351 = textureSampleLevel(sceneColor, sceneSampler, _e347, 0f);
    let _e353 = highlight;
    return vec4<f32>((_e351.xyz + _e353), original.w);
}
`},t=[{label:`@group(1)`,entries:[{binding:0,visibility:2,texture:{sampleType:`unfilterable-float`,viewDimension:`2d`,multisampled:!1}},{binding:1,visibility:2,sampler:{type:`non-filtering`}},{binding:2,visibility:2,buffer:{type:`uniform`,hasDynamicOffset:!1,minBindingSize:0}},{binding:3,visibility:2,texture:{sampleType:`depth`,viewDimension:`2d`,multisampled:!1}},{binding:4,visibility:0,sampler:{type:`non-filtering`}}]}],n=0;export{n,e as r,t};