var e=`M2 2H98V98H2Z`,t=`<span class="weapon-activation-frame" aria-hidden="true">
  <svg viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
    <path class="weapon-activation-frame__track" d="${e}" vector-effect="non-scaling-stroke"/>
    <path class="weapon-activation-frame__glow" d="${e}" pathLength="100" vector-effect="non-scaling-stroke"/>
    <path class="weapon-activation-frame__spark" d="${e}" pathLength="100" vector-effect="non-scaling-stroke"/>
  </svg>
</span>`;function n(e,t,n){let i=String(t);e.dataset.automatic!==i&&(e.dataset.automatic=i),e.getAttribute(`aria-pressed`)!==i&&e.setAttribute(`aria-pressed`,i),e.setAttribute(`aria-label`,r(n,t))}function r(e,t){return`${e} · 自动攻击${t?`已开启，点击停止`:`已停止，点击开启`}`}var i=String.raw`
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
`;export{r as i,i as n,n as r,t};