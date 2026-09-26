var e=String.raw`
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
`;export{e as t};