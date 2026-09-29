import{t as e}from"./damage-number-runtime-BTeflQGV.js";import{n as t,t as n}from"./weapon-damage-readout-EYj7Qqgh.js";import{r}from"./icon-stat-Dq4haosb.js";var i=e=>{let t=e.unit===`percent`?e.value*100:e.value,n={percent:`%`,seconds:` 秒`,count:` 次`,qi:` 灵力`,qiPerSecond:` 灵力/秒`,damagePerSecond:` 伤害/秒`,damage:``,factor:``}[e.unit];return Number(t.toFixed(3)).toLocaleString(`zh-CN`,{maximumFractionDigits:3})+n};function a(e,t=i(e)){let n=`${e.label}：${i(e)}\n${e.sources.join(`
`)}`;return`<button type="button" class="damage-formula__term" data-damage-term="${r(e.id)}" data-tone="${e.color}" data-source-text="${r(n)}" aria-label="${r(`${e.label} ${i(e)}，查看来源`)}"><small>${r(e.label)}</small><b>${r(t)}</b></button>`}var o=(e,t)=>`<div class="damage-formula__line"><strong>${e}</strong><div class="damage-formula__equation">${t}</div></div>`;function s(e,i=``){let s=t=>a(e.terms[t]),c=o,l=e.elements.filter(e=>e.raw>0||e.share>0||e.weaponAdded||e.ownerAdded||e.weaponIncrease||e.ownerIncrease),u=l.map(t=>{let r=t.element,i=[t.share?s(`base`)+(t.share===1?``:` × ${s(`${r}-share`)}`):``,t.weaponAdded?s(`${r}-added`):``,t.ownerAdded?s(`${r}-owner-added`):``].filter(Boolean).join(` + `)||`0`,a=[`local`,`${r}-increase`,`${r}-owner-increase`,`aura`].filter(t=>e.terms[t].value!==0),o=a.length?` × (1 + ${a.map(s).join(` + `)})`:``;return c(`${n[r]}伤`,`(${i})${o} × ${s(`common`)}${t.elementMultiplier===1?``:` × ${s(`${r}-affinity`)}`} ≈ ${s(`${r}-total`)}`)}).join(``);return`<section class="damage-formula" data-damage-formula>
    <h4>伤害构成与公式</h4><p>${t[e.school]} · 主元素${n[e.primaryElement]} · ${r(e.context)}</p>
    <p>学派决定人物属性和目标防御；五行是这次伤害的组成。基础与附加点伤先相加，同类增伤相加，独立倍率再相乘。</p>
    <div class="damage-formula__source" data-damage-source role="status" aria-live="polite">悬停、聚焦或点按任一彩色数字，查看具体来源。公式中的 1 是倍率基准；负点伤和负增伤按战斗规则最低截为0。</div>
    ${c(`基础攻击`,`${s(`flat`)} + ${s(`power`)} × ${s(`coefficient`)} ≈ ${s(`base`)}`)}
    ${c(`共用倍率`,`${s(`rarity`)} × ${s(`mastery`)} × ${s(`tuning`)} × ${s(`mechanism`)} ≈ ${s(`common`)}`)}
    ${u}
    ${c(`单次合计`,`${l.map(e=>s(`${e.element}-total`)).join(` + `)||`0`} ≈ ${s(`ordinary`)}`)}
    ${e.canCrit?c(`暴击期望`,`1 + ${s(`chance`)} × (${s(`critical`)} − 1) ≈ ${s(`expectation`)}`):c(`暴击`,s(`expectation`))}
    ${c(`单次直击（中间结果）`,`${s(`ordinary`)} × ${s(`expectation`)} ≈ ${s(`expected`)}`)}
    ${i}
    <details><summary>参考条件与触发收益</summary>${e.notes.map(e=>`<p>${r(e)}</p>`).join(``)}</details>
  </section>`}function c(e){let t=t=>{let n=t.target instanceof Element?t.target.closest(`[data-damage-term]`):null;if(!n||!e.contains(n))return;let r=n.closest(`[data-damage-formula]`),i=r?.querySelector(`[data-damage-source]`);i&&(i.textContent=n.dataset.sourceText??``,r.querySelector(`[data-source-selected]`)?.removeAttribute(`data-source-selected`),n.setAttribute(`data-source-selected`,`true`))};return e.addEventListener(`pointerover`,t),e.addEventListener(`focusin`,t),e.addEventListener(`click`,t),()=>{e.removeEventListener(`pointerover`,t),e.removeEventListener(`focusin`,t),e.removeEventListener(`click`,t)}}var l=`
.damage-formula{white-space:normal;font-size:12px;color:var(--ui-card-text)}
.damage-formula h4{margin:5px 0}.damage-formula p{line-height:1.65}
.damage-formula__line{padding:9px 0;border-bottom:1px solid var(--ui-card-line)}
.damage-formula__line>strong{display:block;margin-bottom:5px;font-size:11px;color:var(--ui-muted)}
.damage-formula__equation{display:flex;flex-wrap:wrap;align-items:center;gap:4px;line-height:1.9}
.damage-formula__term{display:inline-flex;flex-direction:column;align-items:center;gap:1px;max-width:100%;min-width:42px;padding:3px 5px;background:var(--ui-raised);border:1px solid transparent;border-radius:4px;color:var(--ui-card-text);cursor:help;font:inherit}
.damage-formula__term small{font-size:9px;line-height:1.3}.damage-formula__term b{font:600 13px/1.5 var(--ui-font-number);font-variant-numeric:tabular-nums;overflow-wrap:anywhere}
${Object.entries(e).map(([e,t])=>`.damage-formula__term[data-tone=${e}]{color:color-mix(in srgb,var(--ui-card-text) 55%,${t})}`).join(``)}
.damage-formula__term[data-tone=increase]{color:var(--ui-qi-light)}
.damage-formula__term[data-tone=factor]{color:var(--ui-bronze-light)}
.damage-formula__term[data-tone=critical]{color:color-mix(in srgb,var(--ui-card-text) 55%,var(--ui-health-light))}
.damage-formula__term:hover,.damage-formula__term:focus-visible,.damage-formula__term[data-source-selected]{border-color:currentColor;outline:none}
.damage-formula__source{position:sticky;top:41px;z-index:1;height:108px;overflow:auto;box-sizing:border-box;margin:10px 0;padding:9px;background:var(--ui-recessed);border-left:2px solid var(--ui-jade);white-space:pre-line;overflow-wrap:anywhere;line-height:1.7;font-size:11px}
@media(pointer:coarse){.damage-formula__term{min-height:44px;min-width:44px;justify-content:center}}
`;export{s as a,a as i,c as n,o as r,l as t};