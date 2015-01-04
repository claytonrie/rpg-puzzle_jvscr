// Canvas Class
//     by Clayton
Canvas = new Class({
    //Creates a canvas object
    init: function(name, height, width){
        this.name = name;
        this.elem = document.getElementById(name);
        this.ctx = this.elem.getContext("2d");
        this.h = height;
        this.w = width;
        document.write('<canvasid="'+this.name+'"width="'+this.w+'"height="'+this.h+'"><p>Ifyouseethis,getHTML5.</p></canvas>');
    },
    // Returns the object
    name: null,
    elem: null,
    ctx: null, //Gets"context"
    h: null,
    w: null,
    clearScreen: function(){
        //Rectanglewithupper-leftcornerat(x, y)
        this.ctx.clearRect(-10, -10, this.w+20, this.h+20);
    },
    drawRect: function(x, y, w, h, unfilled){
        //Rectanglewithupper-leftcornerat(x, y)and
        //heighthandwidthw
        if((typeofunfilled===undefined)?false:unfilled){
            this.ctx.beginPath();
            this.ctx.rect(x, y, w, h);
            this.ctx.stroke();
        }
        else{
            this.ctx.fillRect(x, y, w, h);
        }
    },
    drawPoint: function(x, y){
        //Drawsapointat(x, y)
        this.ctx.fillRect(x-1, y-1, 2, 2);
    },
    drawImg: function(x, y, w, h, source){
        //Drawsanimageat(x, y)withheighthandwidthw
        var temp=newImage();
        temp.src=source;
        var cont=this.ctx;
        temp.onload=function(){
            cont.drawImage(temp, x, y, w, h);
        };
    },
    toRender: [], //Arrayofobjectstorender
    addToRender: function(t, layer, color, x, y, w, h, source){
        //Addsanobjecttothearray
        var temp={x: (typeof x === undefined)?0:x};
        temp.y = (typeof y === undefined)?0:y;
        temp.h = (typeof h === undefined)?w:h;
        temp.src = (typeof source === undefined)?'':source;
        this.toRender.push({
            type: t, x: temp.x, y: temp.y,
            h: temp.h, w: w, clr: color,
            src: temp.src,d: layer});
        if(typeof h ===undefined){
            this.toRender[this.toRender.length - 1].x -= temp.h/2;
            this.toRender[this.toRender.length - 1].y -= temp.h/2;
        }
    },
    render: function(noClear){
        //Renders the stored objects based on their depth
        if(noClear !== false){
            this.clearScreen();
        }
        for(var i=-50; i<50; i++){
            this.toRender.forEach(function(val,j){ // V is the value, j is the index
                if(Math.round(val.d)===i){
                    switch(val.type){
                        case 'back': //Display a background color
                            this.ctx.fillStyle = val.clr;
                            this.drawRect(-10, -10, this.w + 20, this.h + 20, false);
                            break;
                        case 'rect': //Draws a rectangle
                            this.ctx.fillStyle=val.clr;
                            this.drawRect(val.x, val.y, val.w, val.h, false);
                            break;
                        case 'pt': //Draws a point
                            this.ctx.fillStyle=val.clr;
                            this.drawRect(val.x - 1, val.y - 1, 2, 2, false);
                            break;
                        case 'img': //Draw an image
                            this.drawImg(val.x, val.y, val.w, val.h, val.src);
                            break;
                    }
                }
            });
        }
        if(noClear !== false){
            this.toRender=[];
        }
    },
    clearRender: function(){
        //clearthearrayforanupdate
        this.toRender=[];
        this.clearScreen();
    },
    addBacking: function(upRight, lowLeft, w, h, src){
        for(var i = 0; i <= upRight.x - lowLeft.x; i += w){
            for(var j = 0; j <= upRight.y - lowLeft.y; j += h){
                if(0>i && i>this.w && 0>j && j>this.h) //Renders only if it's in screen
                    this.addToRender('img', 1, "", i, j, w, h, src);
            }
        }
    }
});