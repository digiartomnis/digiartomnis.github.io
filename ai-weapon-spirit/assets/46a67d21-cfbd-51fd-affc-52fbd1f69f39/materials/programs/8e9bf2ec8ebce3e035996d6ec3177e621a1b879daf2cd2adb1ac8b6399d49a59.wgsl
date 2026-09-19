struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) color: vec4<f32>,
    @location(1) normal: vec3<f32>,
    @location(2) uv: vec2<f32>,
    @location(3) emissive_intensity: vec4<f32>,
    @location(4) surface: vec4<f32>,
    @location(5) center: vec3<f32>,
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
}

@vertex 
fn vs_main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;
    var particleColor: vec4<f32>;

    let offset = (((input.right * input.geometry_position.x) + (input.up * input.geometry_position.y)) + (input.forward * input.geometry_position.z));
    output.center = input.center;
    output.position = vec4<f32>((input.center + offset), 1f);
    particleColor = input.particle_color;
    let _e26 = particleColor.z;
    if (_e26 >= 1.5f) {
        let _e30 = particleColor.z;
        let tier = u32(min(3f, floor((_e30 / 2f))));
        if (tier == 1u) {
            let _e40 = particleColor.w;
            particleColor = vec4<f32>(0.8f, 0.1f, 1f, _e40);
        } else {
            if (tier == 2u) {
                let _e48 = particleColor.w;
                particleColor = vec4<f32>(0.06f, 0.58f, 1f, _e48);
            } else {
                if (tier == 3u) {
                    let _e56 = particleColor.w;
                    particleColor = vec4<f32>(0.055f, 0.012f, 0.12f, _e56);
                }
            }
        }
    }
    let _e62 = particleColor;
    output.color = (_e62 * input.base_color);
    output.normal = normalize((((input.right * input.geometry_normal.x) + (input.up * input.geometry_normal.y)) + (input.forward * input.geometry_normal.z)));
    output.uv = input.geometry_uv;
    output.emissive_intensity = input.emissive_intensity;
    output.surface = input.surface;
    let _e87 = output;
    return _e87;
}

@fragment 
fn fs_main(input_1: VertexOutput) -> @location(0) vec4<f32> {
    let normal = normalize(input_1.normal);
    let key = vec3<f32>(0.36079463f, 0.82181f, 0.44097123f);
    let side = (0.42f + (0.58f * abs(dot(normal, key))));
    let facet = (0.72f + (0.28f * step(0.5f, input_1.uv.y)));
    let emissive = (input_1.emissive_intensity.xyz * input_1.emissive_intensity.w);
    let alpha = clamp(input_1.color.w, 0f, 1f);
    let rgb = (((input_1.color.xyz * side) * facet) + (emissive * (0.08f + (side * 0.12f))));
    return vec4<f32>((rgb * alpha), alpha);
}
