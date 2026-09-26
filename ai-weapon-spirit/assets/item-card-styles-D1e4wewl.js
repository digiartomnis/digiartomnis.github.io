import{t as e}from"./game-gym-hud-content-hhX5rExk.js";import{t}from"./game-ui-theme-Pr2_ihFt.js";var n=e.itemCard,r=`
.reliquary {
  --item-surface:var(--ui-card-surface); --item-text:var(--ui-card-text); --item-muted:var(--ui-card-muted);
  --item-bronze:var(--ui-card-line); --item-positive:var(--ui-card-positive); --item-negative:var(--ui-card-negative);
  --item-width:${n.widthPx}px; --item-padding:${n.paddingPx}px;
  --item-font:${n.bodyFontPx}px; --item-title:${n.titleFontPx}px;
}
${t.rarity.map((e,t)=>`.reliquary__item[data-rarity="${t+1}"]{--rarity:${e}}.reliquary__inspect[data-rarity="${t+1}"]{--rarity:${e};--rarity-edge:${e}}`).join(`
`)}
.reliquary__item:hover,.reliquary__item.is-selected {border-color:var(--rarity)!important;outline:1px solid var(--ui-text);outline-offset:1px}
.reliquary__item-name{color:var(--rarity)}
.reliquary__inspect {
  --rarity:var(--item-bronze); position:absolute; z-index:40; left:8px; top:8px;
  width:min(var(--item-width),calc(100% - 16px)); max-height:var(--item-card-max-height,calc(100% - 20px));
  display:flex; flex-direction:column; border:1px solid var(--ui-card-line); border-radius:1px;
  color:var(--item-text); background:transparent; box-shadow:0 12px 40px #061113bb;
  font-size:var(--item-font); line-height:1.55; pointer-events:auto; overflow:hidden;
}
.reliquary__item-header{display:grid;grid-template-columns:minmax(0,1fr) 68px;min-height:78px;flex:none}
.reliquary__item-heading {
  padding:10px 0 8px var(--item-padding); min-width:0;
  background:linear-gradient(110deg,color-mix(in srgb,var(--rarity) 9%,var(--item-surface)),var(--item-surface));
}
.reliquary__inspect::before{content:"";position:absolute;inset:5px;z-index:1;pointer-events:none;background:var(--ui-motif-corner-nw) left top/18px 18px no-repeat,var(--ui-motif-corner-se) right bottom/18px 18px no-repeat;opacity:.6}
.reliquary__item-header h3{margin:0 0 4px;font:var(--item-title)/1.3 var(--ui-font-title);letter-spacing:.06em;color:var(--rarity);overflow-wrap:anywhere}
.reliquary__item-header p{margin:0;color:var(--rarity);font-size:11px}
.reliquary__item-header small{display:block;margin-top:3px;color:var(--item-muted);font-size:11px}
.reliquary__inspect-model{position:relative;min-width:0}
.reliquary__inspect-model .reliquary__model{inset:12px 8px 12px 4px}
.reliquary__inspect-page{flex:1 1 auto;min-height:0;overflow:auto;overscroll-behavior:contain;scrollbar-width:thin;padding:0 var(--item-padding) 8px;background:var(--item-surface);touch-action:pan-y}
.reliquary__primary-stat{border-block:1px solid var(--ui-card-line);padding:6px 0;margin:0;font-size:13px}
.reliquary__primary-stat strong{font:24px/1.1 var(--ui-font-number);font-variant-numeric:tabular-nums;letter-spacing:-.025em}
.reliquary__primary-stat>span{font-size:12px;color:var(--item-muted);margin-left:4px}
.reliquary__primary-stat>small{display:inline;font-size:12px;margin-left:8px;color:var(--item-muted)}
.reliquary__affixes{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:3px 10px;list-style:none;padding:8px 0;margin:0}
.reliquary__affix-row{display:flex;align-items:center;gap:4px;padding:1px 0;min-height:30px;line-height:1.35}
.reliquary__affix-main{display:flex;align-items:center;gap:8px;justify-content:space-between;min-width:0;padding:4px 6px;border:1px solid transparent;font-size:12px}
.reliquary__affix-main:hover,.reliquary__affix-main:focus-visible{border-color:var(--ui-card-line);background:color-mix(in srgb,var(--ui-jade) 8%,var(--item-surface));outline:none}
.reliquary__affix-main>b{flex:none;white-space:nowrap}
.reliquary__affix-values{display:flex;flex-direction:column;align-items:flex-end;min-width:0;font-variant-numeric:tabular-nums;white-space:nowrap}
.reliquary__comparison{flex:none;display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:3px 8px;padding:5px var(--item-padding);background:var(--item-surface);border-top:1px solid var(--ui-card-line);font-size:11px}
.reliquary__comparison button{min-height:30px;padding:2px 8px;color:var(--item-muted);border:1px solid var(--ui-card-line);background:var(--ui-recessed);box-shadow:none;font:inherit;touch-action:manipulation}
.reliquary__comparison button:focus-visible{outline:2px solid var(--ui-jade);outline-offset:1px}
.reliquary__comparison [aria-checked=true]{border-color:var(--ui-jade);color:var(--ui-jade)}
.reliquary__comparison [data-compare-toggle] span{margin-left:6px}
.reliquary__comparison>small{grid-column:1/-1;grid-row:2;justify-self:end;color:var(--item-muted);font-size:10px}
.reliquary__comparison>small:empty{display:none}
.reliquary__inspect[data-dialogue=true] .reliquary__comparison{display:none}
.reliquary__compare-target{grid-column:2;grid-row:1;display:flex;align-items:center;gap:6px;min-width:0}
.reliquary__compare-target>span{flex:1;min-width:0;text-align:center;overflow-wrap:anywhere;color:var(--item-text);font-size:11px}
.reliquary__compare-target>button{flex:none;min-width:32px;font-size:18px;line-height:1}
@media(pointer:coarse){.reliquary__comparison button{min-height:36px;min-width:36px}}
.reliquary__affix-mark svg{display:block;width:22px;height:22px}.reliquary__affix-mark{font-size:7px;color:var(--ui-jade);flex:none}
.reliquary__combat-pattern{display:flex;align-items:baseline;justify-content:space-between;gap:8px;border-top:1px solid var(--ui-card-line);padding:6px 0;font-size:11px}
.reliquary__combat-pattern>span{min-width:0;text-align:right;color:var(--item-muted);font-size:10px}
.reliquary__affix-row>div{min-width:0}
.reliquary__affix-row b{font-weight:500;color:var(--item-text);font-variant-numeric:tabular-nums}
.reliquary__affix-row small{color:var(--item-muted);font-size:11px;white-space:normal}
.reliquary__affix-context{display:block;font-size:10px;color:var(--item-muted)}
.reliquary__affix-row[data-enabled=false]{opacity:.55}
.reliquary__affix-loss{color:var(--item-muted)}
.reliquary__delta{font-size:11px;font-variant-numeric:tabular-nums;white-space:nowrap}
.reliquary__delta[data-delta=up]{color:var(--item-positive)}
.reliquary__delta[data-delta=down]{color:var(--item-negative)}
.reliquary__artifact-effect{padding:8px 0;border-top:1px solid var(--ui-card-line);background:linear-gradient(120deg,color-mix(in srgb,var(--rarity) 5%,transparent),transparent)}
.reliquary__artifact-effect h4{margin:0 0 5px;font-weight:500;color:var(--rarity);font-size:14px}
.reliquary__artifact-effect p{margin:0;color:var(--item-text);line-height:1.65;font-size:12px}
.reliquary__item-footer{flex:none;padding:6px var(--item-padding) 7px;background:var(--item-surface);border-top:1px solid var(--ui-card-line);color:var(--item-muted);font-size:10px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:3px 8px}
.reliquary__item-footer>small{width:100%;font-size:10px}
.reliquary__price{color:var(--rarity)}
.reliquary__inspect[data-rarity="7"],.reliquary__inspect[data-rarity="8"]{border-image:var(--ui-rainbow) 1}

@media(max-width:600px){.reliquary{--item-width:330px;--item-padding:13px;--item-title:20px}.reliquary__item-header{grid-template-columns:minmax(0,1fr) 64px;min-height:90px}}
@media(max-height:550px){.reliquary{--item-title:19px;--item-padding:12px}.reliquary__item-header{min-height:76px;grid-template-columns:minmax(0,1fr) 62px}.reliquary__item-heading{padding-top:8px;padding-bottom:8px}.reliquary__primary-stat strong{font-size:24px}.reliquary__item-footer{padding-block:5px}}
`;export{r as t};