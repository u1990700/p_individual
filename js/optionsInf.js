
var optionsInf = function(){
    const default_options_inf = {
        pairs:2,
        difficulty:'normal',
        time:60
    };
    
    var pairs = $('#pairs');
    var difficulty = $('#dif');
    var time = $('#time');

    var optionsInf = JSON.parse(localStorage.optionsInf||JSON.stringify(default_options_inf));
    pairs.val(optionsInf.pairs);
    difficulty.val(optionsInf.difficulty);
    pairs.on('change',()=>optionsInf.pairs = pairs.val());
    difficulty.on('change',()=>optionsInf.difficulty = difficulty.val());

    time.val(optionsInf.time);
    time.on('change',()=>optionsInf.time = time.val());



    return { 
        applyChanges: function(){
            localStorage.optionsInf = JSON.stringify(optionsInf);
        },
        defaultValues: function(){
            optionsInf.pairs = default_options_inf.pairs;
            optionsInf.difficulty = default_options_inf.difficulty;
            optionsInf.time = default_options_inf.time;
            pairs.val(optionsInf.pairs);
            difficulty.val(optionsInf.difficulty);
            time.val(optionsInf.time);
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