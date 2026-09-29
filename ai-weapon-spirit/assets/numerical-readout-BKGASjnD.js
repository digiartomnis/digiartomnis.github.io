import{n as e}from"./game-ui-ornaments-HcVQH4qQ.js";import{i as t,t as n}from"./icon-stat-Dq4haosb.js";import{a as r,t as i}from"./weapon-damage-formula-BEs5cMfk.js";import{i as a,n as o,r as s}from"./loadout-readout-iK2P11jt.js";import{n as c}from"./weapon-dps-formula-DCy23gw-.js";var l=e=>e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),u=e=>`${a(e*100)}%`,d=e=>`${e>=0?`+`:``}${a(e)}`,f=(e,t,n=``)=>`<div${n?` data-numerical="${n}"`:``}><span>${e}</span><b>${l(t)}</b></div>`;function p(e){if(!e)return;let t=Math.min(e.physicalEffectiveHealth??1/0,e.spellEffectiveHealth??1/0);return Number.isFinite(t)?t:null}var m=e=>{let t=p(e);return t===void 0?`—`:t===null?`免伤`:a(t,0)},h=`生存 = 物理与术法有效气血中的较小值，即较弱防御侧可承受的中立同境界伤害。有效气血 = 气血上限 ÷ (1 − 对应减伤)。不把回血、移动速度或条件效果折算进主值。`;function g(t,n){let r=e=>{if(t?.empty)return`0`;if(!e||e.quality===`invalid`)return`—`;let n=e.dps.toLocaleString(`zh-CN`,{notation:`compact`,useGrouping:!1,maximumFractionDigits:e.dps>=1e3&&e.dps<1e4?0:1});return`${e.quality===`stable`?``:`≈`}${n}`},i=(t,n,r,i=``)=>`<span class="strength-readout__stat" title="${l(n)}" aria-label="${l(`${n} ${r}`)}">${e(t)}<b${i?` ${i}`:``}>${l(r)}</b></span>`;return i(`currentDps`,`可持续秒伤 · 计入当前回灵与共享指令限制`,r(t?.current),`data-current-dps`)+i(`physicalGuard`,`生存 · 保守有效气血；详情见角色属性`,m(n),`data-survival`)}function _(e,t){let n=e?.empty?`未装武器`:e?.error&&!e.current?`不可用`:s(e?.current),r=t?.conditionalRegeneration.reduce((e,t)=>e+t.healthPerSecond,0)??0,i=t?.continuousHealthPerSecond||r,o=t?.continuousHealthPerSecond?`回血`:r?`脱战回血`:`回血`;return`<div class="strength-readout__headline"><span>可持续秒伤 <small>伤害/秒</small></span><b data-current-dps>${l(n)}</b></div>
    ${t?`<div class="strength-readout__survival">气血 <b>${a(t.maximumHealth,0)}</b> · ${o} <b>${a(i)}</b>/秒</div><div class="strength-readout__survival">减伤 · 物理 <b>${u(t.physicalReduction)}</b> · 术法 <b>${u(t.spellReduction)}</b></div>`:``}`}function v(e,t=``){if(e.quality===`invalid`)return`<p>${l(e.reason)}</p>`;if(e.ideal)return y(e,t);let n=e.qi;return`<div class="numerical-evidence">${f(`测量状态`,o(e))}
    ${f(`伤害 ÷ 秒数 = 秒伤`,`${a(e.damage)} ÷ ${a(e.measuredSeconds)} = ${a(e.dps)}`,`dps-equation`)}
    ${f(`灵力效率`,e.damagePerQi===null?`未消耗灵力`:`${a(e.damagePerQi)} 伤害/灵力`)}
    <p>先运行 ${a(e.warmupSeconds)} 秒进入循环，再统计上述时间。所有装备共享本人供灵；装备自身产灵按实际机制保留，见下方账本。</p>
    <p>木桩距本人 ${e.target.distanceMeters} 米、半径 ${e.target.radiusMeters} 米，五行中立、无防御。全自动出击，包含充能、起手、飞行、命中耗灵与归位。</p>
    <details data-numerical-fold="${t}${e.supply}-ledger"><summary>灵力去了哪里</summary><div class="numerical-evidence">
    ${f(`期初储量`,a(n.startingStored))}
    ${f(`＋ 新供给`,a(n.supplied))}
    ${f(`－ 最终消耗`,a(n.spent))}
    ${f(`－ 溢出损失`,a(n.discarded))}
    ${f(`＝ 期末储量`,a(n.stored))}
    <p>储量包含本人及所有装备。供给来自本人 ${a(n.ownerSupplied)}、剑体自回 ${a(n.swordSelfSupplied)}；消耗来自本人 ${a(n.ownerSpent)}、装备 ${a(n.weaponSpent)}。</p>
    <p>本人转给剑体 ${a(n.internalTransfers)} 灵力，是内部转移，已包含在储量流动中，不重复算消耗。灵力效率 = ${a(e.damage)} 伤害 ÷ ${a(n.spent)} 消耗。</p>
    </div></details>
    <details data-numerical-fold="${t}${e.supply}-cycles"><summary>${e.equipment.length>1?`逐件贡献与飞行循环`:`飞行循环与器命`}</summary>
    <p>贡献来自这次同场测量。阶段时间为抽样近似值，同一装备的多个剑体分别累计；阶段时长不用于反推伤害。</p>
    ${e.equipment.map(x).join(``)}</details>
    ${e.quality===`stable`?``:`<p>${l(e.reason)}</p>`}</div>`}function y(e,t){let n=e.ideal;return`<div class="numerical-evidence">${f(`计算口径`,e.supply===`current`?`当前配装可持续输出 · 数学参考`:`理想长期平均 · 数学公式`)}
    ${f(`整套秒伤`,`${e.equipment.map(e=>a(e.dps,2)).join(` + `)||`0`} = ${a(e.dps,2)} 伤害/秒`,`dps-equation`)}
    ${f(e.supply===`total`?`理想循环需灵`:`本人供灵`,`${a(n.ownerSupplyQiPerSecond,3)} 灵力/秒${e.supply===`total`?`，供灵充足的能力参考`:`，整套共享`}`)}
    ${n.ownerRecoveryQiPerSecond===void 0?``:f(`当前本人回灵`,`${a(n.ownerRecoveryQiPerSecond,3)} 灵力/秒`)}
    ${f(`循环实际需求 / 剩余供灵`,`${a(n.allocatedQiPerSecond,3)} / ${a(n.unusedQiPerSecond,3)} 灵力/秒`)}
    ${f(`灵力效率`,e.damagePerQi===null?`循环无需净外部供灵`:`${a(e.damagePerQi,2)} 伤害/实际消耗灵力`)}
    <p>${e.supply===`total`?`每件理想秒伤 = 每循环平均伤害 ÷ 完整机械周期 + 状态伤害贡献；整套为各件之和。机械周期包含本器起手、飞行、返航和传灵充能。供灵充足、逐件独立评估；实际共享回灵与人物指令限制见可持续秒伤。`:`每件可持续秒伤 = 每循环平均伤害 ÷ max(机械周期, 净耗灵 ÷ 分配供灵) + 状态伤害贡献，再计入共享指令上限。分配量为 0 且需要外部供灵时，该装备不能持续输出。`}</p>
    <details data-numerical-fold="${t}${e.supply}-assumptions"><summary>理想条件与未计入收益</summary>
      <p>木桩距本人 ${e.target.distanceMeters} 米。${n.assumptions.map(l).join(`；`)}。</p></details>
    <details open data-numerical-fold="${t}${e.supply}-cycles"><summary>逐件公式与循环</summary>
    ${e.equipment.map(e=>{let t=e.ideal;return`<div class="numerical-equipment-evidence"><strong>${l(e.name)} · 阵位 ${e.slotIndex+1}</strong><div class="numerical-evidence">
        ${f(`秒伤贡献`,`${a(e.dps,2)} 伤害/秒 · ${t.bottleneck}`)}
        ${f(`每循环平均伤害 / 命中`,`${a(t.damagePerCycle,2)} / ${a(t.hitsPerCycle,0)} 次`)}
        ${f(`净耗灵 = 总耗灵 − 自产灵`,`${a(t.netQiPerCycle,3)} = ${a(t.grossQiPerCycle,3)} − ${a(t.selfQiPerCycle,3)}`)}
        ${f(`分到供灵`,`${a(t.supplyQiPerSecond,3)} 灵力/秒`)}
        ${t.transferQiPerSecond===void 0||t.autonomous?``:f(`补灵量 ÷ 传灵速度 = 时间`,`${a(t.netQiPerCycle,3)} 灵 ÷ ${a(t.transferQiPerSecond,3)} 灵/秒 = ${a(t.refillSeconds,3)} 秒`)}
        ${f(`机械周期 / 最终周期`,`${a(t.mechanicalSeconds,3)} / ${a(t.cycleSeconds,3)} 秒`)}
        ${f(`人物起手 / 器体蓄力`,`${a(t.bodySeconds,3)} / ${a(t.chargeSeconds,3)} 秒`)}
        ${t.firstContactSeconds===void 0?``:f(`首击参考（满灵）`,`${a(t.firstContactSeconds,3)} 秒`)}
        ${f(`外飞巡击 / 返航 / 补灵`,`${a(t.outboundSeconds,3)} / ${a(t.returnSeconds,3)} / ${a(t.refillSeconds,3)} 秒`)}
        ${t.outboundMetersPerSecond===void 0?f(`持续阶段 / 冷却`,`${a(t.activeSeconds,3)} / ${a(t.cooldownSeconds,3)} 秒`):f(`出击 / 返航速度`,`${a(t.outboundMetersPerSecond,2)} / ${a(t.returnMetersPerSecond,2)} 米/秒`)}
        ${t.statusDamagePerSecond?f(`持续伤害`,`${a(t.statusDamagePerSecond,2)} 伤害/秒`):``}
        ${t.notes.map(e=>`<p>${l(e)}</p>`).join(``)}
      </div></div>`}).join(``)}<p>首击参考从资源就绪开始，按起手、蓄力及到木桩中心的飞行/生效延迟计算；实际碰撞可能更早。每次重新出手都计入起手，供灵受限时，首击提前不一定提高长期标准秒伤。</p></details></div>`}var b={"docked-charging":`归位补灵 / 等待出击`,departing:`离位出击`,"hunting-leg":`在外巡击`,returning:`返航`,"disabled-docked":`器命不足停摆`,ready:`就绪`,charging:`蓄力`,outbound:`外飞`,cooldown:`冷却`,idle:`待机`};function x(e){return`<div class="numerical-equipment-evidence"><strong>${l(e.name)} · 阵位 ${e.slotIndex+1}</strong>
    <div class="numerical-evidence">${f(`同场秒伤贡献`,`${a(e.damage)} 伤害 → ${a(e.dps)}/秒`)}
    ${f(`出击 / 接触次数`,`${e.launches} / ${e.contacts}`)}
    ${f(`每次接触对应伤害`,a(e.averageDamagePerContact))}
    ${Object.entries(e.phaseSeconds).map(([e,t])=>f(l(b[e]??e),`约 ${a(t)} 秒`)).join(``)}
    ${e.remainingHealth===null?``:f(`结束时器命`,`${a(e.remainingHealth)} / ${a(e.maximumHealth)}`)}
    </div></div>`}function S(e,t){return`<p>可持续秒伤按当前配装的完整攻击循环计算，计入当前回灵、多件器物共享供灵和人物指令限制。只统计开启自动释放的器物；这是中立单木桩的长期平均参考，实战伤害随目标、站位与命中变化。</p>
    ${e?.error?`<p role="status">${l(e.error)}</p>`:``}
    ${e?.current?`<details open data-numerical-fold="current"><summary>可持续秒伤 · 逐件贡献与计算依据</summary>${v(e.current)}</details>`:`<p>配置变化后立即按同一公式计算。</p>`}
    ${t?`<p>${h}</p><div class="numerical-evidence">${f(`生存主值`,m(t))}${f(`物理有效气血`,t.physicalEffectiveHealth===null?`不承受此类伤害`:a(t.physicalEffectiveHealth,0))}${f(`术法有效气血`,t.spellEffectiveHealth===null?`不承受此类伤害`:a(t.spellEffectiveHealth,0))}${f(`移动速度`,`${a(t.moveMetersPerSecond)} 米/秒`)}<p>有效气血 = 气血上限 ÷ 实际承伤比例；以同境界中立伤害为准，未把回血折算进去。</p>${t.conditionalRegeneration.map(e=>`<p>${e.damageDelaySeconds} 秒未受伤后，每秒回复 ${a(e.healthPerSecond)} 气血。</p>`).join(``)}</div>`:``}`}function C(e,t){let n=e.scrollTop,r=e.ownerDocument.activeElement,i=r?.tagName===`SUMMARY`&&e.contains(r)?r.parentElement.dataset.numericalFold:void 0,a=new Map(Array.from(e.querySelectorAll(`[data-numerical-fold]`),e=>[e.dataset.numericalFold,e.open]));e.innerHTML=t;for(let t of e.querySelectorAll(`[data-numerical-fold]`)){let e=a.get(t.dataset.numericalFold);e!==void 0&&(t.open=e),i!==void 0&&t.dataset.numericalFold===i&&t.querySelector(`:scope > summary`)?.focus({preventScroll:!0})}e.scrollTop=n}function w(n,i){let o=n.solo,l=n.survivalBefore,g=n.survivalAfter,_=n.comparison===!0,y=n.before?.quality===`stable`&&n.after?.quality===`stable`?n.after.dps-n.before.dps:void 0,b=!!(o||n.attackEquipment),x=b&&n.automaticAttackEnabled===!1,S=x?o?s(o):`—`:b?n.contribution===void 0?o?s(o):`—`:a(n.contribution):y===void 0?`—`:d(y),C=t({id:`item-dps`,icon:e(`currentDps`),label:x?`单件参考秒伤`:b?`可持续秒伤`:_?`换装秒伤变化`:`秒伤支援`,value:S,valueAttribute:`data-item-dps`,pin:!0,detail:`${x?`主值显示开启自动释放时的单件可持续秒伤参考，单位为伤害/秒；当前自动输出贡献为 0，不计入角色总秒伤。`:b?`本器的可持续秒伤贡献：计入当前回灵与完整攻击循环，单位为伤害/秒；有试配整套时，使用与角色总值相同的逐件贡献。`:_?`此物品没有独立攻击；主值为替换当前防具后整套可持续秒伤的变化，负数表示换装后降低。`:`此物品没有独立攻击；主值为本件从同部位空槽提供的整套可持续秒伤支援。`}${n.error??n.note}`,explanation:`${n.damageFormula?r(n.damageFormula,c(n,S)):``}<div data-equipment-section-body="damage"></div><div class="numerical-evidence">
      ${o?f(`灵力效率`,o.damagePerQi===null?`无需净外部供灵，效率不适用`:`${a(o.damagePerQi)} 伤害/灵力`):``}
      ${n.contribution===void 0?``:f(`本器在整套可持续秒伤中的贡献`,a(n.contribution))}
      ${y===void 0?``:f(_?`换装后整套秒伤变化`:`本件带来的整套秒伤贡献`,d(y))}</div>
      ${o?`<details><summary>单件供灵与循环依据</summary>${v(o,`item-`)}</details>`:``}
      ${n.before&&n.after?`<details><summary>${_?`换装比较依据`:`本件贡献依据`}</summary><h4>${_?`当前整套`:`不含本件`}</h4>${v(n.before,`before-`)}<h4>${_?`替换后整套`:`包含本件`}</h4>${v(n.after,`after-`)}</details>`:``}`}),w=g??l,T=w?`<div class="numerical-evidence">
    ${f(`气血上限`,a(w.maximumHealth,0))}
    ${f(`物理 / 术法减伤`,`${u(w.physicalReduction)} / ${u(w.spellReduction)}`)}
    ${f(`物理有效气血`,w.physicalEffectiveHealth===null?`免伤`:a(w.physicalEffectiveHealth,0))}
    ${f(`术法有效气血`,w.spellEffectiveHealth===null?`免伤`:a(w.spellEffectiveHealth,0))}
    ${f(`移动速度`,`${a(w.moveMetersPerSecond)} 米/秒`)}
    ${f(`持续回血`,`${a(w.continuousHealthPerSecond)} 气血/秒`)}
    ${l&&g?f(_?`当前 → 换装后生存`:`不含本件 → 包含本件生存`,`${m(l)} → ${m(g)}`):``}
    ${w.conditionalRegeneration.map(e=>`<p>${e.damageDelaySeconds} 秒未受伤后，每秒回复 ${a(e.healthPerSecond)} 气血。</p>`).join(``)}</div>`:``,E=p(l),D=p(g),O=typeof E==`number`&&typeof D==`number`?D-E:void 0,k=t({id:`item-survival`,icon:e(`physicalGuard`),label:_?`换装生存变化`:`生存贡献`,value:O===void 0?`—`:d(O),valueAttribute:`data-item-survival`,pin:!0,detail:O===void 0?`此物品暂无可计算的承伤贡献点数；实际效果见下方明细。`:`${_?`换装后 − 当前`:`包含本件 − 不含本件`} = ${d(O)} 点额外承伤量，不是百分比。${h}`,explanation:`<div data-equipment-section-body="survival"></div>${T}`});return`<section class="equipment-numerics" aria-label="伤害与生存" data-equipment-numerics-mode="${_?`comparison`:`contribution`}" ${!n.pending&&!n.error?`data-equipment-numerics-ready`:``}><div class="equipment-primary-stats"><div>${C}${x?`<small class="equipment-dps-state" data-item-dps-state>单件参考 · 自动关闭</small>`:``}</div>${k}</div></section>`}var T=`${i}${n}
.strength-readout{pointer-events:auto;font-size:11px;color:var(--ui-text)}
.strength-readout>summary{list-style:none;cursor:pointer}.strength-readout>summary::-webkit-details-marker{display:none}
.strength-readout>summary:focus-visible{outline:2px solid var(--ui-jade);outline-offset:3px}
.strength-readout__headline{display:flex;align-items:baseline;justify-content:space-between;gap:8px;font-size:12px}
.strength-readout__headline small{font-size:9px;color:var(--ui-muted);white-space:nowrap}
.strength-readout__headline>b{font:600 20px var(--ui-font-number);color:var(--ui-jade);font-variant-numeric:tabular-nums}
.strength-readout__survival{font-size:10px;line-height:1.8;color:var(--ui-muted)}
.strength-readout__survival b{color:var(--ui-text);font-weight:500}
.strength-readout__detail{position:absolute;z-index:5;width:280px;max-height:55vh;overflow:auto;background:var(--ui-panel);border:1px solid var(--ui-line);border-radius:5px;padding:12px;box-shadow:0 8px 22px #0006}
.strength-readout__detail p,.equipment-numerics p{font-size:10px;line-height:1.65;color:var(--ui-muted);margin:7px 0}
.numerical-evidence>div:not(.numerical-equipment-evidence){display:flex;justify-content:space-between;align-items:baseline;gap:8px;font-size:11px;margin:5px 0}
.numerical-evidence span{color:var(--ui-muted)}
.numerical-evidence b,.equipment-numerics>div>b{font-variant-numeric:tabular-nums}
.numerical-evidence b{overflow-wrap:anywhere;text-align:right;max-width:65%}
.numerical-equipment-evidence{border-top:1px solid var(--ui-line);padding-top:7px;margin-top:9px;font-size:11px}
.numerical-equipment-evidence>strong{font-weight:500;color:var(--ui-text)}
.strength-readout__detail summary,.numerical-evidence summary{cursor:pointer;min-height:32px;display:flex;align-items:center;font-size:11px}
.equipment-primary-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.equipment-primary-stats>div{min-width:0}.equipment-primary-stats .icon-stat{min-height:48px;cursor:pointer}.equipment-primary-stats .icon-stat>b{font-size:20px}
.equipment-dps-state{display:block;color:var(--ui-muted);font-size:10px;padding:0 6px}
.equipment-numerics{padding:10px 0;border-bottom:1px solid var(--ui-line);margin-bottom:8px}
.equipment-numerics details{font-size:11px;margin-top:8px}.equipment-numerics summary{cursor:pointer;min-height:32px;display:flex;align-items:center}
`;export{w as a,C as c,v as i,p as l,h as n,S as o,g as r,_ as s,T as t};