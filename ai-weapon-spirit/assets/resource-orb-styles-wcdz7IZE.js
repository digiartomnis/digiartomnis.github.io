var e=String.raw`
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
.spirit-gym-hud__resource-orb strong{position:absolute;bottom:calc(100% + 13px);left:50%;transform:translateX(-50%);white-space:nowrap;font:12px/1.3 var(--ui-font-number);color:var(--ui-text);padding:1px 7px;background:linear-gradient(90deg,transparent,var(--ui-panel),transparent)}
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
`;export{e as t};