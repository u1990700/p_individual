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
    var lostPoints = 25;
    var flippedCount = 0; // Contador de cartas volteadas
    var punts = $('#score');
    punts.value = points;

    return {
        init: function (call){
                var items = resources.slice(); // Copiamos el array
                items.sort(() => Math.random() - 0.5); // Aleatorio
                items = items.slice(0, pairs); // Tomamos las primeras
                items = items.concat(items);
                items.sort(() => Math.random() - 0.5); // Aleatorio

                var llistar_mostrar = items.map(item => Object.create(card, {front: {value:item}, callback: {value:call}}));
    
                // Ajuste del tiempo según la dificultad
                if(options.difficulty == "normal"){
                    time = 1000;
                    lostPoints=25;
                } else if (options.difficulty == "hard") {
                    time = 500;
                    lostPoints = 50;
                } else if (options.difficulty == "easy") {
                    time = 2000;
                    lostPoints= 10;
                }

                // Las cartas se revelan durante 1 segundo
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
            if (!card.clickable || flippedCount >= 2) return; // Si la carta no es clickeable, ya está volteada o ya hay dos cartas volteadas, no hacer nada
            
            card.goFront();   
            flippedCount++; // Incrementar el contador de cartas volteadas

            if (lastCard){ // Segunda carta   
                if (card.front === lastCard.front){
                    pairs--;
                    if (pairs <= 0){
                        alert("Has ganado con " + points + " puntos!");
                        window.location.assign("../");
                    }
                }
                else{
                    [card, lastCard].forEach(c=>c.goBack());
                    points-=lostPoints;
                    punts.value = points;
                    console.log(points); //mostrar puntuacion

                    if (points <= 0){
                        alert ("Has perdido");
                        window.location.replace("../");
                    }
                }
                lastCard = null;
                
                setTimeout(() => {
                    flippedCount = 0; // Reiniciar el contador de cartas volteadas
                }, 1000);
            }
            else lastCard = card; // Primera carta
        }
    }
}();

export var mostrar_inici = function(){
    //mostrar les cartes 1 segon abans de començar la partida
}