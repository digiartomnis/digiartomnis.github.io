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
    @location(1) normal: vec3<f32>,
    @location(2) tint: vec4<f32>,
    @location(3) alpha: f32,
}

@vertex 
fn vs_main(i: Input) -> Out {
    var o: Out;

    o.position = vec4<f32>((((i.center + (i.right * i.p.x)) + (i.up * i.p.y)) + (i.forward * i.p.z)), 1f);
    o.local = i.p;
    o.normal = i.normal;
    o.tint = i.base;
    o.alpha = i.color.w;
    let _e30 = o;
    return _e30;
}

@fragment 
fn fs_main(i_1: Out) -> @location(0) vec4<f32> {
    let n = normalize(i_1.normal);
    let light = max(0f, dot(n, vec3<f32>(0.3562906f, 0.81437856f, 0.45808792f)));
    let stepped = (0.32f + ((floor((light * 3f)) / 3f) * 0.68f));
    let grain = (0.88f + ((0.12f * sin(((i_1.local.x * 31f) + (i_1.local.z * 27f)))) * sin((i_1.local.y * 41f))));
    let moss = (vec3<f32>(0.015f, 0.03f, 0.003f) * smoothstep(0.35f, 0.9f, n.y));
    let alpha = (i_1.alpha * i_1.tint.w);
    return vec4<f32>(((((i_1.tint.xyz * stepped) * grain) + moss) * alpha), alpha);
}
