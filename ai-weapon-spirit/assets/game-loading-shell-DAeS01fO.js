import{t as e}from"./game-gym-hud-content-hhX5rExk.js";import{n as t}from"./game-ui-theme-Pr2_ihFt.js";var n=e.loading,r=e=>e.replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e]),i=`<div class="game-loading-indicator__status">
  <svg class="game-loading-indicator__flight" viewBox="${r(n.viewBox)}" aria-hidden="true" focusable="false">
    <g class="game-loading-indicator__wind" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
      <path d="M20 61h29 M5 78h37 M44 109h47 M19 105h13 M32 46h18"/>
    </g>
    <g>${n.riderParts.map(e=>`<path data-rider-part="${r(e.id)}" d="${r(e.path)}" fill="${r(e.fill)}"/>`).join(``)}</g>
  </svg>
  <span data-loading-label>${r(n.initialLabel)}</span>
</div><div class="game-loading-indicator__failure" data-loading-failure hidden></div>`,a=`
  .game-loading-indicator { ${t} position:absolute; left:max(12px,env(safe-area-inset-left)); bottom:max(12px,env(safe-area-inset-bottom)); z-index:1200; max-width:min(19rem,calc(100% - 24px - env(safe-area-inset-left) - env(safe-area-inset-right))); box-sizing:border-box; padding:4px 10px 4px 5px; border:1px solid var(--ui-line); border-radius:12px; background:var(--ui-panel); color:var(--ui-muted); font:12px/1.5 var(--ui-font-body); pointer-events:none; }
  #game-ui > .game-loading-indicator { pointer-events:none; }
  .game-loading-indicator[hidden], .game-loading-indicator [hidden] { display:none; }
  .game-loading-indicator__status { display:flex; align-items:center; gap:5px; min-height:32px; }
  .game-loading-indicator__flight { display:block; flex:none; width:46px; height:30px; overflow:visible; transform-origin:center; color:var(--ui-bronze); animation:game-loading-fly 2.4s ease-in-out infinite; }
  .game-loading-indicator__wind { opacity:.45; animation:game-loading-wind 1.8s ease-in-out infinite; }
  .game-loading-indicator [data-loading-label] { overflow-wrap:anywhere; }
  .game-loading-indicator[data-loading-state="error"] :is(.game-loading-indicator__flight,.game-loading-indicator__wind) { animation:none; }
  .game-loading-indicator__failure { display:flex; flex-wrap:wrap; align-items:center; gap:4px 8px; padding:0 2px 4px 4px; }
  .game-loading-indicator__failure > span { flex-basis:100%; color:#f0c6ac; }
  .game-loading-indicator button, .game-loading-indicator summary { pointer-events:auto; cursor:pointer; touch-action:manipulation; }
  .game-loading-indicator button { min-height:36px; padding:5px 10px; border:1px solid #669b956b; border-radius:7px; background:#243a37; color:inherit; font:inherit; }
  .game-loading-indicator :focus-visible { outline:2px solid #c0e4de; outline-offset:2px; }
  .game-loading-indicator details { min-width:0; max-width:100%; }
  .game-loading-indicator details[open] { flex-basis:100%; }
  .game-loading-indicator summary { padding:6px 0; }
  .game-loading-indicator pre { max-height:min(15rem,35vh); overflow:auto; overscroll-behavior:contain; margin:4px 0; white-space:pre-wrap; overflow-wrap:anywhere; user-select:text; pointer-events:auto; font:11px/1.5 monospace; }
  /* Only initial Host readiness owns the entry veil. Later loading tasks keep
     the compact, non-blocking HUD without concealing the world or menus. */
  html[data-game-loading] #game-ui > :not(#game-loading),
  html[data-game-loading] #game-ui > :not(#game-loading) * { visibility:hidden!important; pointer-events:none!important; }
  html[data-game-loading] .game-loading-indicator { left:auto; right:max(32px,env(safe-area-inset-right)); bottom:max(28px,env(safe-area-inset-bottom)); width:216px; padding:0; border:0; border-radius:0; background:none; }
  html[data-game-loading] .game-loading-indicator::before { content:''; position:fixed; inset:0; z-index:-1; background:radial-gradient(ellipse at 80% 90%,var(--ui-surface),var(--ui-recessed) 48%,color-mix(in srgb,var(--ui-recessed) 55%,black) 100%); }
  html[data-game-loading] .game-loading-indicator__status { flex-direction:column; gap:12px; padding-top:8px; }
  html[data-game-loading] .game-loading-indicator__flight { width:180px; height:108px; }
  html[data-game-loading] [data-loading-label] { max-width:100%; padding:4px 10px; text-align:center; letter-spacing:.06em; }
  html[data-game-loading] .game-loading-indicator__failure { padding-top:8px; }
  @keyframes game-loading-fly { 0%,100% { transform:translateY(2px) rotate(-2deg); } 50% { transform:translateY(-4px) rotate(1deg); } }
  @keyframes game-loading-wind { 0%,100% { transform:translateX(3px); opacity:.25; } 50% { transform:translateX(-5px); opacity:.55; } }
  @media(max-width:600px),(max-height:500px) {
    html[data-game-loading] .game-loading-indicator { right:max(16px,env(safe-area-inset-right)); bottom:max(18px,env(safe-area-inset-bottom)); width:176px; }
    html[data-game-loading] .game-loading-indicator__flight { width:150px; height:90px; }
  }
  @media(prefers-reduced-motion:reduce) { .game-loading-indicator__flight,.game-loading-indicator__wind { animation:none; } }
`;export{a as n,i as t};