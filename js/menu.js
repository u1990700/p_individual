

var play = $('#play');
var options = $('#options');
var saves = $('#saves');
var exit = $('#exit');

play.on('click', function () { window.location.assign("./html/game.html")} );
options.on('click', function () { window.location.assign("./html/options.html")} );
saves.on('click', function () { console.error("Opció no implementada")} );
exit.on('click', function () { console.warn("No es pot sortir!")} );




/*
addEventListener('load', function() {
    document.getElementById('play').addEventListener('click', 
    function(){
        window.location.assign("./html/game.html");
    });

    document.getElementById('options').addEventListener('click', 
    function(){
        window.location.assign("./html/options.html");
    });

    document.getElementById('saves').addEventListener('click', 
    function(){
        console.error("Opció no implementada");
    });

    document.getElementById('exit').addEventListener('click', 
    function(){
        console.warn("No es pot sortir!");
    });
});
*/