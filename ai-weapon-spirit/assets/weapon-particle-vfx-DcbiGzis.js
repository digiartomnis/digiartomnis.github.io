import{i as e}from"./dist-5-a8mSo3.js";import{a as t}from"./chunk-GD7GZ6DN-DSpk5zD2.js";import{l as n,o as r,s as i}from"./dist-D1HDioW-.js";import{s as a}from"./dist-CcgpOc1p.js";import{a as o,n as s,t as c}from"./dist-CWZWbaWG.js";import{a as l,c as u,d,i as f,l as ee,n as p,o as te,r as ne,t as m,u as re}from"./elemental-vfx-seed-B-w9Enuh.js";import{f as ie,n as ae,p as oe}from"./model-matrices-CsPLTYlb.js";String.raw`
// forgeax/lib.wgsl —— 特效编写用的共享函数库。
//
// 两个来源：
//   1. LinearAbiltyCastingThreeJS 的 src/shaders/lib/{noise,common}.glsl.js
//      （simplex / fbm / ridged / curl / voronoi / 四段渐变）逐函数翻译成 WGSL。
//      这批全是纯数学，翻译没有任何语义损失，是那个工程里最值得搬的资产。
//   2. ForgeAX 已烘焙特效里反复出现的 vfx_hash / vfx_random_words / vfx_integrate，
//      按原样保留命名和数值，方便对照。
//
// 用法：把这份文件、特效自己的钩子、prelude.wgsl 三者拼接后编译。

// ---------------------------------------------------------------- 随机
// ForgeAX 现有特效通用的 spawn 期取随机数方式。sampleKey 用来在同一颗粒子上
// 取多个互不相关的随机量，务必逐个递增，重复使用会让维度之间产生相关性。

fn vfx_hash(value: u32) -> u32 {
  var x = value;
  x = ((x >> 16u) ^ x) * 73244475u;
  x = ((x >> 16u) ^ x) * 73244475u;
  return (x >> 16u) ^ x;
}

fn vfx_random_words(seed: u32, particleId: u32, tick: u32, sampleKey: u32) -> f32 {
  let h = vfx_hash((seed ^ vfx_hash(particleId)) ^ vfx_hash(tick) ^ vfx_hash(sampleKey));
  return f32(h) / 4294967300.0;
}

fn vfx_random_spawn(ctx: VfxSpawnContext, sampleKey: u32) -> f32 {
  return vfx_random_words(ctx.seed ^ ctx.playCycle, ctx.particleId, ctx.tick, sampleKey);
}

fn vfx_random_range(ctx: VfxSpawnContext, sampleKey: u32, lo: f32, hi: f32) -> f32 {
  return lo + (hi - lo) * vfx_random_spawn(ctx, sampleKey);
}

// ---- 与 tick 无关的稳定随机 ----
//
// 为什么需要这一组：vfx_random_spawn 把 ctx.tick 混进了哈希，于是同一颗粒子在
// spawn 帧和后续 update 帧会拿到不同的值。逐帧积分的图层无所谓（初值写进
// velocity 就行），但解析式图层必须在 update 里重新算出出生参数，那就只能用
// 一个不含 tick 的哈希。
//
// ForgeAX 现有的解析式特效（fireball-impact-core 等）都遵守这条：它们只用
// particleId、seed、playCycle 来推导，从不碰 tick。这里把这个约定显式化。

fn vfx_random_stable_raw(seed: u32, playCycle: u32, particleId: u32, sampleKey: u32) -> f32 {
  let h = vfx_hash((seed ^ playCycle) ^ vfx_hash(particleId) ^ vfx_hash(sampleKey * 2654435761u));
  return f32(h) / 4294967300.0;
}

fn vfx_stable_spawn(ctx: VfxSpawnContext, sampleKey: u32) -> f32 {
  return vfx_random_stable_raw(ctx.seed, ctx.playCycle, ctx.particleId, sampleKey);
}

fn vfx_stable_update(ctx: VfxUpdateContext, sampleKey: u32) -> f32 {
  return vfx_random_stable_raw(ctx.seed, ctx.playCycle, ctx.particleId, sampleKey);
}

fn vfx_stable_spawn_range(ctx: VfxSpawnContext, sampleKey: u32, lo: f32, hi: f32) -> f32 {
  return lo + (hi - lo) * vfx_stable_spawn(ctx, sampleKey);
}

fn vfx_stable_update_range(ctx: VfxUpdateContext, sampleKey: u32, lo: f32, hi: f32) -> f32 {
  return lo + (hi - lo) * vfx_stable_update(ctx, sampleKey);
}

// ---- 按"组"取稳定随机 ----
//
// 早先引擎的 mesh 粒子只有等比缩放（mesh_main 只读 size_rotation.x），想要细长或
// 锥形的轮廓只能拿多个粒子沿一条轴堆出来。现在引擎已经支持 quaternion-scale3
// 的三轴缩放，新写的图层不必再这么绕；但既有图层仍然是"一个视觉物件 = 一组粒子"
// 的写法，这种写法要求同组粒子共享同一批出生参数（位置、高度、倾斜、破地时刻），
// 否则堆出来的不是一根锥体而是一把散开的乱刺。
//
// 上面那组稳定随机是按 ctx.particleId 取的，同组的每颗粒子都会拿到不同值，
// 正好不能用。这里改成按调用方给的组号取。

fn vfx_stable_group(ctx: VfxSpawnContext, group: u32, sampleKey: u32) -> f32 {
  return vfx_random_stable_raw(ctx.seed, ctx.playCycle, group, sampleKey);
}

fn vfx_stable_group_range(ctx: VfxSpawnContext, group: u32, sampleKey: u32, lo: f32, hi: f32) -> f32 {
  return lo + (hi - lo) * vfx_stable_group(ctx, group, sampleKey);
}

fn vfx_stable_group_update(ctx: VfxUpdateContext, group: u32, sampleKey: u32) -> f32 {
  return vfx_random_stable_raw(ctx.seed, ctx.playCycle, group, sampleKey);
}

fn vfx_stable_group_update_range(ctx: VfxUpdateContext, group: u32, sampleKey: u32, lo: f32, hi: f32) -> f32 {
  return lo + (hi - lo) * vfx_stable_group_update(ctx, group, sampleKey);
}

/** 球面均匀方向。用两个独立随机量，避免极点堆积。 */
fn vfx_random_direction(ctx: VfxSpawnContext, keyA: u32, keyB: u32) -> vec3<f32> {
  let z = 1.0 - 2.0 * vfx_random_spawn(ctx, keyA);
  let r = sqrt(max(0.0, 1.0 - z * z));
  let phi = 6.2831853 * vfx_random_spawn(ctx, keyB);
  return vec3<f32>(cos(phi) * r, z, sin(phi) * r);
}

/**
 * 黄金角螺旋方向。
 *
 * 与随机方向的区别：给定 rank 和 count 时分布是确定且均匀的，不会出现随机
 * 采样那种局部空洞。适合数量少、要求铺得匀的层（爆心、法环）。
 */
fn vfx_spiral_direction(rank: u32, count: u32, phase: f32) -> vec3<f32> {
  let sample = (f32(rank) + 0.5) / f32(count);
  let y = 1.0 - sample * 2.0;
  let radial = sqrt(max(0.0, 1.0 - y * y));
  let angle = f32(rank) * 2.3999631 + phase;
  return vec3<f32>(cos(angle) * radial, y, sin(angle) * radial);
}

// ---------------------------------------------------------------- 噪声
// 译自 noise.glsl.js。simplex 的常量与置换表原样保留，输出与 GLSL 版逐位一致。

fn mod289v3(x: vec3<f32>) -> vec3<f32> { return x - floor(x * (1.0 / 289.0)) * 289.0; }
fn mod289v4(x: vec4<f32>) -> vec4<f32> { return x - floor(x * (1.0 / 289.0)) * 289.0; }
fn permute289(x: vec4<f32>) -> vec4<f32> { return mod289v4(((x * 34.0) + 1.0) * x); }
fn taylorInvSqrt4(r: vec4<f32>) -> vec4<f32> { return 1.79284291400159 - 0.85373472095314 * r; }

fn hash11(p0: f32) -> f32 {
  var p = fract(p0 * 0.1031);
  p = p * (p + 33.33);
  p = p * (p + p);
  return fract(p);
}

fn hash21(p: f32) -> vec2<f32> {
  var p3 = fract(vec3<f32>(p) * vec3<f32>(0.1031, 0.1030, 0.0973));
  p3 = p3 + dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

fn snoise(v: vec3<f32>) -> f32 {
  let C = vec2<f32>(1.0 / 6.0, 1.0 / 3.0);
  let D = vec4<f32>(0.0, 0.5, 1.0, 2.0);

  var i = floor(v + dot(v, C.yyy));
  let x0 = v - i + dot(i, C.xxx);

  let g = step(x0.yzx, x0.xyz);
  let l = 1.0 - g;
  let i1 = min(g.xyz, l.zxy);
  let i2 = max(g.xyz, l.zxy);

  let x1 = x0 - i1 + C.xxx;
  let x2 = x0 - i2 + C.yyy;
  let x3 = x0 - D.yyy;

  i = mod289v3(i);
  let p = permute289(permute289(permute289(
      i.z + vec4<f32>(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4<f32>(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4<f32>(0.0, i1.x, i2.x, 1.0));

  let n_ = 0.142857142857;
  let ns = n_ * D.wyz - D.xzx;

  let j = p - 49.0 * floor(p * ns.z * ns.z);

  let x_ = floor(j * ns.z);
  let y_ = floor(j - 7.0 * x_);

  let x = x_ * ns.x + ns.yyyy;
  let y = y_ * ns.x + ns.yyyy;
  let h = 1.0 - abs(x) - abs(y);

  let b0 = vec4<f32>(x.xy, y.xy);
  let b1 = vec4<f32>(x.zw, y.zw);

  let s0 = floor(b0) * 2.0 + 1.0;
  let s1 = floor(b1) * 2.0 + 1.0;
  let sh = -step(h, vec4<f32>(0.0));

  let a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  let a1 = b1.xzyw + s1.xzyw * sh.zzww;

  var p0 = vec3<f32>(a0.xy, h.x);
  var p1 = vec3<f32>(a0.zw, h.y);
  var p2 = vec3<f32>(a1.xy, h.z);
  var p3 = vec3<f32>(a1.zw, h.w);

  let norm = taylorInvSqrt4(vec4<f32>(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 = p0 * norm.x;
  p1 = p1 * norm.y;
  p2 = p2 * norm.z;
  p3 = p3 * norm.w;

  var m = max(0.6 - vec4<f32>(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), vec4<f32>(0.0));
  m = m * m;
  return 42.0 * dot(m * m, vec4<f32>(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

fn snoise01(p: vec3<f32>) -> f32 { return snoise(p) * 0.5 + 0.5; }

fn fbm3(p0: vec3<f32>) -> f32 {
  var v = 0.0;
  var a = 0.5;
  var p = p0;
  for (var i = 0; i < 3; i = i + 1) {
    v = v + a * snoise(p);
    p = p * 2.02;
    a = a * 0.5;
  }
  return v;
}

fn fbm4(p0: vec3<f32>) -> f32 {
  var v = 0.0;
  var a = 0.5;
  var p = p0;
  for (var i = 0; i < 4; i = i + 1) {
    v = v + a * snoise(p);
    p = p * 2.03 + vec3<f32>(17.3, 5.1, 9.7);
    a = a * 0.5;
  }
  return v;
}

/** 脊状多重分形：出锐利的丝状结构，火焰和裂纹靠它。 */
fn ridged(p0: vec3<f32>) -> f32 {
  var v = 0.0;
  var a = 0.5;
  var p = p0;
  for (var i = 0; i < 4; i = i + 1) {
    v = v + a * (1.0 - abs(snoise(p)));
    p = p * 2.06;
    a = a * 0.5;
  }
  return v;
}

/**
 * 无散度 curl 噪声。
 *
 * 取两组独立噪声梯度的叉积，因此速度场散度为零 —— 粒子被搅动但不会挤成一坨
 * 或者散成空洞。这是 5174 里烟与火看起来"有涡"的根本原因，比直接拿噪声当
 * 偏移量高一个档次。
 */
fn curl_noise(p: vec3<f32>) -> vec3<f32> {
  let e = 0.12;
  let dx = vec3<f32>(e, 0.0, 0.0);
  let dy = vec3<f32>(0.0, e, 0.0);
  let dz = vec3<f32>(0.0, 0.0, e);

  let x0 = snoise(p - dx); let x1 = snoise(p + dx);
  let y0 = snoise(p - dy); let y1 = snoise(p + dy);
  let z0 = snoise(p - dz); let z1 = snoise(p + dz);

  let pb = p + vec3<f32>(31.416, 47.853, 12.793);
  let bx0 = snoise(pb - dx); let bx1 = snoise(pb + dx);
  let by0 = snoise(pb - dy); let by1 = snoise(pb + dy);
  let bz0 = snoise(pb - dz); let bz1 = snoise(pb + dz);

  let inv = 1.0 / (2.0 * e);
  let grad1 = vec3<f32>(x1 - x0, y1 - y0, z1 - z0) * inv;
  let grad2 = vec3<f32>(bx1 - bx0, by1 - by0, bz1 - bz0) * inv;
  return normalize(cross(grad1, grad2) + vec3<f32>(1e-5));
}

/** 二维 voronoi。返回 x = 到最近格点距离，y = 格点 id。裂纹、鳞片、冰晶用。 */
fn voronoi2(p: vec2<f32>) -> vec2<f32> {
  let n = floor(p);
  let f = fract(p);
  var minDist = 8.0;
  var id = 0.0;
  for (var j = -1; j <= 1; j = j + 1) {
    for (var i = -1; i <= 1; i = i + 1) {
      let g = vec2<f32>(f32(i), f32(j));
      let o = hash21(dot(n + g, vec2<f32>(7.13, 113.17)));
      let r = g + o - f;
      let d = dot(r, r);
      if (d < minDist) {
        minDist = d;
        id = hash11(dot(n + g, vec2<f32>(31.7, 57.1)));
      }
    }
  }
  return vec2<f32>(sqrt(minDist), id);
}

// ---------------------------------------------------------------- 着色
// 译自 common.glsl.js。softFade 不在这里 —— 软粒子在渲染侧按场景深度算，
// 模拟阶段拿不到屏幕空间信息。

/** 四段渐变（核心 → 中段 → 边缘 → 余烬）。段与段之间刻意重叠，过渡不会出硬边。 */
fn gradient4(c0: vec3<f32>, c1: vec3<f32>, c2: vec3<f32>, c3: vec3<f32>, t0: f32) -> vec3<f32> {
  let t = clamp(t0, 0.0, 1.0);
  let a = mix(c0, c1, smoothstep(0.0, 0.34, t));
  let b = mix(a, c2, smoothstep(0.30, 0.68, t));
  return mix(b, c3, smoothstep(0.64, 1.0, t));
}

/** 阈值溶解，返回 (alpha 遮罩, 灼烧边缘)。边缘那一条通常要提亮当自发光。 */
fn dissolve_mask(noiseValue: f32, threshold: f32, edgeWidth: f32) -> vec2<f32> {
  let mask = step(threshold, noiseValue);
  let edge = smoothstep(threshold, threshold + edgeWidth, noiseValue) - mask;
  return vec2<f32>(mask, clamp(edge, 0.0, 1.0));
}

// ---------------------------------------------------------------- 运动

/**
 * 带线性阻力的位移解析解。
 *
 * 逐帧写法是 v *= exp(-k*dt); p += v*dt，累积下来就是这个闭式解：
 *   travel(age) = (1 - exp(-k * age)) / k
 * 用它的好处是位置只依赖 age，可以任意跳帧、变速、倒放而画面完全一致，
 * 代价是粒子之间不能有相互作用。
 *
 * k 趋近 0 时公式退化，这里直接切回匀速分支避免除零。
 */
fn drag_travel(age: f32, drag: f32) -> f32 {
  if (drag < 1e-4) { return age; }
  return (1.0 - exp(-drag * age)) / drag;
}

/** 解析式抛物线 + 阻力。与 5174 顶点着色器里的位置计算等价。 */
fn ballistic_position(
  origin: vec3<f32>,
  velocity: vec3<f32>,
  gravity: vec3<f32>,
  age: f32,
  drag: f32
) -> vec3<f32> {
  return origin + velocity * drag_travel(age, drag) + 0.5 * gravity * age * age;
}

/** 绕 Y 轴旋进：把点绕锚点转 angle，同时保留竖直分量。 */
fn swirl_around_y(point: vec3<f32>, anchor: vec3<f32>, angle: f32) -> vec3<f32> {
  let rel = point - anchor;
  let c = cos(angle);
  let s = sin(angle);
  return anchor + vec3<f32>(rel.x * c - rel.z * s, rel.y, rel.x * s + rel.z * c);
}

/** 逐帧积分。ForgeAX 现有特效里的 vfx_integrate，保留同名以便对照。 */
fn vfx_integrate(ctx: VfxUpdateContext, particle: ptr<function, VfxParticle>) {
  let p = (*particle).position;
  let v = (*particle).velocity;
  (*particle).position = p + v * ctx.delta;
}

/** 归一化寿命。注意引擎在 vfx_update 之后才推进 age，所以这里读到的是本帧之前的值。 */
fn vfx_life(particle: ptr<function, VfxParticle>) -> f32 {
  return clamp((*particle).age / max((*particle).lifetime, 1e-4), 0.0, 1.0);
}

/** 起落包络：先在 riseEnd 前涨到 1，再从 fallStart 开始回到 0。 */
fn envelope(life: f32, riseEnd: f32, fallStart: f32) -> f32 {
  return smoothstep(0.0, riseEnd, life) * (1.0 - smoothstep(fallStart, 1.0, life));
}

/** 本次播放已经过的秒数。
 *
 * VfxUpdateContext 里没有演出时间字段，只有 delta 和 tick。tick 在每个 playCycle
 * 开始时归零、按固定步长自增，所以两者相乘就是演出内的绝对时间。
 *
 * 只在同一层里需要多个错开的时间点时才用它（比如三段依次锁定的火花）。
 * 单个延迟触发应该走 schedule.bursts 的 time，那才是 ForgeAX 的原生做法，
 * 而且延后生成的粒子不会白占容量。
 */
fn vfx_effect_time() -> f32 {
  return f32(forgeax_vfx_runtime.tick) * forgeax_vfx_runtime.delta;
}

// ---------------------------------------------------------------------------
// 命中特效的冲击坐标系
//
// ForgeAX 的 surface-hit 事件带命中点和表面法线，真实运行时应该从事件里取。
// 预览台没有碰撞，所以固定成"正对镜头的一面墙"：命中点在人形参照胸口高度，
// 法线指向 +Z。7 种材质用同一个坐标系才能并排比较差异。
// ---------------------------------------------------------------------------

const VFX_HIT_POINT: vec3<f32> = vec3<f32>(0.0, 1.02, 0.30);
const VFX_HIT_NORMAL: vec3<f32> = vec3<f32>(0.0, 0.0, 1.0);
const VFX_HIT_TANGENT: vec3<f32> = vec3<f32>(1.0, 0.0, 0.0);
const VFX_HIT_BITANGENT: vec3<f32> = vec3<f32>(0.0, 1.0, 0.0);

/** 溅射方向。spread=0 沿法线弹回，接近 1 则贴着表面切向铺开。
 *
 * 这个参数直接对应材质的 tangentialEnergyRetention：切向能量留得多的材质
 * （玉、金属）溅射贴面，留得少的（木、水）更多沿法线弹回。
 */
fn vfx_hit_spray(spread: f32, phi: f32) -> vec3<f32> {
  let tangential = VFX_HIT_TANGENT * cos(phi) + VFX_HIT_BITANGENT * sin(phi);
  return normalize(mix(VFX_HIT_NORMAL, tangential, clamp(spread, 0.0, 0.98)));
}

/** 表面上距命中点 radius 的一点，用来画贴合表面的环/裂纹。 */
fn vfx_hit_surface(radius: f32, angle: f32) -> vec3<f32> {
  return VFX_HIT_POINT
       + (VFX_HIT_TANGENT * cos(angle) + VFX_HIT_BITANGENT * sin(angle)) * radius;
}

// ===========================================================================
// ribbon 的底色补偿
//
// 引擎的 packages/vfx-render/src/shaders/ribbon.wgsl 片元里写死了一句底色：
//
//     let base = vec4<f32>(0.2, 0.7, 1.0, 0.9);
//     let alpha = base.a * input.color.a;
//     return vec4<f32>(base.rgb * input.color.rgb * alpha, alpha);
//
// 也就是说带子的最终颜色 = (0.2, 0.7, 1.0) * 我们给的颜色。红色分量被压到
// 两成，任何暖色带子都会变成冷色。这句是引擎侧的，我们不改引擎。
//
// 能干净绕过它，靠的是两个事实：
//   1. prelude 的 forgeax_vfx_ribbon_main 把 particle.color 原样写进实例缓冲，
//      全程没有 clamp 到 [0, 1]；
//   2. 渲染靶是 rgba16float，超过 1 的分量能如实带到片元。
//
// 所以只要预先除掉那个底色，乘回来正好抵消，得到的是精确的目标颜色 ——
// 不是近似，是恒等。代价只是颜色分量会大于 1（红色需要 5 倍余量），
// 对 f32 粒子缓冲和 f16 渲染靶来说余量绰绰有余。
//
// 另外两个引擎侧限制也一并在这里处理：
//   - 带子拿不到材质的自发光（ribbon 片元根本不读 emissive）。既然颜色不设上限，
//     想要的辉光直接乘进颜色即可，效果与加法自发光等价。
//   - 带子的 alpha 会被底色的 0.9 再压一次，所以 alpha 也要预除。
// ===========================================================================

const VFX_RIBBON_ENGINE_TINT: vec3<f32> = vec3<f32>(0.2, 0.7, 1.0);
const VFX_RIBBON_ENGINE_ALPHA: f32 = 0.9;

/** 把"想要的最终颜色"换算成"该写进 particle.color 的值"。
 *
 * rgb   期望的带子颜色，可以大于 1 来表示自发光强度
 * alpha 期望的最终不透明度
 */
fn vfx_ribbon_color(rgb: vec3<f32>, alpha: f32) -> vec4<f32> {
  return vec4<f32>(rgb / VFX_RIBBON_ENGINE_TINT, alpha / VFX_RIBBON_ENGINE_ALPHA);
}

// 关于贴地带子的深度：引擎的 ribbon 顶点着色器确实不做深度偏移，但实测下来
// 只要把带子抬到 y = 0.025 以上就不会和地面抢深度（本工程所有贴地环都在
// 0.025~0.04）。带子看起来断成一节节的时候，原因基本都是相邻节点的半径跳变
// 太大（比如用 voronoi 调制半径且幅度给过头），而不是深度问题 —— 半径平滑的
// 环（水镜的镜面盘）是完全连续的。调半径抖动幅度，别去加深度偏移。
`,String.raw`
// Cinder Fall · 主陨石
// Native mesh orientation is independent from translational velocity.
// The mesh Pack already owns the axis ratios; mesh_scale owns uniform growth.

fn cinder_quaternion(axis: vec3<f32>, angle: f32) -> vec4<f32> {
  let half = angle * 0.5;
  return vec4<f32>(normalize(axis) * sin(half), cos(half));
}

fn cinder_arc(t: f32) -> vec3<f32> {
  let p = clamp(t, 0.0, 1.0);
  return vec3<f32>(
    mix(-0.18, 0.0, p),
    mix(1.35, 0.75, p) + {{ARC_HEIGHT}} * pow(sin(p * 3.14159265), {{ARC_CURVE}}),
    mix(0.6, 7.8, p)
  );
}

fn vfx_spawn(ctx: VfxSpawnContext, particle: ptr<function, VfxParticle>) {
  let seed = vfx_stable_spawn(ctx, 31u);
  (*particle).position = (vec4<f32>(cinder_arc(0.0), 1.0)).xyz;
  (*particle).mesh_orientation = cinder_quaternion(normalize(vec3<f32>(0.7, 1.0, 0.35)), 0.0);
  let meshShape1 = vec4<f32>({{RADIUS_X}}, {{RADIUS_Y}}, {{RADIUS_Z}}, 0.0);
  (*particle).mesh_scale = vec3<f32>(meshShape1.x);
  // r=seed，g=heat，b=charge，a=visibility；由 cinder-rock 材质解释。
  (*particle).color = vec4<f32>(seed, 1.0, 0.0, 1.0);
  (*particle).lifetime = 4.8;
}

fn vfx_update(ctx: VfxUpdateContext, particle: ptr<function, VfxParticle>) {
  let travel = 0.94;
  let rupture = 1.38;
  let progress = clamp((*particle).age / travel, 0.0, 1.0);
  let impactLife = clamp(((*particle).age - travel) / (rupture - travel), 0.0, 1.0);
  let visible = select(1.0, 0.0, (*particle).age >= rupture);
  var position = cinder_arc(progress);
  if (visible < 0.5) {
    position.y = -100.0;
  }
  let seed = vfx_stable_update(ctx, 31u);
  let axis = normalize(vec3<f32>(0.7 + seed * 0.2, 1.0, 0.35 - seed * 0.1));
  (*particle).position = (vec4<f32>(position, 1.0)).xyz;
  (*particle).mesh_orientation = cinder_quaternion(axis, (*particle).age * {{SPIN}});
  let pressureScale = mix(1.0, {{PRESSURE_SCALE}}, 1.0 - pow(1.0 - impactLife, 2.2));
  let meshShape3 = vec4<f32>({{RADIUS_X}}, {{RADIUS_Y}}, {{RADIUS_Z}}, 0.0) * pressureScale;
  (*particle).mesh_scale = vec3<f32>(meshShape3.x);
  (*particle).color = vec4<f32>(
    seed,
    mix(1.0, 1.85, impactLife),
    max(pow(progress, 1.6), impactLife),
    visible
  );
}
`,String.raw`
// Cinder Fall · 沿解析抛物线铺开的高密度火焰体
// 预览器由 cinder-fire billboard 材质把每个代理粒子渲染成带吸收边缘的火舌。

const CINDER_TRAIL_COUNT: f32 = 420.0;

fn cinder_trail_arc(t: f32) -> vec3<f32> {
  let p = clamp(t, 0.0, 1.0);
  return vec3<f32>(
    mix(-0.18, 0.0, p),
    mix(1.35, 0.75, p) + {{ARC_HEIGHT}} * pow(sin(p * 3.14159265), {{ARC_CURVE}}),
    mix(0.6, 7.8, p)
  );
}

fn vfx_spawn(ctx: VfxSpawnContext, particle: ptr<function, VfxParticle>) {
  (*particle).position = (vec4<f32>(0.0, -100.0, 0.0, 1.0)).xyz;
  (*particle).velocity = (vec4<f32>(0.0)).xyz;
  let spriteShape2 = vec4<f32>(0.1);
  (*particle).sprite_size = spriteShape2.xy;
  (*particle).sprite_rotation = spriteShape2.z;
  (*particle).color = vec4<f32>(1.0, 0.22, 0.015, 0.0);
  (*particle).lifetime = 2.2;
}

fn vfx_update(ctx: VfxUpdateContext, particle: ptr<function, VfxParticle>) {
  let id = f32(ctx.particleId % 420u);
  let u = (id + vfx_stable_update(ctx, 51u) * 0.65) / CINDER_TRAIL_COUNT;
  let head = clamp((*particle).age / 0.94, 0.0, 1.0);
  let impactBurn = max(0.0, (*particle).age - 0.94);
  let tail = max(0.0, head - {{TAIL_FRACTION}} + impactBurn / {{BURNOUT}} * {{TAIL_FRACTION}});
  let inside = select(0.0, 1.0, u <= head && u >= tail);
  let local = clamp((u - tail) / max(0.001, head - tail), 0.0, 1.0);

  let seed = vfx_stable_update(ctx, 52u);
  let angle = seed * 6.2831853 + (*particle).age * (2.2 + seed * 1.8);
  let wake = 1.0 - local;
  let radius = (0.16 + {{TRAIL_WIDTH}} * pow(wake, 0.7)) * (1.0 + 0.2 * wake * wake);
  let turbulence = vec3<f32>(
    cos(angle) * radius * (0.32 + seed * 0.4),
    sin(angle * 1.37) * radius * (0.36 + wake * {{TURBULENCE}}) + wake * {{TRAIL_RISE}},
    sin(angle) * radius * 0.34 - wake * 0.14
  );
  var position = cinder_trail_arc(u) + turbulence;
  if (inside < 0.5) {
    position.y = -100.0;
  }

  let headGlow = smoothstep(0.62, 1.0, local);
  let flicker = 0.78 + 0.22 * sin((*particle).age * 17.0 + seed * 31.0);
  let alpha = inside * flicker * (1.0 - smoothstep(0.0, 1.0, impactBurn / {{BURNOUT}}));
  let size = radius * mix(0.62, 0.92, headGlow) * (0.72 + seed * 0.48);
  (*particle).position = (vec4<f32>(position, 1.0)).xyz;
  let spriteShape4 = vec4<f32>(size, size * (1.0 + wake * 0.55), angle, seed);
  (*particle).sprite_size = spriteShape4.xy;
  (*particle).sprite_rotation = spriteShape4.z;
  (*particle).color = vec4<f32>(
    mix(0.85, 1.0, headGlow),
    mix(0.055, 0.52, headGlow),
    mix(0.008, 0.08, headGlow),
    alpha * mix(0.15, 0.38, headGlow)
  );
}
`,String.raw`
fn cinder_aura_arc(t: f32) -> vec3<f32> {
  let p = clamp(t, 0.0, 1.0);
  return vec3<f32>(
    mix(-0.18, 0.0, p),
    mix(1.35, 0.75, p) + {{ARC_HEIGHT}} * pow(sin(p * 3.14159265), {{ARC_CURVE}}),
    mix(0.6, 7.8, p)
  );
}

fn vfx_spawn(ctx: VfxSpawnContext, particle: ptr<function, VfxParticle>) {
  (*particle).position = (vec4<f32>(0.0, -100.0, 0.0, 1.0)).xyz;
  (*particle).velocity = (vec4<f32>(0.0)).xyz;
  let spriteShape2 = vec4<f32>(0.1);
  (*particle).sprite_size = spriteShape2.xy;
  (*particle).sprite_rotation = spriteShape2.z;
  (*particle).color = vec4<f32>(1.0, 0.2, 0.015, 0.0);
  (*particle).lifetime = 1.42;
}

fn vfx_update(ctx: VfxUpdateContext, particle: ptr<function, VfxParticle>) {
  let travel = 0.94;
  let rupture = 1.38;
  let progress = clamp((*particle).age / travel, 0.0, 1.0);
  let impactLife = clamp(((*particle).age - travel) / (rupture - travel), 0.0, 1.0);
  let visible = select(1.0, 0.0, (*particle).age >= rupture);
  let seed = vfx_stable_update(ctx, 71u);
  let azimuth = seed * 6.2831853 + (*particle).age * mix(1.8, 3.6, seed);
  let elevation = vfx_stable_update_range(ctx, 72u, -0.82, 0.82);
  let shell = vec3<f32>(
    cos(azimuth) * cos(elevation),
    sin(elevation),
    sin(azimuth) * cos(elevation)
  );
  let radius = mix({{RADIUS_START}}, {{RADIUS_END}}, impactLife) * vfx_stable_update_range(ctx, 73u, 0.72, 1.12);
  var position = cinder_aura_arc(progress) + shell * radius;
  if (visible < 0.5) {
    position.y = -100.0;
  }
  let lick = 0.14 + 0.22 * sin(seed * 29.0 + (*particle).age * 16.0);
  let size = mix({{SIZE_START}}, {{SIZE_END}}, impactLife) * (0.72 + seed * 0.6);
  (*particle).position = (vec4<f32>(position + vec3<f32>(0.0, lick, 0.0), 1.0)).xyz;
  let spriteShape4 = vec4<f32>(size, size * (1.35 + seed * 0.55), azimuth, seed);
  (*particle).sprite_size = spriteShape4.xy;
  (*particle).sprite_rotation = spriteShape4.z;
  (*particle).color = vec4<f32>(
    1.0,
    mix(0.18, 0.62, impactLife),
    mix(0.012, 0.11, impactLife),
    visible * mix(0.22, 0.52, impactLife)
  );
}
`,String.raw`
fn cinder_ember_arc(t: f32) -> vec3<f32> {
  let p = clamp(t, 0.0, 1.0);
  return vec3<f32>(
    mix(-0.18, 0.0, p),
    mix(1.35, 0.75, p) + {{ARC_HEIGHT}} * pow(sin(p * 3.14159265), {{ARC_CURVE}}),
    mix(0.6, 7.8, p)
  );
}

fn vfx_spawn(ctx: VfxSpawnContext, particle: ptr<function, VfxParticle>) {
  (*particle).position = (vec4<f32>(0.0, -100.0, 0.0, 1.0)).xyz;
  (*particle).velocity = (vec4<f32>(0.0)).xyz;
  let spriteShape2 = vec4<f32>(0.04);
  (*particle).sprite_size = spriteShape2.xy;
  (*particle).sprite_rotation = spriteShape2.z;
  (*particle).color = vec4<f32>(1.0, 0.35, 0.02, 0.0);
  (*particle).lifetime = 1.38;
}

fn vfx_update(ctx: VfxUpdateContext, particle: ptr<function, VfxParticle>) {
  let seed = vfx_stable_update(ctx, 81u);
  let head = clamp((*particle).age / 0.94, 0.0, 1.0);
  let lag = vfx_stable_update_range(ctx, 82u, 0.025, 0.27);
  let path = head - lag;
  let visible = select(0.0, 1.0, path > 0.0 && (*particle).age < 1.12);
  let angle = seed * 6.2831853;
  let escape = max(0.0, lag - 0.12) * 4.0;
  var position = cinder_ember_arc(path) + vec3<f32>(
    cos(angle) * escape,
    seed * 0.5 + escape * 0.65,
    sin(angle) * escape
  );
  if (visible < 0.5) {
    position.y = -100.0;
  }
  let size = vfx_stable_update_range(ctx, 83u, 0.016, 0.048);
  (*particle).position = (vec4<f32>(position, 1.0)).xyz;
  let spriteShape4 = vec4<f32>(size, size, angle, seed);
  (*particle).sprite_size = spriteShape4.xy;
  (*particle).sprite_rotation = spriteShape4.z;
  (*particle).color = vec4<f32>(1.0, mix(0.18, 0.82, seed), 0.025, visible * (0.45 + seed * 0.5));
}
`,String.raw`
// Cinder Fall · 实体碎块

fn cinder_chunk_quaternion(axis: vec3<f32>, angle: f32) -> vec4<f32> {
  let half = angle * 0.5;
  return vec4<f32>(normalize(axis) * sin(half), cos(half));
}

fn vfx_spawn(ctx: VfxSpawnContext, particle: ptr<function, VfxParticle>) {
  let seed = vfx_stable_spawn(ctx, 40u);
  (*particle).position = (vec4<f32>(0.0, -100.0, 7.8, 1.0)).xyz;
  (*particle).velocity = (vec4<f32>(0.0, 0.0, 0.0, 1.0)).xyz;
  let meshShape2 = vec4<f32>(0.2);
  (*particle).mesh_scale = vec3<f32>(meshShape2.x);
  (*particle).mesh_orientation = vec4<f32>(0.0, 0.0, sin(meshShape2.w * 0.5), cos(meshShape2.w * 0.5));
  (*particle).color = vec4<f32>(seed, 1.0, 0.0, 0.0);
  (*particle).lifetime = 4.8;
}

fn vfx_update(ctx: VfxUpdateContext, particle: ptr<function, VfxParticle>) {
  let local = (*particle).age - 1.38;
  let seed = vfx_stable_update(ctx, 40u);
  if (local < 0.0) {
    (*particle).position.y = -100.0;
    (*particle).color.a = 0.0;
    return;
  }

  let phi = vfx_stable_update_range(ctx, 41u, 0.0, 6.2831853);
  let elevation = vfx_stable_update_range(ctx, 42u, 0.25, 1.05);
  let speed = vfx_stable_update_range(ctx, 43u, {{SPEED_MIN}}, {{SPEED_MAX}});
  let direction = normalize(vec3<f32>(cos(phi) * cos(elevation), sin(elevation), sin(phi) * cos(elevation) + 0.35));
  let gravity = f32({{GRAVITY}});
  let size = vfx_stable_update_range(ctx, 44u, {{SIZE_MIN}}, {{SIZE_MAX}});
  let landingHeight = size * 0.8;
  let landing = (direction.y * speed + sqrt(direction.y * direction.y * speed * speed + 2.0 * -gravity * (0.75 - landingHeight))) / -gravity;
  let flight = min(local, landing);
  var position = vec3<f32>(0.0, 0.75, 7.8) + direction * speed * flight;
  position.y = max(landingHeight, 0.75 + direction.y * speed * flight + 0.5 * gravity * flight * flight);
  let sink = smoothstep(3.65, 4.65, (*particle).age);
  position.y -= sink * (size * 2.0 + 0.45);

  let heat = 1.0 - smoothstep(0.06, {{COOL_TIME}}, local);
  let spin = vfx_stable_update_range(ctx, 48u, -{{SPIN}}, {{SPIN}});
  let roll = seed * 6.2831853 + flight * spin;
  (*particle).position = (vec4<f32>(position, 1.0)).xyz;
  (*particle).velocity = (vec4<f32>(select(direction * speed + vec3<f32>(0.0, gravity * flight, 0.0), vec3<f32>(0.0), local >= landing), 0.0)).xyz;
  // The native adapter consumes .w as a continuous, signed roll angle.
  let meshShape5 = vec4<f32>(size, size * 0.82, size * 1.15, roll);
  (*particle).mesh_scale = vec3<f32>(meshShape5.x);
  (*particle).mesh_orientation = vec4<f32>(0.0, 0.0, sin(meshShape5.w * 0.5), cos(meshShape5.w * 0.5));
  (*particle).color = vec4<f32>(seed, heat, 1.0, 1.0 - sink);
}
`,String.raw`
// 爆发能量外壳。原版 MeteorAbility.onImpact():932-955 + BurstSphere.js。
//
// color 的四个通道是和 render.js 的 cinder_world_shell_vs / cinder_burst_shade
// 约定好的 ABI —— mesh 实例步长 28 是引擎定死的，authored WGSL 加不了绑定，
// 逐实例参数只能挤在这四个 float 里。两边必须一起改：
//   r = age（归一化寿命，原版 uAge）
//   g = seed（噪声偏移，原版 uSeed）
//   b = displace * turbulence（位移幅度，原版 uDisplace * uTurbulence）
//   a = opacity（原版 uOpacity）
//
// ⚠️ effects.json 里的 OPACITY 是 0.0599 / 0.063，不是原版的 0.95 / 1.0。原版那两个
// 材质是 toneMapped:false，直接绕开 tonemapper；我们全局 ACES 且引擎没有逐材质
// opt-out，additive 是叠进 ACES 之前的线性缓冲，所以照抄 opacity 会过曝：实测屏幕
// 亮度增益 G=122.47，是订正前的 5.19 倍（上游参考工程的亮度校正值）。
// 结构照原版一字不改，只用这一个标量把 G 标到 24.892 = 订正前的 1.054 倍
// （用户要的 +5%~10%）。两个外壳按原版的 0.95 : 1.0 同步缩放，配比不变。

fn vfx_spawn(ctx: VfxSpawnContext, particle: ptr<function, VfxParticle>) {
  (*particle).position = (vec4<f32>(0.0, {{SPAWN_Y}}, 7.8, 1.0)).xyz;
  (*particle).velocity = (vec4<f32>(0.0, 0.0, 0.0, 1.0)).xyz;
  let meshShape2 = vec4<f32>(0.05);
  (*particle).mesh_scale = vec3<f32>(meshShape2.x);
  (*particle).color = vec4<f32>(0.0, 0.0, {{DISPLACE}}, 0.0);
  (*particle).lifetime = {{LIFETIME}};
}

fn vfx_update(ctx: VfxUpdateContext, particle: ptr<function, VfxParticle>) {
  let life = vfx_life(particle);
  // 原版 BurstSphere.js:283 的 Easing.outQuint。之前是 pow(1-life, 2.4)，
  // 那条曲线起步慢得多，前几帧几乎不长，读出来就是"球太小"。
  let expand = 1.0 - pow(1.0 - life, 5.0);
  let radius = mix({{RADIUS_START}}, {{RADIUS_END}}, expand);
  // 正球，不压扁。之前那个 mix(0.78, 1.08, 1-life) 的竖向压缩是自创的，原版没有。
  let meshShape3 = vec4<f32>(radius, radius, radius, 0.0);
  (*particle).mesh_scale = vec3<f32>(meshShape3.x);
  (*particle).color = vec4<f32>(
    life,
    vfx_stable_group_update(ctx, 0u, 91u) * 10.0,
    {{DISPLACE}},
    {{OPACITY}}
  );
}
`,String.raw`
const CINDER_SPEED_LINE_COUNT: u32 = 24u;

fn vfx_spawn(ctx: VfxSpawnContext, particle: ptr<function, VfxParticle>) {
  let rank = ctx.particleId % CINDER_SPEED_LINE_COUNT;
  let jitter = vfx_stable_spawn_range(ctx, 91u, -0.085, 0.085);
  let angle = f32(rank) / f32(CINDER_SPEED_LINE_COUNT) * 6.2831853 + jitter;
  // 速度线约束在面向镜头的爆心平面，避免沿视线方向投影后缩成杂乱椭圆。
  let direction = vec3<f32>(cos(angle), sin(angle), 0.0);
  (*particle).position = (vec4<f32>(
    vec3<f32>(0.0, 0.76, 7.8) + direction * {{RADIUS_START}},
    1.0
  )).xyz;
  (*particle).velocity = (vec4<f32>(direction, angle)).xyz;
  (*particle).sprite_rotation = (vec4<f32>(direction, angle)).w;
  let spriteShape2 = vec4<f32>(0.02);
  (*particle).sprite_size = spriteShape2.xy;
  (*particle).sprite_rotation = spriteShape2.z;
  (*particle).color = vec4<f32>(1.0, 0.58, 0.08, 0.0);
  (*particle).lifetime = vfx_stable_spawn_range(ctx, 93u, {{LIFE_MIN}}, {{LIFE_MAX}});
}

fn vfx_update(ctx: VfxUpdateContext, particle: ptr<function, VfxParticle>) {
  let life = vfx_life(particle);
  let direction = normalize((*particle).velocity.xyz);
  let speed = vfx_stable_update_range(ctx, 94u, {{SPEED_MIN}}, {{SPEED_MAX}});
  let radius = {{RADIUS_START}} + (1.0 - pow(1.0 - life, 2.4)) * speed * (*particle).lifetime;
  (*particle).position = (vec4<f32>(
    vec3<f32>(0.0, 0.76, 7.8) + direction * radius,
    1.0
  )).xyz;
  let length = vfx_stable_update_range(ctx, 95u, {{LENGTH_MIN}}, {{LENGTH_MAX}}) * sin(life * 3.14159265);
  let thickness = vfx_stable_update_range(ctx, 96u, {{THICKNESS_MIN}}, {{THICKNESS_MAX}});
  let spriteShape4 = vec4<f32>(length, thickness, (*particle).sprite_rotation, 0.0);
  (*particle).sprite_size = spriteShape4.xy;
  (*particle).sprite_rotation = spriteShape4.z;
  (*particle).color = vec4<f32>(
    1.0,
    vfx_stable_update_range(ctx, 97u, 0.38, 0.88),
    vfx_stable_update_range(ctx, 98u, 0.045, 0.22),
    envelope(life, 0.06, 0.62)
      * smoothstep(0.12, 0.42, sin(life * 3.14159265))
      * 0.9
  );
}
`,String.raw`
fn cinder_shard_quaternion(axis: vec3<f32>, angle: f32) -> vec4<f32> {
  let half = angle * 0.5;
  return vec4<f32>(normalize(axis) * sin(half), cos(half));
}

fn vfx_spawn(ctx: VfxSpawnContext, particle: ptr<function, VfxParticle>) {
  let seed = vfx_stable_spawn(ctx, 101u);
  let phi = vfx_stable_spawn_range(ctx, 102u, 0.0, 6.2831853);
  let elevation = vfx_stable_spawn_range(ctx, 103u, -0.12, 1.15);
  let direction = normalize(vec3<f32>(
    cos(phi) * cos(elevation),
    sin(elevation),
    sin(phi) * cos(elevation)
  ));
  let speed = vfx_stable_spawn_range(ctx, 104u, {{SPEED_MIN}}, {{SPEED_MAX}});
  (*particle).position = (vec4<f32>(0.0, 0.76, 7.8, 1.0)).xyz;
  (*particle).velocity = (vec4<f32>(direction * speed, 1.0)).xyz;
  let meshShape2 = vec4<f32>(0.1);
  (*particle).mesh_scale = vec3<f32>(meshShape2.x);
  (*particle).mesh_orientation = vec4<f32>(0.0, 0.0, sin(meshShape2.w * 0.5), cos(meshShape2.w * 0.5));
  (*particle).color = vec4<f32>(seed, 1.0, 1.0, 1.0);
  (*particle).lifetime = vfx_stable_spawn_range(ctx, 105u, {{LIFE_MIN}}, {{LIFE_MAX}});
}

fn vfx_update(ctx: VfxUpdateContext, particle: ptr<function, VfxParticle>) {
  let life = vfx_life(particle);
  let seed = vfx_stable_update(ctx, 101u);
  let time = (*particle).age;
  // Reconstruct the immutable launch, never read a previous frame's rotation
  // or current velocity as the launch velocity of this analytical trajectory.
  let phi = vfx_stable_update_range(ctx, 102u, 0.0, 6.2831853);
  let elevation = vfx_stable_update_range(ctx, 103u, -0.12, 1.15);
  let speed = vfx_stable_update_range(ctx, 104u, {{SPEED_MIN}}, {{SPEED_MAX}});
  let launch = vec3<f32>(cos(phi)*cos(elevation), sin(elevation), sin(phi)*cos(elevation)) * speed;
  let size = vfx_stable_update_range(ctx, 106u, {{SIZE_MIN}}, {{SIZE_MAX}});
  let landingHeight = max(0.035, size * 0.3);
  let gravity = f32({{GRAVITY}});
  let landing = (launch.y + sqrt(launch.y * launch.y + 2.0 * gravity * (0.76 - landingHeight))) / gravity;
  let flight = min(time, landing);
  var position = vec3<f32>(0.0, 0.76, 7.8) + launch * flight;
  position.y = max(landingHeight, position.y - 0.5 * gravity * flight * flight);
  let spin = (5.0 + seed * 8.0) * select(-1.0, 1.0, vfx_stable_update(ctx, 107u) > 0.5);
  let roll = vfx_stable_update(ctx, 108u) * 6.2831853 + flight * spin;
  let cool = 1.0 - smoothstep({{COOL_START}}, 1.0, life);
  (*particle).position = (vec4<f32>(position, 1.0)).xyz;
  (*particle).velocity = (vec4<f32>(select(launch - vec3<f32>(0.0, gravity * flight, 0.0), vec3<f32>(0.0), time >= landing), 0.0)).xyz;
  let meshShape5 = vec4<f32>(size * 1.45, size * 0.42, size, roll);
  (*particle).mesh_scale = vec3<f32>(meshShape5.x);
  (*particle).mesh_orientation = vec4<f32>(0.0, 0.0, sin(meshShape5.w * 0.5), cos(meshShape5.w * 0.5));
  (*particle).color = vec4<f32>(seed, cool, 1.0, 1.0 - smoothstep(0.72, 1.0, life));
}
`,String.raw`
fn vfx_spawn(ctx: VfxSpawnContext, particle: ptr<function, VfxParticle>) {
  let angle = vfx_stable_spawn_range(ctx, 111u, 0.0, 6.2831853);
  let radius = sqrt(vfx_stable_spawn(ctx, 112u)) * 1.65;
  (*particle).position = (vec4<f32>(
    cos(angle) * radius,
    vfx_stable_spawn_range(ctx, 113u, 0.18, 1.15),
    7.8 + sin(angle) * radius,
    1.0
  )).xyz;
  (*particle).velocity = (vec4<f32>(
    vfx_stable_spawn_range(ctx, 114u, -0.55, 0.55),
    vfx_stable_spawn_range(ctx, 115u, 0.9, 3.3),
    vfx_stable_spawn_range(ctx, 116u, -0.55, 0.55),
    0.0
  )).xyz;
  let spriteShape2 = vec4<f32>(0.04);
  (*particle).sprite_size = spriteShape2.xy;
  (*particle).sprite_rotation = spriteShape2.z;
  (*particle).color = vec4<f32>(1.0, 0.35, 0.02, 0.0);
  (*particle).lifetime = vfx_stable_spawn_range(ctx, 117u, 1.1, 2.8);
}

fn vfx_update(ctx: VfxUpdateContext, particle: ptr<function, VfxParticle>) {
  let life = vfx_life(particle);
  let seed = vfx_stable_update(ctx, 118u);
  let curl = curl_noise((*particle).position.xyz * 0.75 + vec3<f32>(0.0, (*particle).age, 0.0));
  // Buoyant embers approach a slow updraft; curl cannot turn the cloud down.
  let updraft = vec3<f32>(curl.x * 0.32, 0.65 + seed * 0.85 + curl.y * 0.16, curl.z * 0.32);
  (*particle).velocity = (vec4<f32>(mix((*particle).velocity.xyz, updraft, 1.0 - exp(-0.42 * ctx.delta)), 0.0)).xyz;
  vfx_integrate(ctx, particle);
  let palette = select(
    select(vec3<f32>(1.0, 0.11, 0.012), vec3<f32>(1.0, 0.38, 0.018), seed > 0.33),
    vec3<f32>(1.0, 0.9, 0.28),
    seed > 0.7
  );
  let size = vfx_stable_update_range(ctx, 119u, 0.018, 0.066) * mix(1.0, 0.42, life);
  let roll = seed * 6.2831853 + (*particle).age * vfx_stable_update_range(ctx, 120u, -0.8, 0.8);
  let spriteShape4 = vec4<f32>(size, size, roll, seed);
  (*particle).sprite_size = spriteShape4.xy;
  (*particle).sprite_rotation = spriteShape4.z;
  (*particle).color = vec4<f32>(palette, envelope(life, 0.05, 0.62) * (0.5 + seed * 0.48));
}
`,String.raw`
// Cinder Fall · 弹坑焦痕贴花
//
// 载体是贴地 quad（mesh + quaternion-scale3），对应原版 GroundDecals.js 的
// SCORCH 分支（一块 PlaneGeometry 躺在 y≈0.018）。原版那块 plane 带一个随机
// 偏航（\`decal.rotation.z = random * TAU\`），作用是让程序化噪声在多次施放之间
// 去相关 —— 之前这里写 identity 四元数，噪声图案每次都钉在同一个朝向。

fn scorch_yaw_quaternion(theta: f32) -> vec4<f32> {
  return vec4<f32>(0.0, sin(theta * 0.5), 0.0, cos(theta * 0.5));
}

fn vfx_spawn(ctx: VfxSpawnContext, particle: ptr<function, VfxParticle>) {
  (*particle).position = (vec4<f32>(0.0, 0.018, 7.8, 1.0)).xyz;
  (*particle).mesh_orientation = vec4<f32>(0.0, 0.0, 0.0, 1.0);
  let meshShape1 = vec4<f32>(0.05, 0.004, 0.05, 0.0);
  (*particle).mesh_scale = vec3<f32>(meshShape1.x);
  (*particle).color = vec4<f32>(0.0, 0.0, 0.0, 0.0);
  (*particle).lifetime = 8.0;
}

fn vfx_update(ctx: VfxUpdateContext, particle: ptr<function, VfxParticle>) {
  let life = vfx_life(particle);
  let grow = 1.0 - exp(-(*particle).age * 8.0);
  // 原版 fadeOut = 1.0 - smoothstep(0.55, 1.0, uAge)（GroundDecals.js:93）
  let fade = 1.0 - smoothstep(0.55, 1.0, life);
  // 一发只出一颗粒子，取 group 0 即可；两个 key 分别喂偏航和噪声去相关种子。
  let seed = vfx_stable_group_update(ctx, 0u, 81u);
  (*particle).mesh_orientation = scorch_yaw_quaternion(
    vfx_stable_group_update(ctx, 0u, 82u) * 6.2831853
  );
  let meshShape2 = vec4<f32>(2.8 * grow, 0.012, 2.8 * grow, 0.0);
  (*particle).mesh_scale = vec3<f32>(meshShape2.x);
  // r = 归一化寿命（原版 uAge）  g = 噪声种子（原版 uSeed）  b = 秒龄（原版 uTime）
  (*particle).color = vec4<f32>(life, seed, (*particle).age, fade * 0.95);
}
`,String.raw`
const CINDER_WARNING_NODES: u32 = 112u;

fn vfx_spawn(ctx: VfxSpawnContext, particle: ptr<function, VfxParticle>) {
  let rank = ctx.particleId % CINDER_WARNING_NODES;
  let angle = f32(rank) / f32(CINDER_WARNING_NODES - 1u) * 6.2831853;
  (*particle).position = (vec4<f32>(0.0, 0.045, 7.8, 1.0)).xyz;
  (*particle).velocity = (vec4<f32>(cos(angle), sin(angle), angle, 0.0)).xyz;
  let spriteShape2 = vec4<f32>(1.0);
  (*particle).sprite_size = spriteShape2.xy;
  (*particle).sprite_rotation = spriteShape2.z;
  (*particle).color = vec4<f32>(1.0, 0.48, 0.08, 0.0);
  (*particle).lifetime = 0.92;
}

fn vfx_update(ctx: VfxUpdateContext, particle: ptr<function, VfxParticle>) {
  let life = vfx_life(particle);
  let direction = (*particle).velocity.xy;
  let angle = (*particle).velocity.z;
  let pulse = 0.72 + 0.28 * sin((*particle).age * 23.0 + angle * 3.0);
  let radius = mix(1.35, 3.45, 1.0 - pow(1.0 - life, 2.0));
  (*particle).position = (vec4<f32>(
    direction.x * radius,
    0.045,
    7.8 + direction.y * radius,
    1.0
  )).xyz;
  (*particle).color = vec4<f32>(
    1.0,
    0.34 + pulse * 0.28,
    0.035,
    envelope(life, 0.06, 0.72) * 0.56
  );
}
`,String.raw`
const CINDER_SHOCK_NODES: u32 = 128u;

fn vfx_spawn(ctx: VfxSpawnContext, particle: ptr<function, VfxParticle>) {
  let rank = ctx.particleId % CINDER_SHOCK_NODES;
  let angle = f32(rank) / f32(CINDER_SHOCK_NODES - 1u) * 6.2831853;
  (*particle).position = (vec4<f32>(0.0, 0.06, 7.8, 1.0)).xyz;
  (*particle).velocity = (vec4<f32>(cos(angle), sin(angle), angle, 0.0)).xyz;
  let spriteShape2 = vec4<f32>(1.0);
  (*particle).sprite_size = spriteShape2.xy;
  (*particle).sprite_rotation = spriteShape2.z;
  (*particle).color = vec4<f32>(1.0, 0.32, 0.035, 0.0);
  (*particle).lifetime = {{LIFETIME}};
}

fn vfx_update(ctx: VfxUpdateContext, particle: ptr<function, VfxParticle>) {
  let life = vfx_life(particle);
  let direction = (*particle).velocity.xy;
  let angle = (*particle).velocity.z;
  let travel = 1.0 - pow(1.0 - life, 2.8);
  let radius = mix({{RADIUS_START}}, {{RADIUS_END}}, travel);
  let turbulence = sin(angle * 9.0 + life * 4.0) * mix(0.015, 0.055, life);
  (*particle).position = (vec4<f32>(
    direction.x * radius * (1.0 + turbulence),
    0.055 + life * {{LIFT}},
    7.8 + direction.y * radius * (1.0 + turbulence),
    1.0
  )).xyz;
  let alpha = envelope(life, 0.035, {{FADE_OUT}}) * {{ALPHA}};
  let crest = 1.0 + (1.0 - life) * 2.2;
  (*particle).color = vec4<f32>(
    vec3<f32>(1.0, mix(0.22, 0.72, 1.0 - life), mix(0.025, 0.18, 1.0 - life)) * crest,
    alpha
  );
}
`,String.raw`
// 通用深模块：径向 billboard 爆发。
// 用于火焰、毒滴、治疗光点、血雾、奥术火花等“从一点向外释放”的层。

fn cinder_spark_direction(seed: u32, cycle: u32, id: u32) -> vec3<f32> {
  let y = 1.0 - 2.0 * vfx_random_stable_raw(seed, cycle, id, 0u);
  let radius = sqrt(max(0.0, 1.0 - y*y));
  let phi = 6.2831853 * vfx_random_stable_raw(seed, cycle, id, 1u);
  return normalize(vec3<f32>(cos(phi)*radius, y, sin(phi)*radius) + vec3<f32>({{BIAS_X}}, {{BIAS_Y}}, {{BIAS_Z}}));
}

fn vfx_spawn(ctx: VfxSpawnContext, particle: ptr<function, VfxParticle>) {
  let dir = cinder_spark_direction(ctx.seed, ctx.playCycle, ctx.particleId);
  let radius = pow(vfx_stable_spawn(ctx, 2u), 0.45) * {{SPAWN_RADIUS}};
  let speed = vfx_stable_spawn_range(ctx, 3u, {{SPEED_MIN}}, {{SPEED_MAX}});
  (*particle).position = (vec4<f32>(
    vec3<f32>({{ORIGIN_X}}, {{ORIGIN_Y}}, {{ORIGIN_Z}}) + dir * radius,
    1.0
  )).xyz;
  (*particle).velocity = (vec4<f32>(dir * speed, 0.0)).xyz;
  let spriteShape2 = vec4<f32>({{SIZE_START}}, {{SIZE_START}}, 0.0, 0.0);
  (*particle).sprite_size = spriteShape2.xy;
  (*particle).sprite_rotation = spriteShape2.z;
  (*particle).color = vec4<f32>({{COLOR_A_R}}, {{COLOR_A_G}}, {{COLOR_A_B}}, 0.0);
  (*particle).lifetime = vfx_stable_spawn_range(ctx, 4u, {{LIFE_MIN}}, {{LIFE_MAX}});
}

fn vfx_update(ctx: VfxUpdateContext, particle: ptr<function, VfxParticle>) {
  let life = vfx_life(particle);
  // Closed-form linear drag + gravity: playback speed / fixed-step size cannot
  // change a spark's launch, travel distance or contact with the ground.
  let dir = cinder_spark_direction(ctx.seed, ctx.playCycle, ctx.particleId);
  let launch = dir * vfx_stable_update_range(ctx, 3u, {{SPEED_MIN}}, {{SPEED_MAX}});
  let origin = vec3<f32>({{ORIGIN_X}}, {{ORIGIN_Y}}, {{ORIGIN_Z}}) + dir * pow(vfx_stable_update(ctx, 2u), 0.45) * {{SPAWN_RADIUS}};
  let drag = max(0.0001, f32({{DRAG}}));
  let decay = exp(-drag * (*particle).age);
  let travel = (1.0 - decay) / drag;
  let gravity = vec3<f32>(0.0, {{GRAVITY}}, 0.0);
  (*particle).position = (vec4<f32>(origin + launch * travel + gravity * ((*particle).age - travel) / drag, 1.0)).xyz;
  (*particle).velocity = (vec4<f32>(launch * decay + gravity * travel, 0.0)).xyz;
  if ((*particle).position.y < 0.025) { (*particle).alive = 0u; (*particle).color.a = 0.0; return; }
  let size = mix({{SIZE_START}}, {{SIZE_END}}, pow(life, {{SIZE_CURVE}}));
  let roll = vfx_stable_update(ctx, 5u) * 6.2831853 + (*particle).age * vfx_stable_update_range(ctx, 6u, -{{SPIN}}, {{SPIN}});
  let spriteShape5 = vec4<f32>(size, size, roll, 0.0);
  (*particle).sprite_size = spriteShape5.xy;
  (*particle).sprite_rotation = spriteShape5.z;
  let tint = mix(
    vec3<f32>({{COLOR_A_R}}, {{COLOR_A_G}}, {{COLOR_A_B}}),
    vec3<f32>({{COLOR_B_R}}, {{COLOR_B_G}}, {{COLOR_B_B}}),
    smoothstep(0.0, 1.0, life)
  );
  (*particle).color = vec4<f32>(tint * (1.0 + (1.0 - life) * {{BIRTH_GLOW}}),
    envelope(life, {{FADE_IN}}, {{FADE_OUT}}) * {{ALPHA}});
}
`,String.raw`
// 通用深模块：curl-noise 云团。
// 用于毒雾、烟尘、死亡消散、血雾、火焰余烟。

fn vfx_spawn(ctx: VfxSpawnContext, particle: ptr<function, VfxParticle>) {
  let a = vfx_stable_spawn(ctx, 20u) * 6.2831853;
  let r = sqrt(vfx_stable_spawn(ctx, 21u)) * {{RADIUS}};
  let y = vfx_stable_spawn_range(ctx, 22u, -{{HEIGHT}}, {{HEIGHT}});
  (*particle).position = (vec4<f32>(
    {{ORIGIN_X}} + cos(a) * r,
    {{ORIGIN_Y}} + y,
    {{ORIGIN_Z}} + sin(a) * r,
    1.0
  )).xyz;
  (*particle).velocity = (vec4<f32>(
    vfx_stable_spawn_range(ctx, 23u, -{{DRIFT}}, {{DRIFT}}),
    {{RISE}} + vfx_stable_spawn_range(ctx, 24u, -{{DRIFT}}, {{DRIFT}}),
    vfx_stable_spawn_range(ctx, 25u, -{{DRIFT}}, {{DRIFT}}),
    0.0
  )).xyz;
  let spriteShape2 = vec4<f32>({{SIZE_START}}, {{SIZE_START}}, 0.0, 0.0);
  (*particle).sprite_size = spriteShape2.xy;
  (*particle).sprite_rotation = spriteShape2.z;
  (*particle).color = vec4<f32>({{COLOR_A_R}}, {{COLOR_A_G}}, {{COLOR_A_B}}, 0.0);
  (*particle).lifetime = vfx_stable_spawn_range(ctx, 26u, {{LIFE_MIN}}, {{LIFE_MAX}});
}

fn vfx_update(ctx: VfxUpdateContext, particle: ptr<function, VfxParticle>) {
  let life = vfx_life(particle);
  let curl = curl_noise((*particle).position.xyz * {{NOISE_SCALE}} + vec3<f32>(0.0, life * {{NOISE_SPEED}}, 0.0));
  let seed = vfx_stable_update(ctx, 27u);
  let updraft = vec3<f32>(curl.x * {{TURBULENCE}}, {{RISE}} * (0.55 + seed * 0.35) + curl.y * {{RISE}} * 0.12, curl.z * {{TURBULENCE}});
  (*particle).velocity = (vec4<f32>(mix((*particle).velocity.xyz, updraft, 1.0 - exp(-{{DRAG}} * ctx.delta)), 0.0)).xyz;
  vfx_integrate(ctx, particle);
  let size = mix({{SIZE_START}}, {{SIZE_END}}, pow(life, 0.6)) * (0.82 + seed * 0.36);
  let roll = seed * 6.2831853 + (*particle).age * vfx_stable_update_range(ctx, 28u, -0.22, 0.22);
  let spriteShape4 = vec4<f32>(size, size * (0.94 + seed * 0.12), roll, 0.0);
  (*particle).sprite_size = spriteShape4.xy;
  (*particle).sprite_rotation = spriteShape4.z;
  let tint = mix(
    vec3<f32>({{COLOR_A_R}}, {{COLOR_A_G}}, {{COLOR_A_B}}),
    vec3<f32>({{COLOR_B_R}}, {{COLOR_B_G}}, {{COLOR_B_B}}),
    life
  );
  (*particle).color = vec4<f32>(tint, envelope(life, {{FADE_IN}}, {{FADE_OUT}}) * {{ALPHA}});
}
`;var se=Object.freeze([.08,1.35]),ce=-.55,le=Object.freeze({metal:Object.freeze({trail:`d588c940-e2d3-53f9-b1a1-7a2b3d8306e2`,hit:`bc33e423-df18-5013-b475-d0a655f6fdf7`}),wood:Object.freeze({trail:`e43de6cb-d83d-5b3e-8a04-39622e9ad3cf`,hit:`d96db087-465f-5d69-a4d9-96fcf4383a4c`}),water:Object.freeze({trail:`104615be-3b9c-560e-a43f-24deedda42f1`,hit:`77d54a1f-2269-5446-ad65-3ea7d585c403`}),fire:Object.freeze({trail:`6bffdf17-8887-5a40-89db-6127147625ce`,hit:`6b83bb25-7bd6-51a2-bb93-cebe853a241a`}),earth:Object.freeze({trail:`eea669d9-1ec9-5417-bf90-663b4671c43b`,hit:`53ead09a-ffce-5148-9019-a9bba196b49d`})}),h=Object.freeze([`metal`,`wood`,`water`,`fire`,`earth`]),g=Object.freeze({trailPoolSize:5,burstPoolSize:4,burstLifetimeSeconds:.6,activeBurstBudget:6,maximumElementsPerHit:2,maximumTrailElementsPerSword:3,totalPlayers:h.length*9}),_=.4,v=1.1;function ue(e,t=!1){let n=Number.isFinite(e)&&e>0?Math.log2(1+e/16):0;return{tier:1+ +(n>=3)+ +(n>=4.5)+ +(n>=6),scale:Math.min(v,Math.max(_,(.4+.12*n)*(t?1.1:1)))}}var y=h,b=y.length,de=g.trailPoolSize,fe=g.burstPoolSize,pe=g.burstLifetimeSeconds,me=g.activeBurstBudget,he=g.maximumElementsPerHit,ge=g.maximumTrailElementsPerSword,_e=.25,ve=64,ye=.55,be=.75,xe=.7,Se=1.2,x=[0,-1e3,0];function S(e,t,n,r=-1){let i=r>=0&&e&1<<r?1<<r:0,a=i===0?0:1;for(;a<n;){let n=-1;for(let r=0;r<b;r+=1)!(e&1<<r)||i&1<<r||(n<0||t[r]>t[n])&&(n=r);if(n<0)break;i|=1<<n,a+=1}return i}function C(e){return y.indexOf(e)}function w(e,t,n){return e??t??n}function Ce(e){return Math.round(e*10)/10}function we(e,o){let s=e.get(o,a),c=e.get(o,t);if(!s.ok||!c.ok)return;let l=new Float32Array(s.value.pos),u=s.value.quat,d=i.right(n.create(),u),f=i.up(n.create(),u),ee=i.forward(n.create(),u),p=n.create();return n.add(p,l,ee),{position:l,right:new Float32Array(d),up:new Float32Array(f),viewProjection:r.computeViewProj(r.create(),l,p,f,Number(c.value.fov),Number(c.value.aspect),Number(c.value.near),Number(c.value.far))}}function T(e){if(e&&typeof e==`object`){let t=e;if(typeof t.hint==`string`)return t.hint;if(typeof t.code==`string`)return t.code}return String(e)}function E(e){let t={available:!1,backend:`unavailable`,activeTrails:0,activeBursts:0,particlePlayers:0,emitterCount:0,triggers:0,diagnostics:0,error:e};return{sync:()=>void 0,triggerAttack:()=>void 0,triggerHit:()=>void 0,triggerSurfaceHit:()=>void 0,snapshot:()=>t,dispose:async()=>void 0}}async function D(t){let{world:n,context:r,camera:h}=t;if(!r?.renderer||!r.renderFeatureHost||!r.assets)return E(`BootstrapContext renderer/renderFeatureHost/assets are required for native particles`);let _=r.renderer,v=r.assets,D;try{D=await ee({world:n,assets:v,renderer:_,renderFeatureHost:r.renderFeatureHost,createHost:()=>re({camera:{read:e=>we(e,h)}}),label:`weapon particle host`})}catch(e){if(e instanceof u)return E(e.message);throw e}let O=async(e,t)=>{try{await D.dispose()}catch(n){throw AggregateError([e,n],`[weapon-vfx] ${t} rollback failed`)}},Te=y.flatMap(e=>[le[e].trail,le[e].hit]),k;try{k=await Promise.all(Te.map(e=>o(v,e)))}catch(e){throw await O(e,`weapon particle host after effect load rejection`),e}let A=k.find(e=>!e.ok);if(A&&!A.ok)return await O(A.error,`weapon particle host after effect load failure`),E(T(A.error));let Ee=[];for(let e of k)e.ok&&Ee.push(e.value);let j;try{j=await p(n,v,Ee)}catch(e){throw await O(e,`weapon particle host after render dependency rejection`),e}if(!j.ok)return await O(j.error,`weapon particle host after render dependency failure`),E(T(j.error));let M=[],N=d(n,D),P=[],F=[],I=[],De=0;try{let e=(e,t,r)=>{let i=n.spawn({component:a,data:{pos:[...x]}},{component:c,data:{effect:e,playing:!1,seed:r,timeScale:1}}).unwrap();return P.push(i),N.add(i,t),{entity:i,playing:!1,expiresAtTick:0,seed:r}};for(let t=0;t<b;t+=1){let r=y[t],i=k[t*2],a=k[t*2+1];if(!i.ok||!a.ok)throw Error(`[weapon-vfx] validated effects became unavailable`);De+=i.value.program.emitters.length+a.value.program.emitters.length;let o=ne(n,`ParticleEffectAsset`,i.value,`returning sword ${r} trail effect`);M.push(o);let s=ne(n,`ParticleEffectAsset`,a.value,`returning sword ${r} hit effect`);M.push(s);let c=m(1,1),l=i.value.program.emitters.map(e=>e.id),u=a.value.program.emitters.map(e=>e.id);F.push(Array.from({length:de},()=>e(o.handle,l,c))),I.push(Array.from({length:fe},()=>e(s.handle,u,c)))}te(M,`weapon VFX allocation grants`)}catch(e){let t=[e];try{N.dispose(),l({world:n,entities:P,owners:M,label:`partially created weapon VFX`})}catch(e){t.push(e)}try{await D.dispose()}catch(e){t.push(e)}try{j.value.release()}catch(e){t.push(e)}throw AggregateError(t,`[weapon-vfx] failed to create particle players`)}let L=0,R=0,z=0,B=new Int32Array(b),V=new Int32Array(b),H=new Float32Array(b),U=new Map,W=!1,G=!1,K=!1,Oe=!1,q,ke=e=>{let t=U.get(e);if(t)return t;if(U.size>=ve){let e=U.keys().next().value;e!==void 0&&U.delete(e)}return t={damage:new Float32Array(b),elements:0},U.set(e,t),t},J=(e,t,r,o,s=0,l=1,u)=>{r&&n.set(e.entity,a,u?{pos:[...t],quat:[...u.rotation],scale:[...u.scale]}:{pos:[...t],quat:i.eulerY(s),scale:[l,l,l]});let d=o!==void 0&&o!==e.seed;(e.playing!==r||d)&&(r?N.replay(e.entity):N.finish(e.entity),n.set(e.entity,c,{playing:r,...d?{seed:o}:{},timeScale:1}),e.playing=r,d&&(e.seed=o))},Ae=()=>n.hasResource(`VfxGpuRuntime`)?n.getResource(s):void 0,Y=(t,r,i,a,o,s=1)=>{let c=I[t],l=c[B[t]%c.length];if(B[t]=(B[t]+1)%c.length,!l.playing){if(z>=me){let e;for(let t of I)for(let n of t)n.playing&&(!e||n.expiresAtTick<e.expiresAtTick)&&(e=n);e&&I[t].includes(e)?l=e:e&&(e.expiresAtTick=0,J(e,x,!1),--z)}l.playing||(z+=1)}L+=1;let u=ue(a,o),d=u.scale*s*Se;J(l,r,!0,m(u.tier,d,L),i,d);let f=n.getResource(e);l.expiresAtTick=f.tick+Math.ceil(pe/f.delta)},je=[0,0,0,1],X=[1,1,1],Z=[0,0,0],Q=[0,0,0],Me={rotation:je,scale:X},Ne=(e,t,n,r)=>{let i=V[e];if(i>=de)return;V[e]=i+1,R+=1;let a,o;if(n>0){let e=ue(n);a=e.tier,o=e.scale}else o=Math.max(.4,Math.min(1.1,.4*(t.trailIntensity??t.coreGlow??1))),a=o>=.8?2:1;r&&(o*=be),t.presentation===`mount`&&(o*=ye,a=Math.max(1,a-1)),o=Math.max(.2,Ce(o*Se));let s=F[e][i];if(Me.rotation=ie(t,je),Me.scale=oe(t,X),Q[0]=t.x,Q[1]=t.y,Q[2]=t.z,ae(t,Z)){let e=(Z[1]-Z[0])/(se[1]-ce);X[2]=e;let n=Z[0]-ce*e,r=t.vy??0,i=Math.hypot(t.vx,r,t.vz);i>1e-6&&(Q[0]+=t.vx/i*n,Q[1]+=r/i*n,Q[2]+=t.vz/i*n)}J(s,Q,!0,m(a,o,i),0,1,Me)},$={sync:(t,r)=>{if(W||G)return;N.flush();let i=n.getResource(e).tick;for(let e=0;e<b;e+=1)for(let t of I[e])!t.playing||i<t.expiresAtTick||(t.expiresAtTick=0,J(t,x,!1),--z);V.fill(0),R=0;for(let e=0;e<2;e+=1){let n=e===1;for(let e=0;e<t.length;e+=1){let r=t[e];if(r.presentation===`mount`!==n)continue;let i=ke(w(r.equipmentInstanceId,r.equipmentId,r.sourceId??``)),a=C(r.element),o=a>=0?1<<a:0,s=r.secondaryElements;if(s)for(let e=0;e<s.length;e+=1){let t=C(s[e]);t>=0&&(o|=1<<t)}for(let e=0;e<b;e+=1)i.damage[e]>0&&(o|=1<<e);o=S(o,i.damage,ge,a),i.elements=o;for(let e=0;e<b;e+=1)o&1<<e&&Ne(e,r,i.damage[e],e!==a)}}for(let e=0;e<b;e+=1){let t=F[e];for(let n=V[e];n<t.length;n+=1){let e=t[n];e.playing&&J(e,x,!1)}}},triggerAttack:()=>void 0,triggerHit:(e,t)=>{if(W||G||!e.impact||!t.isAlive(e.target))return;H.fill(0);let n=e.elementalDamage;if(n)for(let e=0;e<b;e+=1)H[e]=n[y[e]]??0;else{let t=C(e.element);t>=0&&(H[t]=Math.max(0,e.final))}if(e.final>0&&(e.equipmentInstanceId!==void 0||e.equipmentId!==void 0)){let t=ke(w(e.equipmentInstanceId,e.equipmentId,``));for(let e=0;e<b;e+=1){let n=t.damage[e],r=H[e];r<=0&&n<=0||(t.damage[e]=n<=0?r:n+(r-n)*_e)}}let r=[t.getX(e.target),t.getY(e.target)+Math.max(.2,t.getHalfHeight(e.target)),t.getZ(e.target)],i=Math.atan2(e.impact.directionX,e.impact.directionZ),a=0;for(let e=0;e<b;e+=1)H[e]>0&&(a|=1<<e);a=S(a,H,he);let o=!1;for(let t=0;t<b;t+=1)a&1<<t&&(Y(t,r,i,H[t],e.critical),o=!0);if(!o){let t=C(e.presentationElement??e.element);t>=0&&Y(t,r,i,0,!1)}},triggerSurfaceHit:e=>{if(W||G)return;let t=w(e.equipmentInstanceId,e.equipmentId,``),n=t===``?void 0:U.get(t),r=n&&S(n.elements,n.damage,he)||1;for(let t=0;t<b;t+=1)r&1<<t&&Y(t,e.position,0,n?.damage[t]??0,!1,xe)},snapshot:()=>{let e=_.inspect().featureDiagnostics.find(e=>e.identity===`forgeax.vfx-render.gpu-particles`),t=!W&&!G&&e?.status===`active`;return{available:t,backend:t?`forgeax-native-gpu-particles`:`unavailable`,activeTrails:R,activeBursts:z,particlePlayers:g.totalPlayers,emitterCount:De,triggers:L,diagnostics:Ae()?.diagnostics().length??0,error:e?.latestError?T(e.latestError):null}},dispose:()=>G?Promise.resolve():q||(W=!0,q=(async()=>{let e=[];if(P.length>0)try{N.dispose(),f(n,P,`weapon VFX players`)}catch(t){e.push(t)}if(P.length===0&&!K)try{await D.dispose(),K=!0}catch(t){e.push(t)}if(P.length===0&&K&&!Oe)try{j.value.release(),Oe=!0}catch(t){e.push(t)}if(e.length>0)throw AggregateError(e,`[weapon-vfx] failed to dispose particle players`);G=!0})().then(()=>{q=void 0},e=>{throw q=void 0,e}),q)};if(r.registerCleanup)try{r.registerCleanup($.dispose)}catch(e){try{await $.dispose()}catch(t){throw AggregateError([e,t],`[weapon-vfx] cleanup registration and rollback failed`)}throw e}return $}export{D as createReturningSwordParticleVfx};