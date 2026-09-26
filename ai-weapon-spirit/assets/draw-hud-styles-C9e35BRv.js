import{n as e,t}from"./game-ui-theme-Pr2_ihFt.js";import{t as n}from"./expedition-dock-styles-LlICbueX.js";import{t as r}from"./item-card-styles-D1e4wewl.js";import{t as i}from"./inventory-responsive-styles-D_Rp_3Uo.js";var a=String.raw`
.reliquary__inspect-content{display:contents}
.reliquary__inspect[data-dialogue=true]{width:min(1240px,var(--dialogue-width));height:min(820px,var(--dialogue-height));max-height:var(--dialogue-height)}
.reliquary__inspect[data-dialogue=true] .reliquary__item-footer{display:none}
.reliquary__inspect[data-dialogue=true] .reliquary__inspect-content>.reliquary__inspect-page{display:none}
.reliquary__inspect[data-dialogue=true] .reliquary__item-header{order:0;min-height:0;grid-template-columns:minmax(0,1fr);grid-template-rows:auto clamp(180px,calc(var(--dialogue-height) * .42),360px)}
.reliquary__inspect[data-dialogue=true] .reliquary__item-heading{padding:12px 18px 10px}
.reliquary__inspect[data-dialogue=true] .reliquary__inspect-model .reliquary__model{inset:10px 22px 14px}
.reliquary__inspect[data-dialogue=true] .reliquary__item-header h3{font-size:21px}
.reliquary__inspect[data-dialogue=true]>.spirit-chat{flex:1;height:auto}

@media(max-height:700px){.reliquary__inspect[data-dialogue=true] .reliquary__item-header{grid-template-rows:auto clamp(90px,calc(var(--dialogue-height) * .3),170px)}.reliquary__inspect[data-dialogue=true] .reliquary__item-heading{padding:8px 14px}}
@media(max-width:700px) and (orientation:portrait){
.reliquary__inspect[data-dialogue=true] .reliquary__item-header{grid-row:2;position:relative;grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr);height:var(--mobile-sword-size)}
.reliquary__inspect[data-dialogue=true] .reliquary__inspect-model{width:var(--mobile-sword-size);height:var(--mobile-sword-size);justify-self:center;border:1px solid #536864}
.reliquary__inspect[data-dialogue=true] .reliquary__inspect-model .reliquary__model{inset:16px}
.reliquary__inspect[data-dialogue=true] .reliquary__item-heading{position:absolute;z-index:1;left:8px;right:8px;bottom:5px;padding:0;background:none;text-align:center;pointer-events:none}
.reliquary__inspect[data-dialogue=true] .reliquary__item-heading h3{font-size:16px;line-height:20px;margin:0;text-shadow:0 1px 4px #071517}
.reliquary__inspect[data-dialogue=true] .reliquary__item-heading p,.reliquary__inspect[data-dialogue=true] .reliquary__item-heading small{display:none}
}
@media(orientation:landscape) and (max-height:600px){
.reliquary__inspect[data-dialogue=true] .reliquary__item-header{position:relative;grid-template-rows:clamp(88px,calc(var(--dialogue-height) * .45),140px);flex-shrink:0}
.reliquary__inspect[data-dialogue=true] .reliquary__item-heading{position:absolute;left:8px;right:8px;bottom:0;padding:2px 6px;text-align:center;pointer-events:none}
.reliquary__inspect[data-dialogue=true] .reliquary__item-heading h3{font-size:16px;line-height:20px;margin:0;text-shadow:0 1px 4px #071517}
.reliquary__inspect[data-dialogue=true] .reliquary__item-heading p,.reliquary__inspect[data-dialogue=true] .reliquary__item-heading small{display:none}
.reliquary__inspect[data-dialogue=true] .reliquary__inspect-model .reliquary__model{inset:8px 18px 24px}
}
@media(max-height:550px){.reliquary__inspect[data-dialogue=true]{overflow:auto}.reliquary__inspect[data-dialogue=true]>.spirit-chat{min-height:0}}

.reliquary__cursor{position:fixed;z-index:2147483000;pointer-events:none;border:2px solid var(--ui-jade);box-sizing:border-box;background-image:linear-gradient(to right,#9fc9bd55 1px,transparent 1px),linear-gradient(to bottom,#9fc9bd55 1px,transparent 1px);background-size:var(--cursor-cell) var(--cursor-cell)}
.reliquary__cursor[hidden]{display:none}
.reliquary__cursor small{position:absolute;bottom:0;left:0;white-space:nowrap;background:var(--ui-panel);color:var(--ui-text);font-size:11px}
.reliquary__cursor>b{display:block;text-align:center;color:var(--ui-jade)}
.reliquary__cursor .reliquary__model{inset:4px 3px 14px}
.reliquary__touch-drag{position:fixed;z-index:2147483000;pointer-events:none;padding:5px 10px;border:1px solid var(--ui-jade);background:var(--ui-panel);color:var(--ui-text);font-size:12px;max-width:180px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.reliquary [data-item]:not([data-offer]){touch-action:none}
.reliquary .reliquary__item[data-drag-source]{outline:1px dashed #edce89;outline-offset:-3px}
.reliquary [data-drop-state=allowed]{border-color:var(--ui-positive)!important;box-shadow:inset 0 0 0 2px #92cf7799,inset 0 0 20px #71ab4f44!important}
.reliquary [data-drop-state=blocked]{border-color:var(--ui-negative)!important;box-shadow:inset 0 0 0 2px #bd634e77!important}
.reliquary__refinement{position:absolute;right:3px;top:2px;color:#ffe1a0;font:11px Georgia,serif;text-shadow:0 1px 3px #000;pointer-events:none}
.reliquary__drop-hint{position:absolute;z-index:26;left:50%;bottom:42px;transform:translateX(-50%);width:max-content;max-width:calc(100% - 20px);padding:9px 14px;border:1px solid #a6cf83;background:#161d17f5;color:#e2f0ce;box-shadow:0 4px 20px #0008;text-align:center;white-space:pre-line;pointer-events:none;font-size:11px;line-height:1.7}
.reliquary__drop-hint[data-blocked=true]{border-color:#bb806a;color:#efbdab;background:#251a17f5}
.reliquary,.expedition-dock{${e}}
.reliquary{--ivory:var(--ui-text);--gold:var(--ui-bronze-light);--muted:var(--ui-muted);--line:var(--ui-line);--stone:var(--ui-surface);position:relative;height:100%;min-height:0;overflow:hidden;color:var(--ivory);font:12px/1.4 var(--ui-font-body)}
.reliquary *,.expedition-dock *{box-sizing:border-box}.reliquary [hidden]{display:none!important}
.reliquary button,.expedition-dock button{font:inherit;color:inherit;border:1px solid var(--ui-line);background:var(--ui-panel);border-radius:1px;cursor:pointer;min-height:32px;padding:5px 10px;box-shadow:none}.reliquary button:hover,.expedition-dock button:hover{border-color:var(--ui-jade);color:var(--ui-jade)}.reliquary button[aria-pressed=true]{color:var(--ui-jade);border-color:var(--ui-jade);background:color-mix(in srgb,var(--ui-jade) 12%,var(--ui-surface))}.reliquary button:disabled,.expedition-dock button:disabled{opacity:.42;cursor:default}.reliquary button:focus-visible,.expedition-dock button:focus-visible{outline:2px solid var(--ui-bronze-light);outline-offset:2px}
.reliquary__panels{height:100%;display:grid;grid-template-columns:minmax(270px,430px) minmax(320px,480px);justify-content:center;gap:24px;padding:12px 18px 12px}.reliquary__left,.reliquary__right{min-width:0;min-height:0;border:1px solid var(--ui-line);border-radius:var(--ui-corner);box-shadow:0 12px 38px #06141680;background:color-mix(in srgb,var(--ui-surface) 35%,transparent);position:relative;overflow:hidden}.reliquary__left{display:flex;flex-direction:column}.reliquary__right{grid-column:2;display:grid;grid-template-rows:34px 80px minmax(115px,1fr) 27px minmax(170px,1.35fr) 27px}
.reliquary__left::after,.reliquary__right::after{content:"";position:absolute;inset:5px;z-index:5;pointer-events:none;background:var(--ui-motif-corner-nw) left top/26px 26px no-repeat,var(--ui-motif-corner-ne) right top/26px 26px no-repeat,var(--ui-motif-corner-sw) left bottom/26px 26px no-repeat,var(--ui-motif-corner-se) right bottom/26px 26px no-repeat;opacity:.5}
.reliquary__heading{display:flex;justify-content:space-between;align-items:center;gap:8px;min-height:34px;padding:3px 10px;background:var(--ui-panel);border-bottom:1px solid var(--ui-line)}.reliquary__heading nav{display:flex;gap:2px}.reliquary__heading button{padding:3px 9px;min-height:30px;font-size:12px}.reliquary__heading strong{color:var(--ui-text);letter-spacing:.14em;font:17px/1.4 "Noto Serif CJK SC",serif}.reliquary__heading>b{font:13px Georgia,serif;color:var(--ui-jade)}.reliquary__heading>span{font-size:10px;color:var(--ui-muted)}.reliquary__lore{margin:0;background:var(--ui-panel);padding:9px 12px;font-size:11px;color:var(--ui-muted);border-bottom:1px solid var(--ui-line)}.reliquary__shelf-tabs{display:flex;padding:5px 8px;gap:5px;background:var(--ui-panel)}.reliquary__shelf-tabs button{flex:1;font-size:11px}.reliquary__left-content{flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px}.reliquary__merchant{padding:10px 12px;background:var(--ui-panel);border-top:1px solid var(--ui-line);display:grid;gap:7px}.reliquary__merchant>div{display:flex;align-items:center;gap:8px;justify-content:space-between}.reliquary__merchant small{font-size:10px;color:var(--ui-muted)}.reliquary__merchant button{flex:1;font-size:11px;min-height:40px}.reliquary__merchant button b{color:var(--ui-jade);display:block;font:14px Georgia,serif}
.reliquary__grid{display:grid;grid-template-columns:repeat(var(--columns),minmax(0,1fr));grid-template-rows:repeat(var(--rows),minmax(0,1fr));aspect-ratio:var(--columns)/var(--rows);height:100%;max-height:100%;max-width:100%;position:relative;align-self:center;isolation:isolate;border:1px solid var(--ui-line);background-image:linear-gradient(to right,var(--ui-line) 1px,transparent 1px),linear-gradient(to bottom,var(--ui-line) 1px,transparent 1px);background-size:calc(100%/var(--columns)) calc(100%/var(--rows));background-color:#080b1122}.reliquary__item{--rarity:#9a9b91;position:relative;display:block;min-height:0!important;min-width:0;padding:0!important;border:1px solid color-mix(in srgb,var(--rarity) 55%,transparent)!important;box-shadow:inset 0 0 10px #0005!important;background:linear-gradient(160deg,#18191f05,#17141644)!important;overflow:hidden;touch-action:manipulation}.reliquary__item[data-rarity="2"]{--rarity:#68a9ec}.reliquary__item[data-rarity="3"]{--rarity:#ead253}.reliquary__item[data-rarity="4"]{--rarity:#e6b54e}.reliquary__item[data-rarity="5"]{--rarity:#ed755c}.reliquary__item:hover,.reliquary__item.is-selected{border-color:var(--rarity)!important;box-shadow:none!important;background:color-mix(in srgb,var(--ui-jade) 7%,transparent)!important}.reliquary__model{position:absolute;inset:4px 3px 14px;display:block;pointer-events:none}.reliquary__item-name{position:absolute;bottom:0;left:0;right:0;padding:1px;background:#090b10b3;font-size:9px;line-height:12px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;color:#eee1be;text-shadow:0 1px 2px #000}.reliquary__size{position:absolute;top:1px;left:3px;font:9px Georgia,serif;color:#c5baa399;pointer-events:none}.reliquary__stack-count{position:absolute;bottom:12px;right:3px;font:13px Georgia,serif;color:#fff2ce;text-shadow:1px 1px #000}.reliquary__bag{min-height:0;display:flex;align-items:center;justify-content:center;padding:0 8px 3px}.reliquary__bag-head{display:flex;align-items:center;justify-content:space-between;padding:2px 10px;background:var(--ui-panel);border-top:1px solid var(--ui-line);font-size:11px}.reliquary__bag-head span{color:var(--ui-muted);font-size:10px}.reliquary__stats{background:var(--ui-panel);color:var(--ui-muted);border-top:1px solid var(--ui-line);text-align:center;padding:5px;font-size:10px}
.reliquary__weapon-rack{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:4px;padding:4px 8px}.reliquary__equip{min-width:0;min-height:0;display:flex;flex-direction:column;position:relative}.reliquary__equip>small{position:absolute;top:2px;left:3px;z-index:1;pointer-events:none;background:#131419aa;color:var(--ui-muted);font-size:9px}.reliquary__equip>.reliquary__item,.reliquary__empty{flex:1;width:100%;min-height:0!important}.reliquary__empty{background:linear-gradient(#13141988,#20212655)!important;border:1px solid var(--ui-line)!important;color:var(--ui-muted)!important;font:20px Georgia!important}.reliquary__weapon-rack .reliquary__item{border-color:transparent!important}.reliquary__weapon-rack .reliquary__model{inset:14px 5px 18px}.reliquary__weapon-rack .reliquary__item-name{padding:1px 4px 2px;text-align:left}.reliquary__weapon-rack .reliquary__equip>small{top:5px;left:6px;z-index:3;font-size:8px}.reliquary__weapon-rack .reliquary__item[data-automatic=true]{box-shadow:inset 0 0 10px color-mix(in srgb,var(--ui-jade) 10%,transparent)!important}.reliquary__weapon-rack .reliquary__item[data-automatic=false] .reliquary__item-name{color:var(--ui-muted)}.reliquary__weapon-rack button:focus-visible{outline:var(--ui-focus) solid var(--ui-bronze-light)!important;outline-offset:1px}
.reliquary__body{display:grid;grid-template-columns:60px minmax(80px,1fr) 60px;gap:7px;min-height:0;padding:3px 10px 6px}.reliquary__gear-side{display:grid;grid-template-rows:repeat(3,minmax(0,1fr));gap:5px;min-height:0}.reliquary__portrait{position:relative;min-width:0;min-height:0;overflow:hidden;border:1px solid var(--ui-line);background:transparent}.inventory-portrait{margin:0;border:0;width:100%;height:100%;min-height:0;display:flex;flex-direction:column}.inventory-portrait__viewport{height:auto;min-height:0;flex:1;touch-action:none;cursor:grab}.inventory-portrait__viewport:active{cursor:grabbing}.inventory-portrait footer{display:flex;justify-content:space-between;align-items:center;gap:3px;padding:0 4px;min-height:19px;font-size:9px;background:#15161b;color:#a7afa3}.inventory-portrait footer span{min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.inventory-portrait footer button{flex:none;white-space:nowrap;min-height:19px;font-size:9px;padding:0 4px;background:transparent;color:inherit;border:1px solid #91bda744;box-shadow:none}
.reliquary__shop-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;width:100%;height:50%;min-height:150px;max-height:250px}.reliquary__merchandise{display:flex;min-width:0;flex-direction:column;gap:6px}.reliquary__merchandise>.reliquary__item{flex:1}.reliquary__merchandise>button:last-child{font-size:11px;color:var(--ui-jade);padding:3px}.reliquary__shop-note{padding:10px;color:var(--ui-muted);font-size:11px;text-align:center;line-height:1.8;background:#13151aa6}.reliquary__delivery-grid{display:grid;width:100%;flex:1;max-height:380px;grid-template-columns:repeat(5,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));gap:5px}.reliquary__pages{display:flex;align-items:center;justify-content:center;gap:7px;margin-top:8px;font-size:11px}.reliquary__pages button{min-width:32px}.reliquary__sealed{text-align:center;color:var(--ui-muted)}.reliquary__sealed>span{font:72px "Noto Serif CJK SC",serif;color:#968057}.reliquary__mobile-tabs{display:none}
.reliquary__message{position:absolute;left:50%;top:6px;transform:translateX(-50%);z-index:25;max-width:90%;padding:6px 12px;color:var(--ui-jade);background:var(--ui-panel);border:1px solid var(--ui-line);pointer-events:none;font-size:12px;text-align:center}.reliquary__message:empty{display:none}
.expedition-dock{position:absolute;z-index:130;right:max(12px,env(safe-area-inset-right));bottom:max(10px,env(safe-area-inset-bottom));display:flex;gap:5px;pointer-events:auto;color:var(--ui-muted);font:12px/1.3 "Microsoft YaHei",sans-serif}.expedition-dock button{min-height:42px;padding:5px 13px}.expedition-dock kbd{font:10px monospace;color:var(--ui-muted)}.expedition-dock__next{min-width:154px;display:flex;align-items:center;justify-content:center;gap:9px;border:1px solid var(--ui-jade)!important;background:var(--ui-panel)!important;color:var(--ui-text)!important}.expedition-dock__next>span:first-child{font:30px/1 Georgia}.expedition-dock__next:disabled{background:var(--ui-surface)!important;border-color:var(--ui-line)!important}

@media(min-width:1600px){.reliquary__panels{grid-template-columns:minmax(350px,480px) minmax(400px,530px);padding:10px 24px}.reliquary__right{grid-template-rows:38px 92px minmax(150px,1fr) 28px minmax(210px,1.4fr) 30px}}
@media(max-width:850px){.reliquary__panels{grid-template-columns:minmax(240px,.9fr) minmax(280px,1fr);gap:10px;padding:5px}.reliquary__heading{padding:3px 5px}.reliquary__heading button{font-size:11px;padding:3px 5px}.reliquary__body{grid-template-columns:48px minmax(70px,1fr) 48px;padding:3px 6px 5px;gap:5px}.reliquary__heading>span{font-size:9px}.reliquary__shop-grid{gap:5px}.reliquary__merchant{padding:7px}.reliquary__merchant>div:first-child{display:block}.reliquary__merchant small{font-size:9px}.expedition-dock button{padding:5px 9px}}
@media(max-width:600px){.reliquary[data-merchant-open=false] .reliquary__panels{height:100%}.reliquary__mobile-tabs{display:flex;height:36px;gap:4px;padding:2px 6px}.reliquary__mobile-tabs button{flex:1;font-size:12px}.reliquary__panels{height:calc(100% - 36px);display:block;padding:3px 6px}.reliquary__left,.reliquary__right{height:100%}.reliquary[data-mobile-view=right] .reliquary__left,.reliquary[data-mobile-view=left] .reliquary__right{display:none}.reliquary__right{grid-template-rows:34px 72px minmax(72px,.75fr) 24px minmax(150px,1.3fr) 23px}.reliquary__body{grid-template-columns:50px minmax(60px,1fr) 50px;max-width:310px;width:100%;justify-self:center}.reliquary__heading strong{font-size:14px}.reliquary__weapon-rack{gap:3px;padding:3px 6px}.reliquary__item-name{font-size:8px}.reliquary__stats{font-size:9px}.reliquary__bag-head span{font-size:9px}.reliquary__message{font-size:10px;padding:4px 7px;top:40px}.expedition-dock{right:6px;left:6px;bottom:max(5px,env(safe-area-inset-bottom));justify-content:flex-end;gap:3px;font-size:10px}.expedition-dock button{padding:3px 7px;min-height:40px}.expedition-dock__next{min-width:120px;flex:1;max-width:185px}.expedition-dock kbd{display:none}}
@media(max-height:550px) and (min-width:480px){.reliquary__panels{grid-template-columns:minmax(230px,.9fr) minmax(320px,1.3fr);gap:8px}.reliquary__right{grid-template-columns:minmax(130px,.7fr) minmax(175px,1fr);grid-template-rows:28px 66px minmax(80px,1fr) 22px}.reliquary__right>.reliquary__heading{grid-column:1/-1}.reliquary__weapon-rack{grid-column:1;grid-row:2;grid-template-columns:repeat(6,minmax(0,1fr));padding:2px}.reliquary__body{grid-column:1;grid-row:3;grid-template-columns:32px minmax(30px,1fr) 32px;gap:2px;padding:2px}.reliquary__bag-head{grid-column:2;grid-row:2;align-self:start;height:22px;font-size:9px;padding:2px 3px}.reliquary__bag-head>span:last-child{display:none}.reliquary__bag{grid-column:2;grid-row:2/4;padding-top:24px}.reliquary__stats{grid-column:1/-1;grid-row:4}.reliquary__equip>small{font-size:8px}.reliquary__item-name{font-size:7px}.reliquary__lore{display:none}.reliquary__merchant{padding:5px;gap:3px}.reliquary__merchant>div:first-child{display:none}.reliquary__merchant button{min-height:32px;font-size:10px}.reliquary__merchant button b{display:inline;font-size:11px;margin-left:3px}.reliquary__shop-note{margin:3px;padding:3px;font-size:9px}.reliquary__shop-grid{min-height:80px;max-height:140px;flex:1}.reliquary__left-content{padding:5px}.reliquary__shelf-tabs{padding:2px}.reliquary__shelf-tabs button{min-height:26px!important;font-size:10px}}
@media(prefers-reduced-motion:no-preference){.expedition-dock__next:not(:disabled){animation:gate-glow 3s ease-in-out infinite}@keyframes gate-glow{50%{box-shadow:0 0 10px color-mix(in srgb,var(--ui-jade) 15%,transparent)}}}

.reliquary__left-content:has([data-shelf-grid]){display:grid;grid-template-rows:minmax(0,1fr) auto;justify-items:center;gap:8px}.reliquary__left-content>.reliquary__grid{max-height:100%;height:100%;min-height:0}

.reliquary__grid .reliquary__item[data-item-height="1"] .reliquary__model{inset:2px}.reliquary__grid .reliquary__item[data-item-height="1"] .reliquary__item-name,.reliquary__grid .reliquary__item[data-item-height="1"] .reliquary__size{display:none}.reliquary__grid .reliquary__item[data-item-height="1"] .reliquary__stack-count{bottom:0;right:1px;font-size:10px}

.reliquary__grid-stage{container-type:size;position:relative;display:grid;place-items:center;min-width:0;min-height:0;width:100%;height:100%;flex:1}.reliquary__grid-stage>.reliquary__grid{height:min(100cqh,calc(100cqw * var(--rows) / var(--columns)));width:min(100cqw,calc(100cqh * var(--columns) / var(--rows)));max-height:100%;max-width:100%}

.reliquary__left-content:has([data-shelf-grid]){grid-template-columns:minmax(0,1fr);justify-content:stretch}
.reliquary__panels{height:calc(100% - 34px)}
.reliquary__interaction{height:34px;display:flex;align-items:center;justify-content:center;gap:12px;color:var(--ui-muted);background:var(--ui-panel);border-top:1px solid var(--ui-line);font-size:10px;padding:2px 8px}
.reliquary__interaction button{min-height:28px;padding:2px 12px}
.reliquary__keyboard-help{color:var(--ui-muted)}


.reliquary__bag-head button{border:0;box-shadow:none;background:none;min-height:22px;padding:0 3px;font-weight:bold;font-size:11px}
.reliquary__stow{flex:none;width:100%;margin-bottom:6px;font-size:10px!important}
.reliquary__sell{display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:36px!important;border:1px dashed var(--ui-line)!important;background:var(--ui-panel)!important;color:var(--ui-jade)!important}
.reliquary__sell small{pointer-events:none}
.reliquary__placement{position:absolute;pointer-events:none;z-index:4;border:2px solid #c6e7a1;background:#9ed27833}
[data-drop-state=blocked]>.reliquary__placement{border-color:#eea38a;background:#ba5f4833}
.reliquary [data-grid]:focus-visible{outline:2px solid var(--ui-bronze-light);outline-offset:2px}
.reliquary[data-carrying=true] [data-item],.reliquary[data-carrying=true] [data-grid]{cursor:crosshair}
@media(max-height:550px) and (min-width:480px){
 .reliquary__right{grid-template-rows:26px 52px minmax(45px,1fr) 22px}
 .reliquary__interaction{font-size:9px;gap:8px}
}
@media(max-width:600px){
 .reliquary__panels{height:calc(100% - 76px)}
 .reliquary[data-merchant-open=false] .reliquary__panels{height:calc(100% - 40px)}
 .reliquary__interaction{height:40px;font-size:10px;gap:6px}
 .reliquary__keyboard-help{display:none}
 .reliquary__interaction button{min-height:34px}
 .reliquary__drop-hint{bottom:44px;padding:6px 9px;font-size:10px}

 .reliquary__sell{min-height:42px!important}
}
@media(max-width:600px) and (max-height:650px){
 .reliquary__right{grid-template-rows:28px 52px minmax(50px,.7fr) 23px minmax(85px,1fr) 20px}
 .reliquary__stats{padding:2px;font-size:8px}
 .reliquary__body{padding:2px 6px;gap:4px}
 .reliquary__gear-side{gap:2px}
 .reliquary__interaction{font-size:9px}
}

.reliquary__panels{position:relative;z-index:0}
.reliquary__panels[data-inspector-cover=true]{
 -webkit-mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000);
 mask-image:linear-gradient(#000,#000),linear-gradient(#000,#000);
 -webkit-mask-size:100% 100%,var(--inspect-cover-width) var(--inspect-cover-height);
 mask-size:100% 100%,var(--inspect-cover-width) var(--inspect-cover-height);
 -webkit-mask-position:0 0,var(--inspect-cover-x) var(--inspect-cover-y);
 mask-position:0 0,var(--inspect-cover-x) var(--inspect-cover-y);
 -webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;
 -webkit-mask-composite:xor;mask-composite:exclude;
}


.reliquary [data-pad-focus=true],.expedition-dock [data-pad-focus=true]{outline:3px solid var(--ui-bronze-light)!important;outline-offset:2px;box-shadow:0 0 0 4px color-mix(in srgb,var(--ui-title-ink) 70%,transparent)!important}
.reliquary__pad-cell{position:absolute;z-index:6;pointer-events:none;border:2px solid var(--ui-bronze-light);box-shadow:0 0 0 1px var(--ui-recessed),inset 0 0 8px color-mix(in srgb,var(--ui-jade) 25%,transparent)}
.reliquary__pad-cell::after{content:'◆';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:9px;color:var(--ui-bronze-light);text-shadow:0 1px 3px #000}
.reliquary [data-device-hint]:empty{display:none}
.reliquary [data-device-hint]{color:var(--ui-jade);white-space:nowrap}
.reliquary[data-input-device=gamepad] .reliquary__interaction{flex-wrap:wrap;align-content:center;gap:1px 10px;font-size:10px;line-height:14px}
.reliquary[data-input-device=gamepad] .reliquary__keyboard-help{display:inline}
.expedition-dock[data-input-device=gamepad] kbd{display:inline}
@media(max-width:600px){.reliquary[data-input-device=gamepad] .reliquary__interaction{font-size:9px;gap:1px 5px;line-height:12px}.reliquary[data-input-device=gamepad] [data-device-hint]{display:none}}

.reliquary__item[data-rarity="6"]{--rarity:#c38bef}
.reliquary__item[data-rarity="7"],.reliquary__item[data-rarity="8"]{--rarity:#f3d08a}
.reliquary__item[data-rarity="7"]:after,.reliquary__item[data-rarity="8"]:after{content:"";position:absolute;inset:0;border:2px solid transparent;border-image:linear-gradient(var(--rainbow-angle,120deg),${t.rainbow.join(`,`)}) 1;pointer-events:none;animation:p0-rainbow-flow 5s linear infinite}
.reliquary__item[data-rarity="8"]:after{animation:p0-rainbow-flow 2s linear infinite,p0-artifact-pulse 1.4s ease-in-out infinite alternate}
@property --rainbow-angle{syntax:"<angle>";initial-value:120deg;inherits:false}
@keyframes p0-rainbow-flow{to{--rainbow-angle:480deg}}
@keyframes p0-artifact-pulse{to{filter:brightness(1.7);opacity:.7}}

/* Prices stay on their physical goods; inventory inspection remains passive. */
.reliquary__item-price{position:absolute;top:1px;right:1px;z-index:1;display:flex;align-items:baseline;gap:2px;max-width:calc(100% - 2px);padding:1px 3px;background:color-mix(in srgb,var(--ui-recessed) 94%,transparent);color:var(--ui-jade);font:11px/1.2 var(--ui-font-number);white-space:nowrap;pointer-events:none}
.reliquary__item-price small{font:8px var(--ui-font-body)}
.reliquary__item-price[data-affordable=false]{color:var(--ui-negative)}
.reliquary__item[data-offer] .reliquary__size{display:none}
.reliquary__item[data-offer][data-item-width="1"] .reliquary__item-price{font-size:9px;padding:1px}
.reliquary__item[data-offer][data-item-width="1"] .reliquary__item-price small{display:none}
.reliquary__left-content>.reliquary__pages{margin-top:0;min-height:32px}
.reliquary__left-content>.reliquary__pages button{min-width:46px;min-height:36px}
@media(pointer:coarse){.reliquary__left-content>.reliquary__pages button{min-height:46px}}
@media(min-width:480px) and (max-width:1000px) and (max-height:550px){
 .reliquary__mobile-tabs{display:flex;height:34px;gap:4px;padding:2px 6px}
 .reliquary__mobile-tabs button{flex:1;font-size:11px;min-height:30px}
 .reliquary__panels{display:block;height:calc(100% - 68px);padding:3px 6px}
 .reliquary[data-merchant-open=false] .reliquary__panels{height:calc(100% - 34px)}
 .reliquary__left,.reliquary__right{height:100%}
 .reliquary[data-mobile-view=right] .reliquary__left,.reliquary[data-mobile-view=left] .reliquary__right{display:none}
 .reliquary__left:has([data-shelf-grid]){display:grid;grid-template-columns:minmax(0,1fr) 220px;grid-template-rows:34px minmax(0,1fr)}
 .reliquary[data-mobile-view=right] .reliquary__left:has([data-shelf-grid]){display:none}
 .reliquary__left:has([data-shelf-grid])>.reliquary__heading{grid-column:1;grid-row:1}
 .reliquary__shelf-tabs{grid-column:2;grid-row:1}
 .reliquary__left-content:has([data-shelf-grid]){grid-column:1;grid-row:2;grid-template-rows:minmax(0,1fr);padding:4px;gap:0}
 .reliquary__left-content>.reliquary__pages{position:absolute;top:0;left:calc((100% - 220px)/2);transform:translateX(-50%);height:34px;gap:4px}
 .reliquary__left-content>.reliquary__pages button{min-height:30px}
 .reliquary__merchant{grid-column:2;grid-row:2;border-top:0;border-left:1px solid var(--ui-line);align-content:center}
 .reliquary__item-price{font-size:10px;padding:1px 2px}
 .reliquary__item-price small{display:none}
}
@media(pointer:coarse) and (min-width:480px) and (max-width:1000px) and (max-height:550px){
 .spirit-menu[data-page=arsenal] .spirit-menu__dialog{grid-template-rows:46px 46px minmax(0,1fr)}
 .reliquary__mobile-tabs{height:46px}
 .reliquary__panels{height:calc(100% - 80px)}
 .reliquary__left:has([data-shelf-grid]){grid-template-rows:46px minmax(0,1fr)}
 .reliquary__left-content>.reliquary__pages{height:46px}
 .reliquary__left-content>.reliquary__pages button{min-height:46px}
 .reliquary__item-price{font-size:9px;padding:1px}
}

@media(prefers-reduced-motion:reduce){.reliquary__item[data-rarity]:after{animation:none}}

/* Standalone equipment uses a centered dressing table: character left, backpack right. */
@media(min-width:1000px) and (min-height:551px){
 .reliquary[data-merchant-open=false] .reliquary__panels{grid-template-columns:minmax(0,860px);padding:16px 24px}
 .reliquary[data-merchant-open=false] .reliquary__right{grid-column:1;grid-template-columns:minmax(280px,1fr) minmax(310px,1.08fr);grid-template-rows:44px 84px minmax(220px,1fr) 34px}
 .reliquary[data-merchant-open=false] .reliquary__right>.reliquary__heading{grid-column:1/-1;padding:6px 20px}
 .reliquary[data-merchant-open=false] .reliquary__weapon-rack{grid-column:1;grid-row:2;padding:8px 12px 4px;gap:5px}
 .reliquary[data-merchant-open=false] .reliquary__body{grid-column:1;grid-row:3;grid-template-columns:58px minmax(100px,1fr) 58px;gap:10px;padding:8px 12px 16px}
 .reliquary[data-merchant-open=false] .reliquary__gear-side{gap:12px}
 .reliquary[data-merchant-open=false] .reliquary__bag-head{grid-column:2;grid-row:2;align-self:start;height:38px;padding:4px 14px;margin:8px 12px 0;border-top:0;border-bottom:1px solid var(--ui-line);background:transparent}
 .reliquary[data-merchant-open=false] .reliquary__bag-head>span:last-child{display:none}
 .reliquary[data-merchant-open=false] .reliquary__bag{grid-column:2;grid-row:2/4;padding:54px 16px 16px;border-left:1px solid var(--ui-line)}
 .reliquary[data-merchant-open=false] .reliquary__stats{grid-column:1/-1;grid-row:4;padding:8px;font-size:11px;letter-spacing:.05em}
 .reliquary__interaction{max-width:980px;margin:0 auto;background:linear-gradient(90deg,transparent,var(--ui-panel) 15%,var(--ui-panel) 85%,transparent);border:0}
}
@media(min-width:601px) and (max-width:999px) and (min-height:551px){.reliquary[data-merchant-open=false] .reliquary__panels{grid-template-columns:minmax(0,520px)}.reliquary[data-merchant-open=false] .reliquary__right{grid-column:1}}

${r}

/* Narrow landscape keeps the shop visible beside its controls. */
@media(min-width:480px) and (max-width:1000px) and (max-height:550px){
 .spirit-menu[data-page=arsenal] .spirit-menu__dialog{grid-template-rows:46px minmax(0,1fr)}
 .spirit-menu[data-page=arsenal] .spirit-menu__header{position:absolute;right:0;top:0;z-index:2;height:46px;padding:0 5px;background:var(--ui-panel)}
 .spirit-menu[data-page=arsenal] .spirit-menu__header>:not(.spirit-menu__return){display:none}
 .spirit-menu[data-page=arsenal] .spirit-menu__return{margin:0;min-height:46px}
 .spirit-menu[data-page=arsenal] .spirit-menu__nav{grid-row:1;padding-right:134px;overflow-x:auto;justify-content:flex-start;gap:0}
 .spirit-menu[data-page=arsenal] .spirit-menu__nav button{flex:0 0 auto;min-height:46px;min-width:46px;padding:4px 8px}
 .spirit-menu[data-page=arsenal] .spirit-menu__content{grid-row:2}
 .reliquary__interaction{display:none}
 .reliquary__panels{height:calc(100% - 46px)}
 .reliquary[data-merchant-open=false] .reliquary__panels{height:100%}
 .reliquary__mobile-tabs{height:46px}
 .reliquary__mobile-tabs button{min-height:44px}
 .reliquary__left:has([data-shelf-grid]){grid-template-rows:46px 40px minmax(0,1fr)}
 .reliquary__left:has([data-shelf-grid])>.reliquary__heading{grid-column:2;grid-row:1;flex-wrap:wrap;gap:0;padding:2px}
 .reliquary__heading nav{flex:1}
 .reliquary__heading button{font-size:10px;padding:2px 4px}
 .reliquary__heading>b{font-size:11px}
 .reliquary__shelf-tabs{grid-column:2;grid-row:2}
 .reliquary__merchant{grid-column:2;grid-row:3;overflow-y:auto;min-height:0;align-content:start;overscroll-behavior:contain}
 .reliquary__left-content:has([data-shelf-grid]){grid-column:1;grid-row:1/-1}
 .reliquary__left-content:has(.reliquary__pages){grid-template-rows:minmax(0,1fr) auto}
 .reliquary__left-content>.reliquary__pages{position:static;transform:none;height:32px;min-height:32px}
 .reliquary__left-content>.reliquary__pages button{min-height:32px}
 .reliquary__right{max-width:none}
}
@media(max-width:600px) and (min-height:551px){
 .reliquary__lore,.reliquary__interaction,.reliquary__merchant>div:first-child{display:none}
 .reliquary__mobile-tabs{height:46px}
 .reliquary__mobile-tabs button,.reliquary__heading button,.reliquary__shelf-tabs button{min-height:44px}
 .reliquary__left>.reliquary__heading{min-height:46px}
 .reliquary__right>.reliquary__heading{min-height:0}
 .reliquary__panels{height:calc(100% - 46px)}
 .reliquary[data-merchant-open=false] .reliquary__panels{height:100%}
 .reliquary__merchant{gap:4px;padding:6px}
 .reliquary__merchant button,.reliquary__sell{min-height:46px!important}
}
@media(max-width:600px) and (min-height:551px) and (max-height:700px){
 .spirit-menu[data-page=arsenal] .spirit-menu__dialog{grid-template-rows:46px minmax(0,1fr)}
 .spirit-menu[data-page=arsenal] .spirit-menu__header{position:absolute;right:0;top:0;z-index:2;height:46px;padding:0 5px;background:var(--ui-panel)}
 .spirit-menu[data-page=arsenal] .spirit-menu__header>:not(.spirit-menu__return){display:none}
 .spirit-menu[data-page=arsenal] .spirit-menu__return{margin:0;min-height:46px}
 .spirit-menu[data-page=arsenal] .spirit-menu__nav{grid-row:1;padding-right:134px;overflow-x:auto;justify-content:flex-start;gap:0}
 .spirit-menu[data-page=arsenal] .spirit-menu__nav button{flex:0 0 auto;min-height:46px;min-width:46px;padding:4px 8px}
 .spirit-menu[data-page=arsenal] .spirit-menu__content{grid-row:2}
}

.reliquary__reveal{position:absolute;inset:0;z-index:25;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;background:rgba(12,25,32,.96);color:#ead8ab;text-align:center;padding:28px}
.reliquary__reveal[hidden]{display:none}
.reliquary__reveal>span{font-size:64px;animation:reliquary-seal-pulse 1.2s ease-in-out infinite}
.reliquary__reveal>strong{font-size:28px;letter-spacing:.3em}
.reliquary[data-revealing="true"]>:not(.reliquary__reveal){visibility:hidden}
@keyframes reliquary-seal-pulse{50%{opacity:.45;transform:scale(.85) rotate(45deg)}}
@media(prefers-reduced-motion:reduce){.reliquary__reveal>span{animation:none}}
.reliquary__unknown{display:flex;align-items:center;justify-content:center;flex-direction:column;overflow:hidden}
.reliquary__unknown>b{font-size:clamp(18px,3vw,32px);line-height:1;color:var(--ui-bronze-light)}
.reliquary__unknown .reliquary__item-name{font-size:9px;line-height:1.15;position:static}
.reliquary__identification{display:flex;align-items:center;gap:6px;flex-wrap:wrap;padding:9px;border:1px solid var(--ui-bronze-light);background:var(--ui-panel);font-size:12px}
.reliquary__identification[hidden]{display:none}.reliquary__identification>div{flex:1 1 180px}
.reliquary__identification small{display:block;line-height:1.5;color:var(--ui-muted)}
.reliquary__identification button{padding:7px;min-height:32px}
.reliquary__swap-preview{position:absolute;border:2px dashed var(--ui-jade);background:#51c29a33;pointer-events:none;z-index:8;font-size:11px;overflow:hidden}
.reliquary__item[data-swap-donor]{opacity:.4}
.expedition-dock [data-save-status]{max-width:180px;font-size:10px;color:var(--ui-muted)}
/* A revealed object owns a real row; it never squeezes controls into the old stat row. */
.reliquary__right:has([data-identification]:not([hidden])){grid-template-rows:34px 72px minmax(72px,.7fr) 27px minmax(120px,1fr) auto 27px}
.reliquary__identification{min-width:0;align-content:start}
.reliquary__identification button{min-height:40px}
.reliquary__inspect[data-details=false] [data-inspection-detail]{display:none}
@media(max-height:550px) and (min-width:480px){
 .reliquary__right:has([data-identification]:not([hidden])){grid-template-rows:28px 66px minmax(80px,1fr) auto 22px;overflow:auto}
 .reliquary__identification{grid-column:1/-1;grid-row:4;padding:5px}
 .reliquary__right:has([data-identification]:not([hidden])) .reliquary__stats{grid-row:5}
}
@media(min-width:1000px) and (min-height:551px){
 .reliquary[data-merchant-open=false] .reliquary__right:has([data-identification]:not([hidden])){grid-template-rows:44px 84px minmax(180px,1fr) auto 34px}
 .reliquary[data-merchant-open=false] .reliquary__identification{grid-column:1/-1;grid-row:4}
 .reliquary[data-merchant-open=false] .reliquary__right:has([data-identification]:not([hidden])) .reliquary__stats{grid-row:5}
}
`+n+`
@media(max-width:600px){
 .expedition-dock [data-save-status]{display:none}
 .expedition-dock [data-save-leave]{min-width:85px;white-space:nowrap}
 .expedition-dock [data-intermission-talk]{padding-inline:6px;white-space:nowrap}
 .expedition-dock__next{min-width:0;max-width:none;flex:1}
}
/* Sale/return are persistent destinations, including the compact warehouse. */
.reliquary{padding-bottom:50px;box-sizing:border-box}
.reliquary__interaction{display:flex!important;position:absolute;inset:auto 0 0;height:50px;box-sizing:border-box;max-width:none;margin:0;z-index:30}
.reliquary__interaction button{flex:none;min-height:44px!important}
.reliquary__panels{height:100%}
@media(max-width:600px){.reliquary[data-merchant-open=true] .reliquary__panels{height:calc(100% - 46px)}.reliquary__interaction>span{display:none}.reliquary__interaction{gap:10px}}
`+i;export{a as t};