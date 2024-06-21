addEventListener('load', function() {
    document.getElementById('mode1').addEventListener('click', 
    function(){
        window.location.assign("./mode1.html");
         //Configurar a mode 1
    });

    document.getElementById('mode2').addEventListener('click', 
    function(){
        window.location.assign("./phasergameinf.html");
        //Configurar a mode 2
    });
});