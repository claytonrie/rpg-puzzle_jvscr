// A Timing Class
//     by Clayton
Clock = new Class({
    intv: 00, //interval in seconds
    time: null, //Saves the Timeout ID
    count: 0,
    setTiming: function(num) {
        //Sets the Interval
        this.intv = num * 1000;
    },
    beginClock: function(func) {
        //Begins the clock
        return this.time = setInterval(function() {
            return func(this.count++, this.intv);
        }, this.intv);
    },
    stopClock: function() {
        //Stops the clock
        clearInterval(this.time);
    },
    init: function(interval, func) {
        this.intv = 1000 * interval;
        return func && this.beginClock(func);
    }
});