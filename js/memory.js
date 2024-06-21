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
    var cards = []; // Llistat de cartes

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
                let partida = JSON.parse(sessionStorage.save);
                pairs = partida.pairs;
                points = partida.points;
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
        },
        save: function (){
            console.log("intentan guardar")
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
                window.location.assign("../index.html");
            });
        }
    }
}();

export var mostrar_inici = function(){
    //mostrar les cartes 1 segon abans de començar la partida
}