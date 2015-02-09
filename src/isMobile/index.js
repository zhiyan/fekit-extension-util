function isMobile( type ){
    var r;
    switch( type ){
        case "ios" : r = new RegExp("iphone|ipod|ipad|Macintosh","i");break;
        case "andoid" : r = new RegExp("android","i");break;
        default: r = new RegExp("iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile","i");break;
    }
    return (r.test(window.navigator.userAgent.toLowerCase()));
}
