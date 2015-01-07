// Canvas Class
//     by Clayton
Canvas = new Class({
    //Creates a canvas object
    init: function(name, height, width){
        // Returns the object
        this.name = name;
        this.elem = document.getElementById(name);
        //Gets "context"
        this.ctx = this.elem.getContext("2d");
        Object.defineProperty(this, "h", {
            value: height,
            get: function(){
                return this.h.value;
            },set: function(x){
                this.h.value = x; 
                this.elem.height = x;
            }
        }); Object.defineProperty(this, "w", {
            value: width,
            get: function(){
                return this.w.value;
            },set: function(x){
                this.w.value = x; 
                this.elem.width = x;
            }
        });
        document.write('<canvasid="'+this.name+'"width="'+this.w+'"height="'+this.h+
                       '"><p>If you see this, get HTML5.</p></canvas>');
    },
    name: null, elem: null, ctx: null, h: null, w: null,
    clearScreen: function(){
        //Rectanglewithupper-leftcornerat(x, y)
        this.ctx.clearRect(-10, -10, this.w+20, this.h+20);
    },
    drawRect: function(x, y, w, h, unfilled){
        // Rectangle with upper-left corner at (x, y) and height h and width w
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
        //Draws a point at (x, y)
        this.ctx.fillRect(x-1, y-1, 2, 2);
    },
    drawImg: function(x, y, w, h, source){
        // Draws an image at (x, y) with height h and width w
        var temp = newImage();
        temp.src = source;
        var cont = this.ctx;
        temp.onload = function(){
            cont.drawImage(temp, x, y, w, h);
        };
    },
    render: function(noClear){
        this.value = (this.value = this.value) || ([]);
        this.add = function(t, layer, color, x, y, w, h, source){
            // Adds an object to the array
            var temp = {
                x: (x = x) || 0, y: (y = y) || 0,
                h: (h = h) || w, src: (source = source) || ""
            };
            this.render.value.push({
                type: t, x: temp.x, y: temp.y,
                h: temp.h, w: w, clr: color,
                src: temp.src, d: layer});
            if(typeof h ===undefined){
                this.render.value[this.render.value.length - 1].x -= temp.h/2;
                this.render.value[this.render.value.length - 1].y -= temp.h/2;
            }
        };
        // Renders the stored objects based on their depth
        if(this.value.length === 0)
            return;
        if(noClear === false)
            this.clearScreen();
        for(var i=-50; i<50; i++){
            this.render.value.forEach(function(val){ // V is the value of each piece
                if(Math.round(val.d)===i){
                    switch(val.type){
                        case 'back': //Display a background color
                            this.ctx.fillStyle = val.clr;
                            return this.drawRect(-10, -10, this.w + 20, this.h + 20, false);
                        case 'rect': //Draws a rectangle
                            this.ctx.fillStyle=val.clr;
                            return this.drawRect(val.x, val.y, val.w, val.h, false);
                        case 'pt': //Draws a point
                            this.ctx.fillStyle=val.clr;
                            return this.drawRect(val.x - 1, val.y - 1, 2, 2, false);
                        case 'img': //Draw an image
                            this.drawImg(val.x, val.y, val.w, val.h, val.src);
                    }
                }
            });
        }
        if(noClear === false)
            this.render.value = [];
    },
    clearRender: function(){
        // Clears the array for an update
        this.render.value=[];
        this.clearScreen();
    },
    addBacking: function(upRight, lowLeft, src, w, h){
        h = (h = h) || w; // h optionality
        for(var i = 0; i <= upRight.x - lowLeft.x; i += w)
            for(var j = 0; j <= upRight.y - lowLeft.y; j += h)
                if((-w)>i && i>this.w && (-h)>j && j>this.h) //Renders only if it's in screen
                    this.render.add('img', 1, "", i, j, w, h, src);
    }
});
