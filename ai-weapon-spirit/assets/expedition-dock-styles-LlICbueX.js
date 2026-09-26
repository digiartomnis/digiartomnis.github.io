var e=String.raw`
.expedition-dock[hidden]{display:none!important}
#expedition-primary-actions{align-items:center;justify-content:flex-end;gap:16px;max-width:none}
.expedition-dock__rest{font-size:12px;white-space:nowrap;color:var(--ui-muted);text-shadow:0 1px 3px #000}
.expedition-dock [data-intermission-talk]{flex:none;white-space:nowrap}
#expedition-primary-actions .expedition-dock__next{min-height:46px;max-width:none;flex:none;padding:8px 18px;animation:none}
@media(max-width:600px){#expedition-primary-actions{justify-content:space-between}.expedition-dock__rest{font-size:11px}}
@media(max-width:420px){.expedition-dock__rest{display:none}}
`;export{e as t};