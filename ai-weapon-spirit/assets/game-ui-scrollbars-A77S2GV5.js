function e(e){let t=`:where(${e}), :where(${e}) *`;return`
${t} {
  scrollbar-width: thin;
  scrollbar-color: var(--ui-bronze) transparent;
}
@media (hover: hover) {
  :where(${e}):hover, :where(${e}) *:hover {
    scrollbar-color: var(--ui-bronze-light) var(--ui-recessed);
  }
}
${t.split(`, `).map(e=>`${e}::-webkit-scrollbar`).join(`, `)} { width: 10px; height: 10px; }
${t.split(`, `).map(e=>`${e}::-webkit-scrollbar-track`).join(`, `)} { background: transparent; }
${t.split(`, `).map(e=>`${e}::-webkit-scrollbar-thumb`).join(`, `)} {
  background: var(--ui-bronze); border: 2px solid transparent; background-clip: padding-box;
  border-radius: 999px; min-height: 32px;
}
${t.split(`, `).map(e=>`${e}::-webkit-scrollbar-thumb:hover`).join(`, `)} { background-color: var(--ui-bronze-light); }
${t.split(`, `).map(e=>`${e}::-webkit-scrollbar-thumb:active`).join(`, `)} { background-color: var(--ui-jade); }
${t.split(`, `).map(e=>`${e}::-webkit-scrollbar-corner`).join(`, `)} { background: transparent; }
@media (forced-colors: active) { ${t} { scrollbar-color: auto; scrollbar-width: auto; } }
`}export{e as t};