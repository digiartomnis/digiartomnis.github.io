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
    @location(0) local: vec3<f32>,
    @location(1) normal: vec3<f32>,
    @location(2) view: vec3<f32>,
    @location(3) payload: vec4<f32>,
}

@vertex 
fn vs_main(input: VertexInput) -> VertexOutput {
    var output: VertexOutput;

    let offset = (((input.right * input.geometry_position.x) + (input.up * input.geometry_position.y)) + (input.forward * input.geometry_position.z));
    output.position = vec4<f32>((input.center + offset), 1f);
    output.local = input.geometry_position;
    output.normal = input.geometry_normal;
    output.view = normalize((cross(vec3<f32>(input.right.x, input.up.x, input.forward.x), vec3<f32>(input.right.y, input.up.y, input.forward.y)) + vec3<f32>(0f, 0f, 0.000001f)));
    output.payload = input.particle_color;
    let _e49 = output;
    return _e49;
}

@fragment 
fn fs_main(input_1: VertexOutput) -> @location(0) vec4<f32> {
    var body: vec3<f32>;

    let n = normalize(input_1.normal);
    let facing = abs(dot(n, normalize(input_1.view)));
    let rim = pow((1f - facing), 3.4f);
    let thickness = (facing * (0.6f + (0.4f * (1f - smoothstep(0.3f, 0.72f, input_1.local.y)))));
    let absorption = exp((vec3<f32>(-2.8f, -1.1f, -0.55f) * thickness));
    body = mix(vec3<f32>(0.024f, 0.12f, 0.2f), vec3<f32>(0.3f, 0.62f, 0.77f), absorption);
    let phase = (input_1.payload.y * 23f);
    let fracturePlane = abs((sin((dot(input_1.local, vec3<f32>(12f, 7.4f, -9f)) + phase)) + (sin((dot(input_1.local, vec3<f32>(-6f, 15f, 4f)) + (phase * 0.7f))) * 0.42f)));
    let crack = (1f - smoothstep(0.015f, 0.065f, fracturePlane));
    let frost = ((1f - smoothstep(-0.12f, 0.35f, input_1.local.y)) * (0.64f + (0.36f * sin((((input_1.local.x * 63f) + (input_1.local.z * 48f)) + phase)))));
    let _e93 = body;
    body = mix(_e93, vec3<f32>(0.65f, 0.82f, 0.85f), (frost * 0.55f));
    let facetLight = (0.4f + (0.6f * max(0f, dot(n, vec3<f32>(0.40561607f, 0.8619342f, -0.30421206f)))));
    let reflected = (rim * vec3<f32>(0.52f, 0.86f, 1.1f));
    let birth = input_1.payload.x;
    let glint = pow(max(0f, dot(reflect(vec3<f32>(0.30304578f, -0.80812204f, -0.5050762f), n), normalize(input_1.view))), 48f);
    let _e131 = body;
    let radiance = (((((_e131 * facetLight) + reflected) + (crack * vec3<f32>(0.13f, 0.3f, 0.38f))) + (vec3<f32>(0.42f, 0.66f, 0.72f) * glint)) + (birth * vec3<f32>(0.3f, 0.58f, 0.74f)));
    let alpha = (input_1.payload.w * clamp(((0.76f + (thickness * 0.16f)) + (frost * 0.1f)), 0f, 1f));
    return vec4<f32>((radiance * alpha), alpha);
}
