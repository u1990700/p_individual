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


    var options = JSON.parse(localStorage.optionsInf||JSON.stringify(default_options_inf));
    var lastCard;
    var pairs = options.pairs;
    var acumulado = options.pairs;
    var points = 100;
    var time = options.time;
    var lostPoints = 25;
    var flippedCount = 0; // Contador de cartas volteadas
    var punts = $('#score');
    punts.value = points;

    var cards = [];


    var mix = function(){
        var items = resources.slice(); // Copiem l'array
        items.sort(() => Math.random() - 0.5); // Aleatòria
        items = items.slice(0, pairs); // Agafem els primers
        items = items.concat(items);
        return items.sort(() => Math.random() - 0.5); // Aleatòria
    }

    return {
        init: function (call){
           if (sessionStorage.save){ // Load game
                let partida = sessionStorage.save;
                pairs = partida.pairs;
                //acumulado = partida.pairs;
                points = partida.points;
                //time = partida.time;
                partida.cards.map(item=>{
                    let it = Object.create(card);
                    it.front = item.front;
                    it.current = item.current;
                    it.isDone = item.isDone;
                    it.waiting = item.waiting;
                    it.callback = call;
                    cards.push(it);
                    if (it.current != back && !it.waiting && !it.isDone) it.goBack();
                    else if (it.waiting) lastCard = it;
                });
                return cards;
            }
            else return mix().map(item => { // New game
                cards.push(Object.create(card, { front: {value:item}, callback: {value:call}}));
                return cards[cards.length-1];
            });

            
        },
        click: function (card){
            if (!card.clickable || flippedCount >= 2) return; // Si la carta no es clickeable, ya está volteada o ya hay dos cartas volteadas, no hacer nada
            
            card.goFront();   
            flippedCount++; // Incrementar el contador de cartas volteadas

            if (lastCard){ // Segunda carta   
                if (card.front === lastCard.front){
                    pairs--;
                    if (pairs <= 0){
                        //localStorage.setItem('pairs', pairs * 2); // Doblar los pares para el siguiente nivel
                        acumulado++;
                        options.pairs = acumulado;
                        localStorage.setItem('optionsInf', JSON.stringify(options)); // Guardar optionsInf en localStorage
                        
                        options.time = time;
                        console.log(options.time);

                        alert("Has ganado con " + points + " puntos!");
                        window.location.reload(); // Recargar la página
                    }
                }
                else{
                    [card, lastCard].forEach(c=>c.goBack());
                    points-=lostPoints;
                    punts.value = points;
                    console.log(points); //mostrar puntuacion

                    if (points <= 0){
                        alert ("Has perdido");
                        options.pairs = 2; //Resetear los valores 
                        localStorage.setItem('optionsInf', JSON.stringify(options)); // Guardar optionsInf en localStorage
                        window.location.replace("../");
                    }
                }
                lastCard = null;
                
                setTimeout(() => {
                    flippedCount = 0; // Reiniciar el contador de cartas volteadas
                }, 1000);
            }
            else lastCard = card; // Primera carta
        },
        save: function (){
            var partida = {
                uuid: localStorage.uuid,
                pairs: pairs,
                points: points,
                cards: []
            };
            cards.forEach(c=>{
                partida.cards.push({
                    current: c.current,
                    front: c.front,
                    isDone: c.isDone,
                    waiting: c.waiting
                });
            });

            let json_partida = JSON.stringify(partida);

            fetch("../php/save.php",{
                method: "POST",
                body: json_partida,
                headers: {"content-type":"application/json; charset=UTF-8"}
            })
            .then(response=>response.json())
            .then(json => {
                console.log(json);
            })
            .catch(err=>{
                console.log(err);
                localStorage.save = json_partida;
                console.log(localStorage.save);
            })
            .finally(()=>{
              window.location.replace("../");
            });
        }
    }
}();

export var mostrar_inici = function(){
    //mostrar les cartes 1 segon abans de començar la partida
}