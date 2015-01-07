// A Class Constructor Generator
//     by Clayton
toSource = function(obj){
    switch(typeof obj){
        case "string": return '"'+obj+'"'; // For strings
        case "number": case "boolean": case "function":
            return obj.toString(); // For number, booleans, and functions
        case "object": default:
            if(obj.toString().search("/") === 0)
                return obj.toString(); // For RegExp
            var temp = "";
            if(Array.isArray(obj)){
                for(var i in obj)
                    temp += ((i !== 0)? (", ") : ("")) + toSource(obj[i]);
                return "[" + temp + "]"; // For Arrays
            }
            for(var i in obj) // For "Object Objects", custom classes, and other
                temp += ((i !== Object.getOwnPropertyNames(obj)[0])? (', "') : ('"')) + i + '": ' + toSource(obj[i]);
            return "({" + temp + "})";
    }
};
Class = function(obj){
    var tempFuncBody = "", args = [];
    for(var i in obj){
        tempFuncBody += 'this["' + i + '"] = ' + toSource(obj[i]) + '; ';
        if(i === "init")
            for(var j = 0; j < obj[i].length; j++ ) args.push("_" + j);
    } return (new Function(args.join(','), tempFuncBody + 'this["init"](' + args + ")"));
};