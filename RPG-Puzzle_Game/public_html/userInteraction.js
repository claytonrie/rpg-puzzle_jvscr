detect = {
    events: [],
    keyPress: function (func,noStart){
        this.func=func;
        this.begin = function(){
            document.onkeypress = function (event){
                var temp=false;
                if (event.which !== 0 && event.charCode !== 0){
                    temp= String.fromCharCode(event.which);
                    // the rest
               }
                if (!temp) return;
                this.func(temp);
            }
        }
        if((typeof noStart === undefined)?(true):(!noStart)) this.begin();
    },
    clickOn: function (func,noStart){
        this.func=func;
        this.begin = function(){
            document.onkeypress = function (event){
                var temp=false;/*
                if (event.which !== 0 && event.charCode !== 0){
                    temp= String.fromCharCode(event.which);
                }*/
                if (!temp) return;
                this.func(temp);
            }
        }
        if((typeof noStart === undefined)?(true):(!noStart)) this.begin();
    }
}
