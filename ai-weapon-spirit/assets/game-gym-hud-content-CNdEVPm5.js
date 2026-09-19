var e=String.raw`
@media (pointer:coarse), (max-width:700px) {
  .spirit-gym-hud{--mobile-left:max(10px,env(safe-area-inset-left));--mobile-right:max(10px,env(safe-area-inset-right));--mobile-top:max(10px,env(safe-area-inset-top));--mobile-bottom:max(8px,env(safe-area-inset-bottom))}
  .spirit-gym-hud__status{position:absolute;left:var(--mobile-left);top:var(--mobile-top);width:172px;height:102px;padding:8px 10px;background:#171c22d9;border:1px solid #96744766;border-radius:8px}
  .spirit-gym-hud__identity{position:static;width:auto;padding:0;background:none;border:0}
  .spirit-gym-hud__name{display:none}
  .spirit-gym-hud__cultivation b{font-size:14px}
  .spirit-gym-hud__cultivation>span{font-size:10px}
  .spirit-gym-hud__xp-track{margin-top:3px}
  .spirit-gym-hud__resource-orb,.spirit-gym-hud__resource-orb--qi{position:relative;inset:auto;display:flex;align-items:center;justify-content:space-between;width:100%;height:26px;margin:4px 0 0;padding:0 0 6px;border:0;border-radius:0;background:none;box-shadow:none}
  .spirit-gym-hud__resource-orb::after,.spirit-gym-hud__orb-rune{display:none}
  .spirit-gym-hud__resource-orb strong,.spirit-gym-hud__resource-orb small{position:static;transform:none;font:11px/1.4 system-ui,sans-serif;letter-spacing:0;white-space:nowrap}
  .spirit-gym-hud__orb-well,.spirit-gym-hud__resource-orb--qi .spirit-gym-hud__orb-well{inset:auto 0 0;height:4px;border-radius:2px;background:#abb2be30}
  .spirit-gym-hud__orb-liquid{border:0;box-shadow:none;transform:scaleX(var(--resource-ratio,1));transform-origin:left;background:#d16d61}
  .spirit-gym-hud__resource-orb--qi .spirit-gym-hud__orb-liquid{background:#78b7db;box-shadow:none}
  .spirit-gym-hud__round{left:auto;right:var(--mobile-right);top:calc(var(--mobile-top) + 52px);bottom:auto;transform:none;width:100px;min-width:0;padding:4px 6px;border:0;border-radius:6px;background:#171c22b8}
  .spirit-gym-hud__round strong{font-size:11px;letter-spacing:0}
  .spirit-gym-hud__round span{font-size:20px;line-height:1.1}
  .spirit-gym-hud__score{top:calc(var(--mobile-top) + 108px);left:var(--mobile-left);right:var(--mobile-right);bottom:auto;width:auto;display:flex;gap:14px;padding:3px 6px;font-size:10px;background:#171c2280;border:0;border-radius:4px}
  .spirit-gym-hud__score span{gap:5px}
  .spirit-gym-hud__score b{font-size:12px}
  .spirit-gym-hud__score span:last-child{display:none}
  .spirit-gym-hud__loadout{bottom:calc(var(--mobile-bottom) + 54px);width:calc(100% - var(--mobile-left) - var(--mobile-right));max-width:380px;padding:0;border:0;background:none}
  .spirit-gym-hud__loadout-head{display:none}
  .spirit-gym-hud__slot-row{gap:3px}
  .spirit-gym-hud__slot{height:54px;min-height:46px;padding:3px 1px;gap:2px;border-radius:5px;background:#171c22dc}
  .spirit-gym-hud__slot-name{font-size:10px}
  .spirit-gym-hud__weapon-vitals{width:24px;height:24px}
  .spirit-gym-hud__input-hint,.spirit-gym-hud__dash{display:none}
  .spirit-gym-hud__touch{display:block}
  .spirit-gym-hud__joystick{left:calc(var(--mobile-left) + 4px);top:auto;bottom:calc(var(--mobile-bottom) + 130px);width:96px;height:96px;background:#18221d70;border:2px solid #d1c49d90}
  .spirit-gym-hud__joystick::after{width:32px;height:32px}
  .spirit-gym-hud__touch-action{width:64px;height:64px;font-size:13px;border:2px solid #d1c49d90;background:#18221d99}
  .spirit-gym-hud__touch-jump{right:var(--mobile-right);bottom:calc(var(--mobile-bottom) + 164px)}
  .spirit-gym-hud__touch-dash{right:calc(var(--mobile-right) + 74px);bottom:calc(var(--mobile-bottom) + 124px)}
  [data-game-menu-open=true] .spirit-gym-hud{visibility:hidden}
  #expedition-primary-actions{left:max(10px,env(safe-area-inset-left));right:max(10px,env(safe-area-inset-right));bottom:max(8px,env(safe-area-inset-bottom));width:auto;max-width:480px;margin:0 auto;gap:4px}
  #expedition-primary-actions button{min-width:46px;min-height:46px;height:46px;padding:5px 7px;font-size:12px;touch-action:manipulation}
}
@media (pointer:coarse) and (orientation:landscape) and (min-width:700px) {
  .spirit-gym-hud__status{height:96px}
  .spirit-gym-hud__resource-orb{height:23px}
  .spirit-gym-hud__round{left:50%;right:auto;top:var(--mobile-top);transform:translateX(-50%);width:112px}
  .spirit-gym-hud__score{top:calc(var(--mobile-top) + 100px);right:auto;width:180px;gap:8px;font-size:9px}
  .spirit-gym-hud__loadout{max-width:304px}
  .spirit-gym-hud__joystick{bottom:calc(var(--mobile-bottom) + 8px)}
  .spirit-gym-hud__touch-jump{bottom:calc(var(--mobile-bottom) + 74px)}
  .spirit-gym-hud__touch-dash{bottom:calc(var(--mobile-bottom) + 4px)}
  #expedition-primary-actions{max-width:304px}
}
`,t=String.raw`
@media (pointer:coarse), (max-width:700px) {
  .spirit-menu{font-size:14px}
  .spirit-menu__launcher{top:max(10px,env(safe-area-inset-top));right:max(10px,env(safe-area-inset-right));min-width:88px;min-height:46px;padding:0 10px;font-size:13px}
  .spirit-menu__launcher kbd{display:none}
  .spirit-menu__dialog{inset:max(4px,env(safe-area-inset-top)) max(0px,env(safe-area-inset-right)) calc(max(8px,env(safe-area-inset-bottom)) + 52px) max(0px,env(safe-area-inset-left));grid-template-rows:52px 48px minmax(0,1fr)}
  .spirit-menu__header{padding:2px 10px;gap:8px}
  .spirit-menu__header h1{font-size:18px}
  .spirit-menu__header small,.spirit-menu__paused,.spirit-menu__seal{display:none}
  .spirit-menu button{min-height:46px;touch-action:manipulation}
  .spirit-menu__return{min-height:46px;font-size:13px;padding:6px 12px}
  .spirit-menu__nav{padding:0 4px;gap:0;overflow-x:auto}
  .spirit-menu__nav button{min-width:46px;min-height:46px;flex:1;padding:4px 6px;font-size:13px;white-space:nowrap;letter-spacing:0}
  .spirit-menu__journey{padding:16px;overscroll-behavior:contain}
  .spirit-menu .spirit-audio-settings__body,.spirit-menu .forgeax-presentation-settings__panel{padding:16px}
  .spirit-menu .forgeax-presentation-settings fieldset{grid-template-columns:90px minmax(50px,1fr) 48px;gap:12px 6px}
  .spirit-menu input[type=range],.spirit-menu select{min-height:46px}
}
`,n=Object.freeze({assetId:`ui-game-gym-hud`,displayName:`演武 HUD`,generatorVersion:`game-gym-hud-layout-v11`,title:`《我的 AI 队友不可能是上古器灵！》· 本地 Demo`,loading:{title:`加载中`,initialLabel:`正在加载资源…`,sceneLabel:`正在加载场景…`,gameplayLabel:`正在准备游戏…`,frameLabel:`即将完成…`,viewBox:`0 0 200 120`,riderParts:[{id:`sword-blade`,path:`M49 93 L175 88 L191 92 L174 98 L49 98 Z`,fill:`#c0e4de`},{id:`sword-edge`,path:`M61 95 L184 92 L174 98 L61 98 Z`,fill:`#619d99`},{id:`sword-hilt`,path:`M27 93 L50 92 L50 99 L27 98 Z M49 88 L55 88 L55 104 L49 104 Z`,fill:`#d3b47c`},{id:`rear-leg`,path:`M94 73 L106 75 L95 92 L80 92 L80 87 L89 85 Z`,fill:`#274b4d`},{id:`front-leg`,path:`M107 73 L119 72 L123 87 L135 89 L135 94 L116 94 Z`,fill:`#426663`},{id:`robe`,path:`M105 38 L120 42 L124 63 L133 76 L115 82 L98 76 L73 80 L86 60 Z`,fill:`#a5c9bb`},{id:`robe-fold`,path:`M106 48 L113 55 L105 73 L115 82 L98 76 L73 80 L92 64 Z`,fill:`#578d85`},{id:`sash`,path:`M97 57 L122 56 L123 62 L95 64 Z M99 62 L91 82 L84 84 L93 61 Z`,fill:`#d3b47c`},{id:`flying-sleeve`,path:`M107 42 L95 45 L81 38 L63 39 L79 49 L92 58 L105 55 Z`,fill:`#c8ddd0`},{id:`front-sleeve`,path:`M119 43 L129 50 L141 47 L143 54 L128 61 L116 55 Z`,fill:`#dce6d4`},{id:`hand`,path:`M141 47 L150 46 L151 51 L143 54 Z`,fill:`#e1bc94`},{id:`head`,path:`M111 23 L126 23 L130 34 L125 42 L113 39 L108 31 Z`,fill:`#e1bc94`},{id:`hair`,path:`M108 21 L117 17 L127 21 L130 28 L117 26 L113 36 L106 31 Z M115 17 L112 12 L119 9 L124 13 L123 19 Z`,fill:`#233e41`},{id:`hair-ribbon`,path:`M110 23 L99 29 L79 25 L63 29 L80 31 L99 34 L114 27 Z`,fill:`#78b8ad`}]},inventory:{backpack:{columns:10,rows:10},warehouse:{columns:12,rows:10},pocketStackLimit:20},menu:{title:`灵境行囊`,pages:[{id:`journey`,label:`本局`,subtitle:`修行有迹，与器同行。`},{id:`arsenal`,label:`行囊`,subtitle:`挑选器物，调整配装，再赴下一波。`},{id:`compendium`,label:`图签`,subtitle:`识百物，知万法。`},{id:`affixes`,label:`词条`,subtitle:`下局规则与单件器物最高纪录。`},{id:`audio`,label:`声音`,subtitle:`听见剑鸣，也听见灵境。`},{id:`presentation`,label:`画面`,subtitle:`让每一道攻势都清晰可辨。`}]},zones:[{id:`status`,anchor:`bottom-twin-orbs`,data:[`health`,`maxHealth`,`qi`,`maxQi`,`cultivationLevel`,`cultivation`,`inWater`,`waterSlowResistance`]},{id:`round`,anchor:`top-center`,data:[`wave`,`time`]},{id:`score`,anchor:`bottom-right`,data:[`spiritStones`,`kills`,`enemies`,`loot`]},{id:`loadout`,anchor:`bottom-center`,data:[`weaponSlots`,`weaponHealth`,`weaponQi`,`weaponResourcePhase`,`automaticAttack`,`gearSlots`]},{id:`dash`,anchor:`bottom-left`,data:[`dashReady`]},{id:`input-hint`,anchor:`bottom-left`,data:[`activeInputDevice`]},{id:`shop`,anchor:`left-merchant-or-stash-right-character-bag`,data:[`directPurchaseShelf`,`singleConsignment`,`tenConsignment`,`mixedEquipmentPool`,`wallet`,`weaponEquip`,`gearEquip`,`pocketAutoEffect`,`merge`,`salvage`,`authoritativeStats`,`nextWave`]},{id:`touch`,anchor:`safe-area`,data:[`joystick`,`dash`,`jump`]}],loadout:{weapon:{count:6,shortLabel:`武`,emptyTitle:`武器槽`},gear:{count:6,shortLabel:`装`,emptyTitle:`装备槽`}},copy:{inWater:`水中`,clearWater:`碧水`,health:`气血`,qi:`灵力`,cultivation:`修为`,spiritStones:`灵石`,kills:`击破`,enemies:`敌影`,loot:`遗蕴 / 器物`,reset:`重开本局`,shopTitle:`渡灵商人`,shopSubtitle:`看清品相、词条和价格后直购；特殊进货包下十件，在商人货架领取。行囊有限，同类随身物可叠放，仓库不提供随身加成。`,nextWave:`踏入下一劫`,touchDash:`冲刺`,touchJump:`跳跃`,keyboardHint:`键盘 · WASD / Space / Shift`,gamepadHint:`手柄 · 左摇杆移动 / 十字键选项 / A 确认跳跃 / B 返回冲刺`,touchHint:`触摸 · 左侧摇杆 / 右侧跳跃与冲刺`}});export{e as n,t as r,n as t};