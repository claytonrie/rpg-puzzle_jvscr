// Canvas Class
//     by Clayton
Canvas = new Class({
    //Creates a canvas object
    init: function(name, height, width){
        // Returns the object
        print('<canvas id="'+name+'" width="'+width+'" height="'+height+
                       '"><p>If you see this, get HTML5.</p></canvas>');
        this.name = name;
        this.elem = document.getElementById(name);
        //Gets "context"
        this.ctx = this.elem.getContext("2d");
        this.setHeight(height);
        this.setWidth(width);
    },
    name: null, elem: null, ctx: null, h: null, w: null,
    setWidth: function(x){
        this.w = x;
        this.elem.width = x;
    },
    setHeight: function(x){
        this.h = x; 
        this.elem.height = x;
    },
    clearScreen: function(){
        //Rectanglewithupper-leftcornerat(x, y)
        this.ctx.clearRect(-10, -10, this.w+20, this.h+20);
    },
    drawRect: function(x, y, w, h, unfilled){
        // Rectangle with upper-left corner at (x, y) and height h and width w
        if(unfilled){
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
        var temp = new Image();
        temp.src = source;
        var cont = this.ctx;
        temp.onload = function(){
            cont.drawImage(temp, x, y, w, h);
        };
    },
    toR: [],
    add: function(t, layer, color, x, y, w, h, source){
        // Adds an object to the array
            x = x || 0;
            y = y || 0; 
            h = h || (w = w || 0);
            source = source || "";
        this.toR[this.toR.length] = {
            t: t, x: x, y: y,
            h: h, w: w, clr: color,
            src: source, d: layer
        };
        if(h === undefined){
            this.toR[this.toR.length - 1].x -= h / 2;
            this.toR[this.toR.length - 1].y -= h / 2;
        }
    },
    clear: function(){
        // Clears the array for an update
        this.toR = [];
        this.clearScreen();
    },
    // Renders the stored objects based on their depth
    render: function(noClear){
        var val, j = 0;
        this.toR.sort(function(a, b){return a.depth - b.depth;});
        if(!noClear){
            this.ctx.fillStyle = "#FFF";
            this.drawRect(-10, -10, this.w + 20, this.h + 20, false);
        }
        while(val = this.toR[j++]){ // V is the value of each piece
            switch(val.t){
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
            }
        };
        if(!noClear)
            this.toR = [];
    },
    addBacking: function(upRight, lowLeft, src, w, h){
        h = h || w; // h optionality
        for(var i = 0; i <= upRight.x - lowLeft.x; i += w)
            for(var j = 0; j <= upRight.y - lowLeft.y; j += h)
                if((-w)>i && i>this.w && (-h)>j && j>this.h) //Renders only if it's in screen
                    this.add('img', 1, "", i, j, w, h, src);
    }
});