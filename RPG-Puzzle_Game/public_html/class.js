// A Class Constructor Generator
//     by Clayton
Class = function(obj){
    return function(){
        this.tempObjectHold = this.tempObjectHold || obj;
        for(var i in this.tempObjectHold)
            if(this.tempObjectHold.hasOwnProperty(i))
                this[i] = this.tempObjectHold[i];
        (this.tempObjectHold.init || function(){}).apply(this, arguments);
        delete this.tempObjectHold;
    };
};
function print(s){
    document.getElementById("print").innerHTML += s;
}
randomInt = function(lowest, highest){
    return Math.floor(lowest + Math.random() * (highest - lowest));
};