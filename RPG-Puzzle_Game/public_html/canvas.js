// Canvas API
// by Clayton
Canvas=function(name, height, width){
    //Creates a canvas object
    this.init=function(){
        // Initializes the canvas
        document.write('<canvasid="'+this.name+'"width="'+this.w+'"height="'+this.h+'"><p>Ifyouseethis,getHTML5.</p></canvas>');
    };
    // Returns the object
    this.name=name;
    this.elem=document.getElementById(name);
    this.ctx=this.elem.getContext("2d"); //Gets"context"
    this.h=height;
    this.w=width;
    this.clearScreen=function(){
        //Rectanglewithupper-leftcornerat(x, y)
        this.ctx.clearRect(-10, -10, this.w+20, this.h+20);
    };
    this.drawRect=function(x, y, w, h, unfilled){
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
    };
    this.drawPoint=function(x, y){
        //Drawsapointat(x, y)
        this.ctx.fillRect(x-1, y-1, 2, 2);
    };
    this.drawImg=function(x, y, w, h, source){
        //Drawsanimageat(x, y)withheighthandwidthw
        var temp=newImage();
        temp.src=source;
        var cont=this.ctx;
        temp.onload=function(){
            cont.drawImage(temp, x, y, w, h);
        };
    };
    this.toRender=[], //Arrayofobjectstorender
    this.addToRender=function(t, layer, color, x, y, w, h, source){
        //Addsanobjecttothearray
        var temp=[(typeofx===undefined)?0:x];
        temp.push((typeofy===undefined)?0:y);
        temp.push((typeofh===undefined)?w:h);
        temp.push((typeofsource===undefined)?'':source);
        if(typeofh===undefined){
            this.toRender.push({
                type:t,
                x:(temp[0]-(temp[2]/2)),
                y:(temp[1]-(temp[2]/2)),
                w:temp[2],
                h:temp[2],
                clr:color,
                src:temp[3],
                d:layer
            }
            );
        }
        else{
            this.toRender.push({
                type:t,
                x:temp[0],
                y:temp[1],
                h:temp[2],
                w:w,
                clr:color,
                src:temp[3],
                d:layer
            }
            );
        }
    };
    this.render=function(noClear){
        //Rendersthestoredobjectsbasedontheirdepth
        if(noClear!==true){
            this.clearScreen();
        }
        for(var i=-50; i<50; i++){
            for(var j=0; j<this.toRender.length; j++){
                if(this.toRender[j].d===i){
                    if(this.toRender[j].type==='back'){
                        //Displayabackgroundcolor
                        this.ctx.fillStyle=this.toRender[j].clr;
                        this.drawRect(-10, -10, this.w+20, this.h+20, false);
                    }
                    if(this.toRender[j].type==='rect'){
                        //Drawsarectangle
                        this.ctx.fillStyle=this.toRender[j].clr;
                        this.drawRect(this.toRender[j].x,
                        this.toRender[j].y,
                        this.toRender[j].w,
                        this.toRender[j].h, false);
                    }
                    if(this.toRender[j].type==='pt'){
                        //Drawsapoint
                        this.ctx.fillStyle=this.toRender[j].clr;
                        this.drawRect(this.toRender[j].x-1,
                        this.toRender[j].y-1,
                        2, 2, false);
                    }
                    if(this.toRender[j].type==='img'){
                        //Drawanimage
                        this.drawImg(this.toRender[j].x, this.toRender[j].y, this.toRender[j].w, this.toRender[j].h, this.toRender[j].src);
                    }
                }
            }
        }
        if(noClear!==true){
            this.toRender=[];
        }
    };
    this.clearRender=function(){
        //clearthearrayforanupdate
        this.toRender=[];
        this.clearScreen();
    };
    this.addBacking=function(upRight, lowLeft, img, h, cam){
        for(var i=0; i<=(upRight[0]-lowLeft[0])/h; i++){
            //Xposition
            for(var j=0; j<=(upRight[1]-lowLeft[1])/h; j++){
                //Yposition
                if(0>(i+cam[0]+this.w/2)>this.w&&0>(j+cam[1]+this.h/2)>this.h){
                    //Rendersonlyifit'sinscreen
                    this.addToRender('img', 1, '', 0, (i+cam[0]+this.w/2), (j+cam[1]+this.h/2), h, h, img);
                }
            }
        }
    };
    this.init();
};