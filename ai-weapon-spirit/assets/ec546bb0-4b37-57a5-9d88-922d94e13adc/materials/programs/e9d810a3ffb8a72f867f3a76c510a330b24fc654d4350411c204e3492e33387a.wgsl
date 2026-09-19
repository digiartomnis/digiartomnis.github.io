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
}

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) normal: vec3<f32>,
    @location(1) phase: vec4<f32>,
    @location(2) facet: f32,
}

@vertex 
fn vs_main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    let offset = (((input.right * input.geometry_position.x) + (input.up * input.geometry_position.y)) + (input.forward * input.geometry_position.z));
    output.position = vec4<f32>((input.center + offset), 1f);
    output.normal = normalize((((input.right * input.geometry_normal.x) + (input.up * input.geometry_normal.y)) + (input.forward * input.geometry_normal.z)));
    output.phase = input.particle_color;
    output.facet = step(0.5f, input.geometry_uv.y);
    let _e44 = output;
    return _e44;
}

@fragment 
fn fs_main(input_1: VertexOutput) -> @location(0) vec4<f32> {
    var local: bool;

    let normal = normalize(input_1.normal);
    let viewA = vec3<f32>(0.42056814f, 0.550744f, 0.72097397f);
    let viewB = vec3<f32>(-0.58023214f, 0.38015208f, 0.7202882f);
    let rim = max((1f - abs(dot(normal, viewA))), (1f - abs(dot(normal, viewB))));
    let violetRim = pow(clamp(rim, 0f, 1f), 5.2f);
    let cyanCusp = pow(clamp(rim, 0f, 1f), 13f);
    let facetShade = mix(0.54f, 0.82f, input_1.facet);
    let pulse = clamp(input_1.phase.x, 0f, 1f);
    let collapse = clamp(input_1.phase.y, 0f, 1f);
    let alpha = clamp(input_1.phase.w, 0f, 1f);
    if !((collapse >= 0.995f)) {
        local = (alpha <= 0.001f);
    } else {
        local = true;
    }
    let _e57 = local;
    if _e57 {
        discard;
    }
    let eventHorizon = (vec3<f32>(0.0015f, 0.002f, 0.008f) * facetShade);
    let violet = ((vec3<f32>(0.16f, 0.025f, 0.34f) * violetRim) * (0.72f + (pulse * 0.2f)));
    let cyan = ((vec3<f32>(0.018f, 0.3f, 0.43f) * cyanCusp) * (0.3f + (collapse * 0.42f)));
    let rgb = ((eventHorizon + violet) + cyan);
    return vec4<f32>((rgb * alpha), alpha);
}
