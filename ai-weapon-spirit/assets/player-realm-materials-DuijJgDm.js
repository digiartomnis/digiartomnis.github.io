import{s as e}from"./dist-BN-gwOjj.js";import{t}from"./authoring-DmTO2TQK.js";import{r as n}from"./dist-Bj-7PIqp.js";import{o as r}from"./dist-BRWkR9ZZ.js";import{p as i,r as a,y as o}from"./chunk-MIIQFV6J-Ckn50LnY.js";import{D as s,s as c}from"./preview-scenario-B9KssHMf.js";import{H as l,o as u,s as d}from"./object-definition-registry-YTQzdDsN.js";import{d as f,i as p,o as m}from"./player-visuals-DIS93wlH.js";import{n as h}from"./female-figure-CmgfoVXO.js";import{t as g}from"./runtime-world-scope-Cd9tooIf.js";import{S as _,b as v,x as y}from"./map-tile-renderer-CmPzwvPg.js";import{M as b,Q as x,V as S,at as ee,b as C,ct as te,nt as w,rt as T,st as E,x as ne}from"./attack-module-assets-BmVpgKyH.js";import{i as D,t as re}from"./shared-asset-lifecycle-CcF6yc0I.js";import{a as O,i as ie,t as k}from"./mobile-game-styles-C354vx0K.js";import{a as ae}from"./game-projection-value-CTs8Tpra.js";import{n as oe,r as se}from"./health-display-XspKdYgG.js";var ce=`weapon-spirit.title-state`,le=class{values=new Float32Array(52);bytes=new Uint8Array(this.values.buffer);view=r.create();projection=r.create();viewProjection=r.create();inverse=r.create();relativeWorld=r.create();setStyle(e){this.bytes.set(e)}update(e,t,n,i){let a=this.values;a[0]=e.near,a[1]=e.far,a[11]=_+y,a[48]=-l,a[49]=n&&e.projection===0?i===`performance`?.18:.3:0,a[50]=i===`performance`?6:12,a[51]=i===`performance`?12:i===`balanced`?20:28,a[49]!==0&&(this.relativeWorld.set(t),this.relativeWorld[12]=0,this.relativeWorld[14]=0,r.invert(this.view,this.relativeWorld),r.perspective(this.projection,e.fov,e.aspect,e.near,e.far),r.multiply(this.viewProjection,this.projection,this.view),r.invert(this.inverse,this.viewProjection),a.set(this.viewProjection,12),a.set(this.inverse,28),a[44]=0,a[45]=t[13],a[46]=0,a[47]=0)}},ue=`02642f73-b2b1-569f-9231-38bdf7a112cf`,A=`ai-weapon-spirit::shared-readability-depth-edge`,de=`forgeax::standard`;function j(e){if(e instanceof Error)return e.message;if(e&&typeof e==`object`){let t=e;if(typeof t.hint==`string`)return t.hint;if(typeof t.code==`string`)return t.code}return String(e)}function fe(e){if(!e||typeof e!=`object`)throw Error(`[presentation-pipeline] loaded asset is not an object`);let t=e;if(t.kind!==`render-pipeline`)throw Error(`[presentation-pipeline] expected render-pipeline, received ${String(t.kind)}`);if(t.pipelineId!==de)throw Error(`[presentation-pipeline] expected ${de}, received ${String(t.pipelineId)}`);let n=t.config?.postEffects;if(!Array.isArray(n)||n.length!==1||n[0]!==`ai-weapon-spirit::shared-readability-depth-edge`)throw Error(`[presentation-pipeline] authored postEffects contract drifted`)}async function pe(e){let t=[];if(e.resources.paramsEntity!==void 0){let n=e.world.despawn(e.resources.paramsEntity);n.ok?e.resources.paramsEntity=void 0:t.push(n.error)}if(e.resources.featureLease)try{let n=await e.resources.featureLease.release();n.ok?e.resources.featureLease=void 0:t.push(n.error)}catch(e){t.push(e)}if(t.length>0)throw AggregateError(t,`[presentation-pipeline] failed to dispose ${e.label}`)}async function me(e){let n=s.parse(ue);if(!n.ok)throw n.error;let r=await e.assets.loadByGuid(n.value);if(!r.ok)throw Error(`[presentation-pipeline] failed to load authored pipeline: ${j(r.error)}`);fe(r.value);let i={};try{let n=await e.renderFeatureHost.installFeature(t({identity:A,source:e.shaderSource,reads:[{key:`sceneColor`},{key:`depth`,sampleType:`depth`}],params:{byteSize:e.params.byteLength,defaultValue:e.params}}));if(!n.ok)throw Error(`[presentation-pipeline] feature install failed: ${j(n.error)}`);i.featureLease=n.value;let r=e.world.spawn({component:o,data:{shader:A,data:e.params}});if(!r.ok)throw Error(`[presentation-pipeline] params entity spawn failed: ${j(r.error)}`);i.paramsEntity=r.value}catch(t){try{await pe({world:e.world,resources:i,label:`failed acquisition`})}catch(e){throw AggregateError([t,e],`[presentation-pipeline] acquisition rollback failed`)}throw t}let a=i.paramsEntity,c=new Uint8Array(e.params),l=!1;return{paramsEntity:a,get disposed(){return l},setParams(t){if(l)throw Error(`[presentation-pipeline] cannot update a disposed lease`);if(t.byteLength!==c.byteLength)throw Error(`[presentation-pipeline] params byte size differs from the installed shader`);let n=!1;for(let e=0;e<t.byteLength;e++)if(t[e]!==c[e]){n=!0;break}if(!n)return;let r=e.world.set(a,o,{shader:A,data:t});if(!r.ok)throw Error(`[presentation-pipeline] params update failed: ${j(r.error)}`);c.set(t)},async dispose(){l||=(await pe({world:e.world,resources:i,label:`presentation pipeline lease`}),!0)}}}var he={hash:`18618c4d`,wgsl:`struct FullscreenOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) uv: vec2<f32>,
}

struct ReadabilityParams {
    depth: vec4<f32>,
    edge: vec4<f32>,
    caseStyle: vec4<f32>,
    viewProjection: mat4x4<f32>,
    inverseViewProjection: mat4x4<f32>,
    eye: vec4<f32>,
    water: vec4<f32>,
}

@group(1) @binding(0) 
var sceneTexture: texture_2d<f32>;
@group(1) @binding(1) 
var sceneSampler: sampler;
@group(1) @binding(2) 
var<uniform> p: ReadabilityParams;
@group(1) @binding(3) 
var depthTexture: texture_depth_2d;
@group(1) @binding(4) 
var depthSampler: sampler;

fn linearDepth(ndcDepth: f32) -> f32 {
    let nearPlane = p.depth.x;
    let farPlane = p.depth.y;
    return ((nearPlane * farPlane) / max(0.00001f, (farPlane - (ndcDepth * (farPlane - nearPlane)))));
}

fn sceneDepth(pixel: vec2<i32>) -> f32 {
    let _e3 = textureLoad(depthTexture, pixel, 0i);
    return _e3;
}

fn sampleLinearDepth(pixel_1: vec2<i32>, dimensions: vec2<i32>) -> f32 {
    let safePixel = clamp(pixel_1, vec2(0i), (dimensions - vec2(1i)));
    let _e8 = sceneDepth(safePixel);
    let _e9 = linearDepth(_e8);
    return _e9;
}

fn worldAt(uv: vec2<f32>, depth: f32) -> vec3<f32> {
    let _e3 = p.inverseViewProjection;
    let world = (_e3 * vec4<f32>(((uv.x * 2f) - 1f), (1f - (uv.y * 2f)), depth, 1f));
    return (world.xyz / vec3(world.w));
}

fn waterReflection(scene_1: vec3<f32>, uv_1: vec2<f32>, rawDepth: f32, dimensions_1: vec2<i32>, surfaceNormal: vec3<f32>) -> vec3<f32> {
    var local: bool;
    var previousDistance: f32 = 0.035f;
    var i: u32 = 0u;
    var local_1: bool;
    var local_2: bool;
    var local_3: bool;
    var low: f32;
    var high: f32;
    var hitUV: vec2<f32>;
    var hitDepth: f32;
    var hitDistance: f32;
    var refine: u32;
    var local_4: bool;
    var local_5: bool;

    let _e5 = p.water.y;
    if (_e5 <= 0f) {
        return scene_1;
    }
    let _e11 = worldAt(uv_1, rawDepth);
    let _e16 = p.water.x;
    let _e22 = p.caseStyle.w;
    if !((abs((_e11.y - _e16)) > _e22)) {
        let _e28 = p.eye.y;
        local = (_e28 <= _e11.y);
    } else {
        local = true;
    }
    let _e34 = local;
    if _e34 {
        return scene_1;
    }
    let _e37 = p.eye;
    let incident = normalize((_e11 - _e37.xyz));
    let normal = (surfaceNormal * select(-1f, 1f, (surfaceNormal.y >= 0f)));
    if (normal.y < 0.75f) {
        return scene_1;
    }
    let direction = reflect(incident, normal);
    let start = (_e11 + vec3<f32>(0f, 0.025f, 0f));
    let _e61 = p.water.w;
    let count = u32(_e61);
    loop {
        let _e64 = i;
        if (_e64 < 28u) {
        } else {
            break;
        }
        {
            let _e67 = i;
            if (_e67 >= count) {
                break;
            }
            let _e69 = i;
            let fraction = (f32((_e69 + 1u)) / f32(count));
            let _e78 = p.water.z;
            let distance_ = (0.035f + ((_e78 * fraction) * fraction));
            let point = (start + (direction * distance_));
            let _e87 = p.viewProjection;
            let clip = (_e87 * vec4<f32>(point, 1f));
            if (clip.w <= 0f) {
                break;
            }
            let projected = vec2<f32>((((clip.x / clip.w) * 0.5f) + 0.5f), (0.5f - ((clip.y / clip.w) * 0.5f)));
            if !(any((projected <= vec2(0.003f)))) {
                local_1 = any((projected >= vec2(0.997f)));
            } else {
                local_1 = true;
            }
            let _e121 = local_1;
            if _e121 {
                break;
            }
            let pixel_2 = clamp(vec2<i32>((projected * vec2<f32>(dimensions_1))), vec2(0i), (dimensions_1 - vec2(1i)));
            let _e132 = sceneDepth(pixel_2);
            let sampleUV = ((vec2<f32>(pixel_2) + vec2(0.5f)) / vec2<f32>(dimensions_1));
            let _e139 = worldAt(sampleUV, _e132);
            if (_e132 < 0.999999f) {
                let _e146 = p.water.x;
                let _e150 = p.caseStyle.w;
                local_2 = (_e139.y > (_e146 + _e150));
            } else {
                local_2 = false;
            }
            let _e156 = local_2;
            if _e156 {
                let _e158 = linearDepth(_e132);
                local_3 = (clip.w >= _e158);
            } else {
                local_3 = false;
            }
            let _e163 = local_3;
            if _e163 {
                let _e165 = previousDistance;
                low = _e165;
                high = distance_;
                hitUV = projected;
                hitDepth = _e132;
                hitDistance = clip.w;
                refine = 0u;
                loop {
                    let _e174 = refine;
                    if (_e174 < 5u) {
                    } else {
                        break;
                    }
                    {
                        let _e177 = low;
                        let _e178 = high;
                        let mid = ((_e177 + _e178) * 0.5f);
                        let _e184 = p.viewProjection;
                        let midClip = (_e184 * vec4<f32>((start + (direction * mid)), 1f));
                        let midUV = vec2<f32>((((midClip.x / midClip.w) * 0.5f) + 0.5f), (0.5f - ((midClip.y / midClip.w) * 0.5f)));
                        let midPixel = clamp(vec2<i32>((midUV * vec2<f32>(dimensions_1))), vec2(0i), (dimensions_1 - vec2(1i)));
                        let _e214 = sceneDepth(midPixel);
                        let _e216 = linearDepth(_e214);
                        if (midClip.w >= _e216) {
                            high = mid;
                            hitUV = midUV;
                            hitDepth = _e214;
                            hitDistance = midClip.w;
                        } else {
                            low = mid;
                        }
                    }
                    continuing {
                        let _e219 = refine;
                        refine = (_e219 + 1u);
                    }
                }
                let _e222 = hitDistance;
                let _e223 = hitDepth;
                let _e224 = linearDepth(_e223);
                let separation = (_e222 - _e224);
                let _e226 = hitUV;
                let _e227 = hitDepth;
                let _e228 = worldAt(_e226, _e227);
                if (separation >= 0f) {
                    local_4 = (separation < 0.35f);
                } else {
                    local_4 = false;
                }
                let _e236 = local_4;
                if _e236 {
                    let _e241 = p.water.x;
                    let _e245 = p.caseStyle.w;
                    local_5 = (_e228.y > (_e241 + _e245));
                } else {
                    local_5 = false;
                }
                let _e251 = local_5;
                if _e251 {
                    let _e253 = hitUV.x;
                    let _e255 = hitUV.x;
                    let _e260 = hitUV.y;
                    let _e262 = hitUV.y;
                    let edge = min(min(_e253, (1f - _e255)), min(_e260, (1f - _e262)));
                    let _e273 = p.water.z;
                    let _e279 = p.water.z;
                    let _e280 = high;
                    let confidence = (smoothstep(0.015f, 0.08f, edge) * (1f - smoothstep((_e273 * 0.7f), _e279, _e280)));
                    let fresnel = (0.55f + (0.45f * pow((1f - clamp(dot(-(incident), normal), 0f, 1f)), 5f)));
                    let _e298 = hitUV;
                    let _e302 = textureSampleLevel(sceneTexture, sceneSampler, _e298, 0f);
                    let reflected = _e302.xyz;
                    let _e312 = p.water.y;
                    return mix(scene_1, ((reflected * 0.88f) + (scene_1 * 0.12f)), ((_e312 * confidence) * fresnel));
                }
                return scene_1;
            }
            previousDistance = distance_;
        }
        continuing {
            let _e316 = i;
            i = (_e316 + 1u);
        }
    }
    return scene_1;
}

@vertex 
fn vs_main(@builtin(vertex_index) index: u32) -> FullscreenOutput {
    var x: f32 = -1f;
    var y: f32 = -1f;
    var out: FullscreenOutput;

    if (index == 1u) {
        x = 3f;
    }
    if (index == 2u) {
        y = 3f;
    }
    let _e12 = x;
    let _e13 = y;
    out.position = vec4<f32>(_e12, _e13, 0f, 1f);
    let _e18 = x;
    let _e23 = y;
    out.uv = vec2<f32>(((_e18 + 1f) * 0.5f), (1f - ((_e23 + 1f) * 0.5f)));
    let _e31 = out;
    return _e31;
}

@fragment 
fn fs_main(in: FullscreenOutput) -> @location(0) vec4<f32> {
    var scene: vec3<f32>;

    let _e4 = textureSample(sceneTexture, sceneSampler, in.uv);
    scene = _e4.xyz;
    let dimensionsU = textureDimensions(depthTexture);
    let dimensions_2 = vec2<i32>(dimensionsU);
    let centerPixel = clamp(vec2<i32>((in.uv * vec2<f32>(dimensionsU))), vec2(0i), (dimensions_2 - vec2(1i)));
    let _e20 = sceneDepth(centerPixel);
    let _e22 = worldAt(in.uv, _e20);
    let _e23 = dpdx(_e22);
    let _e24 = dpdy(_e22);
    let surfaceNormal_1 = normalize(cross(_e23, _e24));
    let _e32 = p.caseStyle.x;
    if (in.uv.x < _e32) {
        let _e34 = scene;
        return vec4<f32>(_e34, 1f);
    }
    if (_e20 >= 0.999999f) {
        let _e39 = scene;
        return vec4<f32>(_e39, 1f);
    }
    let _e42 = scene;
    let _e44 = waterReflection(_e42, in.uv, _e20, dimensions_2, surfaceNormal_1);
    scene = _e44;
    let _e48 = p.caseStyle.y;
    if (_e48 < 0.5f) {
        let _e51 = scene;
        return vec4<f32>(_e51, 1f);
    }
    let _e57 = p.caseStyle.y;
    let radius = max(1i, i32(round(_e57)));
    let _e62 = linearDepth(_e20);
    let _e66 = sampleLinearDepth((centerPixel - vec2<i32>(radius, 0i)), dimensions_2);
    let _e70 = sampleLinearDepth((centerPixel + vec2<i32>(radius, 0i)), dimensions_2);
    let _e74 = sampleLinearDepth((centerPixel - vec2<i32>(0i, radius)), dimensions_2);
    let _e78 = sampleLinearDepth((centerPixel + vec2<i32>(0i, radius)), dimensions_2);
    let fartherNeighbour = max(max(_e66, _e70), max(_e74, _e78));
    let gap = max(0f, (fartherNeighbour - _e62));
    let _e88 = p.depth.z;
    let _e92 = p.depth.w;
    let threshold = (_e88 + (_e62 * _e92));
    let _e98 = p.caseStyle.z;
    let responseEnd = (threshold * max(1.05f, _e98));
    let _e106 = p.edge.w;
    let coverage = (smoothstep(threshold, responseEnd, gap) * _e106);
    let _e108 = scene;
    let _e111 = p.edge;
    let outlined = mix(_e108, _e111.xyz, coverage);
    return vec4<f32>(outlined, 1f);
}
`},ge=`ai-weapon-spirit:presentation-settings:v1`,_e=`forgeax:presentation-settings-change`;function ve(e){let t=[e.removeKeydown,e.removeMessage,e.disposePanel,e.disposePipeline,e.restoreDataset],n=new Uint8Array(t.length),r=!1;return async()=>{if(r)return;let e=[];for(let r=0;r<t.length;r+=1)if(n[r]!==1)try{await t[r](),n[r]=1}catch(t){t instanceof AggregateError?e.push(...t.errors):e.push(t)}if(e.length>0)throw AggregateError(e,`[presentation-settings] failed to dispose presentation settings`);r=!0}}var M=Object.freeze({outlineEnabled:!0,outlineRadius:1,outlineColor:`#444768`,outlineStrength:.12,waterReflectionsEnabled:!0,qualityPreset:`quality`,pcgDetail:1,particleDensity:1}),ye=Object.freeze({performance:{pcgDetail:.55,particleDensity:.5},balanced:{pcgDetail:.8,particleDensity:.75},quality:{pcgDetail:1,particleDensity:1}});function be(e,t){return F(t===`custom`?{...e,qualityPreset:t}:{...e,qualityPreset:t,...ye[t]})}var xe=new Set,N;function P(e,t,n,r){let i=typeof e==`number`?e:Number(e);return Number.isFinite(i)?Math.max(n,Math.min(r,i)):t}function Se(e){return typeof e==`string`&&/^#[0-9a-f]{6}$/i.test(e)?e.toUpperCase():M.outlineColor}function F(e){let t=e&&typeof e==`object`?e:{},n=t.qualityPreset;return Object.freeze({outlineEnabled:typeof t.outlineEnabled==`boolean`?t.outlineEnabled:M.outlineEnabled,outlineRadius:Math.round(P(t.outlineRadius,M.outlineRadius,0,6)),outlineColor:Se(t.outlineColor),waterReflectionsEnabled:typeof t.waterReflectionsEnabled==`boolean`?t.waterReflectionsEnabled:M.waterReflectionsEnabled,outlineStrength:P(t.outlineStrength,M.outlineStrength,0,1),qualityPreset:n===`performance`||n===`balanced`||n===`quality`||n===`custom`?n:M.qualityPreset,pcgDetail:P(t.pcgDetail,M.pcgDetail,.25,2),particleDensity:P(t.particleDensity,M.particleDensity,0,2)})}function Ce(){if(N)return N;let e=typeof matchMedia==`function`&&matchMedia(`(pointer:coarse)`).matches,t=we(null,e);if(typeof localStorage>`u`)return N=t,N;try{N=we(JSON.parse(localStorage.getItem(`ai-weapon-spirit:presentation-settings:v1`)??`null`),e)}catch{N=t}return N}function we(e,t){let n=t?be(M,`performance`):M;return F(e&&typeof e==`object`?{...n,...e}:n)}function Te(e){N=F(e);try{localStorage.setItem(ge,JSON.stringify(N))}catch{}for(let e of xe)e(N);window.dispatchEvent(new CustomEvent(_e,{detail:N}))}function Ee(e){return[Number.parseInt(e.slice(1,3),16)/255,Number.parseInt(e.slice(3,5),16)/255,Number.parseInt(e.slice(5,7),16)/255]}function De(e){return e.hasResource(`ActiveCamera`)?e.getResource(`ActiveCamera`).entity:void 0}function Oe(e){let t=De(e),n;for(let r of e.query({read:[a]}).unwrap()){let e=r.get(a),i={near:Number(e.near),far:Number(e.far),depthMultisampled:Number(e.antialias)===2};if(n??=i,r.entity===t)return i}return n??{near:.1,far:180,depthMultisampled:!1}}function ke(e,t=he.wgsl){if(!e)return t;let n=t.replace(/\btexture_depth_2d\b/,`texture_depth_multisampled_2d`);if(n===t)throw Error(`[presentation-settings] depth texture declaration is missing`);let r=/fn sceneDepth\([^}]*\}/;if(!r.test(n))throw Error(`[presentation-settings] sceneDepth helper is missing`);return n=n.replace(r,`fn sceneDepth(pixel: vec2<i32>) -> f32 {
    let samples = textureNumSamples(depthTexture);
    var sum = 0.0;
    for (var i = 0u; i < samples; i += 1u) { sum += textureLoad(depthTexture, pixel, i32(i)); }
    return sum / f32(samples);
  }`),n}function Ae(e,t,n){let r=Ee(e.outlineColor),i=new Float32Array(52);return i.set([t,n,.035,.003],0),i.set([r[0],r[1],r[2],e.outlineStrength],4),i.set([0,e.outlineEnabled?e.outlineRadius:0,2,0],8),new Uint8Array(i.buffer)}function I(e,t){let n=document.documentElement;n.dataset.forgeaxPresentationSettings=`shared-v1`,n.dataset.forgeaxPresentationPanel=t?`open`:`closed`,n.dataset.forgeaxPresentationShortcut=`F8`,n.dataset.forgeaxPresentationOutlineRadius=String(e.outlineRadius),n.dataset.forgeaxPresentationOutlineColor=e.outlineColor.slice(1).toLowerCase(),n.dataset.forgeaxPresentationOutlineStrength=String(Math.round(e.outlineStrength*100)),n.dataset.forgeaxPresentationQuality=e.qualityPreset,n.dataset.forgeaxPresentationPcgDetail=String(Math.round(e.pcgDetail*100)),n.dataset.forgeaxPresentationParticleDensity=String(Math.round(e.particleDensity*100)),n.dataset.forgeaxPresentationWaterReflections=e.waterReflectionsEnabled?`screen-space`:`off`}function je(e,t,n,r){let i=document.createElement(`aside`);i.className=`forgeax-presentation-settings`,i.hidden=!0,i.setAttribute(`aria-label`,`画面设置`),i.innerHTML=`
    <style>
      .forgeax-presentation-settings{position:absolute;inset:0;z-index:80;pointer-events:none;color:#edf5ef;font:12px/1.45 Inter,"PingFang SC","Microsoft YaHei",sans-serif}
      .forgeax-presentation-settings[hidden]{display:none}.forgeax-presentation-settings *{box-sizing:border-box}
      .forgeax-presentation-settings__panel{pointer-events:auto;position:absolute;right:16px;top:calc(16px + var(--forgeax-viewport-metrics-inset,0px));width:min(350px,calc(100% - 32px));max-height:calc(100% - 32px - var(--forgeax-viewport-metrics-inset,0px));overflow:auto;padding:14px;border:1px solid rgba(190,225,205,.3);border-radius:10px;background:rgba(8,18,16,.96);box-shadow:0 18px 48px rgba(0,0,0,.42)}
      .forgeax-presentation-settings header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px}.forgeax-presentation-settings h2{margin:0;font-size:15px}.forgeax-presentation-settings header p{margin:3px 0 0;color:#98aaa3;font-size:10px}
      .forgeax-presentation-settings button,.forgeax-presentation-settings select,.forgeax-presentation-settings input{font:inherit}.forgeax-presentation-settings button{border:1px solid rgba(190,225,205,.25);border-radius:5px;background:#1b2925;color:#edf5ef;cursor:pointer}.forgeax-presentation-settings__close{width:30px;height:30px}
      .forgeax-presentation-settings fieldset{display:grid;grid-template-columns:106px minmax(0,1fr) 48px;align-items:center;gap:8px 9px;margin:12px 0 0;padding:11px;border:1px solid rgba(190,225,205,.16);border-radius:8px}.forgeax-presentation-settings legend{padding:0 5px;color:#bde1cd;font-weight:700}.forgeax-presentation-settings output{text-align:right;color:#a9bbb4;font-variant-numeric:tabular-nums}.forgeax-presentation-settings input[type=range]{width:100%;accent-color:#bfe5c8}.forgeax-presentation-settings input[type=color]{width:100%;height:25px;padding:0;border:1px solid #8aa99b;border-radius:4px;background:transparent}.forgeax-presentation-settings select{min-width:0;height:28px;border:1px solid rgba(190,225,205,.25);border-radius:5px;background:#17231f;color:#edf5ef}.forgeax-presentation-settings__check{justify-self:start;width:16px;height:16px;accent-color:#8cd7ad}.forgeax-presentation-settings__foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:11px;color:#81958d;font-size:10px}.forgeax-presentation-settings__reset{padding:6px 9px}
    </style>
    <section class="forgeax-presentation-settings__panel">
      <header><div><h2>画面 <small>F8</small></h2><p>调整场景细节与轮廓，让攻势更清楚。</p></div><button class="forgeax-presentation-settings__close" type="button" aria-label="关闭">×</button></header>
      <fieldset>
        <legend>轮廓可读性</legend>
        <label for="shared-outline-enabled">启用轮廓</label><input class="forgeax-presentation-settings__check" id="shared-outline-enabled" data-setting="outlineEnabled" type="checkbox"><output></output>
        <label for="shared-outline-radius">轮廓粗细</label><input id="shared-outline-radius" data-setting="outlineRadius" type="range" min="0" max="6" step="1"><output data-output="outlineRadius"></output>
        <label for="shared-outline-color">轮廓颜色</label><input id="shared-outline-color" data-setting="outlineColor" type="color"><output data-output="outlineColor"></output>
        <label for="shared-outline-strength">边缘强度</label><input id="shared-outline-strength" data-setting="outlineStrength" type="range" min="0" max="100" step="1"><output data-output="outlineStrength"></output>
      </fieldset>
      <fieldset>
        <legend>场景与特效</legend>
        <label for="shared-quality-preset">质量预设</label><select id="shared-quality-preset" data-setting="qualityPreset"><option value="performance">性能</option><option value="balanced">平衡</option><option value="quality">高质量</option><option value="custom">自定义</option></select><output></output>
        <label for="shared-water-reflections">水面倒影</label><input class="forgeax-presentation-settings__check" id="shared-water-reflections" data-setting="waterReflectionsEnabled" type="checkbox"><output></output>
        <label for="shared-pcg-detail">场景细节</label><input id="shared-pcg-detail" data-setting="pcgDetail" type="range" min="25" max="200" step="5"><output data-output="pcgDetail"></output>
        <label for="shared-particle-density">粒子密度</label><input id="shared-particle-density" data-setting="particleDensity" type="range" min="0" max="200" step="5"><output data-output="particleDensity"></output>
      </fieldset>
      <div class="forgeax-presentation-settings__foot"><span>设置即时生效，自动保存。</span><button class="forgeax-presentation-settings__reset" type="button" style="flex:none;white-space:nowrap">恢复默认</button></div>
    </section>
  `;let a=e=>i.querySelector(`[data-setting="${e}"]`),o=e=>i.querySelector(`[data-output="${e}"]`),s=t,c=()=>{a(`outlineEnabled`).checked=s.outlineEnabled,a(`waterReflectionsEnabled`).checked=s.waterReflectionsEnabled,a(`outlineRadius`).value=String(s.outlineRadius),a(`outlineColor`).value=s.outlineColor.toLowerCase(),a(`outlineStrength`).value=String(Math.round(s.outlineStrength*100)),a(`qualityPreset`).value=s.qualityPreset,a(`pcgDetail`).value=String(Math.round(s.pcgDetail*100)),a(`particleDensity`).value=String(Math.round(s.particleDensity*100)),o(`outlineRadius`).value=`${s.outlineRadius}px`,o(`outlineColor`).value=s.outlineColor,o(`outlineStrength`).value=`${Math.round(s.outlineStrength*100)}%`,o(`pcgDetail`).value=`${Math.round(s.pcgDetail*100)}%`,o(`particleDensity`).value=`${Math.round(s.particleDensity*100)}%`},l=e=>{s=F({...s,...e}),c(),n(s)},u=e=>{let t=e.target,r=t.dataset.setting;if(r)if(r===`outlineEnabled`)l({outlineEnabled:t.checked});else if(r===`waterReflectionsEnabled`)l({waterReflectionsEnabled:t.checked});else if(r===`outlineRadius`)l({outlineRadius:Number(t.value)});else if(r===`outlineColor`)l({outlineColor:t.value});else if(r===`outlineStrength`)l({outlineStrength:Number(t.value)/100});else if(r===`qualityPreset`){let e=t.value;s=be(s,e),c(),n(s)}else r===`pcgDetail`?l({pcgDetail:Number(t.value)/100,qualityPreset:`custom`}):r===`particleDensity`&&l({particleDensity:Number(t.value)/100,qualityPreset:`custom`})},d=e=>{i.hidden=!e,I(s,e)},f=()=>{r?r.toggle(`presentation`):d(i.hidden===!0)},p=i.querySelector(`.forgeax-presentation-settings__close`),m=i.querySelector(`.forgeax-presentation-settings__reset`);i.addEventListener(`input`,u),i.addEventListener(`change`,u);let h=()=>{r?r.close():d(!1)},g=()=>l(M);p.addEventListener(`click`,h),m.addEventListener(`click`,g),c(),I(s,!1),e.appendChild(i);let _=r?e.querySelector(`:scope > [data-forgeax-viewport-metrics]`):null;if(_){let e=document.createElement(`section`);e.className=`spirit-menu__diagnostics`;let t=document.createElement(`h3`);t.textContent=`运行诊断`,e.append(t,_),i.querySelector(`.forgeax-presentation-settings__panel`).append(e)}let v=r?.register(`presentation`,{element:i,onVisibility:e=>I(s,e)}),y=!1;return{root:i,toggle:f,dispose:()=>{y||=(_?.isConnected&&e.append(_),v?.(),i.removeEventListener(`input`,u),i.removeEventListener(`change`,u),p.removeEventListener(`click`,h),m.removeEventListener(`click`,g),i.remove(),!0)}}}async function Me(t,r,i){if(!r)return;if(!(r.renderer??r.app?.renderer))throw Error(`[presentation-settings] ForgeAX Renderer is required`);if(!r.renderFeatureHost)throw Error(`[presentation-settings] ForgeAX RenderFeatureHost is required`);let o=r.assets??r.assetRegistry;if(!o)throw Error(`[presentation-settings] ForgeAX AssetRegistry is required`);if(!r.uiRoot)throw Error(`[presentation-settings] ctx.uiRoot is required`);if(!r.registerCleanup)throw Error(`[presentation-settings] ctx.registerCleanup is required`);let s=Ce(),c=Oe(t),l=Ae(s,c.near,c.far),u=await me({assets:o,renderFeatureHost:r.renderFeatureHost,world:t,shaderSource:ke(c.depthMultisampled),params:l}),d=new le;d.setStyle(l);let f=new g(t),p=s,m,h,_,y=document.documentElement.dataset,b=[`forgeaxPresentationSettings`,`forgeaxPresentationPanel`,`forgeaxPresentationShortcut`,`forgeaxPresentationOutlineRadius`,`forgeaxPresentationOutlineColor`,`forgeaxPresentationOutlineStrength`,`forgeaxPresentationQuality`,`forgeaxPresentationPcgDetail`,`forgeaxPresentationParticleDensity`,`forgeaxPresentationDepthSampling`,`forgeaxPresentationWaterReflections`],x=new Map(b.map(e=>[e,y[e]])),S=ve({removeKeydown:()=>{h&&window.removeEventListener(`keydown`,h)},removeMessage:()=>{_&&window.removeEventListener(`message`,_)},disposePanel:()=>m?.dispose(),disposePipeline:async()=>{f.dispose(),await u.dispose()},restoreDataset:()=>{for(let e of b){let t=x.get(e);t===void 0?delete y[e]:y[e]=t}}});try{f.addSystem(e,{name:`ai-weapon-spirit-water-reflection-camera`,after:[`propagateTransforms`],queries:[{read:[a,n]}],fn:(e,[r])=>{let i=De(t),o;for(let e of r)if(o===void 0&&(o=e.entity),e.entity===i){o=e.entity;break}o!==void 0&&(d.update(t.get(o,a).unwrap(),t.get(o,n).unwrap().world,p.waterReflectionsEnabled&&!(t.hasResource(`weapon-spirit.title-state`)&&t.getResource(`weapon-spirit.title-state`).active)&&v(t),p.qualityPreset),u.setParams(d.bytes))}}),m=je(r.uiRoot,s,e=>{let n=Oe(t);p=e,d.setStyle(Ae(e,n.near,n.far)),u.setParams(d.bytes),Te(e),I(e,m?.root.hidden===!1)},i),document.documentElement.dataset.forgeaxPresentationDepthSampling=c.depthMultisampled?`multisampled`:`single-sample`,h=e=>{if(!(i||e.repeat)){if(e.code!==`F8`){e.code===`Escape`&&m?.root.hidden===!1&&m.toggle();return}e.preventDefault(),m?.toggle()}},_=e=>{let t=new URLSearchParams(window.location.search).get(`parentOrigin`)||window.location.origin;e.origin!==t||e.data?.source!==`forgeax-presentation-settings`||e.data.type===`toggle`&&m?.toggle()},window.addEventListener(`keydown`,h),window.addEventListener(`message`,_),Te(s),I(s,!1),r.registerCleanup(S)}catch(e){try{await S()}catch(t){throw AggregateError([e,t],`[presentation-settings] installation rollback failed`)}throw e}}var Ne={schemaVersion:1,generatorVersion:`campaign-ascii-map-scriptable-pack-v4`,id:`map.campaign.red-canyon`,name:`赤砂回风峡`,theme:`red-sand-battlefield`,ascii:`!forgeax-map 3
seed 240911
[terrain]
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%......................................%
%........%%%%%%%.......................%
%.....%%%%%%%%%%%......................%
%...%%%%%%%%%%%%%%...........%%%%%.....%
%..%%%%%%%%%%%%%%%%..........%%%%%.....%
%..%%%%%%%%%%%%%%%%.........%%%%%%.....%
%...%%%%%%%%%%%%%%%........%%%%%%%%....%
%......%%%%%...............%%%%%%......%
%...........................%%.%.......%
%.............../......................%
%.....%%......................%........%
%...%%%%%....................%%%%%%....%
%..%%%%%%%%................%%%%%%%%%...%
%..%%%%%%%%%..............%%%%%%%%%%%..%
%.%%%%%%%%%%%.............%%%%%%%%%%%..%
%.%%%%%%%%%%%.............%%%%%%%%%%%%.%
%..%%%%%%%...............%%%%%%%%%%%%..%
%...%%%%%%...............%%%%%%%%%%%%..%
%........................%%%%%%%%%%%%..%
%.......................%%%%%%%%%%%%%..%
%.......................%%%%%%%%%%%....%
%.....%%%%%%%%..............%%%%%%.....%
%....%%%%%%%%%%...............%%%......%
%....%%%%%%%%%%.%%...../......%%%......%
%....%%%%%%%%%%%%%...........%%%%......%
%....%%%%%%%%%%%%.........%%%%%%%%.....%
%......%%%%%%%%%%%.......%%%%%%%%%.....%
%........%%%%%%..........%%%%%%%%......%
%..........%...............%%..........%
%......................................%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
[elevation]
0000000000000000000000000000000000000000
0000000000000000000000000000000000000000
0000000001111111000000000000000000000000
0000001111111111100000000000000000000000
0000113333333311110000000000022222000000
0001133333333311110000000000022222000000
0001113333331111100000000000222222000000
0000111111111111000000000000222222200000
0000000111110000000000000000002220000000
0000000000000111000000000000000200000000
0000000000000111000000000000000000000000
0000000000000000000000000000000000000000
0000001000000000000000000000000000000000
0000111100000000000000000000001111100000
0000111110000000000000000000111333110000
0000111100000000000000000000113333310000
0000111100000000000000000000113333311000
0000011000000000000000000001113333310000
0000000000000000000000000001113333110000
0000000000000000000000000000111111110000
0000000000000000000000000000011111100000
0000000000000000000000000000000010000000
0000000000000000000000000000000000000000
0000000330000000000000000000000000000000
0000003333330000000000001110000000000000
0000003333330000000000000000000000000000
0000000333333000000000000000000000000000
0000000003333000000000000000000000000000
0000000000000000000000000000000000000000
0000000000000000000000000000000000000000
0000000000000000000000000000000000000000
0000000000000000000000000000000000000000
[surface]
........................................
........................................
.........rrrrrrr........................
......rrrrrrrrrrr.......................
....rrrrrrrrrrrrrr...........rrrrr......
...rrrrrrrrrrrrrrrr..........rrrrr......
...rrrrrrrrrrrrrrrr.........rrrrrr......
....rrrrrrrrrrrrrrr........rrrrrrrr.....
.......rrrrr...............rrrrrr.......
.............rrr............rr.r........
.............rrrr.......................
......rr......................r.........
....rrrrr....................rrrrrr.....
...rrrrrrrr................rrrrrrrrr....
...rrrrrrrrr..............rrrrrrrrrrr...
..rrrrrrrrrrr.............rrrrrrrrrrr...
..rrrrrrrrrrr.............rrrrrrrrrrrr..
...rrrrrrr...............rrrrrrrrrrrr...
....rrrrrr...............rrrrrrrrrrrr...
.........................rrrrrrrrrrrr...
........................rrrrrrrrrrrrr...
........................rrrrrrrrrrr.....
......rrrrrrrr..............rrrrrr......
.....rrrrrrrrrr...............rrr.......
.....rrrrrrrrrr.rr.....rrrr...rrr.......
.....rrrrrrrrrrrrr...........rrrr.......
.....rrrrrrrrrrrr.........rrrrrrrr......
.......rrrrrrrrrrr.......rrrrrrrrr......
.........rrrrrr..........rrrrrrrr.......
...........r...............rr...........
........................................
........................................
[objects]
........................................
........................................
........................................
........................................
........................................
....................&...................
........................................
.....................................$..
........................................
..............I.........................
........................................
....................T...................
........................................
.................$......................
....................*...................
........................................
.......................$................
........................................
........................................
........................................
.....................T..................
........................................
....................$...................
........................................
.........................I..............
........................................
........................................
....................@...................
........................................
........................................
........................................
........................................`,designNotes:[`岩脊、低肩、扶壁、孤峰、大台地和石舌分别控制形状与偏心退台，中央砂路连通`,`中央南侧安全区出生，可向两翼或盐沟自由展开`,`西北与东南岩脚遗迹通过坡道进入，干燥砂地承托蓝紫阴面的岩体`],sourcePrompt:`确定性战役地图：错层风蚀岩体、岩脚遗迹与开阔砂道`,outerApron:18,previewFocus:[0,0]};function Pe(e,t,n){return n>0&&t>0&&n<e.length-1&&t<(e[n]?.length??0)-1}function L(e,t,n,r){Pe(e,t,n)&&(e[n][t]=r)}function R(e,t,n,r,i,a,o={}){let s=o.rotation??0,c=o.phase??0,l=Math.max(2,Math.round(o.lobes??5)),u=Math.max(0,Math.min(.28,o.amplitude??.12)),d=Math.max(-.22,Math.min(.22,o.skewCol??0)),f=Math.max(-.22,Math.min(.22,o.skewRow??0)),p=Math.cos(s),m=Math.sin(s),h=1+u+Math.abs(d)+Math.abs(f),g=Math.ceil(r*h+i*Math.abs(m)),_=Math.ceil(i*h+r*Math.abs(m));for(let o=Math.floor(n-_);o<=Math.ceil(n+_);o+=1)for(let s=Math.floor(t-g);s<=Math.ceil(t+g);s+=1){let h=s-t,g=o-n,_=h*p+g*m,v=-h*m+g*p,y=_/Math.max(.5,r),b=v/Math.max(.5,i),x=Math.atan2(b,y),S=1+u*(Math.sin(x*l+c)*.68+Math.cos(x*(l+2)-c*.73)*.32)+d*y+f*b;Math.hypot(y,b)<=S&&L(e,s,o,a)}}function Fe(e,t,n,r,i){let a=i*i,o=a*i;return[.5*(2*t[0]+(-e[0]+n[0])*i+(2*e[0]-5*t[0]+4*n[0]-r[0])*a+(-e[0]+3*t[0]-3*n[0]+r[0])*o),.5*(2*t[1]+(-e[1]+n[1])*i+(2*e[1]-5*t[1]+4*n[1]-r[1])*a+(-e[1]+3*t[1]-3*n[1]+r[1])*o)]}function Ie(e,t,n,r,i){let a=Math.max(.55,r)+.36,o=Math.ceil(a);for(let r=Math.floor(n)-o;r<=Math.ceil(n)+o;r+=1)for(let s=Math.floor(t)-o;s<=Math.ceil(t)+o;s+=1)Math.hypot(s-t,r-n)<=a&&L(e,s,r,i)}function z(e,t,n=.8){if(t.length===0)return;let r=typeof n==`number`?t.map(()=>n):t.map((e,t)=>n[t]??n.at(-1)??.8);if(t.length===1){Ie(e,t[0][0],t[0][1],r[0],`~`);return}for(let n=0;n<t.length-1;n+=1){let i=t[Math.max(0,n-1)],a=t[n],o=t[n+1],s=t[Math.min(t.length-1,n+2)],c=Math.max(8,Math.ceil(Math.hypot(o[0]-a[0],o[1]-a[1])*6));for(let t=0;t<=c;t+=1){let l=t/c,u=Fe(i,a,o,s,l),d=r[n]+(r[n+1]-r[n])*l;Ie(e,u[0],u[1],d,`~`)}}Le(e)}function Le(e){for(let t=0;t<32;t+=1){let t=!1;for(let n=1;n<e.length-2;n+=1){let r=e[n]?.length??0;for(let i=1;i<r-2;i+=1){let r=e[n][i],a=e[n][i+1],o=e[n+1][i],s=e[n+1][i+1],c=r===`~`&&s===`~`&&a!==`~`&&o!==`~`;if(!c&&!(a===`~`&&o===`~`&&r!==`~`&&s!==`~`))continue;let l=(n+i&1?[[i,n+1],[i+1,n]]:[[i+1,n],[i,n+1]]).find(([t,n])=>e[n][t]===`.`);if(l){e[l[1]][l[0]]=`~`,t=!0;continue}let u=c?[[i,n],[i+1,n+1]]:[[i+1,n],[i,n+1]],d=([t,n])=>[[1,0],[-1,0],[0,1],[0,-1]].reduce((r,[i,a])=>r+Number(e[n+a]?.[t+i]===`~`),0),f=[...u].sort((e,t)=>d(e)-d(t)||(e[0]+e[1]&1)-(t[0]+t[1]&1))[0];e[f[1]][f[0]]=`.`,t=!0}}if(!t)return}}function Re(e){let t=[0];for(let n=1;n<=e;n+=1)t.push(n,-n);return t}function B(e){return e===`1`||e===`2`||e===`3`?Number(e):e===`.`||e===`~`||e===`D`||e===`@`||e===`I`||e===`$`||e===`&`||e===`T`||e===`*`?0:null}function ze(e,t,n,r,i){if(!Pe(e,t,n)||B(e[n]?.[t])!==i-1)return!1;let a=B(e[n]?.[t-1]),o=B(e[n]?.[t+1]),s=B(e[n-1]?.[t]),c=B(e[n+1]?.[t]),l=r===`west`||r===`east`;if((r===`west`?o:r===`east`?a:r===`north`?c:s)!==i||(r===`west`?a:r===`east`?o:r===`north`?s:c)!==i-1)return!1;let u=l?s:a,d=l?c:o;return u===null||d===null||Math.abs(u-d)!==1}function V(e,t,n,r,i,a,o){let s=String(a);R(e,t,n,r,i,s,o);let c=Math.round(o.rampOffset??0),l=o.rampSide===`west`||o.rampSide===`east`;for(let u of Re(Math.ceil(l?i:r))){let r=n+(l?c+u:0),i=t+(l?0:c+u);if(!Pe(e,i,r))continue;if(l){let t=e[r].map((e,t)=>e===s?t:-1).filter(e=>e>0);if(t.length===0)continue;let n=(o.rampSide===`west`?Math.min(...t):Math.max(...t))+(o.rampSide===`west`?-1:1);if(!ze(e,n,r,o.rampSide,a))continue;L(e,n,r,`/`);return}let d=[];for(let t=1;t<e.length-1;t+=1)e[t]?.[i]===s&&d.push(t);if(d.length===0)continue;let f=(o.rampSide===`north`?Math.min(...d):Math.max(...d))+(o.rampSide===`north`?-1:1);if(ze(e,i,f,o.rampSide,a)){L(e,i,f,`/`);return}}throw Error(`contoured platform level ${a} could not place its ${o.rampSide} ramp`)}var H=40,U=32;function Be(){return Array.from({length:U},(e,t)=>Array.from({length:H},(e,n)=>t===0||n===0||t===U-1||n===H-1?`%`:`.`))}function W(e,t,n,r){t<=0||n<=0||t>=H-1||n>=U-1||(e[n][t]=r)}function G(e,t,n,r,i,a){for(let o=n;o<=i;o+=1)for(let n=t;n<=r;n+=1)W(e,n,o,a)}function K(e,t,n,r,i,a=0,o=[4,1,3,2,5,1]){let s=Math.max(Math.abs(r-t),Math.abs(i-n)),c=0,l=o[0],u=!0;for(let d=0;d<=s;d+=1){if(d>=a&&u){let a=s===0?0:d/s;W(e,Math.round(t+(r-t)*a),Math.round(n+(i-n)*a),`#`)}--l,!(l>0)&&(c=(c+1)%o.length,l=o[c],u=!u)}}function q(e,t,n,r,i,a){let o=Math.max(1,r-1.25),s=Math.max(1,i-1.25);for(let c=n-i;c<=n+i;c+=1)for(let l=t-r;l<=t+r;l+=1){let u=(l-t)/r,d=(c-n)/i,f=u*u+d*d,p=((l-t)/o)**2+((c-n)/s)**2;f<=1.08&&p>=.94&&!(Math.abs(u)<.34||Math.abs(d)<.34)&&W(e,l,c,a)}}function J(e,t,n,r,i,a,o){W(e,t[0],t[1],`@`);for(let[t,r]of n)W(e,t,r,`$`);W(e,r[0],r[1],`&`);for(let[t,n]of i)W(e,t,n,`I`);for(let[t,n]of a)W(e,t,n,`T`);W(e,o[0],o[1],`*`)}function Ve(e){return e.map(e=>e.join(``)).join(`
`)}function Y(e,t,n,r,i,a,o,s){let c=Be();return s(c),Le(c),Object.freeze({schemaVersion:1,chapter:e,assetId:t,id:n,name:r,width:H,height:U,theme:i,composition:a,designNotes:Object.freeze([...o]),sourcePrompt:`确定性战役地图：${a}`,ascii:Ve(c)})}var He=Object.freeze({...ae,assetId:`map-game-gym`,chapter:1,composition:`青竹演武场与双层梯田`}),Ue=Object.freeze({...Ne,chapter:2,assetId:`campaign-map-red-canyon`,width:40,height:32,composition:`错层风蚀岩体、岩脚遗迹与开阔砂道`}),We=Y(3,`campaign-map-forge-crucible`,`map.campaign.forge-crucible`,`沉炉环城`,`sunken-forge`,`环形熔炉、十字冷却渠与双层炉心`,[`四条冷却渠切分战场但保持可通行`,`炉心由一层检修台和二层核心台组成`,`可破坏炉墙提供中期拓扑变化`],e=>{G(e,18,2,21,29,`~`),G(e,2,14,37,17,`~`),K(e,10,7,29,7),K(e,10,24,29,24,1,[3,2,5,1,4,2]),K(e,12,8,17,8,0,[3,1]),K(e,23,23,28,23,0,[2,1,3,1]),W(e,19,7,`D`),W(e,20,24,`D`),V(e,20,16,7.4,6.2,1,{rampSide:`west`,rampOffset:-1,rotation:.08,phase:1.1,lobes:6,amplitude:.11,skewCol:.06,skewRow:-.04}),V(e,20,16,4.1,3.8,2,{rampSide:`north`,rampOffset:-1,rotation:-.12,phase:2.6,lobes:5,amplitude:.13,skewCol:-.05,skewRow:.07}),J(e,[22,28],[[34,5],[34,26],[5,26],[8,16]],[31,16],[[11,11],[28,20]],[[8,10],[31,21]],[20,10])}),Ge=Y(4,`campaign-map-jade-court`,`map.campaign.jade-court`,`玉阙镜庭`,`jade-court`,`对称宫苑、镜池与错层观景台`,[`两座镜池夹出中央仪式轴线`,`四角宫台用固定米制坡道连接`,`院墙以门洞维持环游路线`],e=>{K(e,8,6,31,6),K(e,8,25,31,25,1,[5,2,3,1]),K(e,8,7,8,24,0,[4,2,3,1]),K(e,31,7,31,24,2,[3,1,4,2]),W(e,19,6,`D`),W(e,20,25,`D`),W(e,8,16,`D`),W(e,31,15,`D`),R(e,14,16,4.2,6.1,`~`,{rotation:-.12,phase:.6,lobes:5,amplitude:.1,skewRow:.05}),R(e,25,16,4,5.7,`~`,{rotation:.16,phase:2.2,lobes:4,amplitude:.12,skewCol:-.05}),V(e,5,6,3.1,4.1,1,{rampSide:`south`,rampOffset:1,rotation:-.2,phase:1.4,amplitude:.13}),V(e,34,25,3,4,1,{rampSide:`north`,rampOffset:-1,rotation:.18,phase:2.7,amplitude:.14}),J(e,[19,28],[[5,5],[34,5],[5,27],[34,27]],[19,11],[[11,10],[28,21]],[[19,8],[20,23]],[20,16])}),Ke=Y(5,`campaign-map-bamboo-delta`,`map.campaign.bamboo-delta`,`青篁水脉洲`,`bamboo-trail`,`分汊水道、竹洲群落与北岸梯田`,[`三条弯曲水道形成开阔洲岛`,`对角竹簇以四向林隙组织群落，不形成环形树墙`,`北岸长台为远程与近战提供错层路线`],e=>{z(e,[[2,10],[9,12],[15,15],[22,13],[29,11],[37,14]],[.7,.9,1.15,.9,.75,.95]),z(e,[[2,21],[8,20],[14,17],[21,19],[28,22],[37,18]],[.85,1.05,.82,1.08,.9,.72]),q(e,10,17,3,3,`%`),W(e,10,20,`D`),q(e,30,16,3,4,`%`),W(e,27,16,`D`),V(e,20,6,6.4,3.6,1,{rampSide:`south`,rampOffset:-1,rotation:.08,phase:.9,lobes:6,amplitude:.14,skewCol:.07}),J(e,[20,27],[[34,5],[5,26],[34,26],[20,18]],[20,5],[[8,8],[31,23]],[[16,24],[24,10]],[18,16])}),qe=Y(6,`campaign-map-sand-fortress`,`map.campaign.sand-fortress`,`赤垒断旗城`,`red-sand-battlefield`,`破城双墙、斜向缺口与高位城台`,[`双层残墙形成攻城纵深`,`南北门与破口共同避免单一瓶颈`,`城台及外侧沙台提供不同高度的遭遇区`],e=>{K(e,7,5,32,5),K(e,7,26,32,26,1,[3,1,5,2]),K(e,7,6,7,25,2,[4,2,3,1]),K(e,32,6,32,25,0,[5,1,3,2]),K(e,12,10,27,10,0,[3,2,4,1]),K(e,12,21,27,21,1,[5,2,3,1]),W(e,19,5,`D`),W(e,20,26,`D`),W(e,7,15,`D`),W(e,32,17,`D`),W(e,16,10,`D`),W(e,24,21,`D`),V(e,20,16,6.2,3.6,1,{rampSide:`west`,rampOffset:0,rotation:.12,phase:1.8,lobes:5,amplitude:.15,skewCol:.08,skewRow:-.04}),V(e,4,25,3.2,4,1,{rampSide:`east`,rampOffset:1,rotation:-.16,phase:.4,lobes:4,amplitude:.17,skewRow:.08}),J(e,[20,29],[[35,4],[35,27],[4,27],[20,24]],[20,16],[[10,8],[29,23]],[[10,16],[29,16]],[22,12])}),Je=Y(7,`campaign-map-forge-spiral`,`map.campaign.forge-spiral`,`玄铁回廊`,`sunken-forge`,`开放螺旋炉廊、熔渣池与偏心高台`,[`折线炉廊导向中央但保留多处跨越口`,`熔渣池形成低洼视觉带而非硬阻挡`,`偏心双层锻台打破中心对称`],e=>{K(e,5,5,34,5),K(e,34,5,34,26,1,[5,2,3,1]),K(e,34,26,9,26,2,[4,1,3,2]),K(e,9,26,9,10,0,[3,1,5,2]),K(e,9,10,29,10,1,[4,2,5,1]),K(e,29,10,29,21,0,[3,2,4,1]),K(e,29,21,14,21,2,[5,1,3,2]);for(let[t,n]of[[18,5],[34,15],[22,26],[9,17],[20,10],[29,16],[21,21]])W(e,t,n,`D`);R(e,18,16,5.3,3.2,`~`,{rotation:.2,phase:1.1,lobes:5,amplitude:.15,skewCol:.08}),R(e,27,25,3.4,2.3,`~`,{rotation:-.25,phase:2.7,lobes:4,amplitude:.18,skewRow:-.08}),V(e,14,15,3.7,4.1,1,{rampSide:`east`,rampOffset:1,rotation:-.2,phase:.6,amplitude:.15}),V(e,14,15,2.2,2.4,2,{rampSide:`north`,rampOffset:0,rotation:.15,phase:2,amplitude:.13}),J(e,[22,29],[[35,4],[35,27],[5,27],[25,16]],[19,16],[[12,7],[31,24]],[[6,8],[32,13]],[24,20])}),Ye=Y(8,`campaign-map-jade-islands`,`map.campaign.jade-islands`,`碧落浮庭`,`jade-court`,`水庭群岛、石桥轴与三座观景台`,[`大面积浅水中保留连续可走庭岛`,`横纵石桥组织视线和追逐路线`,`三座单层台使用不同朝向坡道`],e=>{R(e,9,8,8.2,6.7,`~`,{rotation:-.12,phase:.5,lobes:6,amplitude:.13,skewCol:.08}),R(e,30,8,8.6,6.3,`~`,{rotation:.18,phase:2.1,lobes:5,amplitude:.15,skewRow:-.06}),R(e,9,24,8.8,6,`~`,{rotation:.14,phase:1.3,lobes:4,amplitude:.16,skewCol:-.07}),R(e,30,24,8.4,6.8,`~`,{rotation:-.18,phase:2.9,lobes:6,amplitude:.14,skewRow:.07}),z(e,[[19,2],[21,8],[19,14],[21,21],[19,29]],1.35),z(e,[[2,15],[10,17],[18,15],[27,17],[37,15]],[1.25,1,1.35,1.05,1.3]),R(e,8,7,5.3,4.2,`.`,{rotation:.15,phase:.9,lobes:5,amplitude:.16,skewCol:.08}),R(e,31,8,5.2,4.4,`.`,{rotation:-.2,phase:2.4,lobes:6,amplitude:.14,skewRow:-.07}),R(e,9,25,5.6,3.6,`.`,{rotation:-.12,phase:1.7,lobes:4,amplitude:.17,skewCol:-.05}),R(e,30,24,5.5,4.3,`.`,{rotation:.2,phase:.3,lobes:5,amplitude:.15,skewRow:.06}),z(e,[[20,2],[20,9],[20,16],[20,29]],.58),G(e,19,2,20,29,`.`),z(e,[[2,16],[11,16],[20,16],[29,16],[37,16]],.58),G(e,2,15,37,16,`.`),V(e,8,7,3.4,2.5,1,{rampSide:`east`,rampOffset:0,rotation:.16,phase:1.1,amplitude:.14}),V(e,31,23,3.5,2.9,1,{rampSide:`west`,rampOffset:1,rotation:-.18,phase:2.6,amplitude:.16}),V(e,20,12,3.4,2.1,1,{rampSide:`south`,rampOffset:-1,rotation:.08,phase:.4,amplitude:.12}),J(e,[19,27],[[7,7],[32,8],[9,25],[31,24]],[20,12],[[14,16],[25,15]],[[19,7],[20,23]],[20,18])}),Xe=Y(9,`campaign-map-ancient-grove`,`map.campaign.ancient-grove`,`万根古林`,`bamboo-trail`,`古木群岛、根系弧墙与林中祭台`,[`四组斜向古木簇塑造疏密林间空地，四向均保留自然林隙`,`路径保持宽阔并有多条绕行路线`,`祭台嵌在林心而非孤立方形地块`],e=>{q(e,10,9,6,5,`%`),q(e,29,9,6,5,`%`),q(e,10,24,6,4,`%`),q(e,29,23,6,5,`%`),G(e,9,12,11,15,`.`),W(e,10,14,`D`),G(e,28,12,30,15,`.`),W(e,29,14,`D`),G(e,14,23,17,25,`.`),W(e,16,24,`D`),G(e,22,22,25,24,`.`),W(e,23,23,`D`),R(e,20,16,5.4,3.2,`~`,{rotation:-.16,phase:1.8,lobes:5,amplitude:.16,skewCol:.07}),V(e,20,9,4.5,3.3,1,{rampSide:`south`,rampOffset:-1,rotation:.14,phase:.8,lobes:6,amplitude:.15,skewCol:-.06}),J(e,[20,28],[[35,5],[35,26],[5,26],[20,21]],[20,5],[[13,16],[27,16]],[[8,17],[31,17]],[14,13])}),Ze=Y(10,`campaign-map-dune-battlefield`,`map.campaign.dune-battlefield`,`鸣沙折戟原`,`red-sand-battlefield`,`斜向沙脊、残骸壕沟与中央旗阵`,[`三条错位沙脊形成斜向高度节奏`,`残墙与壕沟按战场群落分布`,`中心不设封闭竞技场，保持大尺度运动`],e=>{V(e,8,6,5,3,1,{rampSide:`east`,rampOffset:0,rotation:.2,phase:.5,lobes:5,amplitude:.17,skewCol:.08}),V(e,20,14,5.6,3.1,1,{rampSide:`west`,rampOffset:0,rotation:-.16,phase:1.9,lobes:6,amplitude:.15,skewRow:-.07}),V(e,31,24,5,3.5,1,{rampSide:`west`,rampOffset:1,rotation:.18,phase:2.8,lobes:4,amplitude:.18,skewCol:-.08}),K(e,3,22,14,18,0,[4,1,3,2]),K(e,25,9,36,5,1,[3,1,4,2]),W(e,9,20,`D`),W(e,31,7,`D`),z(e,[[4,29],[9,27],[13,26],[18,23]],[.65,.82,.95,.7]),z(e,[[22,8],[27,6],[31,5],[36,2]],[.7,.92,.82,.65]),J(e,[20,28],[[34,4],[35,15],[5,27],[31,27]],[20,14],[[11,10],[29,19]],[[17,7],[23,23]],[20,18])}),Qe=Y(11,`campaign-map-drowned-foundry`,`map.campaign.drowned-foundry`,`沉水器冢`,`sunken-forge`,`淹没厂房、平行机槽与断裂装配台`,[`平行水槽构成厂房节拍`,`断墙和门洞模拟失效生产线`,`两座装配台分别承担单层与双层战斗`],e=>{z(e,[[7,3],[8,10],[7,18],[9,28]],[1,1.15,.95,1.05]),z(e,[[15,3],[16,9],[15,17],[16,28]],[.9,1.05,.85,1]),z(e,[[24,3],[25,11],[24,19],[26,28]],[1.1,.9,1.15,.92]),z(e,[[32,3],[33,10],[32,18],[34,28]],[.92,1.1,.9,1.05]);for(let t of[7,16,24])K(e,3,t,36,t,t%3,t===16?[3,2,5,1]:[5,1,3,2]),W(e,11,t,`D`),W(e,20,t,`D`),W(e,29,t,`D`);V(e,5,12,2.8,3.5,1,{rampSide:`east`,rampOffset:0,rotation:-.15,phase:.8,amplitude:.14}),V(e,29,20,3.8,2.8,1,{rampSide:`west`,rampOffset:0,rotation:.14,phase:2.1,amplitude:.15}),V(e,29,20,2,1.8,2,{rampSide:`west`,rampOffset:0,rotation:-.12,phase:.5,amplitude:.12}),J(e,[20,29],[[35,4],[35,27],[4,27],[20,20]],[20,12],[[12,11],[28,26]],[[12,21],[28,11]],[20,18])}),$e=Y(12,`campaign-map-celestial-terraces`,`map.campaign.celestial-terraces`,`九霄玉阶`,`jade-court`,`三级玉台、环形云池与终局轴线`,[`三级平台均通过明确坡道双向连通`,`云池环绕高台但不形成导航孤岛`,`终局地图使用纵深轴线和侧翼回路而非方形擂台`],e=>{R(e,20,16,14.8,11.6,`~`,{rotation:.06,phase:1.5,lobes:7,amplitude:.1,skewCol:.04,skewRow:-.03}),z(e,[[4,16],[11,15],[18,17],[26,15],[35,16]],1.15),G(e,4,15,35,16,`.`),z(e,[[20,3],[19,10],[21,17],[19,24],[20,28]],1.05),G(e,19,3,20,28,`.`),V(e,20,16,10.4,8.3,1,{rampSide:`west`,rampOffset:1,rotation:.08,phase:.6,lobes:7,amplitude:.11,skewCol:.05,skewRow:-.04}),V(e,20,16,6.5,5.2,2,{rampSide:`east`,rampOffset:3,rotation:-.1,phase:2.2,lobes:6,amplitude:.13,skewCol:-.05,skewRow:.06}),V(e,20,15,3.5,3,3,{rampSide:`north`,rampOffset:1,rotation:.16,phase:1,lobes:5,amplitude:.15,skewCol:.07}),K(e,5,5,14,8,0,[4,1,3,1]),K(e,26,23,35,27,1,[3,1,4,2]),W(e,10,7,`D`),W(e,29,24,`D`),J(e,[19,27],[[5,15],[34,16],[20,5],[20,26]],[20,15],[[12,16],[27,16]],[[20,9],[20,22]],[20,19])}),X=Object.freeze([He,Ue,We,Ge,Ke,qe,Je,Ye,Xe,Ze,Qe,$e]);function et(e){return X[(Math.max(1,Math.floor(e))-1)%X.length]}function Z(e){let t=Math.max(1,Math.floor(e));return 6+t*t*4}function tt(e){let t=Math.max(0,Math.floor(e)-1);return 1+.06*t+.004*t*t}var nt=class{phaseValue=`combat`;waveValue=1;waveElapsedValue=0;loadoutValue=T([u]);mastery=new Map;constructor(){this.ensureMastery(u)}get phase(){return this.phaseValue}get wave(){return this.waveValue}get waveElapsed(){return this.waveElapsedValue}get loadout(){return this.loadoutValue}step(e){return this.phaseValue!==`combat`||(this.waveElapsedValue+=Math.max(0,Math.min(.1,e)),this.waveElapsedValue+2**-52<S(this.waveValue))?null:(this.waveElapsedValue=S(this.waveValue),this.phaseValue=`shop`,`entered-shop`)}beginNextWave(){return this.phaseValue===`shop`?(this.waveValue+=1,this.waveElapsedValue=0,this.phaseValue=`combat`,!0):!1}recordWeaponKill(e,t=1){if(!e||!this.loadoutValue.weaponDefinitionIds.includes(e))return;let n=this.ensureMastery(e);n.kills+=1,n.experience+=Math.max(1,Math.round(Math.max(.1,t)*2)),this.resolveMasteryLevels(n)}weaponPowerScale(e){return tt(this.ensureMastery(e).level)}setWeaponSpiritSlot(e,t){return!Number.isInteger(e)||e<0||e>=6||t!==null&&d[t]===void 0?!1:(this.loadoutValue=E(this.loadoutValue,e,t),t!==null&&this.ensureMastery(t),!0)}setArsenalGearSlot(e,t,n=1){if(!Number.isInteger(e)||e<0||e>=6)return!1;if(t!==null){let r=w[t];if(!r||te[e]!==r.slotId||!Number.isInteger(n)||n<1||n>r.maxLevel)return!1}let r=[...this.loadoutValue.gearIds],i=[...this.loadoutValue.gearLevels];return r[e]=t,i[e]=t===null?0:n,this.loadoutValue=Object.freeze({weaponDefinitionIds:this.loadoutValue.weaponDefinitionIds,gearIds:Object.freeze(r),gearLevels:Object.freeze(i)}),!0}reset(e=1){if(!Number.isInteger(e)||e<1||e>X.length)throw Error(`Starting chapter must be in [1, 12]`);this.phaseValue=`combat`,this.waveValue=e,this.waveElapsedValue=0,this.loadoutValue=T([u]),this.mastery.clear(),this.ensureMastery(u)}snapshot(){let e=S(this.waveValue);return{phase:this.phaseValue,wave:this.waveValue,waveElapsed:this.waveElapsedValue,waveDuration:e,waveRemaining:Math.max(0,e-this.waveElapsedValue),loadout:this.loadoutValue,weaponMastery:this.loadoutValue.weaponDefinitionIds.filter(e=>e!==null).map(e=>this.masterySnapshot(e))}}checkpoint(){return{...this.snapshot(),weaponMastery:[...this.mastery.keys()].map(e=>this.masterySnapshot(e))}}resume(e){if(!e||!Number.isInteger(e.wave)||e.wave<1||e.wave>X.length||![`combat`,`shop`].includes(e.phase)||!Number.isFinite(e.waveElapsed)||e.waveElapsed<0||e.waveElapsed>S(e.wave)||!Array.isArray(e.weaponMastery)||e.weaponMastery.some(e=>!d[e.equipmentId]||!Number.isInteger(e.level)||e.level<1||!Number.isInteger(e.kills)||e.kills<0||!Number.isFinite(e.experience)||e.experience<0||e.experience>=Z(e.level)))throw Error(`波次存档无效`);this.reset(e.wave),this.phaseValue=e.phase,this.waveElapsedValue=e.waveElapsed;for(let t of e.weaponMastery)this.mastery.set(t.equipmentId,{level:t.level,experience:t.experience,kills:t.kills})}ensureMastery(e){let t=this.mastery.get(e);return t||(t={level:1,experience:0,kills:0},this.mastery.set(e,t)),t}resolveMasteryLevels(e){for(;e.experience>=Z(e.level);)e.experience-=Z(e.level),e.level+=1}masterySnapshot(e){let t=this.ensureMastery(e);return{equipmentId:e,level:t.level,experience:t.experience,nextExperience:Z(t.level),kills:t.kills,powerScale:tt(t.level)}}},rt=new Set([`encounter`,`ability-observed`,`defeat`,`negotiation`,`capture`,`field-study`,`captive-study`,`source-verified`,`spirit-commentary`,`mutation-sighted`,`mutation-triggered`,`mutation-captive-study`,`mutation-resonance`,`mutation-archetype`]),it=new Set([`mutation-sighted`,`mutation-triggered`,`mutation-captive-study`,`mutation-resonance`,`mutation-archetype`]),at=24,ot=16,st=4096,ct=new Set([`combat-runtime`,`field-observation`,`capture-system`,`research-bench`,`spirit-dialogue`,`verified-source`]),lt=Object.freeze({encounter:[`field-observation`],"ability-observed":[`combat-runtime`,`field-observation`],defeat:[`combat-runtime`],negotiation:[`spirit-dialogue`],capture:[`capture-system`],"field-study":[`field-observation`,`research-bench`],"captive-study":[`research-bench`],"source-verified":[`verified-source`],"spirit-commentary":[`spirit-dialogue`],"mutation-sighted":[`field-observation`],"mutation-triggered":[`combat-runtime`],"mutation-captive-study":[`research-bench`],"mutation-resonance":[`spirit-dialogue`],"mutation-archetype":[`research-bench`,`verified-source`]}),ut=new Set(m),dt=new Set([`metal`,`wood`,`water`,`fire`,`earth`]);function ft(e){if(!e.id||!e.name||!Array.isArray(e.requiredEvidenceGroups)||!Array.isArray(e.unlockedFields))throw Error(`invalid codex knowledge tier`);for(let t of e.requiredEvidenceGroups)if(t.length===0||!t.every(e=>rt.has(e)))throw Error(`codex tier ${e.id} has invalid evidence group`);if(!e.unlockedFields.every(e=>typeof e==`string`&&e.length>0))throw Error(`codex tier ${e.id} has invalid unlocked field`);for(let t of e.requiredEvidenceGroups)Object.freeze(t);return Object.freeze(e.requiredEvidenceGroups),Object.freeze(e.unlockedFields),Object.freeze(e)}function pt(e){if(!e.id||!e.entryId||!e.name||!e.provisionalName||!e.taxonomy||!e.wikiDocumentId||!ut.has(e.enemyTemplateId)||!dt.has(e.primaryElement)||e.abilityIds.length===0||!e.abilityIds.every(e=>typeof e==`string`&&e.length>0)||!e.mutationIds.every(e=>Object.hasOwn(x,e)))throw Error(`invalid codex species ${String(e.id)}`);return Object.freeze(e.abilityIds),Object.freeze(e.mutationIds),Object.freeze(e)}var mt=Object.freeze(c.knowledgeTiers.map(e=>ft(e))),ht=Object.freeze(c.mutationStages.map(e=>ft(e))),Q=Object.freeze(c.species.map(e=>pt(e)));if(new Set(Q.map(e=>e.id)).size!==Q.length||new Set(Q.map(e=>e.enemyTemplateId)).size!==Q.length)throw Error(`codex species ids and enemyTemplateIds must be unique`);var gt=Object.freeze(Object.fromEntries(Q.map(e=>[e.id,e]))),_t=Object.freeze(Object.fromEntries(Q.map(e=>[e.enemyTemplateId,e])));function vt(e,t){e.push(t),e.length>at&&e.splice(0,e.length-at)}function yt(e,t,n){e.has(t)||(e.add(t),e.size>n&&e.delete(e.values().next().value))}function bt(e,t){let n=e[0];for(let r of e){if(!r.requiredEvidenceGroups.every(e=>e.some(e=>t.has(e))))break;n=r}return n}function xt(e){return JSON.stringify([e.kind,e.source,e.occurredAt,e.speciesId??null,e.mutationId??null,e.subjectInstanceId??null,e.abilityId??null,e.note??null])}function St(e){if(!e.eventId)throw Error(`codex evidence eventId must be non-empty`);if(!rt.has(e.kind))throw Error(`unknown codex evidence kind ${String(e.kind)}`);if(!ct.has(e.source))throw Error(`unknown codex evidence source ${String(e.source)}`);if(!lt[e.kind].includes(e.source))throw Error(`codex evidence source ${e.source} cannot produce ${e.kind}`);if(!Number.isFinite(e.occurredAt)||e.occurredAt<0)throw Error(`codex evidence occurredAt must be finite and non-negative`);if(e.subjectInstanceId!==void 0&&e.subjectInstanceId.length===0)throw Error(`codex evidence subjectInstanceId must be non-empty`);if(e.note!==void 0&&e.note.length===0)throw Error(`codex evidence note must be non-empty`);let t=e.speciesId?gt[e.speciesId]:void 0;if(e.speciesId&&!t)throw Error(`unknown codex species ${String(e.speciesId)}`);if(e.mutationId&&!x[e.mutationId])throw Error(`unknown codex mutation ${String(e.mutationId)}`);if(!t&&!e.mutationId)throw Error(`codex evidence requires a speciesId or mutationId`);if(it.has(e.kind)&&!e.mutationId)throw Error(`codex evidence ${e.kind} requires mutationId`);if(!it.has(e.kind)&&!t)throw Error(`codex evidence ${e.kind} requires speciesId`);if(e.kind===`ability-observed`){if(!e.abilityId||!t?.abilityIds.includes(e.abilityId))throw Error(`ability ${String(e.abilityId)} is not authored for ${String(e.speciesId)}`)}else if(e.abilityId!==void 0)throw Error(`codex evidence ${e.kind} cannot carry abilityId`);if(t&&e.mutationId&&!t.mutationIds.includes(e.mutationId))throw Error(`mutation ${e.mutationId} is not authored for ${t.id}`)}var Ct=class{speciesKnowledge=new Map;mutationKnowledge=new Map;eventFingerprints=new Map;eventOrder=[];revision=0;evidenceCount=0;constructor(){for(let e of Q)this.speciesKnowledge.set(e.id,{evidenceKinds:new Set,recentEvidenceIds:[],observedAbilityIds:new Set,knownMutationIds:new Set,defeatCount:0,negotiationCount:0,captureCount:0});for(let e of Object.keys(x))this.mutationKnowledge.set(e,{evidenceKinds:new Set,recentEvidenceIds:[],knownHostSpeciesIds:new Set,subjectInstanceIds:new Set})}record(e){St(e);let t=xt(e),n=this.eventFingerprints.get(e.eventId);if(n!==void 0){if(n!==t)throw Error(`codex evidence eventId ${e.eventId} has conflicting content`);return!1}if(this.eventFingerprints.set(e.eventId,t),this.eventOrder.push(e.eventId),this.eventOrder.length>st&&this.eventFingerprints.delete(this.eventOrder.shift()),e.speciesId){let t=this.speciesKnowledge.get(e.speciesId);t.evidenceKinds.add(e.kind),vt(t.recentEvidenceIds,e.eventId),e.abilityId&&t.observedAbilityIds.add(e.abilityId),e.mutationId&&t.knownMutationIds.add(e.mutationId),e.kind===`defeat`&&(t.defeatCount+=1),e.kind===`negotiation`&&(t.negotiationCount+=1),e.kind===`capture`&&(t.captureCount+=1)}if(e.mutationId){let t=this.mutationKnowledge.get(e.mutationId);t.evidenceKinds.add(e.kind),vt(t.recentEvidenceIds,e.eventId),e.speciesId&&t.knownHostSpeciesIds.add(e.speciesId),e.subjectInstanceId&&yt(t.subjectInstanceIds,e.subjectInstanceId,ot)}return this.evidenceCount+=1,this.revision+=1,!0}snapshot(){return{schemaVersion:`1.0.0`,revision:this.revision,evidenceCount:this.evidenceCount,species:Q.map(e=>{let t=this.speciesKnowledge.get(e.id),n=bt(mt,t.evidenceKinds),r=n.unlockedFields.includes(`formalName`);return{speciesId:e.id,displayName:n.id===`unknown`?`未识别物种`:r?e.name:e.provisionalName,...r?{formalName:e.name}:{},tier:n.id,tierName:n.name,evidenceKinds:[...t.evidenceKinds],recentEvidenceIds:[...t.recentEvidenceIds],unlockedFields:[...n.unlockedFields],observedAbilityIds:[...t.observedAbilityIds],knownMutationIds:[...t.knownMutationIds],defeatCount:t.defeatCount,negotiationCount:t.negotiationCount,captureCount:t.captureCount}}),mutations:Object.keys(x).map(e=>{let t=this.mutationKnowledge.get(e),n=bt(ht,t.evidenceKinds),r=n.unlockedFields.includes(`formalName`);return{mutationId:e,displayName:n.id===`unknown`?`未识别变异`:r?x[e].name:`异常构造`,...r?{formalName:x[e].name}:{},stage:n.id,stageName:n.name,evidenceKinds:[...t.evidenceKinds],recentEvidenceIds:[...t.recentEvidenceIds],unlockedFields:[...n.unlockedFields],knownHostSpeciesIds:[...t.knownHostSpeciesIds],subjectInstanceIds:[...t.subjectInstanceIds]}})}}},wt=String.raw`
.spirit-gym-hud__resource-orb{
  --orb-color:var(--ui-health);--orb-light:var(--ui-health-light);--orb-deep:var(--ui-health-deep);--orb-flow:var(--ui-blood-flow);
  position:absolute;bottom:var(--hud-tray-bottom);left:calc(50% - var(--hud-tray-width)/2 - var(--hud-orb-size) - 20px);
  width:var(--hud-orb-size);height:var(--hud-orb-size);padding:0;margin:0;border:3px solid var(--ui-recessed);border-radius:50%;
  background:var(--ui-recessed);box-shadow:0 5px 18px #0009,0 0 0 1px var(--ui-bronze);pointer-events:none
}
.spirit-gym-hud__resource-orb--qi{
  --orb-color:var(--ui-qi);--orb-light:var(--ui-qi-light);--orb-deep:var(--ui-qi-deep);--orb-flow:var(--ui-qi-flow);
  left:auto;right:calc(50% - var(--hud-tray-width)/2 - var(--hud-orb-size) - 20px)
}
.spirit-gym-hud__resource-orb::before{content:"";position:absolute;inset:-10px;background:var(--ui-motif-disc) center/contain no-repeat;pointer-events:none;opacity:.86}
/* The glass stays still: narrow Fresnel rim, curved softbox reflection and a
   smaller opposing glint. Dark edge absorption gives the shell visible thickness. */
.spirit-gym-hud__resource-orb::after{
  content:"";position:absolute;inset:0;z-index:3;border-radius:50%;pointer-events:none;
  background:
    radial-gradient(ellipse 20% 8% at 32% 15%,#fffdf0d9 5%,#fffdf070 38%,#fffdf000 76%),
    radial-gradient(ellipse 7% 19% at 13% 32%,#e8fff578,transparent 78%),
    radial-gradient(ellipse 3% 10% at 87% 67%,#c7f8f69c,transparent 82%),
    radial-gradient(ellipse 25% 8% at 63% 88%,#b7e5d961,transparent 80%),
    radial-gradient(circle at 50% 50%,transparent 59%,#04171c66 72%,#dbf6e95c 77%,#05222bdd 81%);
  box-shadow:inset 0 1px 1px #f0fff6b3,inset 2px 0 3px #d3fff338,inset -2px -3px 4px #010d14b3
}
.spirit-gym-hud__orb-well{
  position:absolute;inset:0;overflow:hidden;isolation:isolate;border-radius:50%;
  background:radial-gradient(ellipse at 38% 28%,#405753,#15292e 48%,#061319 82%)
}
.spirit-gym-hud__orb-well::before{
  content:"";position:absolute;inset:8% 17% 47% 10%;z-index:3;pointer-events:none;
  border-radius:50%;border-top:1px solid #effff1a6;transform:rotate(-27deg);
  background:linear-gradient(180deg,#e5ffed26,transparent 62%)
}
.spirit-gym-hud__orb-well::after{
  content:"";position:absolute;inset:0;z-index:2;border-radius:50%;pointer-events:none;
  background:radial-gradient(ellipse at 40% 35%,transparent 35%,#03101538 61%,#010c16b3 94%),
    linear-gradient(125deg,#e5f3d31a,transparent 38%,#03131a33 72%,transparent);
  box-shadow:inset 0 -5px 9px #03101699
}
.spirit-gym-hud__orb-liquid{
  position:absolute;inset:0;width:100%;height:100%;overflow:hidden;isolation:isolate;
  transform:translateY(calc((1 - var(--resource-ratio,1)) * 100%));transform-origin:bottom;
  transition:transform var(--ui-feedback) ease-out;
  background:radial-gradient(ellipse at 42% 28%,var(--orb-color) 16%,var(--orb-deep) 82%);
  box-shadow:inset 0 3px 6px color-mix(in srgb,var(--orb-light) 48%,transparent)
}
/* Meniscus stays on the resource plane. Movement cannot draw liquid above the
   authoritative clip, including at zero; the far edge is softer than the near lip. */
.spirit-gym-hud__orb-liquid::before{
  content:"";position:absolute;z-index:2;left:-20%;top:-3%;width:140%;height:10%;border-radius:50%;
  background:radial-gradient(ellipse at 50% 0%,var(--orb-deep),var(--orb-color) 55%,var(--orb-light) 74%,transparent 81%);
  box-shadow:0 1px 1px color-mix(in srgb,var(--orb-light) 55%,transparent);
  animation:spirit-orb-meniscus var(--ui-liquid-wave) ease-in-out infinite alternate
}
.spirit-gym-hud__orb-current{
  position:absolute;inset:-30%;border-radius:42%;pointer-events:none;
  background:
    radial-gradient(ellipse 33% 17% at 39% 43%,transparent 52%,color-mix(in srgb,var(--orb-light) 34%,transparent) 58%,transparent 65%),
    radial-gradient(ellipse 30% 13% at 36% 42%,transparent 37%,color-mix(in srgb,var(--orb-light) 70%,transparent) 58%,transparent 83%),
    radial-gradient(ellipse 23% 36% at 67% 60%,transparent 32%,color-mix(in srgb,var(--orb-color) 80%,transparent) 63%,transparent 82%),
    radial-gradient(ellipse 24% 18% at 38% 69%,color-mix(in srgb,var(--orb-light) 65%,transparent),transparent 76%);
  opacity:.74;animation:spirit-orb-current var(--orb-flow) linear infinite
}
.spirit-gym-hud__orb-current--rear{
  background:
    radial-gradient(ellipse 35% 20% at 62% 46%,transparent 30%,var(--orb-deep) 58%,transparent 83%),
    radial-gradient(ellipse 29% 15% at 42% 63%,transparent 32%,color-mix(in srgb,var(--orb-light) 78%,transparent) 61%,transparent 85%);
  opacity:.56;animation-duration:calc(var(--orb-flow) * 1.37);animation-direction:reverse;animation-delay:-5s
}
.spirit-gym-hud__resource-orb--qi .spirit-gym-hud__orb-current{opacity:.9}
.spirit-gym-hud__resource-orb--qi .spirit-gym-hud__orb-current--rear{opacity:.68}
.spirit-gym-hud__orb-rune{position:absolute;inset:0;z-index:2;display:grid;place-items:center;font:25px var(--ui-font-title);color:#fff8;text-shadow:0 1px 3px #031019,0 0 7px #04181aaa;pointer-events:none}
.spirit-gym-hud__resource-orb strong{position:absolute;top:calc(100% + 12px);left:50%;transform:translateX(-50%);white-space:nowrap;font:12px/1.3 var(--ui-font-number);color:var(--ui-text);padding:1px 7px;background:linear-gradient(90deg,transparent,var(--ui-panel),transparent)}
.spirit-gym-hud__resource-orb small{position:absolute;bottom:calc(100% + 13px);left:50%;transform:translateX(-50%);white-space:nowrap;font:11px var(--ui-font-title);letter-spacing:.15em;color:var(--ui-text)}
.spirit-gym-hud__resource-orb.is-low strong{color:var(--orb-light)}
@keyframes spirit-orb-current{
  0%{transform:translate(-2%,1%) rotate(0deg)}
  33%{transform:translate(3%,-2%) rotate(120deg)}
  66%{transform:translate(-1%,3%) rotate(240deg)}
  100%{transform:translate(-2%,1%) rotate(360deg)}
}
@keyframes spirit-orb-meniscus{from{transform:translateX(-3%) rotate(-1.5deg)}to{transform:translateX(3%) rotate(1.5deg)}}
[data-game-menu-open=true] .spirit-gym-hud__orb-current,
[data-game-menu-open=true] .spirit-gym-hud__orb-liquid::before{animation-play-state:paused}
@media(prefers-reduced-motion:reduce){
  .spirit-gym-hud__orb-current,.spirit-gym-hud__orb-liquid::before{animation:none}
  .spirit-gym-hud__orb-current--rear{transform:rotate(125deg)}
  .spirit-gym-hud__orb-liquid{transition:none}
}
`,Tt=String.raw`
.spirit-gym-hud__weapon-vitals{
  --qi-angle:0deg;--weapon-vitals-size:30px;--ring-color:var(--weapon-accent,var(--ui-bronze));
  position:relative;display:grid;place-items:center;isolation:isolate;
  flex:none;width:var(--weapon-vitals-size);height:var(--weapon-vitals-size);aspect-ratio:1;
  border-radius:50%;font-style:normal;
  background:radial-gradient(circle at 38% 26%,color-mix(in srgb,var(--ring-color) 18%,var(--ui-recessed)),var(--ui-recessed) 72%);
  box-shadow:0 1px 3px #0008,inset 0 1px .5px #effffb50,inset 0 -1px 1px #000b;
}
.spirit-gym-hud__weapon-vitals[hidden]{display:none}
/* Two masks intersect: a true circular channel and the current resource arc.
   The highlight is cut by the same arc, including when the resource is empty. */
.spirit-gym-hud__weapon-vitals::before,.spirit-gym-hud__weapon-health::before{
  content:"";position:absolute;inset:1px;border-radius:50%;pointer-events:none;
  background:linear-gradient(140deg,color-mix(in srgb,var(--ring-color) 55%,#fffdf2) 5%,var(--ring-color) 40%,color-mix(in srgb,var(--ring-color) 58%,#132f35) 72%,var(--ring-color));
  mask-image:conic-gradient(#000 var(--ring-angle,var(--qi-angle)),transparent 0),radial-gradient(farthest-side,transparent calc(100% - 2.5px),#000 calc(100% - 2px));
  mask-composite:intersect;
}
.spirit-gym-hud__weapon-vitals::after{
  content:"";position:absolute;inset:4px;border-radius:50%;pointer-events:none;
  box-shadow:0 0 0 .5px #020f17c0,inset 0 1px 1px #0008;
}
.spirit-gym-hud__weapon-health{
  --health-angle:0deg;--ring-angle:var(--health-angle);--ring-color:var(--ui-health-light);
  position:absolute;inset:6px;display:grid;place-items:center;border-radius:50%;font-style:normal;
  background:var(--ui-recessed);box-shadow:0 0 0 .5px #d7e7dc22,inset 0 1px 2px #000b;
}
.spirit-gym-hud__weapon-health::before{
  inset:0;mask-image:conic-gradient(#000 var(--health-angle),transparent 0),radial-gradient(farthest-side,transparent calc(100% - 2px),#000 calc(100% - 1.5px));
}
.spirit-gym-hud__weapon-health::after{
  content:"";position:absolute;inset:3px;border-radius:50%;pointer-events:none;
  background:radial-gradient(ellipse at 35% 12%,#dff6ed30,transparent 55%);
  box-shadow:inset 0 .5px .5px #dff6ed30,inset 0 -1px 1px #0009;
}
.spirit-gym-hud__weapon-phase{position:relative;z-index:1;font:500 9px/1 var(--ui-font-title);color:var(--ui-text);text-shadow:0 1px 2px #000}
.spirit-gym-hud__slot[data-element=metal]{--weapon-accent:#d6bf86}
.spirit-gym-hud__slot[data-element=wood]{--weapon-accent:#9bbe8a}
.spirit-gym-hud__slot[data-element=water]{--weapon-accent:#88b8c6}
.spirit-gym-hud__slot[data-element=fire]{--weapon-accent:#d69273}
.spirit-gym-hud__slot[data-element=earth]{--weapon-accent:#c0a37f}
.spirit-gym-hud__slot[data-resource-phase=disabled-docked]{opacity:.55}
.spirit-gym-hud__slot[data-automatic=true][data-resource-phase=docked-charging] .spirit-gym-hud__weapon-vitals::before{animation:weapon-qi-breathe 2.4s ease-in-out infinite}
@keyframes weapon-qi-breathe{0%,100%{opacity:.76}50%{opacity:1}}
[data-game-menu-open=true] .spirit-gym-hud__weapon-vitals::before{animation-play-state:paused}
@media(prefers-reduced-motion:reduce){.spirit-gym-hud__slot[data-automatic=true][data-resource-phase=docked-charging] .spirit-gym-hud__weapon-vitals::before{animation:none}}
`,Et=String.raw`
.spirit-gym-hud{${ie}--ink:var(--ui-text);--muted:var(--ui-muted);--gold:var(--ui-bronze);--jade:var(--ui-jade);--line:var(--ui-line);position:absolute;inset:0;width:100%;height:100%;min-width:0;overflow:clip;pointer-events:none!important;z-index:50;color:var(--ink);font:12px/1.5 var(--ui-font-body);font-variant-numeric:tabular-nums;text-shadow:0 1px 4px #0008}
.spirit-gym-hud *{box-sizing:border-box}.spirit-gym-hud__panel{background:color-mix(in srgb,var(--ui-surface) 85%,transparent);border:1px solid var(--line);border-radius:3px;box-shadow:0 4px 20px #0002}
.spirit-gym-hud{--hud-tray-width:392px;--hud-orb-size:90px;--hud-tray-bottom:max(86px,calc(env(safe-area-inset-bottom) + 76px))}
.spirit-gym-hud__status{position:static}
.spirit-gym-hud__identity{position:absolute;top:max(20px,env(safe-area-inset-top));left:max(22px,env(safe-area-inset-left));width:200px;padding:10px 14px;background:linear-gradient(100deg,var(--ui-panel),transparent);border:0;border-left:2px solid var(--ui-bronze);border-radius:0;box-shadow:none}
.spirit-gym-hud__name{color:var(--ui-muted);font-size:9px;letter-spacing:.2em;margin-bottom:4px}.spirit-gym-hud__cultivation{display:flex;justify-content:space-between;align-items:baseline;gap:8px}.spirit-gym-hud__cultivation b{font:500 18px/1.4 var(--ui-font-title);letter-spacing:.06em}.spirit-gym-hud__cultivation>span{color:var(--muted);font-size:10px}.spirit-gym-hud__xp-track{height:2px;background:var(--ui-line);margin-top:7px}.spirit-gym-hud__xp-track i{display:block;height:100%;background:var(--ui-jade);transform-origin:left;transform:scaleX(0)}
${wt}
.spirit-gym-hud__round{position:absolute;top:max(22px,env(safe-area-inset-top));left:50%;transform:translateX(-50%);min-width:134px;padding:10px 22px 14px;text-align:center;background:linear-gradient(color-mix(in srgb,var(--ui-surface) 75%,transparent),transparent);border-width:0 0 1px;border-radius:0}.spirit-gym-hud__round strong{display:block;font-weight:500;font-size:11px;color:var(--ui-text);letter-spacing:.2em}.spirit-gym-hud__round span{display:block;margin-top:2px;font:30px/1.2 var(--ui-font-number);letter-spacing:.08em}
.spirit-gym-hud__score{position:absolute;top:94px;right:18px;display:grid;grid-template-columns:1fr 1fr;gap:10px 22px;padding:13px 18px;width:165px;font-size:10px;color:var(--muted)}.spirit-gym-hud__score span{display:flex;gap:8px;justify-content:space-between;align-items:baseline}.spirit-gym-hud__score b{color:var(--ink);font-size:15px;font-weight:500}.spirit-gym-hud__score span:last-child{grid-column:1/-1;font-size:10px}.spirit-gym-hud__score span:last-child b{font-size:12px}
.spirit-gym-hud__loadout{position:absolute;bottom:var(--hud-tray-bottom);left:50%;transform:translateX(-50%);width:var(--hud-tray-width);padding:10px 12px;background:linear-gradient(0deg,var(--ui-panel),color-mix(in srgb,var(--ui-recessed) 80%,transparent));border:1px solid var(--ui-line);border-radius:2px;box-shadow:0 5px 22px #0006}.spirit-gym-hud__loadout-head{display:flex;justify-content:space-between;align-items:center;color:var(--ui-jade);font-size:10px;letter-spacing:.2em;margin:0 3px 7px}.spirit-gym-hud__loadout-head b{font-weight:400}.spirit-gym-hud__loadout-head span{color:var(--muted);letter-spacing:0}.spirit-gym-hud__slot-group-label,.spirit-gym-hud__gear-group,.spirit-gym-hud__reset{display:none}.spirit-gym-hud__slot-row{display:grid;grid-template-columns:repeat(var(--hud-slot-count),minmax(0,1fr));gap:6px}.spirit-gym-hud__slot{position:relative;min-width:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;height:62px;padding:5px 3px;border:1px solid var(--ui-line);background:color-mix(in srgb,var(--ui-recessed) 80%,transparent);color:var(--ui-muted);border-radius:2px;pointer-events:auto}.spirit-gym-hud__slot.is-filled{border-color:color-mix(in srgb,var(--weapon-accent,var(--ui-bronze)) 60%,transparent)}.spirit-gym-hud__slot-name{display:block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:10px;text-align:center}.spirit-gym-hud__slot-copy{max-width:100%}.spirit-gym-hud__slot-meta{display:none}.spirit-gym-hud__slot:not(.is-filled) .spirit-gym-hud__weapon-vitals{opacity:.25}
${Tt}
.spirit-gym-hud__dash{position:absolute;left:24px;bottom:55px;padding:6px 12px;border-width:0 0 0 2px;font-size:12px;color:var(--muted)}.spirit-gym-hud__dash[data-ready=true]{border-color:var(--jade);color:var(--ink)}.spirit-gym-hud__input-hint{position:absolute;left:24px;bottom:24px;padding:0;border:0;background:none;box-shadow:none;font-size:10px;color:var(--ui-muted)}
.spirit-gym-hud__touch{display:none}.spirit-gym-hud__joystick,.spirit-gym-hud__touch-action{position:absolute;display:grid;place-items:center;border:1px solid var(--ui-bronze);border-radius:50%;background:#18221d77;color:#eee9db}.spirit-gym-hud__joystick{left:calc(var(--touch-origin-x,18%) - 42px);top:calc(var(--touch-origin-y,78%) - 42px);width:84px;height:84px}.spirit-gym-hud__joystick::after{content:"";width:28px;height:28px;border:1px solid var(--ui-bronze);border-radius:50%;background:color-mix(in srgb,var(--ui-jade) 25%,transparent);transform:translate(var(--touch-stick-x,0px),var(--touch-stick-y,0px))}.spirit-gym-hud__touch-jump{right:6%;bottom:14%;width:62px;height:62px}.spirit-gym-hud__touch-dash{right:24%;bottom:8%;width:52px;height:52px}.spirit-gym-hud__touch-action.is-active{background:color-mix(in srgb,var(--ui-jade) 45%,transparent)}
[data-game-menu-open=true]>.spirit-gym-hud{visibility:hidden}
/* HUD groups shrink together, preserving the gap between the spheres and the tray. */
.spirit-gym-hud__loadout::after{content:"";position:absolute;inset:4px;background:var(--ui-motif-corner-nw) left top/20px 20px no-repeat,var(--ui-motif-corner-se) right bottom/20px 20px no-repeat;opacity:.55;pointer-events:none}
.spirit-gym-hud__round::after{content:"";position:absolute;width:5px;height:5px;bottom:-3px;left:calc(50% - 3px);border:1px solid var(--ui-bronze-light);background:var(--ui-recessed);transform:rotate(45deg);pointer-events:none}
@media(max-width:1100px){.spirit-gym-hud{--hud-tray-width:354px;--hud-orb-size:78px}.spirit-gym-hud__score{width:146px;padding:8px 12px;gap:8px 12px}.spirit-gym-hud__input-hint{max-width:180px;font-size:9px}}
@media(max-height:500px){.spirit-gym-hud{--hud-tray-width:314px;--hud-orb-size:64px;--hud-tray-bottom:84px}.spirit-gym-hud__identity{top:8px;left:12px;width:176px;padding:6px 10px}.spirit-gym-hud__name{display:none}.spirit-gym-hud__cultivation b{font-size:15px}.spirit-gym-hud__round{top:10px;padding:4px 16px;min-width:110px}.spirit-gym-hud__round span{font-size:23px}.spirit-gym-hud__score{top:62px;right:12px;width:130px;padding:7px 10px}.spirit-gym-hud__score span:last-child{display:none}.spirit-gym-hud__loadout{padding:6px 8px}.spirit-gym-hud__slot{height:50px;padding:4px 3px;gap:2px}.spirit-gym-hud__weapon-vitals{--weapon-vitals-size:22px}.spirit-gym-hud__weapon-health{inset:4px}.spirit-gym-hud__loadout-head{margin-bottom:4px}.spirit-gym-hud__input-hint{display:none}.spirit-gym-hud__dash{bottom:18px;left:12px}.spirit-gym-hud__resource-orb strong{font-size:10px;top:calc(100% + 10px)}.spirit-gym-hud__resource-orb small{font-size:10px}}

.spirit-gym-hud__slot{font-family:var(--ui-font-body);cursor:pointer}
.spirit-gym-hud__slot[data-automatic=true]{border-color:transparent}
.spirit-gym-hud__slot:not(.is-filled)>.weapon-activation-frame{display:none}
.spirit-gym-hud__slot:focus-visible{outline:var(--ui-focus) solid var(--ui-jade);outline-offset:2px}
.spirit-gym-hud__slot[data-automatic=false]{filter:saturate(.55)}
.spirit-gym-hud__slot:disabled{cursor:default;opacity:.4}
`,$=`M2 2H98V98H2Z`,Dt=`<span class="weapon-activation-frame" aria-hidden="true">
  <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
    <path class="weapon-activation-frame__track" d="${$}" vector-effect="non-scaling-stroke"/>
    <path class="weapon-activation-frame__glow" d="${$}" pathLength="100" vector-effect="non-scaling-stroke"/>
    <path class="weapon-activation-frame__spark" d="${$}" pathLength="100" vector-effect="non-scaling-stroke"/>
  </svg>
</span>`;function Ot(e,t,n){let r=String(t);e.dataset.automatic!==r&&(e.dataset.automatic=r),e.getAttribute(`aria-pressed`)!==r&&e.setAttribute(`aria-pressed`,r),e.setAttribute(`aria-label`,kt(n,t))}function kt(e,t){return`${e} · 自动攻击${t?`已开启，点击停止`:`已停止，点击开启`}`}var At=String.raw`
.weapon-activation-frame{--frame-metal:var(--ui-bronze);position:absolute;inset:0;z-index:2;display:block;pointer-events:none;color:var(--frame-metal)}
.weapon-activation-frame svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;fill:none;stroke:currentColor;stroke-linejoin:round}
.weapon-activation-frame__track{stroke-width:1;opacity:.65}
.weapon-activation-frame__glow,.weapon-activation-frame__spark{display:none;stroke-linecap:round}
.weapon-activation-frame__glow{stroke:var(--ui-jade);stroke-width:2;stroke-dasharray:12 38;opacity:.45}
.weapon-activation-frame__spark{stroke:var(--ui-text);stroke-width:1.2;stroke-dasharray:5 45}
[data-automatic=true]>.weapon-activation-frame{--frame-metal:var(--ui-jade);filter:drop-shadow(0 0 2px color-mix(in srgb,var(--ui-jade) 25%,transparent))}
[data-automatic=true]>.weapon-activation-frame .weapon-activation-frame__glow,[data-automatic=true]>.weapon-activation-frame .weapon-activation-frame__spark{display:block;animation:weapon-frame-orbit 2.4s linear infinite}
[data-automatic=true]>.weapon-activation-frame .weapon-activation-frame__track{opacity:.9}
@keyframes weapon-frame-orbit{from{stroke-dashoffset:0}to{stroke-dashoffset:-100}}
@media(prefers-reduced-motion:reduce){[data-automatic=true]>.weapon-activation-frame .weapon-activation-frame__glow,[data-automatic=true]>.weapon-activation-frame .weapon-activation-frame__spark{animation:none;stroke-dasharray:none}.weapon-activation-frame__glow{opacity:.2}}
`;function jt(e){return`${Math.floor(Math.max(0,e)/60).toString().padStart(2,`0`)}:${Math.floor(Math.max(0,e)%60).toString().padStart(2,`0`)}`}function Mt(e){switch(e){case`docked-charging`:return`充`;case`departing`:return`出`;case`hunting-leg`:return`猎`;case`returning`:return`归`;case`disabled-docked`:return`损`;default:return`·`}}function Nt(e){return`data-hud-zone="${e.id}" data-hud-anchor="${e.anchor}" data-hud-fields="${e.data.join(` `)}"`}function Pt(e){let t=O.copy,n=Nt(e);switch(e.id){case`status`:return`<div class="spirit-gym-hud__status" ${n}>
        <div class="spirit-gym-hud__identity spirit-gym-hud__panel">
          <div class="spirit-gym-hud__name" title="${O.title}">此间修行 <span data-water-state hidden></span></div>
          <div class="spirit-gym-hud__cultivation"><b data-level></b><span data-cultivation></span></div><div class="spirit-gym-hud__xp-track"><i data-xp-fill></i></div>
        </div>
        <div class="spirit-gym-hud__resource-orb spirit-gym-hud__resource-orb--health" data-player-health-orb role="meter" aria-label="${t.health}">
          <div class="spirit-gym-hud__orb-well" aria-hidden="true"><div class="spirit-gym-hud__orb-liquid" data-hp-liquid><span class="spirit-gym-hud__orb-current"></span><span class="spirit-gym-hud__orb-current spirit-gym-hud__orb-current--rear"></span></div></div>
          <span class="spirit-gym-hud__orb-rune" aria-hidden="true">命</span>
          <strong data-hp-text></strong><small>${t.health}</small>
        </div>
        <div class="spirit-gym-hud__resource-orb spirit-gym-hud__resource-orb--qi" data-player-qi-orb role="meter" aria-label="${t.qi}">
          <div class="spirit-gym-hud__orb-well" aria-hidden="true"><div class="spirit-gym-hud__orb-liquid" data-qi-liquid><span class="spirit-gym-hud__orb-current"></span><span class="spirit-gym-hud__orb-current spirit-gym-hud__orb-current--rear"></span></div></div>
          <span class="spirit-gym-hud__orb-rune" aria-hidden="true">灵</span>
          <strong data-qi-text></strong><small>${t.qi}</small>
        </div>
      </div>`;case`round`:return`<div class="spirit-gym-hud__round spirit-gym-hud__panel" ${n}><strong data-wave></strong><span data-time></span></div>`;case`score`:return`<div class="spirit-gym-hud__score spirit-gym-hud__panel" ${n}>
        <span>${t.spiritStones}<b data-stones></b></span><span>${t.kills}<b data-kills></b></span><span>${t.enemies}<b data-enemies></b></span><span>${t.loot}<b data-loot></b></span>
      </div>`;case`loadout`:return`<div class="spirit-gym-hud__loadout spirit-gym-hud__panel" ${n}>
        <div class="spirit-gym-hud__loadout-main">
          <div class="spirit-gym-hud__loadout-head"><b>御器</b><span data-loadout-summary></span></div>
          <div class="spirit-gym-hud__slot-group"><span class="spirit-gym-hud__slot-group-label">飞剑</span><div class="spirit-gym-hud__slot-row" style="--hud-slot-count:${O.loadout.weapon.count}" data-weapon-slots></div></div>
          <div class="spirit-gym-hud__slot-group spirit-gym-hud__gear-group"><span class="spirit-gym-hud__slot-group-label">防具</span><div class="spirit-gym-hud__slot-row" style="--hud-slot-count:${O.loadout.gear.count}" data-gear-slots></div></div>
        </div>
        <button class="spirit-gym-hud__reset" type="button" title="${t.reset}" aria-label="${t.reset}">↻</button>
      </div>`;case`dash`:return`<div class="spirit-gym-hud__dash spirit-gym-hud__panel" data-dash ${n}></div>`;case`input-hint`:return`<div class="spirit-gym-hud__input-hint spirit-gym-hud__panel" data-input-hint ${n}>${t.keyboardHint}</div>`;case`shop`:return``;case`touch`:return`<div class="spirit-gym-hud__touch" aria-hidden="true" ${n}>
        <span class="spirit-gym-hud__joystick" data-touch-joystick></span>
        <span class="spirit-gym-hud__touch-action spirit-gym-hud__touch-dash" data-touch-dash>${t.touchDash}</span>
        <span class="spirit-gym-hud__touch-action spirit-gym-hud__touch-jump" data-touch-jump>${t.touchJump}</span>
      </div>`}throw Error(`[spirit-gym-hud] unsupported authored zone`)}function Ft(){return O.zones.map(Pt).join(`
`)}function It(e){if(e.mount===document.body)throw Error(`[spirit-gym-hud] ctx.uiRoot mount is required`);let t=document.createElement(`div`);t.className=`spirit-gym-hud`,t.innerHTML=`
    <style>${Et}${At}${k}</style>
    ${Ft()}
  `,e.mount.appendChild(t);let n=e=>t.querySelector(e),r=n(`[data-hp-text]`),i=n(`[data-hp-liquid]`),a=n(`[data-qi-text]`),o=n(`[data-qi-liquid]`),s=n(`[data-player-health-orb]`),c=n(`[data-player-qi-orb]`),l=n(`[data-wave]`),u=n(`[data-time]`),f=n(`[data-stones]`),p=n(`[data-kills]`),m=n(`[data-enemies]`),h=n(`[data-level]`),g=n(`[data-cultivation]`),_=n(`[data-loot]`),v=n(`[data-loadout-summary]`),y=n(`[data-dash]`),x=n(`[data-input-hint]`),S=n(`[data-touch-joystick]`),C=n(`[data-touch-jump]`),te=n(`[data-touch-dash]`),T=[],E=[];if(O.loadout.weapon.count!==6||O.loadout.gear.count!==6)throw Error(`[spirit-gym-hud] authored slot capacities drifted from the playable loadout`);for(let t=0;t<O.loadout.weapon.count;t+=1){let r=document.createElement(`button`);r.type=`button`,r.dataset.autoAttackSlot=String(t),r.addEventListener(`click`,n=>{e.onToggleAutomaticAttack?.(t),n.detail>0&&r.blur()}),r.className=`spirit-gym-hud__slot is-weapon`,r.innerHTML=`<span class="spirit-gym-hud__weapon-vitals"><i class="spirit-gym-hud__weapon-health"><b class="spirit-gym-hud__weapon-phase"></b></i></span><span class="spirit-gym-hud__slot-copy"><span class="spirit-gym-hud__slot-name"></span><span class="spirit-gym-hud__slot-meta"></span></span>${Dt}`,T.push(r),n(`[data-weapon-slots]`).appendChild(r)}for(let e=0;e<O.loadout.gear.count;e+=1){let e=document.createElement(`span`);e.className=`spirit-gym-hud__slot`,e.innerHTML=`<span class="spirit-gym-hud__slot-name"></span><span class="spirit-gym-hud__slot-meta"></span>`,E.push(e),n(`[data-gear-slots]`).appendChild(e)}return n(`.spirit-gym-hud__reset`).addEventListener(`click`,()=>e.menu?e.menu.open(`journey`):e.onReset()),{update(x){let S=x.run;t.dataset.playerX=x.playerX.toFixed(4),t.dataset.playerY=x.playerY.toFixed(4),t.dataset.playerZ=x.playerZ.toFixed(4),t.dataset.grounded=x.grounded.toString();let C=n(`[data-water-state]`);C.hidden=!x.inWater;let D=x.waterSlowResistance??0;C.textContent=D>0?`${O.copy.inWater} · ${O.copy.clearWater} ${Math.round(D*100)}%`:O.copy.inWater,C.title=`水中移动速度 ×${Math.round(b(D)*100)}%`,t.dataset.attacking=x.attacking.toString(),t.dataset.phase=S.phase,t.dataset.activeEquipmentAttacks=x.activeEquipmentAttacks.toString(),t.dataset.gpuReturningSwordInstances=x.gpuReturningSwordInstances.toString(),t.dataset.gpuReturningSwordRenderEntities=x.gpuReturningSwordRenderEntities.toString(),t.dataset.combatFixedTicks=x.combatFixedTicks.toString(),t.dataset.combatDamageEvents=x.combatDamageEvents.toString(),t.dataset.combatActiveStatuses=x.combatActiveStatuses.toString(),t.dataset.combatBroadphaseCandidates=x.combatBroadphaseCandidates.toString(),t.dataset.combatNarrowphaseTests=x.combatNarrowphaseTests.toString(),t.dataset.combatDroppedEquipmentInstances=x.combatDroppedEquipmentInstances.toString(),t.dataset.equipmentMountVisuals=x.equipmentMountVisuals.toString(),t.dataset.flyingSwordsReady=x.flyingSwordsReady.toString(),t.dataset.flyingSwordsAttacking=x.flyingSwordsAttacking.toString(),t.dataset.cultivationLevel=x.cultivationLevel.toString(),t.dataset.cultivation=x.cultivation.toFixed(3),t.dataset.activePickups=x.activePickups.toString(),t.dataset.gpuPickupInstances=x.gpuPickupInstances.toString();let re=Math.max(0,Math.min(1,x.health/Math.max(1,x.maxHealth))),ie=Math.max(0,Math.min(1,x.qi/Math.max(1,x.maxQi)));t.dataset.playerHealth=x.health.toFixed(3),t.dataset.playerMaxHealth=x.maxHealth.toFixed(3),t.dataset.playerQi=x.qi.toFixed(3),t.dataset.playerMaxQi=x.maxQi.toFixed(3);let k=se(x.health,x.maxHealth);r.textContent=`${k.current} / ${k.maximum}`,i.style.setProperty(`--resource-ratio`,String(re)),a.textContent=`${Math.ceil(Math.max(0,x.qi))} / ${x.maxQi}`,o.style.setProperty(`--resource-ratio`,String(ie)),s.setAttribute(`aria-valuemin`,`0`),s.setAttribute(`aria-valuemax`,String(k.maximum)),s.setAttribute(`aria-valuenow`,String(k.current)),c.setAttribute(`aria-valuemin`,`0`),c.setAttribute(`aria-valuemax`,String(x.maxQi)),c.setAttribute(`aria-valuenow`,String(Math.max(0,x.qi))),s.classList.toggle(`is-low`,re<=.25),c.classList.toggle(`is-low`,ie<=.2),l.textContent=S.phase===`combat`?`第 ${S.wave} 波`:`第 ${S.wave} 波结算`,u.textContent=S.phase===`combat`?jt(S.waveRemaining):`休整`,f.textContent=x.spiritStones.toString(),p.textContent=x.kills.toString(),m.textContent=x.enemies.toString();let ae=ne(x.cultivationLevel);h.textContent=`${ae.displayName}`,h.title=`境界第 ${ae.stageIndex+1} 阶段`,g.textContent=`${Math.floor(x.cultivation)} / ${x.nextCultivation}`,_.textContent=`${x.remnants} / ${x.items}`,n(`[data-xp-fill]`).style.transform=`scaleX(${Math.min(1,x.cultivation/Math.max(1,x.nextCultivation))})`,e.menu?.updateRun(x),v.textContent=`${S.loadout.weaponDefinitionIds.filter(Boolean).length} / 6`;let ce=x.dodgeKind===`blink`?`缩地`:`翻滚`;y.textContent=`${ce} · ${x.dashReady?`就绪`:`调息`}`,te.textContent=ce,y.dataset.ready=x.dashReady.toString();let le=new Map(x.weaponResources.map(e=>[e.slot,e]));for(let t=0;t<T.length;t+=1){let n=T[t],r=S.loadout.weaponDefinitionIds[t],i=r?d[r]:void 0,a=S.weaponMastery.find(e=>e.equipmentId===r),o=le.get(t),s=i?.family===`elemental-spell`?i:void 0;n.classList.toggle(`is-filled`,r!==null),n.classList.remove(`is-gear`),n.dataset.definitionId=r??``,n.dataset.element=i?.element??``,n.dataset.resourcePhase=o?.resourcePhase??``;let c=`${O.loadout.weapon.shortLabel}${t+1}`;n.querySelector(`.spirit-gym-hud__slot-name`).textContent=r?i?.name??r:`${c} · 空`,n.querySelector(`.spirit-gym-hud__slot-meta`).textContent=r?s?`每次 ${s.tiers[0].qiCost} 灵力`:o?`命 ${oe(o.health,o.maxHealth,`/`)} · 灵 ${Math.ceil(o.qi)}/${Math.ceil(o.maxQi)}`:`器命 / 灵力同步中`:`待装配`;let l=n.querySelector(`.spirit-gym-hud__weapon-vitals`),u=n.querySelector(`.spirit-gym-hud__weapon-health`),f=n.querySelector(`.spirit-gym-hud__weapon-phase`),p=o?Math.max(0,Math.min(1,o.health/Math.max(1,o.maxHealth))):0,m=o?Math.max(0,Math.min(1,o.qi/Math.max(1,o.maxQi))):0;l.style.setProperty(`--qi-angle`,`${(m*360).toFixed(2)}deg`),u.style.setProperty(`--health-angle`,`${(p*360).toFixed(2)}deg`);let h=!!i&&(e.readAutomaticAttack?.(t)??!0);Ot(n,h,i?.name??`空武器位`),i||n.setAttribute(`aria-label`,`空武器位`),n.disabled=!i,f.textContent=i?h?s?`术`:Mt(o?.resourcePhase??``):`歇`:``,l.hidden=!!s||!r,l.setAttribute(`aria-hidden`,l.hidden?`true`:`false`),n.title=r?`${i?.name??r} · ${s?`每次消耗本人 ${s.tiers[0].qiCost} 灵力 · ${h?`自动施法`:`已停用`}`:o?`器命 ${oe(o.health,o.maxHealth,`/`)} · 灵力 ${o.qi.toFixed(1)}/${o.maxQi.toFixed(1)} · 出鞘门槛 ${o.minimumLaunchQi.toFixed(1)} · ${o.bodyCount} 剑体${o.disabledBodyCount>0?` · ${o.disabledBodyCount} 失能`:``} · ${Mt(o.resourcePhase)}`:`资源尚未同步`} · 精通 ${a?.level??1}级 · 击杀 ${a?.kills??0} · 经验 ${a?.experience??0}/${a?.nextExperience??0}`:`${O.loadout.weapon.emptyTitle} ${t+1} · 空`}for(let e=0;e<E.length;e+=1){let t=E[e],n=S.loadout.gearIds[e],r=S.loadout.gearLevels[e]??0;t.classList.toggle(`is-filled`,n!==null),t.classList.toggle(`is-gear`,n!==null),t.dataset.definitionId=n??``,t.dataset.level=String(r);let i=`${O.loadout.gear.shortLabel}${e+1}`;t.querySelector(`.spirit-gym-hud__slot-name`).textContent=n?w[n].name:`${i} · 空`,t.querySelector(`.spirit-gym-hud__slot-meta`).textContent=n?`Lv.${r} · ${ee(n,r)}`:`未装备`,t.title=n?`${w[n].name} · Lv.${r}/${w[n].maxLevel} · ${ee(n,r)}`:`${O.loadout.gear.emptyTitle} ${e+1} · 空`}},handleInput(e){t.dataset.inputDevice!==e.activeDevice&&(t.dataset.inputDevice=e.activeDevice);let n=e.activeDevice===`gamepad`?O.copy.gamepadHint:e.activeDevice===`touch`?O.copy.touchHint:O.copy.keyboardHint;x.textContent!==n&&(x.textContent=n),(e.activeDevice===`touch`||e.touch.moveActive)&&(t.style.setProperty(`--touch-origin-x`,`${e.touch.moveOriginX*100}%`),t.style.setProperty(`--touch-origin-y`,`${e.touch.moveOriginY*100}%`),t.style.setProperty(`--touch-stick-x`,`${e.touch.moveX*30}px`),t.style.setProperty(`--touch-stick-y`,`${e.touch.moveY*30}px`)),S.classList.toggle(`is-active`,e.touch.moveActive),C.classList.toggle(`is-active`,e.touch.jumpActive),te.classList.toggle(`is-active`,e.touch.dashActive)},dispose(){t.remove()}}}var Lt=f,Rt=new Map(h.parts.flatMap(e=>{let t=e.material===`robe`?`robe`:e.material===`trim`||e.material===`ornament`?`accent`:void 0;return t?[[p(e.id),t]]:[]}));function zt(e){let t=e.slice(e.lastIndexOf(`Player_`));return t.startsWith(`Player_FinalRealm_`)?`aura`:Rt.get(t)}async function Bt(e,t){let n=[...new Set(C.flatMap(e=>Object.values(e.paletteGuids)))],r=await Promise.all(n.map(async e=>{let n=s.parse(e);if(!n.ok)throw Error(`[player-realm] invalid material GUID ${e}`);let r=await t.loadByGuid(n.value);if(!r.ok)throw Error(`[player-realm] material ${e} failed: ${JSON.stringify(r.error)}`);if(r.value.kind!==`material`)throw Error(`[player-realm] ${e} is not a material`);return r.value})),a=[];try{for(let t of r)a.push(re(e,`MaterialAsset`,t,`player realm`))}catch(e){throw D(a,`player realm allocation rollback`),e}let o=new Map(n.map((e,t)=>[e,a[t].handle]));return{apply(t,n){let r=C[ne(n+1).realmIndex],a=new Map;for(let n of t){let t=zt(n.name);if(!t)continue;let s=[o.get(r.paletteGuids[t])];e.set(n.entity,i,{materials:s}).unwrap(),a.set(n.entity,s)}return a},dispose(){D(a,`player realm palette`)}}}export{At as a,_t as c,nt as d,X as f,ce as g,A as h,Dt as i,Ct as l,Me as m,Lt as n,mt as o,et as p,It as r,Q as s,Bt as t,ht as u};