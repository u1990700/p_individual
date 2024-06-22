addEventListener('load', function() {
    document.getElementById('play').addEventListener('click', 
    function(){
        sessionStorage.removeItem("save");
        window.location.assign("./html/escollirmode.html");
    });

    document.getElementById('saves').addEventListener('click', 
    function(){
        fetch("./php/load.php",{
            method: "POST",
            body: "",
            headers: {"content-type":"application/json; charset=UTF-8"}
        })
        .then(response=>{
            if (response.ok) response.text();
            else trow("PHP connection fail");
        })
        .then(partida=>sessionStorage.save = partida)
        .catch(err=>sessionStorage.save = localStorage.save)
        .finally(()=>window.location.assign("./html/phasergameinf.html"));
    });

    document.getElementById('options').addEventListener('click', 
    function(){
        window.location.assign("./html/optionsInf.html");
    });

    document.getElementById('ranking').addEventListener('click', 
    function(){
        window.location.assign("./html/ranking.html");
    });
});