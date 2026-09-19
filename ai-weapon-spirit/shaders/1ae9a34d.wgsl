#define_import_path ai_weapon_spirit_vfx::elemental_ground
// Native VFX mesh attributes are already projected by the engine pack stage.
struct Input {
 @location(0) p:vec3<f32>, @location(1) normal:vec3<f32>, @location(2) uv:vec2<f32>, @location(3) tangent:vec4<f32>,
 @location(4) center:vec3<f32>, @location(5) right:vec3<f32>, @location(6) up:vec3<f32>, @location(7) forward:vec3<f32>,
 @location(8) color:vec4<f32>, @location(9) base:vec4<f32>, @location(10) veins:vec4<f32>, @location(11) surface:vec4<f32>,
};
struct Out {
 @builtin(position) position:vec4<f32>, @location(0) local:vec2<f32>, @location(1) color:vec4<f32>,
 @location(2) base:vec4<f32>, @location(3) veins:vec4<f32>, @location(4) kind:f32,
};
@vertex fn vs_main(i:Input)->Out {
 var o:Out;o.position=vec4<f32>(i.center+i.right*i.p.x+i.up*i.p.y+i.forward*i.p.z,1.0);
 o.local=i.p.xz;o.color=i.color;o.base=i.base;o.veins=i.veins;o.kind=i.surface.x*8.0;return o;
}
fn hash(p:vec2<f32>)->f32{return fract(sin(dot(p,vec2<f32>(127.1,311.7)))*43758.5453);}
fn noise(p:vec2<f32>)->f32 {
 let i=floor(p);let f=fract(p);let u=f*f*(3.0-2.0*f);
 return mix(mix(hash(i),hash(i+vec2<f32>(1.0,0.0)),u.x),mix(hash(i+vec2<f32>(0.0,1.0)),hash(i+1.0),u.x),u.y);
}
@fragment fn fs_main(i:Out)->@location(0) vec4<f32> {
 let p=i.local;let age=i.color.r;let seed=i.color.g*31.0;
 let n=noise(p*6.0+seed);let fine=noise(p*22.0+seed);
 let radius=length(p);let angle=atan2(p.y,p.x);
 let edge=1.0-smoothstep(.56+n*.18,.87+n*.12,radius);
 let reveal=smoothstep(0.0,.15,age);
 let erosion=smoothstep(i.color.b*.62-.06,i.color.b*.62+.22,fine*.45+n*.55);
 var alpha=edge*reveal*erosion*i.color.a*i.base.a;
 var color=i.base.rgb*(.75+fine*.35);var veins=0.0;
 if(i.kind<.5){
   // Dark char, torn ash margin and narrow cooling fissures.
   let crack=abs(sin(angle*7.0+noise(p*4.0+seed)*2.0));
   veins=(1.0-smoothstep(.025,.085,crack))*smoothstep(.13,.32,radius)*(1.0-smoothstep(.55,.9,radius));
   color+=i.veins.rgb*veins*(1.0-smoothstep(.1,1.3,age));
 }else if(i.kind<1.5){
   // Branching hoarfrost grows outwards, leaving the stone visible between veins.
   let radial=abs(sin(angle*9.0+seed+radius*5.0));
   let branches=abs(sin(radius*48.0+angle*3.0+n*3.0));
   veins=max(1.0-smoothstep(.04,.13,radial),(1.0-smoothstep(.04,.14,branches))*(1.0-smoothstep(.15,.45,radial)));
   alpha*=.25+veins*.7; color=mix(color,i.veins.rgb,veins*.75);
 }else if(i.kind<2.5){
   let cracks=1.0-smoothstep(.04,.12,abs(sin(angle*6.0+seed+n*.7)));
   color=mix(color*.45,i.veins.rgb,fine*.7)*(1.0-cracks*.6);
   alpha*=.5+n*.5;
 }else if(i.kind<3.5){
   // A growing meadow with a lopsided, scalloped living edge. No circular seal.
   let perimeter=.78+.045*sin(angle*3.0+seed)+.04*cos(angle*5.0-seed)+n*.07;
   let growth=smoothstep(0.0,.14,age);
   let boundary=perimeter*growth;
   if(i.color.b>=0.0){
    let cover=1.0-smoothstep(boundary-.07,boundary+.025,radius);
    let rim=exp(-pow((radius-boundary)/.025,2.0));
    alpha=max(cover*i.base.a,rim*.8)*i.color.a;
    color=i.base.rgb*(.72+n*.4+fine*.25)+i.veins.rgb*rim*(.55+.25*sin(angle*4.0-age*6.0));
   }else{
   let cover=1.0-smoothstep(boundary-.13,boundary+.045,radius);
   let rim=exp(-pow((radius-boundary)/.072,2.0));
   let halo=exp(-pow((radius-boundary)/.15,2.0));
   let hue=.5+.5*sin(angle*2.0+n*3.0-age*5.5);
   let living=mix(vec3<f32>(.06,.3,.025),vec3<f32>(.36,.46,.055),hue);
   let edgeLight=mix(i.veins.rgb,vec3<f32>(1.35,1.05,.22),hue);
   let dissolve=1.0-smoothstep(.72,1.0,-i.color.b);
   alpha=(cover*.36+rim*.34+halo*.13)*i.color.a*growth;
   color=living*(.8+fine*.2)+edgeLight*(rim*.68+halo*.22)*dissolve;
   }
 }else if(i.kind<4.5){
   // Long cuts share projectile +Z. No circular magic seal for metal.
   let stripe=1.0-smoothstep(.018,.055,abs(p.x+sin(p.y*6.0+seed)*.025));
   let flank=1.0-smoothstep(.008,.025,abs(abs(p.x)-.19));
   alpha*=max(stripe,flank*.35);color=mix(color,i.veins.rgb,stripe*.3);
 }else{
   let branch=abs(sin(angle*5.0+seed+floor(radius*12.0)*.21));
   veins=(1.0-smoothstep(.025,.09,branch))*(1.0-smoothstep(.4,.88,radius));
   alpha*=.12+veins*.8;color+=i.veins.rgb*veins*exp(-age*8.0);
 }
 return vec4<f32>(color*alpha,alpha);
}
