import{n as e}from"./game-ui-ornaments-C3Sh9WzX.js";import{i as t,n,r}from"./loadout-readout-GJ_h-tvx.js";import{i,t as a}from"./icon-stat-BxcXtNLI.js";var o=e=>e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),s=e=>`${t(e*100)}%`,c=e=>`${e>=0?`+`:``}${t(e)}`,l=(e,t,n=``)=>`<div${n?` data-numerical="${n}"`:``}><span>${e}</span><b>${o(t)}</b></div>`;function u(e){if(!e)return;let t=Math.min(e.physicalEffectiveHealth??1/0,e.spellEffectiveHealth??1/0);return Number.isFinite(t)?t:null}var d=e=>{let n=u(e);return n===void 0?`—`:n===null?`免伤`:t(n,0)},f=`生存 = 物理与术法有效气血中的较小值，即较弱防御侧可承受的中立同境界伤害。有效气血 = 气血上限 ÷ (1 − 对应减伤)。不把回血、移动速度或条件效果折算进主值。`;function p(t,n){let r=e=>{if(t?.empty)return`0`;if(!e||e.quality===`invalid`)return`—`;let n=e.dps.toLocaleString(`zh-CN`,{notation:`compact`,useGrouping:!1,maximumFractionDigits:e.dps>=1e3&&e.dps<1e4?0:1});return`${e.quality===`stable`?``:`≈`}${n}`},i=(t,n,r,i=``)=>`<span class="strength-readout__stat" title="${o(n)}" aria-label="${o(`${n} ${r}`)}">${e(t)}<b${i?` ${i}`:``}>${o(r)}</b></span>`;return i(`currentDps`,`理想总秒伤 · 逐件完整循环求和；可持续输出见角色属性`,r(t?.total),`data-total-dps`)+i(`physicalGuard`,`生存 · 保守有效气血；详情见角色属性`,d(n),`data-survival`)}function m(e,n){let i=e?.empty?`未装武器`:e?.error&&!e.total?`不可用`:r(e?.total),a=n?.conditionalRegeneration.reduce((e,t)=>e+t.healthPerSecond,0)??0,c=n?.continuousHealthPerSecond||a,l=n?.continuousHealthPerSecond?`回血`:a?`脱战回血`:`回血`;return`<div class="strength-readout__headline"><span>理想总秒伤 <small>伤害/秒</small></span><b data-total-dps>${o(i)}</b></div>
    <div class="strength-readout__supply">可持续秒伤 <b data-current-dps>${o(e?.empty?`0`:e?.error&&!e.current?`不可用`:r(e?.current))}</b> <small>伤害/秒</small></div>
    ${n?`<div class="strength-readout__survival">气血 <b>${t(n.maximumHealth,0)}</b> · ${l} <b>${t(c)}</b>/秒</div><div class="strength-readout__survival">减伤 · 物理 <b>${s(n.physicalReduction)}</b> · 术法 <b>${s(n.spellReduction)}</b></div>`:``}`}function h(e,r=``){if(e.quality===`invalid`)return`<p>${o(e.reason)}</p>`;if(e.ideal)return g(e,r);let i=e.qi;return`<div class="numerical-evidence">${l(`测量状态`,n(e))}
    ${l(`伤害 ÷ 秒数 = 秒伤`,`${t(e.damage)} ÷ ${t(e.measuredSeconds)} = ${t(e.dps)}`,`dps-equation`)}
    ${l(`灵力效率`,e.damagePerQi===null?`未消耗灵力`:`${t(e.damagePerQi)} 伤害/灵力`)}
    <p>先运行 ${t(e.warmupSeconds)} 秒进入循环，再统计上述时间。所有装备共享本人供灵；装备自身产灵按实际机制保留，见下方账本。</p>
    <p>木桩距本人 ${e.target.distanceMeters} 米、半径 ${e.target.radiusMeters} 米，五行中立、无防御。全自动出击，包含充能、起手、飞行、命中耗灵与归位。</p>
    <details data-numerical-fold="${r}${e.supply}-ledger"><summary>灵力去了哪里</summary><div class="numerical-evidence">
    ${l(`期初储量`,t(i.startingStored))}
    ${l(`＋ 新供给`,t(i.supplied))}
    ${l(`－ 最终消耗`,t(i.spent))}
    ${l(`－ 溢出损失`,t(i.discarded))}
    ${l(`＝ 期末储量`,t(i.stored))}
    <p>储量包含本人及所有装备。供给来自本人 ${t(i.ownerSupplied)}、剑体自回 ${t(i.swordSelfSupplied)}；消耗来自本人 ${t(i.ownerSpent)}、装备 ${t(i.weaponSpent)}。</p>
    <p>本人转给剑体 ${t(i.internalTransfers)} 灵力，是内部转移，已包含在储量流动中，不重复算消耗。灵力效率 = ${t(e.damage)} 伤害 ÷ ${t(i.spent)} 消耗。</p>
    </div></details>
    <details data-numerical-fold="${r}${e.supply}-cycles"><summary>${e.equipment.length>1?`逐件贡献与飞行循环`:`飞行循环与器命`}</summary>
    <p>贡献来自这次同场测量。阶段时间为抽样近似值，同一装备的多个剑体分别累计；阶段时长不用于反推伤害。</p>
    ${e.equipment.map(v).join(``)}</details>
    ${e.quality===`stable`?``:`<p>${o(e.reason)}</p>`}</div>`}function g(e,n){let r=e.ideal;return`<div class="numerical-evidence">${l(`计算口径`,`理想长期平均 · 数学公式`)}
    ${l(`整套秒伤`,`${e.equipment.map(e=>t(e.dps,2)).join(` + `)||`0`} = ${t(e.dps,2)} 伤害/秒`,`dps-equation`)}
    ${l(e.supply===`total`?`理想循环需灵`:`本人供灵`,`${t(r.ownerSupplyQiPerSecond,3)} 灵力/秒${e.supply===`total`?`，供灵充足的能力参考`:`，整套共享`}`)}
    ${r.ownerRecoveryQiPerSecond===void 0?``:l(`当前本人回灵`,`${t(r.ownerRecoveryQiPerSecond,3)} 灵力/秒`)}
    ${l(`循环实际需求 / 剩余供灵`,`${t(r.allocatedQiPerSecond,3)} / ${t(r.unusedQiPerSecond,3)} 灵力/秒`)}
    ${l(`灵力效率`,e.damagePerQi===null?`循环无需净外部供灵`:`${t(e.damagePerQi,2)} 伤害/实际消耗灵力`)}
    <p>${e.supply===`total`?`每件理想秒伤 = 每循环平均伤害 ÷ 完整机械周期 + 状态伤害贡献；整套为各件之和。机械周期包含本器起手、飞行、返航和传灵充能。供灵充足、逐件独立评估；实际共享回灵与人物指令限制见可持续秒伤。`:`每件可持续秒伤 = 每循环平均伤害 ÷ max(机械周期, 净耗灵 ÷ 分配供灵) + 状态伤害贡献，再计入共享指令上限。分配量为 0 且需要外部供灵时，该装备不能持续输出。`}</p>
    <details data-numerical-fold="${n}${e.supply}-assumptions"><summary>理想条件与未计入收益</summary>
      <p>木桩距本人 ${e.target.distanceMeters} 米。${r.assumptions.map(o).join(`；`)}。</p></details>
    <details open data-numerical-fold="${n}${e.supply}-cycles"><summary>逐件公式与循环</summary>
    ${e.equipment.map(e=>{let n=e.ideal;return`<div class="numerical-equipment-evidence"><strong>${o(e.name)} · 阵位 ${e.slotIndex+1}</strong><div class="numerical-evidence">
        ${l(`秒伤贡献`,`${t(e.dps,2)} 伤害/秒 · ${n.bottleneck}`)}
        ${l(`每循环平均伤害 / 命中`,`${t(n.damagePerCycle,2)} / ${t(n.hitsPerCycle,0)} 次`)}
        ${l(`净耗灵 = 总耗灵 − 自产灵`,`${t(n.netQiPerCycle,3)} = ${t(n.grossQiPerCycle,3)} − ${t(n.selfQiPerCycle,3)}`)}
        ${l(`分到供灵`,`${t(n.supplyQiPerSecond,3)} 灵力/秒`)}
        ${n.transferQiPerSecond===void 0||n.autonomous?``:l(`补灵量 ÷ 传灵速度 = 时间`,`${t(n.netQiPerCycle,3)} 灵 ÷ ${t(n.transferQiPerSecond,3)} 灵/秒 = ${t(n.refillSeconds,3)} 秒`)}
        ${l(`机械周期 / 最终周期`,`${t(n.mechanicalSeconds,3)} / ${t(n.cycleSeconds,3)} 秒`)}
        ${l(`人物起手 / 器体蓄力`,`${t(n.bodySeconds,3)} / ${t(n.chargeSeconds,3)} 秒`)}
        ${n.firstContactSeconds===void 0?``:l(`首击参考（满灵）`,`${t(n.firstContactSeconds,3)} 秒`)}
        ${l(`外飞巡击 / 返航 / 补灵`,`${t(n.outboundSeconds,3)} / ${t(n.returnSeconds,3)} / ${t(n.refillSeconds,3)} 秒`)}
        ${n.outboundMetersPerSecond===void 0?l(`持续阶段 / 冷却`,`${t(n.activeSeconds,3)} / ${t(n.cooldownSeconds,3)} 秒`):l(`出击 / 返航速度`,`${t(n.outboundMetersPerSecond,2)} / ${t(n.returnMetersPerSecond,2)} 米/秒`)}
        ${n.statusDamagePerSecond?l(`持续伤害`,`${t(n.statusDamagePerSecond,2)} 伤害/秒`):``}
        ${n.notes.map(e=>`<p>${o(e)}</p>`).join(``)}
      </div></div>`}).join(``)}<p>首击参考从资源就绪开始，按起手、蓄力及到木桩中心的飞行/生效延迟计算；实际碰撞可能更早。每次重新出手都计入起手，供灵受限时，首击提前不一定提高长期标准秒伤。</p></details></div>`}var _={"docked-charging":`归位补灵 / 等待出击`,departing:`离位出击`,"hunting-leg":`在外巡击`,returning:`返航`,"disabled-docked":`器命不足停摆`,ready:`就绪`,charging:`蓄力`,outbound:`外飞`,cooldown:`冷却`,idle:`待机`};function v(e){return`<div class="numerical-equipment-evidence"><strong>${o(e.name)} · 阵位 ${e.slotIndex+1}</strong>
    <div class="numerical-evidence">${l(`同场秒伤贡献`,`${t(e.damage)} 伤害 → ${t(e.dps)}/秒`)}
    ${l(`出击 / 接触次数`,`${e.launches} / ${e.contacts}`)}
    ${l(`每次接触对应伤害`,t(e.averageDamagePerContact))}
    ${Object.entries(e.phaseSeconds).map(([e,n])=>l(o(_[e]??e),`约 ${t(n)} 秒`)).join(``)}
    ${e.remainingHealth===null?``:l(`结束时器命`,`${t(e.remainingHealth)} / ${t(e.maximumHealth)}`)}
    </div></div>`}function y(e,n){return`<p>理想总秒伤 = 各装备完整循环的秒伤之和，包含起手、飞行、命中耗灵、返航与传灵充能，按供灵充足、逐件独立评估。可持续秒伤再计入本人当前回灵和共享指令限制。两项均为单木桩的数学参考，不是实战采样。</p>
    ${e?.error?`<p role="status">${o(e.error)}</p>`:``}
    ${e?.total?`<details open data-numerical-fold="total"><summary>理想总秒伤 · 逐件贡献与计算依据</summary>${h(e.total)}</details>`:`<p>配置变化后立即按同一公式计算。</p>`}
    ${e?.current?`<details data-numerical-fold="current"><summary>可持续秒伤 · 当前回灵与共享指令</summary>${h(e.current)}</details>`:``}
    ${e?.standard?`<details data-numerical-fold="standard"><summary>效率参考 · 整套 1 灵力／秒</summary>${h(e.standard)}</details>`:``}
    ${n?`<p>${f}</p><div class="numerical-evidence">${l(`生存主值`,d(n))}${l(`物理有效气血`,n.physicalEffectiveHealth===null?`不承受此类伤害`:t(n.physicalEffectiveHealth,0))}${l(`术法有效气血`,n.spellEffectiveHealth===null?`不承受此类伤害`:t(n.spellEffectiveHealth,0))}${l(`移动速度`,`${t(n.moveMetersPerSecond)} 米/秒`)}<p>有效气血 = 气血上限 ÷ 实际承伤比例；以同境界中立伤害为准，未把回血折算进去。</p>${n.conditionalRegeneration.map(e=>`<p>${e.damageDelaySeconds} 秒未受伤后，每秒回复 ${t(e.healthPerSecond)} 气血。</p>`).join(``)}</div>`:``}`}function b(e,t){let n=e.scrollTop,r=e.ownerDocument.activeElement,i=r?.tagName===`SUMMARY`&&e.contains(r)?r.parentElement.dataset.numericalFold:void 0,a=new Map(Array.from(e.querySelectorAll(`[data-numerical-fold]`),e=>[e.dataset.numericalFold,e.open]));e.innerHTML=t;for(let t of e.querySelectorAll(`[data-numerical-fold]`)){let e=a.get(t.dataset.numericalFold);e!==void 0&&(t.open=e),i!==void 0&&t.dataset.numericalFold===i&&t.querySelector(`:scope > summary`)?.focus({preventScroll:!0})}e.scrollTop=n}function x(n,a){let o=n.solo,p=n.survivalBefore,m=n.survivalAfter,g=n.before?.quality===`stable`&&n.after?.quality===`stable`?n.after.dps-n.before.dps:void 0,_=!!(o||n.attackEquipment),v=_?n.contribution===void 0?o?r(o):`—`:t(n.contribution):g===void 0?`—`:c(g),y=i({id:`item-dps`,icon:e(`currentDps`),label:`理想秒伤`,value:v,valueAttribute:`data-item-dps`,pin:!0,detail:`${_?`本器的理想秒伤贡献：按完整循环计算，单位为伤害/秒；有试配整套时，使用与角色总值相同的逐件贡献。`:`此物品没有独立攻击；主值为穿戴后整套理想总秒伤的增量。`}${n.error??n.note}`,explanation:`<div data-equipment-section-body="damage"></div><div class="numerical-evidence">
      ${n.currentSupply?l(`单件独享当前回灵时的参考秒伤`,r(n.currentSupply)):``}
      ${o?l(`灵力效率`,o.damagePerQi===null?`无需净外部供灵，效率不适用`:`${t(o.damagePerQi)} 伤害/灵力`):``}
      ${n.contribution===void 0?``:l(`本器在整套理想总秒伤中的贡献`,t(n.contribution))}
      ${g===void 0?``:l(`穿戴后整套秒伤增量`,c(g))}</div>
      ${o?`<details><summary>单件独立循环参考</summary>${h(o,`item-`)}</details>`:``}
      ${n.standardReference?`<details><summary>效率参考 · 单件 1 灵力／秒</summary>${h(n.standardReference,`standard-`)}</details>`:``}
      ${n.currentSupply?`<details><summary>单件供灵参考公式</summary>${h(n.currentSupply,`current-`)}</details>`:``}
      ${n.before&&n.after?`<details><summary>整套贡献与换装依据</summary><h4>比较前</h4>${h(n.before,`before-`)}<h4>比较后</h4>${h(n.after,`after-`)}</details>`:``}`}),b=m??p,x=b?`<div class="numerical-evidence">
    ${l(`气血上限`,t(b.maximumHealth,0))}
    ${l(`物理 / 术法减伤`,`${s(b.physicalReduction)} / ${s(b.spellReduction)}`)}
    ${l(`物理有效气血`,b.physicalEffectiveHealth===null?`免伤`:t(b.physicalEffectiveHealth,0))}
    ${l(`术法有效气血`,b.spellEffectiveHealth===null?`免伤`:t(b.spellEffectiveHealth,0))}
    ${l(`移动速度`,`${t(b.moveMetersPerSecond)} 米/秒`)}
    ${l(`持续回血`,`${t(b.continuousHealthPerSecond)} 气血/秒`)}
    ${p&&m?l(`比较前 → 比较后生存`,`${d(p)} → ${d(m)}`):``}
    ${b.conditionalRegeneration.map(e=>`<p>${e.damageDelaySeconds} 秒未受伤后，每秒回复 ${t(e.healthPerSecond)} 气血。</p>`).join(``)}</div>`:``,S=u(p),C=u(m),w=typeof S==`number`&&typeof C==`number`?C-S:void 0,T=i({id:`item-survival`,icon:e(`physicalGuard`),label:`生存提升`,value:w===void 0?`—`:c(w),pin:!0,detail:w===void 0?`此物品暂无可比较的承伤提升点数；实际效果见下方明细。`:`穿戴后 − 穿戴前 = ${c(w)} 点额外承伤量，不是百分比。${f}`,explanation:`<div data-equipment-section-body="survival"></div>${x}`});return`<section class="equipment-numerics" aria-label="伤害与生存" ${!n.pending&&!n.error?`data-equipment-numerics-ready`:``}><div class="equipment-primary-stats">${y}${T}</div></section>`}var S=`${a}
.strength-readout{pointer-events:auto;font-size:11px;color:var(--ui-text)}
.strength-readout>summary{list-style:none;cursor:pointer}.strength-readout>summary::-webkit-details-marker{display:none}
.strength-readout>summary:focus-visible{outline:2px solid var(--ui-jade);outline-offset:3px}
.strength-readout__headline{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-size:12px}
.strength-readout__headline small{font-size:9px;color:var(--ui-muted);white-space:nowrap}
.strength-readout__headline>b{font:600 20px var(--ui-font-number);color:var(--ui-jade);font-variant-numeric:tabular-nums}
.strength-readout__supply,.strength-readout__survival{font-size:10px;line-height:1.8;color:var(--ui-muted)}
.strength-readout__supply b,.strength-readout__survival b{color:var(--ui-text);font-weight:500}
.strength-readout__detail{position:absolute;z-index:5;width:280px;max-height:55vh;overflow:auto;background:var(--ui-panel);border:1px solid var(--ui-line);border-radius:5px;padding:12px;box-shadow:0 8px 22px #0006}
.strength-readout__detail p,.equipment-numerics p{font-size:10px;line-height:1.65;color:var(--ui-muted);margin:7px 0}
.numerical-evidence>div:not(.numerical-equipment-evidence){display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-size:11px;margin:5px 0}
.numerical-evidence span{color:var(--ui-muted)}
.numerical-evidence b,.equipment-numerics>div>b{font-variant-numeric:tabular-nums}
.numerical-evidence b{overflow-wrap:anywhere;text-align:right;max-width:65%}
.numerical-equipment-evidence{border-top:1px solid var(--ui-line);padding-top:7px;margin-top:9px;font-size:11px}
.numerical-equipment-evidence>strong{font-weight:500;color:var(--ui-text)}
.strength-readout__detail summary,.numerical-evidence summary{cursor:pointer;min-height:32px;display:flex;align-items:center;font-size:11px}
.equipment-primary-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.equipment-primary-stats>.icon-stat{min-height:48px;cursor:pointer}.equipment-primary-stats>.icon-stat>b{font-size:20px}
.equipment-numerics{padding:10px 0;border-bottom:1px solid var(--ui-line);margin-bottom:8px}
.equipment-numerics details{font-size:11px;margin-top:8px}.equipment-numerics summary{cursor:pointer;min-height:32px;display:flex;align-items:center}
`;export{x as a,b as c,h as i,u as l,f as n,y as o,p as r,m as s,S as t};