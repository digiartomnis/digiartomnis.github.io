var e=String.raw`
.expedition-dock[hidden]{display:none!important}
#expedition-primary-actions{align-items:center;justify-content:flex-end;gap:16px;max-width:none}
.expedition-dock__rest{font-size:12px;white-space:nowrap;color:var(--ui-muted);text-shadow:0 1px 3px #000}
.expedition-dock [data-intermission-talk]{flex:none;white-space:nowrap}
#expedition-primary-actions .expedition-dock__next{min-height:46px;max-width:none;flex:none;padding:8px 18px;animation:none}
@media(max-width:600px){#expedition-primary-actions{justify-content:space-between}.expedition-dock__rest{font-size:11px}}
@media(max-width:420px){.expedition-dock__rest{display:none}}
/* Own coarse-pointer placement here, before inventory's compact overrides.
 * Combat HUD styles must not reposition preparation controls after mount. */
@media(pointer:coarse),(max-width:700px){
 #expedition-primary-actions{left:max(10px,env(safe-area-inset-left));right:max(10px,env(safe-area-inset-right));bottom:max(8px,env(safe-area-inset-bottom));width:auto;max-width:480px;margin:0 auto;gap:4px}
 #expedition-primary-actions button{min-width:46px;min-height:46px;height:46px;padding:5px 7px;font-size:12px;touch-action:manipulation}
}
@media(pointer:coarse) and (orientation:landscape){#expedition-primary-actions{max-width:none}}
`;export{e as t};