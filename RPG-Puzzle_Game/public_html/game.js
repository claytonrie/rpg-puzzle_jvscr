// Game Handling Object/Class thing
game = {
    cv: new Canvas('cv', 480,960), // Canvas reference
    cam: [0, 0], //where the centre of the screen is centred
    setNum: -1,
    img: { // Image references
        pl: 'hero_top.png',
        mob: 'Mob1.png',
        grass: ['Grass1.png', 'Grass2', 'Grass3', 'Grass4', 'Grass5'],
        rock: [ 'rock.png',  'rock2',  '', '']
    },
    // Begins/creates a set-up
    begin: function(type){
        if(typeof type === undefined){
            setNum++;
            return this.sectSet[setNum]();
        }
        else{
            setNum=type;
                return this.sectSet[type]();
        }
    },
    // An array of functions that set up different "rooms"
    // i.e. Start-up menu, pause menu, and different rooms
    sectSet: [function(){}],
    // An array of all objects in the game
    allObj: {},
    // Runs all the objects "mind" functions  if they have one
    calculateMind: function(){
        for (var i = 0; i < game.allObj.length; i++) {
            if (game.allObj[i].mind.isUsed === true) {
                var temp = game.allObj[i].mind.func(game.allObj[i].x, game.allObj[i].y, game.allObj[i].w, game.allObj[i].h);
                game.allObj[i].x = temp.x;
                game.allObj[i].y = temp.y;
                game.allObj[i].w = temp.w;
                game.allObj[i].h = temp.h;
            }
        }
    }
};
game.index=function(){
    this._ = {};
    this.uuidCharList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
               'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 
               'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 
               'x', 'c', 'v', 'b', 'n', 'm', 
               'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 
               'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 
               'X', 'C', 'V', 'B', 'N', 'M']; // All the characters that can be in a UUID
    this.makeUUID = function (l, charList, setNum) {
        // Randomly generates UUIDs
        var temp = '';
        for (var i = 0; i < l; i++) {
            temp += charList[Math.floor(Math.random() * (charList.length - 1))];
            if (i % setNum === 0 && i !== 0) {
                temp += '-';
            }
        }
    };
    this.typeCount = {"pl":0};
    this.makeTNID = function(t){
        if(typeof this.typeCount[t] === undefined)
            this.typeCount[t] = 0;
        this.typeCount[t]++;
        return t + '#' + (this.typeCount[t] - 1);
    };
};