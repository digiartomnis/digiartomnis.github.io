#define_import_path ai_weapon_spirit_vfx::spirit_particle_mesh

struct VertexOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) color: vec4<f32>,
  @location(1) normal: vec3<f32>,
  @location(2) uv: vec2<f32>,
  @location(3) emissive_intensity: vec4<f32>,
  @location(4) surface: vec4<f32>,
  @location(5) center: vec3<f32>,
};

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
};

@vertex
fn vs_main(input: VertexInput) -> VertexOutput {
  let offset = input.right * input.geometry_position.x
    + input.up * input.geometry_position.y
    + input.forward * input.geometry_position.z;
  var output: VertexOutput;
  output.center = input.center;
  output.position = vec4<f32>(input.center + offset, 1.0);
  var particleColor = input.particle_color;
  // Fireball trail nodes encode tier*2 + axial age in blue so the same GPU
  // particle state can feed both its mesh head and analytic Ribbon. Decode
  // only the marked values; all ordinary particle colors remain untouched.
  if (particleColor.b >= 1.5) {
    let tier = u32(min(3.0, floor(particleColor.b / 2.0)));
    if (tier == 1u) {
      particleColor = vec4<f32>(0.80, 0.10, 1.0, particleColor.a);
    } else if (tier == 2u) {
      particleColor = vec4<f32>(0.06, 0.58, 1.0, particleColor.a);
    } else if (tier == 3u) {
      particleColor = vec4<f32>(0.055, 0.012, 0.12, particleColor.a);
    }
  }
  output.color = particleColor * input.base_color;
  output.normal = normalize(input.right * input.geometry_normal.x
    + input.up * input.geometry_normal.y
    + input.forward * input.geometry_normal.z);
  output.uv = input.geometry_uv;
  output.emissive_intensity = input.emissive_intensity;
  output.surface = input.surface;
  return output;
}

@fragment
fn fs_main(input: VertexOutput) -> @location(0) vec4<f32> {
  let normal = normalize(input.normal);
  let key = normalize(vec3<f32>(0.36, 0.82, 0.44));
  let side = 0.42 + 0.58 * abs(dot(normal, key));
  let facet = 0.72 + 0.28 * step(0.5, input.uv.y);
  let emissive = input.emissive_intensity.rgb * input.emissive_intensity.a;
  let alpha = clamp(input.color.a, 0.0, 1.0);
  let rgb = input.color.rgb * side * facet + emissive * (0.08 + side * 0.12);
  return vec4<f32>(rgb * alpha, alpha);
}
