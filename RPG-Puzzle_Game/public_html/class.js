// A Class API
//     by Clayton
Class = function(obj){
    var tempFuncBody = "";
    var args = [];
    for(var i in obj){
        tempFuncBody+='this["'+i+'"] = '+obj[i]+'; ';
        if(i === "init"){
            for(var j = 0; j < obj[i].length; j++ ) args.push("_"+j);
            tempFuncBody+='this["init"]('+args+')';
        }
    }
    return (new Function(args.join(','),tempFuncBody));
};