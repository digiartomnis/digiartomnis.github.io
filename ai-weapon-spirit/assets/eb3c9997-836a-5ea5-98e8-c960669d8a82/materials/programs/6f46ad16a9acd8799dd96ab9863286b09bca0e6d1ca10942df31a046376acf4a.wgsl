struct ViewX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX {
    worldViewProj: mat4x4<f32>,
    lightDir: vec3<f32>,
    lightColor: vec3<f32>,
    cameraPos: vec3<f32>,
    lightViewProj_A: mat4x4<f32>,
    inverseViewProj: mat4x4<f32>,
    lightViewProj_B: mat4x4<f32>,
    lightViewProj_C: mat4x4<f32>,
    lightViewProj_D: mat4x4<f32>,
    splitPlanes: array<vec4<f32>, 4>,
    cascadeCount: f32,
    cascadeBlend: f32,
    depthBias: f32,
    normalBias: f32,
    directionalShadowFilter: vec4<f32>,
    spotLightViewProj: array<mat4x4<f32>, 4>,
    temporalCurrentViewProj: mat4x4<f32>,
    temporalPreviousViewProj: mat4x4<f32>,
    temporalProjection: vec4<f32>,
    temporalPreviousCameraPos: vec4<f32>,
}

struct MeshX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX {
    worldFromLocal: mat4x4<f32>,
    normalMatrix: mat3x3<f32>,
    previousWorldFromLocal: mat4x4<f32>,
    temporal: vec4<f32>,
}

struct InstanceDataX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX {
    localFromInstance: mat4x4<f32>,
    previousLocalFromInstance: mat4x4<f32>,
}

struct MaterialParametersX_naga_oil_mod_XMZXXEZ3FMF4F63LBORSXE2LBNQ5DU4DBOJQW2ZLUMVZHGX {
    eye: vec4<f32>,
    settings: vec4<f32>,
    rimColor: vec4<f32>,
    rimCore: vec4<f32>,
    rimMotion: vec4<f32>,
    rimLight: vec4<f32>,
    rimEnergy: vec4<f32>,
    rimCoverage: vec4<f32>,
    rimTexture: vec4<f32>,
}

struct VsIn {
    @location(0) pos: vec3<f32>,
    @location(1) normal: vec3<f32>,
}

struct Out {
    @builtin(position) clip: vec4<f32>,
    @location(0) world: vec3<f32>,
    @location(1) local: vec3<f32>,
    @location(2) normal: vec3<f32>,
}

struct Enchantment {
    color: vec4<f32>,
    core: vec4<f32>,
    motion: vec4<f32>,
    light: vec4<f32>,
    energy: vec4<f32>,
    coverage: vec4<f32>,
    texture: vec4<f32>,
}

@group(0) @binding(0) 
var<uniform> viewX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX: ViewX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX;
@group(2) @binding(0) 
var<storage> meshesX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX: array<MeshX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX>;
@group(3) @binding(0) 
var<storage> instancesX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX: array<InstanceDataX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX>;
@group(1) @binding(0) 
var<uniform> materialX_naga_oil_mod_XMZXXEZ3FMF4F63LBORSXE2LBNQ5DU4DBOJQW2ZLUMVZHGX: MaterialParametersX_naga_oil_mod_XMZXXEZ3FMF4F63LBORSXE2LBNQ5DU4DBOJQW2ZLUMVZHGX;
var<private> enchantment: Enchantment;

fn surfaceHash(p: vec3<f32>) -> f32 {
    return fract((sin(dot(p, vec3<f32>(127.1f, 311.7f, 74.7f))) * 43758.547f));
}

fn surfaceNoise(p_1: vec3<f32>) -> f32 {
    let i_1 = floor(p_1);
    let f = fract(p_1);
    let u = ((f * f) * (vec3(3f) - (2f * f)));
    let _e10 = surfaceHash(i_1);
    let _e16 = surfaceHash((i_1 + vec3<f32>(1f, 0f, 0f)));
    let _e24 = surfaceHash((i_1 + vec3<f32>(0f, 1f, 0f)));
    let _e30 = surfaceHash((i_1 + vec3<f32>(1f, 1f, 0f)));
    let _e40 = surfaceHash((i_1 + vec3<f32>(0f, 0f, 1f)));
    let _e46 = surfaceHash((i_1 + vec3<f32>(1f, 0f, 1f)));
    let _e54 = surfaceHash((i_1 + vec3<f32>(0f, 1f, 1f)));
    let _e60 = surfaceHash((i_1 + vec3<f32>(1f, 1f, 1f)));
    return mix(mix(mix(_e10, _e16, u.x), mix(_e24, _e30, u.x), u.y), mix(mix(_e40, _e46, u.x), mix(_e54, _e60, u.x), u.y), u.z);
}

fn surfaceField(p_2: vec3<f32>) -> f32 {
    let _e1 = surfaceNoise(p_2);
    let _e11 = surfaceNoise(((p_2 * 2.07f) + vec3<f32>(9.2f, 1.7f, 4.1f)));
    let _e22 = surfaceNoise(((p_2 * 4.13f) + vec3<f32>(2.3f, 7.1f, 3.4f)));
    return (((_e1 * 0.62f) + (_e11 * 0.28f)) + (_e22 * 0.1f));
}

fn surfaceDots(uv: vec2<f32>, cells: f32, coverage: f32, pixelSize: f32) -> f32 {
    let rotated = (vec2<f32>(((uv.x * 0.9063f) - (uv.y * 0.4226f)), ((uv.x * 0.4226f) + (uv.y * 0.9063f))) * cells);
    let radius = sqrt((clamp(coverage, 0.01f, 0.95f) / 3.141593f));
    let footprint = (pixelSize * cells);
    let aa = max((footprint * 0.65f), 0.035f);
    let dots = (1f - smoothstep((radius - aa), (radius + aa), length((fract(rotated) - vec2(0.5f)))));
    return mix(dots, coverage, smoothstep(0.38f, 0.85f, footprint));
}

fn enchantedSurface(base: vec3<f32>, world: vec3<f32>, normal: vec3<f32>, viewDirection: vec3<f32>, height01_: f32, time: f32, pixelSize_1: f32) -> vec3<f32> {
    var surface: vec3<f32>;
    var emission: vec3<f32> = vec3(0f);

    let n = normalize(normal);
    let viewX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX_1 = normalize(viewDirection);
    let grazing = (1f - clamp(dot(n, viewX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX_1), 0f, 1f));
    let _e14 = enchantment.light;
    let lit = smoothstep(-0.45f, 0.8f, dot(n, _e14.xyz));
    let bottom = (1f - smoothstep(0.08f, 0.85f, height01_));
    let _e29 = enchantment.core.w;
    let _e36 = enchantment.motion.y;
    let _e45 = enchantment.motion.z;
    let power = clamp((mix(11f, 1.8f, _e29) / ((1f + ((3.2f * _e36) * bottom)) + ((1.8f * _e45) * lit))), 1.1f, 14f);
    let silhouette = smoothstep(0.14f, 0.45f, grazing);
    let soft = (pow(grazing, power) * silhouette);
    let edge = (pow(grazing, (power * 2.2f)) * silhouette);
    let drift = (0.5f + (0.5f * sin((((world.y * 13f) - (time * 1.8f)) + (sin((((world.x * 9f) + (world.z * 7f)) + (time * 0.65f))) * 1.4f)))));
    let _e97 = enchantment.motion.x;
    let flow = mix(1f, (0.65f + (0.35f * drift)), _e97);
    let _e109 = enchantment.motion.y;
    let lower = mix(1f, mix(1f, 0.5f, smoothstep(0.05f, 0.95f, height01_)), _e109);
    let _e120 = enchantment.coverage.x;
    let topEnvelope = mix(1f, (1f - smoothstep(0.32f, 0.76f, height01_)), _e120);
    let _e131 = enchantment.energy.x;
    let _e144 = surfaceField((((world * vec3<f32>(5.2f, 3.1f, 5.2f)) - vec3<f32>(0f, ((time * _e131) * 0.48f), 0f)) + vec3<f32>(3.8f, 7.1f, 1.6f)));
    let sideZone = (smoothstep(0.18f, 0.5f, height01_) * (1f - smoothstep(0.64f, 0.8f, height01_)));
    let _e160 = enchantment.coverage.y;
    let fragments = mix(1f, smoothstep(0.34f, 0.64f, _e144), (_e160 * sideZone));
    let coverage_1 = (topEnvelope * fragments);
    let _e167 = enchantment.color;
    let _e174 = enchantment.core;
    let _e183 = enchantment.color.w;
    let glow = (((((((_e167.xyz * soft) * 0.85f) + ((_e174.xyz * edge) * 1.25f)) * _e183) * flow) * lower) * coverage_1);
    let speed = enchantment.energy.x;
    let t = (time * speed);
    let q = ((world * vec3<f32>(7.2f, 2.5f, 7.2f)) - vec3<f32>(0f, (t * 1.25f), 0f));
    let _e211 = surfaceField(((q * 0.65f) + vec3<f32>(1.7f, 5.3f, 2.1f)));
    let _e237 = enchantment.motion.x;
    let sway = ((vec3<f32>(sin((((world.y * 5f) - (t * 1.7f)) + (_e211 * 4f))), 0f, cos((((world.y * 4f) - (t * 1.3f)) + (_e211 * 3f)))) * _e237) * 0.8f);
    let _e249 = surfaceField(((q + sway) + vec3<f32>((_e211 * 1.25f), 0f, (_e211 * 0.6f))));
    let strength = enchantment.motion.w;
    let _e258 = enchantment.color;
    let substrateTint = mix(vec3(0.82f), _e258.xyz, 0.22f);
    let neutral = (dot(base, vec3<f32>(0.2126f, 0.7152f, 0.0722f)) * substrateTint);
    let _e272 = enchantment.light.w;
    let substrate = mix(base, neutral, _e272);
    surface = substrate;
    let _e278 = enchantment.energy.z;
    if (_e278 < 0.5f) {
        let veins = (1f - smoothstep(0.1f, 0.44f, abs(sin(((_e249 * 16f) + (_e211 * 2f))))));
        surface = (substrate * mix(1f, ((0.92f - (0.69f * veins)) - (0.18f * smoothstep(0.3f, 0.7f, _e249))), strength));
    } else {
        let _e309 = enchantment.energy.z;
        if (_e309 < 1.5f) {
            let flameField = ((_e249 - (height01_ * 0.22f)) + 0.1f);
            let tongue = smoothstep(0.3f, 0.59f, flameField);
            let heart = smoothstep(0.57f, 0.76f, flameField);
            let edgeFlame = (smoothstep(0.28f, 0.43f, flameField) * (1f - smoothstep(0.48f, 0.62f, flameField)));
            let pulse = (0.78f + (0.22f * sin((((t * 3.8f) - (world.y * 8f)) + (_e211 * 4f)))));
            surface = (substrate * mix(1f, (0.22f + (0.58f * tongue)), strength));
            let _e355 = enchantment.color;
            let _e365 = enchantment.core;
            let _e376 = enchantment.energy.y;
            emission = (((((_e355.xyz * ((tongue * 0.42f) + (edgeFlame * 0.14f))) + ((_e365.xyz * heart) * 0.85f)) * pulse) * strength) * _e376);
        } else {
            let phase = ((((world.y * 15f) - (t * 4.4f)) + (_e211 * 7f)) + (sin(((world.x * 8f) + (world.z * 5f))) * 1.2f));
            let ribbon = (1f - smoothstep(0.12f, 0.65f, abs(sin(phase))));
            let heart_1 = pow(ribbon, 4f);
            let pulse_1 = (0.72f + (0.28f * sin(((t * 3f) + (world.y * 4f)))));
            surface = (substrate * mix(1f, (0.3f + (0.36f * _e249)), strength));
            let _e428 = enchantment.color;
            let _e435 = enchantment.core;
            let _e445 = enchantment.energy.y;
            emission = ((((((_e428.xyz * ribbon) * 0.46f) + ((_e435.xyz * heart_1) * 0.55f)) * strength) * _e445) * pulse_1);
        }
    }
    let weights0_ = pow(abs(n), vec3(6f));
    let weights = (weights0_ / vec3(((weights0_.x + weights0_.y) + weights0_.z)));
    let dotCoverage = mix(0.18f, 0.64f, smoothstep(0.3f, 0.7f, _e249));
    let _e469 = enchantment.texture.y;
    let _e471 = surfaceDots(world.yz, _e469, dotCoverage, pixelSize_1);
    let _e476 = enchantment.texture.y;
    let _e477 = surfaceDots(world.xz, _e476, dotCoverage, pixelSize_1);
    let _e482 = enchantment.texture.y;
    let _e483 = surfaceDots(world.xy, _e482, dotCoverage, pixelSize_1);
    let dots_1 = dot(vec3<f32>(_e471, _e477, _e483), weights);
    let midtone = (smoothstep(0.22f, 0.4f, _e249) * (1f - smoothstep(0.63f, 0.8f, _e249)));
    let face = (1f - smoothstep(0.55f, 0.88f, grazing));
    let _e503 = enchantment.texture.x;
    let ink = (((_e503 * strength) * midtone) * face);
    let _e507 = surface;
    surface = (_e507 * (1f - ((ink * (1f - dots_1)) * 0.48f)));
    let _e516 = emission;
    emission = (_e516 * (1f - ((ink * (1f - dots_1)) * 0.72f)));
    let phase_1 = ((_e249 * 29f) + (_e211 * 3f));
    let width = mix(0.06f, 0.24f, smoothstep(0.25f, 0.72f, _e211));
    let aa_1 = clamp((pixelSize_1 * 36f), 0.025f, 0.6f);
    let stroke = (1f - smoothstep(width, (width + aa_1), abs(sin(phase_1))));
    let _e555 = surfaceNoise(((world * 9f) - vec3<f32>(0f, (t * 0.45f), 0f)));
    let broken = smoothstep(0.28f, 0.53f, _e555);
    let _e566 = enchantment.texture.z;
    let etch = (((((stroke * broken) * midtone) * face) * strength) * _e566);
    let _e568 = surface;
    surface = (_e568 * (1f - (etch * 0.35f)));
    let _e574 = emission;
    let _e577 = enchantment.color;
    let _e581 = enchantment.core;
    let _e591 = enchantment.energy.y;
    emission = (_e574 + (((mix(_e577.xyz, _e581.xyz, 0.2f) * etch) * 0.3f) * _e591));
    let surfaceEdgeEnvelope = mix(1f, topEnvelope, smoothstep(0.38f, 0.82f, grazing));
    let _e599 = surface;
    let _e600 = emission;
    return ((_e599 + (_e600 * surfaceEdgeEnvelope)) + glow);
}

@vertex 
fn vs_main(input: VsIn, @builtin(instance_index) idx: u32) -> Out {
    var o: Out;

    let _e3 = meshesX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX[0].worldFromLocal;
    let _e8 = instancesX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX[idx].localFromInstance;
    let model = (_e3 * _e8);
    let world_1 = (model * vec4<f32>(input.pos, 1f));
    let _e19 = viewX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX.worldViewProj;
    o.clip = (_e19 * world_1);
    o.world = world_1.xyz;
    o.local = input.pos;
    o.normal = normalize((model * vec4<f32>(input.normal, 0f)).xyz);
    let _e32 = o;
    return _e32;
}

@fragment 
fn fs_main(i: Out) -> @location(0) vec4<f32> {
    let _e2 = materialX_naga_oil_mod_XMZXXEZ3FMF4F63LBORSXE2LBNQ5DU4DBOJQW2ZLUMVZHGX.rimColor;
    let _e5 = materialX_naga_oil_mod_XMZXXEZ3FMF4F63LBORSXE2LBNQ5DU4DBOJQW2ZLUMVZHGX.rimCore;
    let _e8 = materialX_naga_oil_mod_XMZXXEZ3FMF4F63LBORSXE2LBNQ5DU4DBOJQW2ZLUMVZHGX.rimMotion;
    let _e11 = materialX_naga_oil_mod_XMZXXEZ3FMF4F63LBORSXE2LBNQ5DU4DBOJQW2ZLUMVZHGX.rimLight;
    let _e14 = materialX_naga_oil_mod_XMZXXEZ3FMF4F63LBORSXE2LBNQ5DU4DBOJQW2ZLUMVZHGX.rimEnergy;
    let _e17 = materialX_naga_oil_mod_XMZXXEZ3FMF4F63LBORSXE2LBNQ5DU4DBOJQW2ZLUMVZHGX.rimCoverage;
    let _e20 = materialX_naga_oil_mod_XMZXXEZ3FMF4F63LBORSXE2LBNQ5DU4DBOJQW2ZLUMVZHGX.rimTexture;
    enchantment = Enchantment(_e2, _e5, _e8, _e11, _e14, _e17, _e20);
    let n_1 = normalize(i.normal);
    let _e28 = enchantment.light;
    let light = (0.06f + (0.1f * max(0f, dot(n_1, _e28.xyz))));
    let _e38 = dpdx(i.local);
    let _e41 = dpdy(i.local);
    let pixelSize_2 = max(length(_e38), length(_e41));
    let _e52 = materialX_naga_oil_mod_XMZXXEZ3FMF4F63LBORSXE2LBNQ5DU4DBOJQW2ZLUMVZHGX.eye;
    let _e61 = materialX_naga_oil_mod_XMZXXEZ3FMF4F63LBORSXE2LBNQ5DU4DBOJQW2ZLUMVZHGX.settings.z;
    let _e73 = materialX_naga_oil_mod_XMZXXEZ3FMF4F63LBORSXE2LBNQ5DU4DBOJQW2ZLUMVZHGX.settings.x;
    let _e74 = enchantedSurface((vec3<f32>(0.7f, 0.58f, 0.82f) * light), i.local, n_1, (_e52.xyz - i.world), clamp(((i.local.y / (2f * _e61)) + 0.5f), 0f, 1f), _e73, pixelSize_2);
    return vec4<f32>(_e74, 1f);
}
