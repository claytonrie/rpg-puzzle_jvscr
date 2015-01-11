game.GUI = new Class({
    colTri: [],
    addTriangle: function(p1, p2, p3) {
        var _p1 = p1, _p2 = p2, _p3 = p3;
        (_p1.y < _p2.y) && ((_p2 = p1) || (_p1 = p2));
        (_p1.y < _p3.y) && ((_p3 = p1) || (_p1 = p3));
        (_p3.y < _p2.y) && ((_p2 = p3) || (_p3 = p2));
        this.colTri.push([_p1, _p2, _p3]);
    },
    pointCollision: function(point){
        for(var i in this.colTri){
            if(p_tCollision(point, this.colTri[i]))
                return true;
        }
        return false;
    },
    triangleCollision: function(triangles){
        for(var i in this.colTri){
            for(var j in triangles){
                if(t_tCollision(this.colTri[i],triangles[j]))
                    return true;
            }
        }
        return false;
    },
    p_tCollision: function(point, triangle) {
        for(var j = 0; j < 3; j++){
            var p1 = triangle[j],
                p2 = triangle[(j + 1) % 3],
                p3 = triangle[(j + 2) % 3];
            if(p1.x === p2.x) {
                if(!((p1.x > p3.x) && (point.x >= p1.x)) || !(point.x <= p1.x))
                    return false;
            } else {
                var m = (p1.y - p2.y) / (p1.x - p2.x),
                    b = p1.y - p1.x * m;
                if(!((p3.y > m * p3.x + b) && (point.y >= m * point.x + b)) || !(point.y <= m * point.x + b))
                    return false;
            }
        }
        return true;
    },
    t_tCollision:function(t1, t2){
        var j1, j2, k1, k2, i = -1; while(i++ < 9){
            j1 = i % 3; k1 = Math.floor(i / 3);
            j2 = (j1 + 1) % 3; k2 = (k1 + 1) % 3;
            if(this.lineCollision(t1[j1], t1[j2], t2[k1], t2[k2])) 
                return true;
        }
        return false;
    },
    lineCollision: function(p1, p2, p3, p4){
        var d  = ((p2.x - p1.x) * (p4.y - p3.y)) - ((p2.y - p1.y) * (p4.x - p3.x)),
            n1 = ((p1.y - p3.y) * (p4.x - p3.x)) - ((p1.x - p3.x) * (p4.y - p3.y)),
            n2 = ((p1.y - p3.y) * (p2.x - p1.x)) - ((p1.x - p3.x) * (p2.y - p1.y));
        if (d === 0) return n1 === 0 && n2 === 0;
        else         return ((n1 / d) >= 0 && (n1 / d) <= 1) && ((n2 / d) >= 0 && (n2 / d) <= 1);
    }
});