// A Game Object and GUI Class
//     by Clayton
game.obj = new Class({
    // A game object class that renders the objects and handles AI and collisions 
    // These give an identity to eac object
    init: function(t, aiFunc, img, cv, isSolid, x, y, w, h, d) {
        this.tnid = game.makeTNID(t);
        this.uuid = game.makeUUID(16, 4);
        // Properties of the object
        this.img = img; // Image directory
        this.x = x; //Coordinates
        this.y = y;
        this.h = h || 0; //Image height
        this.w = w || 0;
        this.depth = d;
        this.cv = cv; // The canvas on which the object will render
        this.solid = isSolid; // The solidity of the object
        this.ai = aiFunc || function(o){return o;}; // Handles the Ai
    },
    tnid: null,
    uuid: null,
    img: null,
    x: null,
    y: null,
    h: null,
    w: null,
    depth: null,
    cv: null,
    stats: {},
    solid: null,
    ai: null,
    // Triangle Collision
    colTri: [],
    addTriangle: function(p1, p2, p3) {
        var _p1 = p1, _p2 = p2, _p3 = p3;
        (_p1.y < _p2.y) && ((_p2 = p1) || (_p1 = p2));
        (_p1.y < _p3.y) && ((_p3 = p1) || (_p1 = p3));
        (_p3.y < _p2.y) && ((_p2 = p3) || (_p3 = p2));
        this.colTri.push([_p1, _p2, _p3]);
    },
    pointCollision: function(point) {
        var boolTemp = true;
        for(var i in this.colTri) {
            for(var j = 0; j < 3; j++) {
                var p1 = this.colTri[i][j],
                    p2 = this.colTri[i][(j + 1) % 3],
                    p3 = this.colTri[i][(j + 2) % 3];
                if(p1.x === p2.x) {
                    if(p1.x > p3.x) boolTemp = boolTemp && (point.x >= p1.x);
                    else boolTemp = boolTemp && (point.x <= p1.x);
                } else {
                    var m = (p1.y - p2.y) / (p1.x - p2.x);
                    var b = p1.y - p1.x * m;
                    if(p3.y > m * p3.x + b) boolTemp = boolTemp && (point.y >= m * point.x + b);
                    else boolTemp = boolTemp && (point.y <= m * point.x + b);
                }
            }
        }
        return boolTemp;
    },
    // Rendering the Game Object
    renderObj: function() {
        var temp = {
            x: (this.x - this.w / 2 + game.cam.x + this.cv.w / 2),
            y: (this.y - this.h / 2 + game.cam.y + this.cv.h / 2)
        };
        if((0 > temp.x && temp.x > this.cv.w) || (0 > temp.y && temp.y > this.cv.h))
            return;
        this.cv.add('img', this.depth, '', temp.x - this.w / 2, temp.y - this.h / 2, this.w, this.h, this.img);
    },
    // Handling extra values
    handleStat: function(name, func) {
        // For operating on an extra value
        for(var i = 0; i < this.stats.length; i++) {
            for(var j = 0; j < this.name.split('/').length; j++) {
                if(name.split('/')[j] === this.stats[i].name) // For giving multiple values
                    this.stats.val = func(this.stats.val);
            }
        }
    }
});