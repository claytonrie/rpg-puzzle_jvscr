// Game Handling Object/Class thing
game = {
    cv: null, // Canvas reference
    cam: {x: 0, y: 0}, //where the centre of the screen is centred
    setNum: -1,
    img: { // Image references
        pl: 'hero_top.png',
        mob: 'Mob1.png',
        grass: ['C:/Users/Clay/Documents/NetBeansProjects/rpg-puzzle_jvscr/RPG-Puzzle_Game/public_html/Grass1.png', 
            'Grass2', 'Grass3', 'Grass4', 'Grass5'],
        rock: [ 'rock.png',  'rock2',  '', '']
    },
    // Begins/creates a set-up
    beginSet: function(type){
        if(typeof type === undefined){
            setNum ++;
            return this.setList[setNum]();
        }
        else{
            setNum = type;
                return this.setList[type]();
        }
    },
    // An array of functions that set up different "rooms"
    // i.e. Start-up menu, pause menu, and different rooms
    setList: [],
    // An array of all objects in the game
    indexStore: [],
    uuidCharList: '0123456789qwertyuiopsdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM', // All the characters that can be in a UUID
    makeUUID: function (l, setNum, charList) {
        // Randomly generates UUIDs
        var temp = '', i = 0, j = 0;
        if (Array.isArray(setNum)) {
            charList = setNum; setNum = Number.MAX_VALUE;
        } else if(typeof setNum === "string"){
            charList = setNum.split(""); setNum = Number.MAX_VALUE;
        } else {
            charList = charList || this.uuidCharList;
            if(typeof charList === "string")
                charList = charList.split("");
            setNum = setNum || Number.MAX_VALUE;
        } while ((i++ - 1) < (l - 1)) {
            temp += charList[randomInt(0, charList.length - 1)];
            if ((j++ + 1) >= setNum && (i + 1 < l)){
                temp += "-"; j = 0;
            }
        }
        return temp;
    },
    typeCount: {"pl": 0},
    makeTNID: function(t){
        this.typeCount[t] = (this.typeCount[t] + 1) || 1;
        return t + '#' + (this.typeCount[t] - 1);
    }
};
game.set = new Class({
    loc: game.setList.length,
    _: {},
    backing: [],
    obj: [],
    GUI: [],
    init: function(){
        Object.defineProperty(this, "_", {
            get: function(){
                return game.setList[this.loc]; 
            },set: function(x){
                game.setList[this.loc] = x; 
            }
        });
        this._["backing"] = [];
        this._["object"] = [];
        this._["GUI"] = [];
        Object.defineProperty(this, "backing", {
            get: function(){
                return game.setList[this.loc]["backing"]; 
            }, set: function(x){
                game.setList[this.loc]["backing"] = x; 
            }
        });
        Object.defineProperty(this, "obj", {
            get: function(){
                return game.setList[this.loc]["object"]; 
            }, set: function(x){
                game.setList[this.loc]["object"] = x; 
            }
        });
        Object.defineProperty(this, "GUI", {
            get: function(){
                return game.setList[this.loc]["GUI"]; 
            }, set: function(x){
                game.setList[this.loc]["GUI"] = x; 
            }
        });
    }
});