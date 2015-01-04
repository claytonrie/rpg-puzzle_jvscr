/* A Class and Timing API
// by Clayton
//
// To get a clock:
//     var variable_name = new Clock(time_interval[, false]);
*/
Class = function(obj){
    var tempFuncBody = "";
    var args = [];
    for(var i in obj){
        tempFuncBody+='this["'+i+'"] = '+obj[i]+'; ';
        if(i === "init"){
            for(var j = 0; j < obj[i].length; j++ ) args.push("_"+j);
            tempFuncBody+='this["init"]('+args+')';
        }
    }
    return (new Function(args.join(','),tempFuncBody));
};
Clock = new Class({
    intv: 1000, //interval in seconds
    time: null, //Saves the Timeout ID
    count: 0,
    resetCount: function(){
        this.count = 0;
    },
    setTiming: function(num){
        //Sets the Interval
        this.intv = num * 1000;
    },
    beginClock: function(func){
        //Begins the clock
        this.time = setInterval(function(){
            func();
            this.count++;
        }, this.intv);
    },
    stopClock: function(){
        //Stops the clock
        clearInterval(this.time);
    },
    init: function(interval,func){
        if(typeof func !== undefined)
            this.beginClock(func);
        this.intv *= interval;
    }
});