import{t as e}from"./mobile-game-styles-4-plm_vN.js";var t=String.raw`
.reliquary__character{display:none;min-width:0;min-height:0;height:100%}
.reliquary__character .preparation-character-panel{max-width:none}
.reliquary .reliquary__character-summary{position:relative;inset:auto;display:flex;width:100%;height:34px;min-height:34px;align-items:center;justify-content:space-between;gap:8px;padding:0 12px;border:0;border-bottom:1px solid var(--ui-line);border-radius:0;background:var(--ui-panel);font-size:11px}
.reliquary__character-summary>span{display:flex;align-items:center;gap:5px;white-space:nowrap}
.reliquary__character-summary svg{height:17px;width:17px;color:var(--ui-jade)}
.reliquary__character-summary b{font:600 13px var(--ui-font-number);font-variant-numeric:tabular-nums}
.reliquary__character-summary small[data-direction=up]{color:var(--ui-jade)}
.reliquary__character-summary small[data-direction=down]{color:var(--ui-danger)}
.reliquary__character-summary [data-attributes-label]{font-size:10px;color:var(--ui-jade)}
.reliquary .reliquary__shelf-tabs{flex-wrap:wrap}
.reliquary .reliquary__refresh{flex:1.5;white-space:nowrap;color:var(--ui-jade)}
.reliquary__wave-reward{display:flex;align-items:center;justify-content:space-between;gap:4px;padding:4px 8px;background:var(--ui-panel);color:var(--ui-jade);font-size:10px;border-bottom:1px solid var(--ui-line)}
.reliquary__wave-reward button{min-height:28px;flex:none;padding:2px 6px;font-size:10px}
@media(min-height:551px) and (min-width:701px){
 .reliquary .reliquary__panels{height:calc(100% - 68px)}
 .reliquary .reliquary__right{grid-template-rows:34px 104px minmax(150px,1fr) minmax(130px,.95fr)}
 .reliquary .reliquary__right:has([data-identification]:not([hidden])){grid-template-rows:34px 104px minmax(130px,1fr) minmax(110px,.95fr) auto}
 .reliquary[data-merchant-open=false] .reliquary__right{grid-template-columns:minmax(0,1fr);grid-template-rows:34px 104px minmax(150px,1fr) minmax(130px,.95fr)}
 .reliquary[data-merchant-open=false] .reliquary__weapon-rack{grid-column:1;grid-row:2}
 .reliquary[data-merchant-open=false] .reliquary__body{grid-column:1;grid-row:3}
 .reliquary[data-merchant-open=false] .reliquary__bag{grid-column:1;grid-row:4}
 .reliquary[data-bag-expanded=true] .reliquary__right{grid-template-rows:minmax(0,1fr)}
 .reliquary[data-bag-expanded=true] .reliquary__bag{grid-row:1}
}
@media(min-width:1100px) and (min-height:551px){
 .spirit-menu[data-page=arsenal] .spirit-menu__dialog{inset:12px max(12px,calc((100% - 1740px)/2)) 64px}
 .reliquary .reliquary__character-summary{display:none}
 .reliquary .reliquary__panels{height:calc(100% - 34px);grid-template-columns:minmax(260px,.9fr) minmax(380px,1.35fr) minmax(250px,.82fr);gap:12px;padding:8px 12px;justify-content:stretch}
 .reliquary .reliquary__character{display:block;grid-column:3;grid-row:1}
 .reliquary[data-merchant-open=false] .reliquary__panels{grid-template-columns:minmax(420px,1.5fr) minmax(260px,.8fr);height:calc(100% - 34px);max-width:1160px;margin:auto}
 .reliquary[data-merchant-open=false] .reliquary__character{grid-column:2}
 .reliquary__body{grid-template-columns:56px minmax(120px,1fr) 56px;max-width:none}
}
@media(max-width:1099px), (max-height:550px){
 .reliquary[data-mobile-view=stats] .reliquary__panels{display:block}
 .reliquary[data-mobile-view=stats] .reliquary__left,.reliquary[data-mobile-view=stats] .reliquary__right{display:none}
 .reliquary[data-mobile-view=stats] .reliquary__character{display:block;height:100%}
 .reliquary[data-mobile-view=stats] .preparation-character-panel{max-width:760px;margin:auto}
 .reliquary[data-mobile-view=stats] .preparation-character__rows{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 16px}
}
@media ${e}{
 .reliquary{padding-top:76px}
 .reliquary .reliquary__character-summary{position:absolute;top:44px;left:0;height:32px;min-height:32px;padding:0 7px;gap:4px}
 .reliquary .reliquary__panels,.reliquary[data-merchant-open=false] .reliquary__panels{height:100%}
 .reliquary .reliquary__left{position:relative;grid-template-rows:76px minmax(0,1fr) auto}
 .reliquary .reliquary__left>.reliquary__heading{align-self:start;min-height:32px;height:32px}
 .reliquary .reliquary__shelf-tabs,.reliquary[data-mobile-view=left] .reliquary__shelf-tabs{height:76px;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);grid-template-rows:32px 40px;gap:0 2px;padding:0}
 .reliquary .reliquary__shelf-tabs button{min-height:32px!important;padding:0 4px;font-size:11px;min-width:0}
 .reliquary .reliquary__shelf-tabs [data-shelf=market]{grid-column:1;grid-row:1;padding-right:60px}
 .reliquary .reliquary__shelf-tabs [data-shelf=delivery]{grid-column:1;grid-row:2}
 .reliquary .reliquary__shelf-tabs .reliquary__refresh{grid-column:2;grid-row:2}
 .reliquary[data-left=warehouse] .reliquary__left{grid-template-rows:26px minmax(0,1fr)}
 .reliquary__wave-reward{position:absolute;right:4px;top:3px;z-index:2;max-width:calc(100% - 85px);height:26px;padding:0 3px;border:0;pointer-events:auto}
 .reliquary__left:has([data-claim-wave-reward]){grid-template-rows:76px minmax(0,1fr) auto auto}
 .reliquary__wave-reward:has(button){position:static;grid-column:1;grid-row:3;height:auto;max-width:none;flex-wrap:wrap;background:var(--ui-panel)}
 .reliquary__left:has([data-claim-wave-reward]) .reliquary__merchant{grid-row:4}
 .reliquary__wave-reward:not(:has(button)){display:none}
 .reliquary[data-mobile-view=stats] .preparation-character__resources{padding:4px 9px}
 .reliquary[data-mobile-view=stats] .preparation-character__summary{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
 .reliquary[data-mobile-view=stats] .preparation-character__summary .preparation-character__row{grid-template-columns:18px minmax(0,1fr);gap:3px}
 .reliquary[data-mobile-view=stats] .preparation-character__summary .preparation-character__reading{grid-column:1/-1;justify-content:center}
}
@media(max-width:480px) and (orientation:portrait){
 .reliquary[data-mobile-view=stats] .preparation-character__rows{grid-template-columns:minmax(0,1fr)}
 .reliquary[data-mobile-view=stats] .preparation-character__row{min-height:32px}
 .reliquary .reliquary__shelf-tabs [data-shelf=market]{padding-right:0;text-align:left}
}

/* Landscape uses the existing departure row for trading; the center only owns
 * native item apertures. Portrait and desktop restore the same controls. */
.reliquary__restock-compact{display:none}
.expedition-dock__trade[hidden]{display:none!important}
@media(orientation:landscape) and (max-height:550px){
 .reliquary[data-trade-dock=true] .reliquary__left{grid-template-rows:36px minmax(0,1fr)}
 .reliquary[data-trade-dock=true] .reliquary__left>.reliquary__heading{height:36px;min-height:36px;padding:0 5px}
 .reliquary[data-trade-dock=true] .reliquary__heading [data-wallet]{font-size:11px;white-space:nowrap}
 .reliquary[data-trade-dock=true] .reliquary__shelf-tabs{height:36px;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:36px;padding:0 92px 0 0;gap:2px}
 .reliquary[data-trade-dock=true] .reliquary__shelf-tabs :is([data-shelf=market],[data-shelf=delivery],.reliquary__refresh){grid-column:auto;grid-row:1;padding:0 2px;min-height:36px!important;font-size:11px;white-space:nowrap}
 .reliquary[data-trade-dock=true] .reliquary__left-content:has([data-shelf-grid]){grid-template-rows:minmax(0,1fr);gap:0}
 .reliquary[data-trade-dock=true] .reliquary__left:has([data-claim-wave-reward]){grid-template-rows:36px minmax(0,1fr) auto}
 #expedition-primary-actions[data-trade-dock=true]{justify-content:space-between;gap:4px}
 #expedition-primary-actions .expedition-dock__trade{display:flex;align-items:center;gap:6px;min-width:0;order:-1}
 #expedition-primary-actions .expedition-dock__trade .reliquary__merchant{display:flex;padding:0;border:0;background:none;gap:0;min-width:0;overflow:visible}
 #expedition-primary-actions .reliquary__merchant>div:first-child,#expedition-primary-actions .reliquary__merchant>[data-pity]{display:none}
 #expedition-primary-actions .reliquary__merchant>div:nth-child(2){display:flex;gap:4px}
 #expedition-primary-actions .expedition-dock__trade .reliquary__restock-full{display:none}
 #expedition-primary-actions .expedition-dock__trade .reliquary__restock-compact{display:inline}
 #expedition-primary-actions .reliquary__merchant button{flex:none;min-width:68px;padding:2px 6px;line-height:16px;font-size:11px}
 #expedition-primary-actions .reliquary__merchant button b{display:block;margin:0;font:12px/15px var(--ui-font-number);color:var(--ui-jade)}
 #expedition-primary-actions .reliquary__pages{display:flex;align-items:center;gap:3px;margin:0;padding:0;min-width:0;font-size:11px;white-space:nowrap}
 #expedition-primary-actions .reliquary__pages button{flex:none;min-width:44px;width:44px;padding:0;font-size:20px}
 #expedition-primary-actions .reliquary__pages [data-claim-all]{font-size:11px;width:auto;padding:0 4px}
 #expedition-primary-actions .reliquary__pages>span{min-width:28px;text-align:center;font-variant-numeric:tabular-nums}
 #expedition-primary-actions[data-trade-dock=true] .expedition-dock__next{margin-left:auto;flex:0 1 150px}
}
@media(orientation:landscape) and (max-height:550px) and (max-width:740px){
 #expedition-primary-actions[data-trade-dock=true]{gap:2px;padding:0}
 #expedition-primary-actions .expedition-dock__trade{gap:3px}
 #expedition-primary-actions .reliquary__merchant>div:nth-child(2){gap:2px}
 #expedition-primary-actions .reliquary__merchant button{min-width:52px;padding:2px;line-height:15px}
 #expedition-primary-actions[data-trade-dock=true]>button{padding:2px 3px;font-size:11px}
 #expedition-primary-actions[data-trade-dock=true] .expedition-dock__next{flex:0 1 108px}
 #expedition-primary-actions .reliquary__pages{gap:1px}
 #expedition-primary-actions .reliquary__pages>span{min-width:22px;font-size:10px}
}
`;export{t};