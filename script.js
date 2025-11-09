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


$(document).ready(function () {
     const dW = data.legendarySets[0];
     const gS = data.legendarySets[1];
     const spear = data.legendarySets[2];
     const misc = data.legendarySets[3];

     // console.log(dW)

     for (let i = 0; i < dW.sets.length; i++) {
          $("#armor-list").append(`
               <li class="an-armor ${i === 0 ? "active" : ""}">
                    <div class="img-container">
                         <img src="./Assets/Imgs/Armors/Dual Wield/${dW.sets[i].name}.jpg" alt="Image of an armor named ${dW.sets[i].name}">
                    </div>
                    <div class="armor-name">${dW.sets[i].name}</div>
               </li>`);
     }

     $("#menu").click(menuBtnClick);
});