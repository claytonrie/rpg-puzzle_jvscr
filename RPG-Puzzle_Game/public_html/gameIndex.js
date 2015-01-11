game.index = new Class({
    _: {},
    setBy: function(what, value){
        this._[value[what]] = value;
    },
    getByTNID: function(v, index) {
        // Gets game objects by their Type-Number ID (TNID)
        for(var i in (index = index || this._)){
            if(index.hasOwnProperty(i)){
                if(index[i].tnid === v) return index[i];
            }
        }
    },
    handleByTNID: function(v, func) {
        // Handles game objects by their TNID
        for(var i in this._){
            if(this._.hasOwnProperty(i) && (this._[i].tnid === v))
                this._[i] = func(this._[i], this._);
        }
        return this;
    }, // Runs all the objects AI functions, if they have one
    calculateMind: function(){
        for(var i in this._){
            if(this._.hasOwnProperty(i) && this._[i].ai)
                this._[i] = this._[i].ai(this._[i], this._);
        }
    }
});