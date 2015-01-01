game.obj = function (t, aiFunc, img, cv, isSolid, x, y, w, h, d) {
    // A game object class that renders the objects and handles AI and collisions 
    // These give an identity to eac object
    this.tnid = game.index.makeTNID(t);
    this.uuid = game.index.makeUUID(9, game.uuidList, 3);
    // Properties of the object
    this.img = img;
    this.x = x; this.y = y; //Coordinates
    this.h = (typeof h === undefined) ? 0 : h; //Image height
    this.w = (typeof w === undefined) ? 0 : w;
    this.depth = d;
    // -----
    this.cv = cv; // The canvas on which the object will render
    this.stats = []; // For other properties of the object
    this.solid = isSolid; //
    // handles the AI
    this.ai = (typeof aiFunc === undefined) ? (false) : (aiFunc);
    // Rendering the Game Object
    this.renderObj = function () {
        var temp = [
                    (this.x - this.w / 2 + game.cam[0] + this.cv.w / 2), 
                    (this.y - this.h / 2 + game.cam[1] + this.cv.h / 2)];
        if (0 > temp[0] > this.cv.w || 0 > temp[1] > this.cv.h) {
            return;
        }
        this.cv.addToRender('img', this.depth, '', temp[0] - this.w / 2, temp[1] - this.h / 2, this.w, this.h, this.img);
    };
    // Handling extra values
    this.addStat = function (name, value) {
        //Add an extra value
        this.stats.push({
            name: name,
            val: value
        });
    };
    this.getStat = function (name) {
        //Get an extra value
        for (var i = 0; i < this.stats.length; i++) {
            if (name === this.stats[i].name) {
                return this.stats[i].val;
            }
        }
    };
    this.handleStat = function (name, func) {
        // For operating on an extra value
        for (var i = 0; i < this.stats.length; i++) {
            for (var j = 0; j < this.name.split('/').length; j++) {
                if (name.split('/')[j] === this.stats[i].name) { // For giving multiple values
                    this.stats.val = func(this.stats.val);
                }
            }
        }
    };
    // Collision handling
    this.detectObjCollision = function () {
        
    };
    this.getByTNID = function (itnid) {
        // Gets game objects by their Type-Number ID (TNID)
        var temp = [];
        for (var i = 0; i < game.allObj.length; i++) {
            if (game.allObj[i].tnid === itnid){ // For a specific TNID
                return game.allObj[i];
            } // The next two are if one of the parts are missing or nonspecific
            else if (game.allObj[i].tnid.split('#')[0] === itnid.split('#')[0] && (itnid.split('#')[1] === '-' ||itnid.split('#')[1] === '')) {
                temp.push(game.allObj[i]);
            }
            else if (game.allObj[i].tnid.split('#')[1] === itnid.split('#')[1] && (itnid.split('#')[0] === '-'||itnid.split('#')[0] === '')){
                temp.push(game.allObj[i]);
            }
        }
        return temp;
    };
    this.handleByTNID = function (itnid, func) {
        // Handles game objects by their TNID
        for (var i = 0; i < game.allObj.length; i++) {
            // Again, the following are for when one of the parts is missing or nonspecific
            if (game.allObj[i].tnid.split('#')[0] === itnid.split('#')[0] && (itnid.split('#')[1] === '-' ||itnid.split('#')[1] === '')) {
                game.allObj[i] = func(game.allObj[i]);
            }
            else if (game.allObj[i].tnid.split('#')[1] === itnid.split('#')[1] && (itnid.split('#')[0] === '-'||itnid.split('#')[0] === '')) {
                game.allObj[i] = func(game.allObj[i]);
            } // If they are the same.
            else if (game.allObj[i].tnid === itnid) {
                game.allObj[i] = func(game.allObj[i]);
            }
        }
    };
    game.allObj[this.uuid]=this;
};
game.GUI=function(){
    this.colTri=[];
    this.addTriangle=function(p1,p2,p3){
        var _p1 = p1, _p2 = p2, _p3 = p3;
        if(_p1.y < _p2.y) {_p2 = p1;_p1 = p2;}
        if(_p1.y < _p3.y) {_p3 = p1;_p1 = p3;}
        if(_p2.y < _p3.y) {_p3 = p2;_p2 = p3;}
        this.colTri.push([_p1,_p2,_p3]);
    };
    this.pointCollision=function(point){
        var boolTemp = true;
        for(var i in this.colTri){
            for(var j = 0; j < 3; j++){
                if(this.colTri[i][j].x === this.colTri[i][(j+1)%3].x){
                    if(this.colTri[i][j].x > this.colTri[i][(j+2)%3].x)
                        boolTemp = boolTemp && (point.x >= this.colTri[i][j].x);
                    else
                        boolTemp = boolTemp && (point.x <= this.colTri[i][j].x);
                }else{
                    var m = (this.colTri[i][j].y - this.colTri[i][(j+1)%3].y) / (this.colTri[i][j].x - this.colTri[i][(j+1)%3].x);
                    var b = this.colTri[i][j].y - this.colTri[i][j].x * m;
                    if(this.colTri[i][(j+2)%3].y > m * this.colTri[i][(j+2)%3].x + b)
                        boolTemp = boolTemp && (this.colTri[i][(j+1)%3].y >= m * this.colTri[i][(j+1)%3].x + b);
                    else
                        boolTemp = boolTemp && (this.colTri[i][(j+1)%3].y <= m * this.colTri[i][(j+1)%3].x + b);
                }
            }
        }
        return boolTemp;
    };
};