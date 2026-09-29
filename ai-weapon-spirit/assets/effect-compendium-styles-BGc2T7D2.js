var e=`
.effect-compendium{height:100%;min-height:0;min-width:0;display:grid;grid-template-rows:auto auto minmax(0,1fr);gap:12px;color:#e9e5d5;font:14px/1.5 system-ui,sans-serif;overflow:hidden}
.effect-compendium *{box-sizing:border-box}
.effect-compendium [hidden]{display:none!important}
.effect-compendium button,.effect-compendium input,.effect-compendium select,.effect-compendium summary{font:inherit;color:inherit;min-height:44px}
.effect-compendium button,.effect-compendium select,.effect-compendium input{border:1px solid #9fbbad4d;background:#152d30;border-radius:5px}
.effect-compendium button{cursor:pointer;padding:7px 12px}
.effect-compendium button:hover{border-color:#b2d4c0;background:#284440}
.effect-compendium button:disabled{opacity:.4;cursor:default}
.effect-compendium :focus-visible{outline:2px solid #e0c786;outline-offset:2px}
.effect-compendium__toolbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.effect-compendium__search{flex:1 1 180px;min-width:130px;padding:8px 12px}
.effect-compendium__toolbar select{max-width:190px;min-width:104px;padding:6px 9px}
.effect-compendium__filters{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.effect-compendium__filters select{min-width:100px;max-width:170px;padding:4px 8px}
.effect-compendium__count{margin-right:auto;color:#a6c1b4;font-size:12px}
.effect-compendium__domain{color:#e0c786;font-size:12px;white-space:nowrap}
.effect-compendium__body{display:grid;grid-template-columns:minmax(240px,1fr) minmax(270px,.82fr);min-height:0;gap:18px;overflow:hidden}
.effect-compendium__catalog{display:grid;grid-template-rows:minmax(0,1fr) auto auto;gap:8px;min-height:0;min-width:0}
.effect-compendium__grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));align-content:start;gap:7px;overflow-y:auto;overscroll-behavior:contain;padding:3px 4px 8px;min-height:0}
.effect-compendium .effect-compendium__tile{position:relative;min-width:0;min-height:86px;padding:8px 4px 5px;display:flex;flex-direction:column;align-items:center;gap:5px;background:#142a2c;border-color:#9fbbad26}
.effect-compendium__tile[aria-pressed=true]{border-color:#e0c786!important;background:#31423a!important}
.effect-compendium__tile[data-discovery=owned]{border-bottom-color:#cbb675}
.effect-compendium__tile-name{font-size:12px;max-width:100%;line-height:1.3;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;word-break:break-word;text-align:center}
.effect-compendium__icon{display:block;flex:none;width:34px;height:34px}
.effect-compendium__icon svg{width:100%;height:100%;display:block}
.effect-compendium__icon[data-icon-state=loading]{border:1px dashed #a6c1b43d;border-radius:7px}
.effect-compendium__icon[data-icon-state=error]{border:1px dashed #edac87;border-radius:7px}
.effect-compendium__badge{position:absolute;top:3px;right:4px;font-size:10px;line-height:15px;max-width:44px;color:#bdd6c6}
.effect-compendium__tile[data-discovery=owned] .effect-compendium__badge{color:#e0c786}
.effect-compendium__pager{display:flex;justify-content:center;align-items:center;gap:12px;font-size:12px}
.effect-compendium__notice{display:flex;align-items:center;justify-content:space-between;gap:8px;color:#edc193;font-size:12px}
.effect-compendium__notice:empty{display:none}
.effect-compendium__empty{grid-column:1/-1;align-self:start;padding:24px 12px;text-align:center;color:#a6c1b4}
.effect-compendium__detail{overflow-y:auto;overscroll-behavior:contain;min-width:0;min-height:0;border-left:1px solid #9fbbad30;padding:3px 12px 18px 18px}
.effect-compendium__detail-head{display:flex;gap:12px;align-items:center;margin:10px 0}
.effect-compendium__detail-head .effect-compendium__icon{width:52px;height:52px}
.effect-compendium__detail h3{font-size:20px;line-height:1.3;margin:0 0 5px;overflow-wrap:anywhere}
.effect-compendium__detail h4{margin:18px 0 8px;font-size:14px;color:#d4c088}
.effect-compendium__detail p{margin:8px 0;overflow-wrap:anywhere}
.effect-compendium__detail small{color:#a6c1b4;font-size:12px}
.effect-compendium__chips{display:flex;gap:6px;flex-wrap:wrap;margin:10px 0}
.effect-compendium__chips span{font-size:11px;padding:2px 7px;border:1px solid #9fbbad30;border-radius:3px;color:#bdd6c6}
.effect-compendium__facts{display:grid;grid-template-columns:minmax(90px,.8fr) minmax(0,1.3fr);gap:0 10px;margin:10px 0;font-size:12px}
.effect-compendium__facts dt,.effect-compendium__facts dd{margin:0;padding:8px 0;border-bottom:1px solid #9fbbad20;overflow-wrap:anywhere}
.effect-compendium__facts dt{color:#a6c1b4}.effect-compendium__facts dd{text-align:right}
.effect-compendium__level{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:12px 0}
.effect-compendium__level input,.effect-compendium__level select{width:94px;padding:6px 8px}
.effect-compendium__detail details{border-top:1px solid #9fbbad26;margin-top:12px;padding:0 2px}
.effect-compendium__detail summary{cursor:pointer;display:flex;align-items:center;font-size:12px;color:#b8cbbd;gap:6px}
.effect-compendium__detail summary:before{content:'›';font-size:18px}.effect-compendium__detail details[open]>summary:before{transform:rotate(90deg)}
.effect-compendium__detail pre{white-space:pre-wrap;overflow-wrap:anywhere;font-size:11px;color:#aac4b7;line-height:1.5;background:#10272b;padding:10px;border-radius:4px}
.effect-compendium__detail ul{padding-left:20px;font-size:12px;color:#bdd0c3}
.effect-compendium__carriers{display:flex;flex-wrap:wrap;gap:6px}
.effect-compendium__carriers button{font-size:12px}
.effect-compendium__record{padding:10px 0;border-bottom:1px solid #9fbbad26}
.effect-compendium__record strong{font-size:13px;color:#e0c786}.effect-compendium__record p{font-size:12px;color:#b8cbbd}
.effect-compendium__back{display:none}
@media(max-width:900px){.effect-compendium{gap:8px}.effect-compendium__body{grid-template-columns:minmax(190px,1fr) minmax(245px,1fr);gap:8px}.effect-compendium__detail{padding-left:12px}.effect-compendium__toolbar select{max-width:150px}.effect-compendium__grid{grid-template-columns:repeat(auto-fill,minmax(76px,1fr))}}
@media(max-width:600px),(max-height:480px){.effect-compendium__body{display:block}.effect-compendium__catalog,.effect-compendium__detail{height:100%}.effect-compendium__detail{border:0;padding:0 5px 18px}.effect-compendium__back{display:inline-flex;align-items:center;gap:8px}.effect-compendium[data-view=detail]{grid-template-rows:minmax(0,1fr)}.effect-compendium[data-view=detail]>.effect-compendium__toolbar,.effect-compendium[data-view=detail]>.effect-compendium__filters,.effect-compendium[data-view=detail] .effect-compendium__catalog{display:none}.effect-compendium[data-view=list] .effect-compendium__detail{display:none}}
@media(max-width:600px){.effect-compendium__toolbar{gap:6px}.effect-compendium__toolbar select{flex:1;max-width:none;min-width:0}.effect-compendium__search{flex-basis:100%}.effect-compendium__filters{gap:6px}.effect-compendium__filters select{max-width:130px;flex:1;min-width:0}.effect-compendium__count{flex-basis:100%}.effect-compendium__grid{grid-template-columns:repeat(auto-fill,minmax(72px,1fr))}}
`;export{e as t};