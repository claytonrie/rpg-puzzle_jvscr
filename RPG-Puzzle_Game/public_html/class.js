// A Class Constructor Generator
//     by Clayton
Class = function(obj){
    return (function(){
        this.tempObjectHold = this.tempObjectHold || obj;
        for(var i in this.tempObjectHold)
            if(this.tempObjectHold.hasOwnProperty(i))
                this[i] = this.tempObjectHold[i];
        (this.tempObjectHold.init || function(){}).apply(this, arguments);
    });
};
