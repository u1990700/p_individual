export var game = function(){
    const back = '../resources/back.png';
    const resources = ['../resources/cb.png', '../resources/co.png', '../resources/sb.png','../resources/so.png', '../resources/tb.png','../resources/to.png'];
    const card = {
        current: back,
        clickable: true,
        goBack: function (){
            setTimeout(() => {
                this.current = back;
                this.clickable = true;
                this.callback();
            }, 1000);
        },
        goFront: function (){
            this.current = this.front;
            this.clickable = false;
            this.callback();
        }
    };
    var options = JSON.parse(localStorage.options||JSON.stringify(default_options));
    var lastCard;
    var pairs = options.pairs;
    var points = 100;
    var time = 1000;


    return {
        init: function (call){
            var items = resources.slice(); // Copiem l'array
            items.sort(() => Math.random() - 0.5); // Aleatòria
            items = items.slice(0, pairs); // Agafem els primers
            items = items.concat(items);
            items.sort(() => Math.random() - 0.5); // Aleatòria

          
            var llistar_mostrar = items.map(item => Object.create(card, {front: {value:item}, callback: {value:call}}));
 
            // Pendent modificar el temps segons la dificultat, per aixo cal guardar be les opcions
            if(options.difficulty = "normal"){
                console.log("normal");
                time = 1000;
            } else if (options.difficulty = "hard") {
                console.log("dificil");
                time = 500;
            }

            //Les cartes es revelen durant 1 segon
            for(var i = 0;i < items.length; i++){
                llistar_mostrar[i].pointer = $('#c'+i);
                llistar_mostrar[i].pointer.attr("src", card.current);
                llistar_mostrar[i].goFront();  
                setTimeout(() => {
                    console.log("Ha pasado 1 segundo")
                }, 1000); 
                llistar_mostrar[i].goBack(); 
            }
            return llistar_mostrar;



        },
        click: function (card){
            if (!card.clickable) return;
            card.goFront();
            if (lastCard){ // Segona carta
                if (card.front === lastCard.front){
                    pairs--;
                    if (pairs <= 0){
                        alert("Has guanyat amb " + points + " punts!");
                        window.location.replace("../");
                    }
                }
                else{
                    [card, lastCard].forEach(c=>c.goBack());
                    points-=25;
                    if (points <= 0){
                        alert ("Has perdut");
                        window.location.replace("../");
                    }
                }
                lastCard = null;
            }
            else lastCard = card; // Primera carta
        }
    }
}();

export var mostrar_inici = function(){


   //mostrar les cartes 1 segon abans de començar la partida

}