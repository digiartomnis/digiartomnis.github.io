#define_import_path ai_weapon_spirit_vfx::wood_seed_stone

// Native particle-mesh ABI, with the same camera projection as the beam.
struct Input {
 @location(0) p:vec3<f32>, @location(1) normal:vec3<f32>, @location(2) uv:vec2<f32>, @location(3) tangent:vec4<f32>,
 @location(4) center:vec3<f32>, @location(5) right:vec3<f32>, @location(6) up:vec3<f32>, @location(7) forward:vec3<f32>,
 @location(8) color:vec4<f32>, @location(9) base:vec4<f32>, @location(10) light:vec4<f32>, @location(11) surface:vec4<f32>,
};
struct Out {
 @builtin(position) position:vec4<f32>, @location(0) local:vec3<f32>,
 @location(1) normal:vec3<f32>, @location(2) tint:vec4<f32>, @location(3) alpha:f32,
};
@vertex fn vs_main(i:Input)->Out {
 var o:Out;
 o.position=vec4<f32>(i.center+i.right*i.p.x+i.up*i.p.y+i.forward*i.p.z,1.0);
 o.local=i.p; o.normal=i.normal; o.tint=i.base; o.alpha=i.color.a;
 return o;
}
@fragment fn fs_main(i:Out)->@location(0) vec4<f32> {
 let n=normalize(i.normal);
 let light=max(0.0,dot(n,normalize(vec3<f32>(.35,.8,.45))));
 let stepped=.32+floor(light*3.0)/3.0*.68;
 let grain=.88+.12*sin(i.local.x*31.0+i.local.z*27.0)*sin(i.local.y*41.0);
 let moss=vec3<f32>(.015,.03,.003)*smoothstep(.35,.9,n.y);
 let alpha=i.alpha*i.tint.a;
 return vec4<f32>((i.tint.rgb*stepped*grain+moss)*alpha,alpha);
}
