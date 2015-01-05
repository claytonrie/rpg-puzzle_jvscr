detect = {
    events: [],
    keyPress: new Class({
        init: function (func,noStart){
            Object.defineProperty(this, "func", {
                get: function() { return detect.events[this.loc]; },
                set: function(x) { detect.events[this.loc] = x; },
            });
            this.func = func;
            if((typeof noStart === undefined)? (true) : (!noStart))
                this.begin();
        }, func: new Function(),
        loc: detect.events.length,
        begin: function(){
            document.onkeypress = function (event){
                var temp = false;
                if (event.which !== 0 && event.charCode !== 0){
                    temp = String.fromCharCode(event.which);
                    // the rest
                }
                if(!temp) return;
                this.func(temp);
            }
        }
    }),
    clickOn: new Class({
        init: function (func,noStart){
            Object.defineProperty(this, "func", {
                get: function() { return detect.events[this.loc]; },
                set: function(x) { detect.events[this.loc] = x; },
            });
            this.func = func;
            if((typeof noStart === undefined)? (true) : (!noStart))
                this.begin();
        }, func: new Function(),
        loc: detect.events.length,
        begin: function(){
            document.onkeypress = function (event){
                var temp = false;/*
                if (event.which !== 0 && event.charCode !== 0){
                    temp= String.fromCharCode(event.which);
                }*/
                if(!temp) return;
                this.func(temp);
            }
        }
    })
};
