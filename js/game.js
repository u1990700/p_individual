import { game as gController } from "./memory.js";

var game = $('#game');

gController.init(updateSRC).forEach(function(card, indx){



    game.append('<img id="c'+indx+'" class="card" title="card">');
    card.pointer = $('#c'+indx);
    card.pointer.on('click', () => gController.click(card));
    card.pointer.attr("src", card.current);

    //Les cartes es revelen durant 1 segon
    card.goFront();
    setTimeout(() => {
        console.log("Ha pasado 1 segundo")
    }, 1000);

    card.goBack();
    });

function updateSRC(){
    this.pointer.attr("src", this.current);
}