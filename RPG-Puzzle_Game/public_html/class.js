// A Class Constructor Generator
//     by Clayton
toSource = function(obj){
    switch(typeof obj){
        case "string":
            return '"'+obj+'"';
            break;
        case "number": case "boolean": case "function":
            return obj.toString();
            break;
        case "object":
            if((obj.toString().search("function") >= 0 && obj.toString().search("function") < 5)
               || obj.toString().search("/") === 0){
                return obj.toString();
                break;
            }
            else if(Array.isArray(obj)){
                var tempBool = false, temp="[";
                for(var i in obj){
                    if(tempBool) temp += ", ";
                    temp += toSource(obj[i]);
                    tempBool = true;
                } temp += "]";
                return temp;
                break;
            }
        default:
            var tempBool = false, temp="({";
            for(var i in obj){
                if(tempBool) temp += ", ";
                temp += i + ": " + toSource(obj[i]);
                tempBool = true;
            } temp += "})";
            return temp;
    }
};
Class = function(obj){
    var tempFuncBody = "";
    var args = [];
    for(var i in obj){
        tempFuncBody+='this["'+i+'"] = '+toSource(obj[i])+'; ';
        if(i === "init"){
            for(var j = 0; j < obj[i].length; j++ ) args.push("_"+j);
            tempFuncBody+='this["init"]('+args+'); ';
        }
    }
    return (new Function(args.join(','),tempFuncBody));
};
