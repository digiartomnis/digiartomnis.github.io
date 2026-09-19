// Renderer-owned scene colour/depth. A short hemispherical pulse refracts only
// visible pixels behind its front surface; foreground objects remain intact.
struct Out { @builtin(position) position:vec4<f32>, @location(0) uv:vec2<f32> };
struct Params { inverseViewProjection:mat4x4<f32>, centerRadius:vec4<f32>, eyeStrength:vec4<f32>, clock:vec4<f32> };
@group(1) @binding(0) var sceneColor:texture_2d<f32>;
@group(1) @binding(1) var sceneSampler:sampler;
@group(1) @binding(2) var<uniform> p:Params;
@group(1) @binding(3) var sceneDepth:texture_depth_2d;
@group(1) @binding(4) var depthSampler:sampler;
@vertex fn vs_main(@builtin(vertex_index) index:u32)->Out {
 let x=select(-1.0,3.0,index==1u);let y=select(-1.0,3.0,index==2u);
 var o:Out;o.position=vec4<f32>(x,y,0.0,1.0);o.uv=vec2<f32>((x+1.0)*.5,1.0-(y+1.0)*.5);return o;
}
fn worldAt(uv:vec2<f32>,depth:f32)->vec3<f32>{
 let w=p.inverseViewProjection*vec4<f32>(uv.x*2.0-1.0,1.0-uv.y*2.0,depth,1.0);return w.xyz/w.w;
}
@fragment fn fs_main(i:Out)->@location(0) vec4<f32>{
 let original=textureSampleLevel(sceneColor,sceneSampler,i.uv,0.0);
 if(p.eyeStrength.w<=0.0&&p.clock.z<=0.0){return original;}
 let dimensions=textureDimensions(sceneDepth);
 let pixel=clamp(vec2<i32>(i.uv*vec2<f32>(dimensions)),vec2<i32>(0),vec2<i32>(dimensions)-1);
 let point=worldAt(i.uv,textureLoad(sceneDepth,pixel,0));
 // One pass also carries the two brief screen impulses. The hemisphere above
 // and this radial kick both sample real scene colour; HUD is rendered later.
 let toCentre=point.xz-p.centerRadius.xz;
 let proximity=1.0-smoothstep(p.centerRadius.w*.4,p.centerRadius.w*2.8,length(toCentre));
 let kick=sin(p.clock.x*96.0)*p.clock.z*proximity;
 let kickUv=clamp(i.uv+vec2<f32>(kick*.25,-kick*.65)/vec2<f32>(dimensions),vec2<f32>(.001),vec2<f32>(.999));
 let kicked=textureSampleLevel(sceneColor,sceneSampler,kickUv,0.0);
 let ray=normalize(point-p.eyeStrength.xyz);let offset=p.eyeStrength.xyz-p.centerRadius.xyz;
 let b=dot(offset,ray);let d=b*b-dot(offset,offset)+p.centerRadius.w*p.centerRadius.w;
 if(d<=0.0){return kicked;}
 let distance=-b-sqrt(d);
 if(distance<=0.0||length(point-p.eyeStrength.xyz)<distance){return kicked;}
 let hit=p.eyeStrength.xyz+ray*distance;
 if(hit.y<p.clock.y){return kicked;}
 let normal=normalize(hit-p.centerRadius.xyz);
 let facing=abs(dot(normal,-ray));
 let rim=pow(1.0-facing,2.0);
 let ripple=sin(hit.y*21.0+hit.x*13.0-hit.z*17.0-p.clock.x*38.0);
 let tearPattern=.5+.25*sin(normal.x*19.0+normal.z*13.0)+.25*sin(normal.y*23.0-normal.z*17.0);
 let shell=1.0-smoothstep(tearPattern-.13,tearPattern+.13,p.clock.w);
 let shift=vec2<f32>(normal.x+normal.z*.35,-normal.y)*p.eyeStrength.w*(.25+rim*.75)*(1.0+ripple*.35)*shell/vec2<f32>(dimensions);
 let uv=clamp(kickUv+shift,vec2<f32>(.001),vec2<f32>(.999));
 let refracted=textureSampleLevel(sceneColor,sceneSampler,uv,0.0).rgb;
 let highlight=vec3<f32>(.12,.32,.025)*rim*p.eyeStrength.w/9.0*shell
   +vec3<f32>(.035,.045,.012)*proximity*p.clock.z/9.0;
 return vec4<f32>(refracted+highlight,original.a);
}
