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

struct ShadowCasterCascadeX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX {
    index: u32,
    isSpot: u32,
    shadowCasterPadB: u32,
    shadowCasterPadC: u32,
    spotLightViewProj: mat4x4<f32>,
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

struct MaterialParameters {
    eye: vec4<f32>,
    settings: vec4<f32>,
    rimColor: vec4<f32>,
    rimCore: vec4<f32>,
    rimMotion: vec4<f32>,
    rimLight: vec4<f32>,
    rimEnergy: vec4<f32>,
    rimCoverage: vec4<f32>,
    rimTexture: vec4<f32>,
    surfaceRange: vec4<f32>,
    surfaceCenter: vec4<f32>,
    tint: vec4<f32>,
}

struct SurfaceInput {
    positionOS: vec3<f32>,
    positionWS: vec3<f32>,
    geometricNormalWS: vec3<f32>,
    tangentWS: vec4<f32>,
    viewDirectionWS: vec3<f32>,
    uv0_: vec2<f32>,
    uv1_: vec2<f32>,
    vertexColor: vec4<f32>,
    frontFacing: bool,
}

struct SurfaceData {
    baseColor: vec3<f32>,
    normalWS: vec3<f32>,
    metallic: f32,
    roughness: f32,
    emissive: vec3<f32>,
    occlusion: f32,
    opacity: f32,
    alphaClipThreshold: f32,
}

struct VsInput {
    @location(0) position: vec3<f32>,
    @location(1) normal: vec3<f32>,
    @location(2) uv: vec2<f32>,
    @location(3) tangent: vec4<f32>,
}

struct VsOut {
    @builtin(position) clip: vec4<f32>,
    @location(0) positionOS: vec3<f32>,
    @location(1) positionWS: vec3<f32>,
    @location(2) normalWS: vec3<f32>,
    @location(3) tangentWS: vec4<f32>,
    @location(4) surfaceUv: vec2<f32>,
    @location(5) vertexColor: vec4<f32>,
}

@group(0) @binding(0) 
var<uniform> viewX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX: ViewX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX;
@group(0) @binding(7) 
var<uniform> shadowCasterCascadeX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX: ShadowCasterCascadeX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX;
@group(2) @binding(0) 
var<storage> meshesX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX: array<MeshX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX>;
@group(3) @binding(0) 
var<storage> instancesX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX: array<InstanceDataX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX>;
@group(1) @binding(0) 
var<uniform> material: MaterialParameters;

fn _cascadeLightViewProj(layer: u32) -> mat4x4<f32> {
    switch layer {
        case 0u: {
            let _e3 = viewX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX.lightViewProj_A;
            return _e3;
        }
        case 1u: {
            let _e6 = viewX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX.lightViewProj_B;
            return _e6;
        }
        case 2u: {
            let _e9 = viewX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX.lightViewProj_C;
            return _e9;
        }
        default: {
            let _e12 = viewX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX.lightViewProj_D;
            return _e12;
        }
    }
}

fn evaluate_surface(input: SurfaceInput) -> SurfaceData {
    return SurfaceData(vec3(1f), input.geometricNormalWS, 0f, 1f, vec3(0f), 1f, 1f, 0f);
}

fn evaluateShadowSurface(in_3: VsOut, frontFacing_2: bool) -> SurfaceData {
    let _e3 = viewX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX.cameraPos;
    let viewDirectionWS = normalize((_e3 - in_3.positionWS));
    let _e16 = evaluate_surface(SurfaceInput(in_3.positionOS, in_3.positionWS, in_3.normalWS, in_3.tangentWS, viewDirectionWS, in_3.surfaceUv, in_3.surfaceUv, in_3.vertexColor, frontFacing_2));
    return _e16;
}

fn alphaTestShadowSurface(surface: SurfaceData) {
    var local: bool;

    if (surface.alphaClipThreshold > 0f) {
        local = (surface.opacity <= surface.alphaClipThreshold);
    } else {
        local = false;
    }
    let _e10 = local;
    if _e10 {
        discard;
    } else {
        return;
    }
}

@vertex 
fn vs_main(in: VsInput, @builtin(instance_index) idx: u32) -> VsOut {
    var out: VsOut;
    var out_1: VsOut;

    let instanceLocal = instancesX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX[idx].localFromInstance;
    let _e8 = meshesX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX[0].worldFromLocal;
    let worldMatrix = (_e8 * instanceLocal);
    let worldPos = (worldMatrix * vec4<f32>(in.position, 1f));
    let worldNormal = normalize((worldMatrix * vec4<f32>(in.normal, 0f)).xyz);
    let worldTangent = normalize((worldMatrix * vec4<f32>(in.tangent.xyz, 0f)).xyz);
    let _e30 = shadowCasterCascadeX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX.isSpot;
    if (_e30 == 1u) {
        let _e37 = shadowCasterCascadeX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX.spotLightViewProj;
        out.clip = (_e37 * worldPos);
        out.positionOS = in.position;
        out.positionWS = worldPos.xyz;
        out.normalWS = worldNormal;
        out.tangentWS = vec4<f32>(worldTangent, in.tangent.w);
        out.surfaceUv = in.uv;
        out.vertexColor = vec4(1f);
        let _e53 = out;
        return _e53;
    }
    let _e56 = shadowCasterCascadeX_naga_oil_mod_XMZXXEZ3FMF4F65TJMV3TUOTDN5WW233OX.index;
    let _e57 = _cascadeLightViewProj(_e56);
    out_1.clip = (_e57 * worldPos);
    out_1.positionOS = in.position;
    out_1.positionWS = worldPos.xyz;
    out_1.normalWS = worldNormal;
    out_1.tangentWS = vec4<f32>(worldTangent, in.tangent.w);
    out_1.surfaceUv = in.uv;
    out_1.vertexColor = vec4(1f);
    let _e75 = out_1;
    return _e75;
}

@fragment 
fn fs_shadow(in_1: VsOut, @builtin(front_facing) frontFacing: bool) {
    let _e2 = evaluateShadowSurface(in_1, frontFacing);
    alphaTestShadowSurface(_e2);
    return;
}

@fragment 
fn fs_main(in_2: VsOut, @builtin(front_facing) frontFacing_1: bool) {
    let _e2 = evaluateShadowSurface(in_2, frontFacing_1);
    alphaTestShadowSurface(_e2);
    return;
}
