function trim( str, type ){
    var rs = type === "l" ? new RegExp("^\\s*") : 
            type === "r" ? new RegExp("\\s*$") : 
            new RegExp("^\\s*|\\s*$","g")
    return str.replace(rs,"")
}