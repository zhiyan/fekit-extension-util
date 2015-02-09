function loadScript(url,callback) {
    var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
    script,
    options;

    if(typeof url === "object") {
        options = url;
        url = undefined;
    }
    s = options || {};
    url = url || s.url;
    callback = callback || s.success;
    script = document.createElement("script");
    script.async = s.async || false;
    script.type = "text/javascript";
    if(s.charset) {
        script.charset = s.charset;
    }
    if(s.cache === false){
        url = url+( /\?/.test( url ) ? "&" : "?" )+ "_=" +(new Date()).getTime();
    }
    script.src = url;
    head.insertBefore(script, head.firstChild);
    if(callback){
        document.addEventListener ? script.addEventListener("load", callback, false) : script.onreadystatechange = function() {
            if(/loaded|complete/.test(script.readyState)) {
                script.onreadystatechange = null
                callback()
            }
        }
    }
}