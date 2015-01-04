/* A Class and Timing API
// by Clayton
//
// To get a clock:
//     var variable_name = new Clock(time_interval[, false]);
*/
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