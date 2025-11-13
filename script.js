import data from './Legendary_Sets.json' with { type: 'json' };

const dW = data.legendarySets[0];
const gS = data.legendarySets[1];
const spear = data.legendarySets[2];
const misc = data.legendarySets[3];

function calcTotalSetWeight(pieces) {

     let totalWeight = 0;
     for (let i = 0; i < pieces.length; i++)  totalWeight += pieces[i].weight;
     return totalWeight.toFixed(1);
}
function findnReturnSet(sets, selectedArmor) {

     for (let i = 0; i < sets.length; i++) {
          if(sets[i].name === selectedArmor)
               return sets[i];
     }
}

function prependArmorInfoBlock(set) {

     let codeBlock =
          `<div id="armor-info" class="armor-info">
     <h1 class="armor-name">${set.name}</h1>
     <div class="weight-info">
          <div class="weight-cat">${set.weightClass}</div>
          <div class="weight">${set.totalWeight}</div>
     </div>\n</div>`;

     $("#fx-atr-sec").prepend(codeBlock);

     return;
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

     return;
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

     return;
}
function appendSelectMenu(sets, type) {
     // console.log(sets + type)

     let codeBlock =
          `<ul id="armor-list" class="armor-list">
     ${sets.map((set, i) =>
               `<li class="an-armor ${(i === 0 && type === "Dual Wield") ? "active" : ""}" data-armor-type="${type}">
          <div class="img-container">
               <img src="./Assets/Imgs/Armors/${type}/${set.name}.jpg" alt="Image of an armor named ${set.name}" onerror="this.onerror=null; this.src='./Assets/Imgs/Armors/${type}/Fallback.jpg'">
          </div>
          <div class="armor-name">${set.name}</div>
     </li>`).join('')}\n</ul>`;

     $("#select").append(codeBlock);

     return;
}

function removeArmorList() {

     let select = $("#select");

     if (select.find("#armor-list").length > 0)
          $("#armor-list").remove();

     return;
}
function removePreviousArmor() {

     $("#armor-info").remove();
     $("#fx-atr-grid").remove();
     $("#set-atr-grid").remove();

     return;
}

function menuBtnClick(e) {
     e.preventDefault();

     $(this).find('i').toggleClass('fa-bars fa-xmark');

     if (!($("#app").hasClass("modal-open"))) {
          $("#app").addClass("modal-open");
          $("#modal").removeClass("modal-closed");
     }
     else {
          $("#app").removeClass("modal-open");
          $("#modal").addClass("modal-closed");

     }

     return;
};
function selectBtnClicked(e) {
     e.preventDefault();

     if (!($(this).hasClass("active"))) {
          $(this).addClass("active");
          $(this).siblings().removeClass("active");

          removeArmorList();

          let x = $(this).data('weapon');

          if (x === "gs")
               appendSelectMenu(gS.sets, gS.setType);
          else if (x === "dw")
               appendSelectMenu(dW.sets, dW.setType);
          else if (x === "spear")
               appendSelectMenu(spear.sets, spear.setType);
          else
               appendSelectMenu(misc.sets, misc.setType);
     }

     return;
     // console.log($(this).data('weapon'));
}
function armorSelected(e) {
     e.preventDefault();

     $("#menu").find('i').toggleClass('fa-bars fa-xmark');

     if (!($(this).hasClass("active"))) {
          $(this).addClass("active");
          $(this).siblings().removeClass("active");

          // Remove Previous Info
          removePreviousArmor();

          // Add selected armor's info
          let setToAdd;
          let selectedArmor = $(this).children(".armor-name").text();

          if (($(this).data('armor-type')) === "Dual Wield")
               setToAdd = findnReturnSet(dW.sets, selectedArmor);

          else if (($(this).data('armor-type')) === "Greatsword")
               setToAdd = findnReturnSet(gS.sets, selectedArmor);
          
          else if (($(this).data('armor-type')) === "Spear")
               setToAdd = findnReturnSet(spear.sets, selectedArmor);

          else
               setToAdd = findnReturnSet(misc.sets, selectedArmor);

          prependArmorInfoBlock(setToAdd);
          appendFxAtrBlock(setToAdd);
          appendSetAtrBlock(setToAdd);

          // Close Modal
          $("#app").removeClass("modal-open");
          $("#modal").addClass("modal-closed");
     }

     return;
}

$(document).ready(function () {

     // Setting up main screen & menu
     prependArmorInfoBlock(dW.sets[0]);
     appendFxAtrBlock(dW.sets[0]);
     appendSetAtrBlock(dW.sets[0]);
     appendSelectMenu(dW.sets, dW.setType);

     $("#menu").click(menuBtnClick);
     $(".select-options").click(selectBtnClicked);
     $("#select").on('click', ".an-armor", armorSelected);
});