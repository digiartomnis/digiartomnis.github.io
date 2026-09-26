var e=String.raw`
.reliquary__left,.reliquary__right{background:transparent}
.reliquary__grid{background-color:transparent}
.reliquary .reliquary__item,.reliquary .reliquary__item:hover,.reliquary .reliquary__item.is-selected{background:transparent!important;box-shadow:none!important}
.reliquary .reliquary__item.is-selected{outline:1px solid var(--rarity);outline-offset:-3px}
.reliquary__weapon-rack .reliquary__model{inset:8px 4px 19px}
.reliquary__weapon-rack .reliquary__item-name{font-size:10px;line-height:15px;text-align:center}
.reliquary__weapon-rack .reliquary__equip>small{top:3px;left:4px;font-size:9px}
.reliquary__weapon-rack .reliquary__item[data-automatic=true]{box-shadow:none!important}
.inventory-portrait footer{min-height:32px;padding:2px;gap:2px}
.inventory-portrait footer button{min-height:28px;min-width:28px;font-size:12px;padding:0 4px}
.inventory-portrait footer span{flex:1;text-align:center;font-size:9px}
.inventory-portrait__viewport:focus-visible{outline:2px solid var(--ui-jade);outline-offset:-3px}
.reliquary [data-bag-expand]{display:none}
@media(min-width:601px) and (min-height:551px){
 .reliquary__right{grid-template-rows:34px 112px minmax(130px,1fr) 27px minmax(150px,1.2fr) 27px}
}
@media(min-width:1000px) and (min-height:551px){
 .reliquary[data-merchant-open=false] .reliquary__right{grid-template-rows:44px 112px minmax(190px,1fr) 34px}
}
@media(pointer:coarse){
 .inventory-portrait footer{min-height:40px}
 .inventory-portrait footer button{min-height:36px;min-width:36px}
 .reliquary__empty{touch-action:manipulation}
}
@media(max-width:600px), (orientation:landscape) and (max-width:1000px) and (max-height:550px){
 .reliquary{padding-bottom:44px}
 .reliquary__interaction{height:44px;gap:8px;padding:0 6px}
 .reliquary__interaction button{min-height:40px!important;padding:3px 12px}
 .reliquary__interaction>span{display:none}
 .reliquary__sell{width:auto}
 .reliquary__weapon-rack{gap:4px}
 .reliquary [data-bag-expand]{display:block;color:var(--ui-jade);font-size:10px;white-space:nowrap}
 .reliquary__weapon-rack .reliquary__model{inset:8px 3px 17px}
 .reliquary__weapon-rack .reliquary__item-name{font-size:9px;line-height:14px;padding:1px}
 .reliquary[data-input-device=gamepad] .reliquary__interaction [data-input-help]{display:block;flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
}
@media(max-width:600px) and (orientation:portrait){
 .reliquary__right{grid-template-rows:28px 92px minmax(154px,1fr) 25px minmax(140px,1.05fr) 21px}
 .reliquary__body{grid-template-columns:48px minmax(110px,1fr) 48px;max-width:360px;gap:6px;padding:3px 6px}
 .reliquary__gear-side{gap:4px}
 .reliquary__stats{padding:2px;font-size:9px}
 .inventory-portrait footer span{display:none}
 .inventory-portrait footer{justify-content:space-between}
}
@media(max-width:600px) and (orientation:portrait) and (max-height:700px){
 .reliquary__right{grid-template-rows:78px minmax(140px,.95fr) 28px minmax(110px,1fr)}
 .reliquary__right>.reliquary__heading,.reliquary__right>.reliquary__stats{display:none}
 .reliquary__weapon-rack{grid-row:1}
 .reliquary__body{grid-row:2}
 .reliquary__bag-head{grid-row:3}
 .reliquary__bag{grid-row:4}
 .reliquary__body{grid-template-columns:42px minmax(100px,1fr) 42px;gap:4px}
 .inventory-portrait footer{min-height:32px}
 .inventory-portrait footer button{min-height:30px;min-width:32px}
 .reliquary__right>.reliquary__heading{font-size:10px;padding:0 6px}
}
/* The three groups each get the full landscape height. The former two-row
 * arrangement put the portrait below six very narrow weapon slots. */
@media(orientation:landscape) and (max-width:1000px) and (max-height:550px){
 .reliquary[data-merchant-open=true] .reliquary__panels{height:calc(100% - 46px)}
 .reliquary__right{grid-template-columns:minmax(132px,.68fr) minmax(184px,1fr) minmax(150px,1fr);grid-template-rows:minmax(0,1fr);gap:6px;padding:4px}
 .reliquary__right>.reliquary__heading,.reliquary__right>.reliquary__stats{display:none}
 .reliquary__weapon-rack{grid-column:1;grid-row:1;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr));padding:0;gap:4px}
 .reliquary__body{grid-column:2;grid-row:1;grid-template-columns:40px minmax(90px,1fr) 40px;max-width:none;width:100%;padding:0;gap:4px}
 .reliquary__gear-side{gap:4px}
 .reliquary__bag-head{grid-column:3;grid-row:1;align-self:start;height:28px;margin:0;padding:0 3px;border-top:0;font-size:10px;z-index:1}
 .reliquary__bag-head button{min-height:28px!important;font-size:10px}
 .reliquary__bag{grid-column:3;grid-row:1;min-width:0;padding:30px 0 0}
 .inventory-portrait footer span{display:none}
 .inventory-portrait footer{justify-content:space-between;min-height:34px}
 .inventory-portrait footer button{min-height:30px;min-width:28px}
 .reliquary__right:has([data-identification]:not([hidden])){grid-template-rows:minmax(100px,1fr) auto}
 .reliquary__identification{grid-row:2;grid-column:1/-1}
}
@media(max-width:600px), (orientation:landscape) and (max-width:1000px) and (max-height:550px){
 .reliquary[data-bag-expanded=true] .reliquary__right{grid-template-columns:minmax(0,1fr);grid-template-rows:44px minmax(0,1fr);gap:0}
 .reliquary[data-bag-expanded=true] .reliquary__right>:is(.reliquary__weapon-rack,.reliquary__body,.reliquary__heading,.reliquary__stats){display:none}
 .reliquary[data-bag-expanded=true] .reliquary__bag-head{grid-column:1;grid-row:1;height:44px;padding:0 10px}
 .reliquary[data-bag-expanded=true] .reliquary__bag-head button{min-height:44px!important}
 .reliquary[data-bag-expanded=true] .reliquary__bag{grid-column:1;grid-row:2;padding:4px 8px 8px}
}
`;export{e as t};