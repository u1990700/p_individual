
var optionsInf = function(){
    const default_options_inf = {
        pairs:2,
        difficulty:'normal'
    };
    
    var pairs = $('#pairs');
    var difficulty = $('#dif');

    var optionsInf = JSON.parse(localStorage.optionsInf||JSON.stringify(default_options_inf));
    pairs.val(optionsInf.pairs);
    difficulty.val(optionsInf.difficulty);
    pairs.on('change',()=>optionsInf.pairs = pairs.val());
    difficulty.on('change',()=>optionsInf.difficulty = difficulty.val());

    return { 
        applyChanges: function(){
            localStorage.optionsInf = JSON.stringify(optionsInf);
        },
        defaultValues: function(){
            optionsInf.pairs = default_options_inf.pairs;
            optionsInf.difficulty = default_options_inf.difficulty;
            pairs.val(optionsInf.pairs);
            difficulty.val(optionsInf.difficulty);
        }
    }
}();

$('#default').on('click',function(){
    optionsInf.defaultValues();
});


$('#apply').on('click',function(){
    optionsInf.applyChanges();
    location.replace("../index.html");
})