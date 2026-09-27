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
.reliquary .reliquary__bag-toggle{display:flex;align-items:center;justify-content:center;gap:5px;white-space:nowrap}
.reliquary__bag-toggle small{font-size:10px;font-variant-numeric:tabular-nums;color:var(--ui-muted)}
@media(min-width:601px) and (min-height:551px){
 .reliquary__right{grid-template-rows:34px 112px minmax(130px,1fr) minmax(150px,1.2fr) 27px}
}
@media(min-width:1000px) and (min-height:551px){
 .reliquary[data-merchant-open=false] .reliquary__right{grid-template-rows:44px 112px minmax(190px,1fr) 34px}
}
@media(pointer:coarse){
 .inventory-portrait footer{min-height:40px}
 .inventory-portrait footer button{min-height:36px;min-width:36px}
 .reliquary__empty{touch-action:manipulation}
}
/* A single mobile toolbar belongs to the inventory. The outer menu contributes
 * only its page picker and close control; neither consumes a second row. */
.expedition-dock__compact-label{display:none}
.expedition-dock__tools{display:contents}
.reliquary [data-character-attributes]{position:absolute;right:4px;top:4px;z-index:6;min-height:32px;padding:3px 7px;background:var(--ui-panel);font-size:11px}
@media(max-width:700px), (orientation:landscape) and (max-width:1000px) and (max-height:550px){
 .spirit-menu[data-page=arsenal] .spirit-menu__dialog{inset:max(2px,env(safe-area-inset-top)) max(2px,env(safe-area-inset-right)) calc(48px + env(safe-area-inset-bottom)) max(2px,env(safe-area-inset-left));grid-template-rows:minmax(0,1fr)}
 .spirit-menu[data-page=arsenal] .spirit-menu__content{grid-row:1}
 .spirit-menu[data-page=arsenal] .spirit-menu__nav{display:none}
 .spirit-menu[data-page=arsenal] .spirit-menu__header{position:absolute;top:0;right:0;width:88px;height:44px;z-index:35;display:flex;gap:0;padding:0;border:0;background:var(--ui-panel)}
 .spirit-menu[data-page=arsenal] .spirit-menu__header>:not(.spirit-menu__return):not(.spirit-menu__compact-pages){display:none}
 .spirit-menu[data-page=arsenal] .spirit-menu__header .spirit-menu__compact-pages{display:block;appearance:none;width:44px;min-width:44px;height:44px;min-height:44px;padding:0 2px;border:0;border-left:1px solid var(--ui-line);border-radius:0;background:var(--ui-panel);color:var(--ui-text);font:12px var(--ui-font-body);text-align:center}
 .spirit-menu[data-page=arsenal] .spirit-menu__return{width:44px;min-width:44px;height:44px;min-height:44px;margin:0;padding:0;justify-content:center;gap:0;font-size:0;border:0;border-left:1px solid var(--ui-line)}
 .spirit-menu[data-page=arsenal] .spirit-menu__return::before{content:"×";font:24px/1 system-ui}
 .spirit-menu[data-page=arsenal] .spirit-menu__return kbd{display:none}
 .reliquary{--inventory-actions-width:88px;padding:44px 0 0;box-sizing:border-box}
 .reliquary[data-carrying=true] .reliquary__bag-toggle{display:none}
 .reliquary[data-dock-tools=true]{--inventory-actions-width:44px}
 .reliquary[data-dock-tools=true][data-carrying=true]{--inventory-actions-width:88px}
 .reliquary .reliquary__mobile-tabs{position:absolute;inset:0 calc(88px + var(--inventory-actions-width)) auto 0;height:44px;display:flex;gap:0;padding:0;background:var(--ui-panel)}
 .reliquary .reliquary__mobile-tabs button{flex:1;min-width:0;min-height:44px;height:44px;padding:0 4px;border:0;border-bottom:2px solid transparent;background:none;font-size:12px;white-space:nowrap}
 .reliquary .reliquary__mobile-tabs button[aria-pressed=true]{border-bottom-color:var(--ui-jade);color:var(--ui-jade)}
 .reliquary .reliquary__interaction{position:absolute;inset:0 88px auto auto;width:var(--inventory-actions-width);height:44px;padding:0;gap:0;justify-content:flex-end;border:0;background:var(--ui-panel);z-index:31;flex-wrap:nowrap}
 .reliquary .reliquary__interaction>span{display:none!important}
 .reliquary[data-input-device=gamepad] .reliquary__interaction [data-input-help]{display:block!important;position:fixed;left:50%;bottom:46px;transform:translateX(-50%);max-width:calc(100vw - 8px);padding:3px 6px;background:var(--ui-panel);font-size:10px;white-space:nowrap;pointer-events:none}
 .reliquary .reliquary__interaction button{width:44px;min-width:44px;min-height:44px;height:44px;padding:2px;border:0;border-left:1px solid var(--ui-line);font-size:11px;line-height:15px}
 .reliquary .reliquary__bag-toggle{flex-direction:column;gap:0;line-height:15px}
 .reliquary .reliquary__bag-toggle small{font-size:9px}
 .reliquary .reliquary__sell{flex-direction:column;justify-content:center;gap:0;white-space:nowrap}
 .reliquary .reliquary__sell small{display:none}
 .reliquary[data-carrying=true] .reliquary__sell small{display:block;max-width:40px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}
 .reliquary .reliquary__panels,.reliquary[data-merchant-open=false] .reliquary__panels,.reliquary[data-merchant-open=true] .reliquary__panels{display:block;height:100%;padding:4px 0 0}
 .reliquary .reliquary__left,.reliquary .reliquary__right{height:100%;min-height:0;border:0;box-shadow:none}
 .reliquary[data-mobile-view=right] .reliquary__left,.reliquary[data-mobile-view=left] .reliquary__right{display:none}
 .reliquary__left::after,.reliquary__right::after{display:none}
 .reliquary .reliquary__right>.reliquary__heading,.reliquary .reliquary__right>.reliquary__stats{display:none}
 .reliquary__weapon-rack{gap:4px;padding:0}
 .reliquary__weapon-rack .reliquary__model{inset:15px 3px 18px}
 .reliquary__weapon-rack .reliquary__item-name{font-size:10px;line-height:15px;padding:1px}
 .reliquary__body{max-width:none;width:100%;gap:4px;padding:0;grid-template-columns:44px minmax(60px,1fr) 44px}
 .reliquary__gear-side{gap:4px}
 .reliquary__portrait{border:0}
 .inventory-portrait{position:relative;display:block}
 .inventory-portrait__viewport{width:100%;height:100%}
 .inventory-portrait footer{position:absolute;left:2px;bottom:2px;min-height:36px;padding:0;background:none}
 .inventory-portrait footer span,.inventory-portrait footer [data-portrait-action=left],.inventory-portrait footer [data-portrait-action=right]{display:none}
 .inventory-portrait footer [data-portrait-action=reset]{width:36px;min-width:36px;height:36px;min-height:36px;font-size:0;background:var(--ui-panel)}
 .inventory-portrait footer [data-portrait-action=reset]::before{content:"↺";font-size:20px}
 .reliquary [data-character-attributes]{top:auto;right:2px;bottom:2px;min-width:40px;min-height:36px;height:36px;padding:2px 4px;font-size:11px}
 .reliquary .reliquary__bag{min-width:0;min-height:0;padding:0 2px 2px;border:0}
 .reliquary .reliquary__left{display:grid;grid-template-columns:minmax(0,1fr);grid-template-rows:44px minmax(0,1fr) auto}
 .reliquary .reliquary__left>.reliquary__heading{grid-column:1;grid-row:1;position:relative;justify-content:flex-end;padding:0 8px;border:0;background:none;pointer-events:none}
 .reliquary__left>.reliquary__heading nav,.reliquary__left>.reliquary__lore{display:none}
 .reliquary .reliquary__shelf-tabs{grid-column:1;grid-row:1;padding:0 90px 0 0;gap:4px;background:none}
 .reliquary .reliquary__shelf-tabs button{min-height:44px!important;padding:2px 6px}
 .reliquary .reliquary__left-content{grid-column:1;grid-row:2;padding:2px;gap:3px;min-height:0}
 .reliquary .reliquary__left-content:has([data-shelf-grid]){grid-template-rows:minmax(0,1fr) auto}
 .reliquary .reliquary__left-content>.reliquary__pages{position:static;transform:none;height:36px;min-height:36px;margin:0;gap:6px}
 .reliquary .reliquary__left-content>.reliquary__pages button{height:36px;min-height:36px;padding:2px 8px}
 .reliquary .reliquary__merchant{grid-column:1;grid-row:3;display:flex;align-content:normal;padding:3px 2px;border:0;background:none;overflow:visible}
 .reliquary__merchant>div:first-child,.reliquary__merchant>[data-pity]{display:none}
 .reliquary__merchant>div:nth-child(2){flex:1}
 .reliquary .reliquary__merchant button{min-height:44px;padding:2px 6px}
 .reliquary__merchant button b{display:inline;margin-left:6px;font-size:12px}
 .reliquary[data-left=warehouse] .reliquary__left{grid-template-rows:minmax(0,1fr)}
 .reliquary[data-left=warehouse] .reliquary__left>.reliquary__heading,.reliquary__left-content>.reliquary__stow{display:none}
 .reliquary[data-left=warehouse] .reliquary__left-content{grid-row:1}
 .reliquary__message{top:auto;bottom:4px;max-width:calc(100% - 16px);pointer-events:none}
 .reliquary__message:empty{display:none}
 .reliquary__drop-hint{bottom:4px;font-size:11px;padding:4px 8px}
 #expedition-primary-actions{left:max(4px,env(safe-area-inset-left));right:max(4px,env(safe-area-inset-right));bottom:env(safe-area-inset-bottom);height:44px;max-width:none;margin:0;justify-content:center;padding:0 2px;gap:4px;background:var(--ui-panel);border-top:1px solid var(--ui-line)}
 #expedition-primary-actions .expedition-dock__rest,#expedition-primary-actions [data-save-status],#expedition-primary-actions .expedition-dock__full-label{display:none}
 #expedition-primary-actions .expedition-dock__compact-label{display:inline}
 #expedition-primary-actions button{height:44px;min-height:44px;min-width:44px;padding:2px 6px;font-size:12px;white-space:nowrap}
 #expedition-primary-actions .expedition-dock__next{height:44px;min-height:44px;min-width:0;max-width:180px;flex:0 1 180px;padding:2px 6px;justify-content:center}
 #expedition-primary-actions .reliquary__bag-toggle{display:flex;flex-direction:column;gap:0;line-height:15px}
 #expedition-primary-actions .reliquary__bag-toggle small{font-size:9px;color:var(--ui-muted);font-variant-numeric:tabular-nums}
 #expedition-primary-actions [data-next-label]{white-space:normal;line-height:16px}
 #expedition-primary-actions .expedition-dock__next>span:first-child{font-size:22px}
}
@media(max-width:700px) and (orientation:portrait){
 .reliquary .reliquary__right{display:grid;grid-template-columns:minmax(108px,.75fr) minmax(152px,1.25fr);grid-template-rows:minmax(168px,.72fr) minmax(0,1fr);padding:2px;gap:4px}
 .reliquary__weapon-rack{grid-column:1;grid-row:1;grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(3,minmax(0,1fr))}
 .reliquary__body{grid-column:2;grid-row:1}
 .reliquary__bag{grid-column:1/-1;grid-row:2}
 .reliquary .reliquary__right:has([data-identification]:not([hidden])){grid-template-rows:minmax(168px,.72fr) minmax(0,1fr) auto}
 .reliquary[data-mobile-view=left] .reliquary__right{display:none}
}
@media(orientation:landscape) and (max-width:1000px) and (max-height:550px){
 .reliquary .reliquary__right{display:grid;grid-template-columns:minmax(112px,.7fr) minmax(152px,.9fr) minmax(140px,1fr);grid-template-rows:minmax(0,1fr);gap:6px;padding:2px}
 .reliquary__weapon-rack{grid-column:1;grid-row:1;grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(2,minmax(0,1fr))}
 .reliquary__body{grid-column:2;grid-row:1;grid-template-columns:40px minmax(64px,1fr) 40px}
 .reliquary .reliquary__bag{grid-column:3;grid-row:1;padding-top:0}
 .reliquary .reliquary__right:has([data-identification]:not([hidden])){grid-template-rows:minmax(0,1fr) auto}
 .reliquary .reliquary__identification{grid-row:2}
 .reliquary[data-mobile-view=left] .reliquary__right{display:none}
}
@media(max-width:700px), (orientation:landscape) and (max-width:1000px) and (max-height:550px){
 .reliquary__identification{grid-column:1/-1;grid-row:3;padding:3px}
}

.reliquary[data-bag-expanded=true] .reliquary__right{grid-template-columns:minmax(0,1fr);grid-template-rows:minmax(0,1fr);gap:0}
.reliquary[data-bag-expanded=true] .reliquary__right:has([data-identification]:not([hidden])){grid-template-rows:minmax(0,1fr) auto}
.reliquary[data-bag-expanded=true] .reliquary__right>:is(.reliquary__weapon-rack,.reliquary__body,.reliquary__heading,.reliquary__stats){display:none}
.reliquary[data-bag-expanded=true] .reliquary__bag{grid-column:1;grid-row:1;padding:2px}
.reliquary[data-bag-expanded=true] .reliquary__identification{grid-column:1;grid-row:2}
`;export{e as t};