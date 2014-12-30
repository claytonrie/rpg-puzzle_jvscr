/* A Timing API
// by Clayton
//
// To get a clock:
//     var variable_name = new Clock(time_interval[, false]);
*/
Clock=function(func,intv, noStart){
    this.intv = intv*1000; //interval in seconds
    this.time = null; //Saves the Timeout ID
    this.count = 0;
    this.resetCount = function(){
        this.count = 0;
    };
    this.setTiming = function(num){
        //Sets the Interval
        this.intv = num * 1000;
    };
    this.beginClock = function(func){
        //Begins the clock
        this.time = setInterval(function(){
            func();
            this.count++;
        }, this.intv);
    };
    this.stopClock = function(){
        //Stops the clock
        clearInterval(this.time);
    };
    if((typeof noStart === undefined)? true : !noStart) this.beginClock(func);
};