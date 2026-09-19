struct Input {
    @location(0) p: vec3<f32>,
    @location(1) normal: vec3<f32>,
    @location(2) uv: vec2<f32>,
    @location(3) tangent: vec4<f32>,
    @location(4) center: vec3<f32>,
    @location(5) right: vec3<f32>,
    @location(6) up: vec3<f32>,
    @location(7) forward: vec3<f32>,
    @location(8) color: vec4<f32>,
    @location(9) base: vec4<f32>,
    @location(10) light: vec4<f32>,
    @location(11) surface: vec4<f32>,
}

struct Out {
    @builtin(position) position: vec4<f32>,
    @location(0) local: vec3<f32>,
    @location(1) color: vec4<f32>,
}

@vertex 
fn vs_main(i: Input) -> Out {
    var o: Out;

    o.position = vec4<f32>((((i.center + (i.right * i.p.x)) + (i.up * i.p.y)) + (i.forward * i.p.z)), 1f);
    o.local = i.p;
    o.color = i.color;
    let _e25 = o;
    return _e25;
}

@fragment 
fn fs_main(i_1: Out) -> @location(0) vec4<f32> {
    let radius = length(i_1.local.xz);
    let core = exp(((-(radius) * radius) * 1600f));
    let edge = (exp(((-(radius) * radius) * 65f)) * (1f - smoothstep(0.19f, 0.28f, radius)));
    let alpha = (edge * i_1.color.w);
    let rgb = mix(vec3<f32>(0.25f, 1.25f, 0.16f), vec3<f32>(2.1f, 2.5f, 1f), core);
    return vec4<f32>((rgb * alpha), alpha);
}
