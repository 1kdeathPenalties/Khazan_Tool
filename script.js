import data from './Legendary_Sets.json' with { type: 'json' };

function menuBtnClick(e) {
     e.preventDefault();

     if (!($("#app").hasClass("modal-open"))) {
          $("#app").addClass("modal-open");
          $("#modal").removeClass("modal-closed");
     }
     else {
          $("#app").removeClass("modal-open");
          $("#modal").addClass("modal-closed");

     }
};
function calcTotalSetWeight(pieces) {

     let totalWeight = 0;
     for (let i = 0; i < pieces.length; i++)  totalWeight += pieces[i].weight;
     return totalWeight.toFixed(1);
}
function prependArmorInfoBlock(set){
     let codeBlock = 
     `<div class="armor-info">
     <h1 class="armor-name">${set.name}</h1>
     <div class="weight-info">
          <div class="weight-cat">${set.weightClass}</div>
          <div class="weight">${set.totalWeight}</div>
     </div>\n</div>`;

     $("#fx-atr-sec").prepend(codeBlock);
}
function appendFxAtrBlock(set) {

     let codeBlock = 
     `<div id="fx-atr-grid" class="fx-atr-grid">
     ${set.setPieces.map((piece, i) =>
     `<div class="fx-atr-card">
          <header class="fx-atr-title">
               <h2>${piece.pieceType}</h2>
          </header>

          <div class="fx-atrs-sec">
               <!-- First Attribute -->
               <div class="atr-marker"></div>
               <div class="atr-desc">
                    <div class="line">${piece.fixedAttr[0].attrDesc}</div>
                    ${(piece.fixedAttr[0].attrDescCont === null) ? "" : `<div class="line"><i>${piece.fixedAttr[0].attrDescCont}</i></div>`}
               </div>
               ${(piece.fixedAttr[0].hasValue === false) ? `<div class="atr-value"></div>` : (piece.fixedAttr[0].valueIsPercent === true) ? `<div class="atr-value">${piece.fixedAttr[0].value}%</div>` : `<div class="atr-value">${piece.fixedAttr[0].value}</div>`}
          
               <!-- Second Attribute -->
               <div class="atr-marker"></div>
               <div class="atr-desc">
                    <div class="atr-desc">
                    <div class="line">${piece.fixedAttr[1].attrDesc}</div>
                    ${(piece.fixedAttr[1].attrDescCont === null) ? "" : `<div class="line"><i>${piece.fixedAttr[1].attrDescCont}</i></div>`}
               </div>
               </div>
               ${(piece.fixedAttr[1].hasValue === false) ? `<div class="atr-value"></div>` : (piece.fixedAttr[1].valueIsPercent === true) ? `<div class="atr-value">${piece.fixedAttr[1].value}%</div>` : `<div class="atr-value">${piece.fixedAttr[1].value}</div>`}
          </div>
     </div>`).join('')}\n</div>`;
     
     $("#fx-atr-grid-container").append(codeBlock);
}
function appendSetAtrBlock(set) {

     let codeBlock =
     `<div id="set-atr-grid" class="set-atr-grid">
     ${set.setAttr.map((attr, i) =>
     `<div class="set-atr-card">
          <div class="marker">${i + 2}</div>
          <div class="desc">
               <div class="line">${attr.attrDesc}</div>
               ${(attr.attrDescCont === null) ? "" : `<div class="line"><i>${attr.attrDescCont}</i></div>`}
          </div>
          ${(attr.hasValue === false) ? `<div class="atr-value"></div>` : (attr.valueIsPercent === true) ? `<div class="atr-value">${attr.value}%</div>` : `<div class="atr-value">${attr.value}</div>`}
     </div>`).join('')}\n</div>`;
     
     $("#set-atr-sec").append(codeBlock);
}

$(document).ready(function () {
     const dW = data.legendarySets[0];
     const gS = data.legendarySets[1];
     const spear = data.legendarySets[2];
     const misc = data.legendarySets[3];

     // console.log(dW.sets)

     // Setting up main screen
     prependArmorInfoBlock(dW.sets[0]);
     appendFxAtrBlock(dW.sets[0]);
     appendSetAtrBlock(dW.sets[0]);

     // Dynamically adding data, for DWs, to the menu selector
     for (let i = 0; i < dW.sets.length; i++) {
          $("#armor-list").append(`
               <li class="an-armor ${i === 0 ? "active" : ""}">
                    <div class="img-container">
                         <img src="./Assets/Imgs/Armors/Dual Wield/${(dW.sets[i].name === "Wooyo's Breeze") ? "Fallback DW" : dW.sets[i].name}.jpg" alt="Image of an armor named ${dW.sets[i].name}">
                    </div>
                    <div class="armor-name">${dW.sets[i].name}</div>
               </li>`);
     }

     $("#menu").click(menuBtnClick);
});