{
    get: function(url,data,fn){
        if( typeof data === "function"){
            fn = data;
            data = "";
        }
        this.request(url,{
            "method" : "get",
            "data" : this.params(data),
            success : fn
        })
    },
    post: function(url,data,fn){
        if( typeof data === "function"){
            fn = data;
            data = "";
        }
        this.request(url,{
            "method":"post",
            "data" : this.params(data),
            success:fn
        })
    },
    getJSON: function(url,data,fn){
        if( /callback=\?/.test(url) ){
            this.getJSONP(url,data,fn);
            return;
        }
         this.request(url,{
            "method":"get",
            "data" : this.params(data),
            success:fn,
            type:"json"
        })
    },
    getJSONP: function(url,data,fn){
        if( typeof data === "function"){
            fn = data;
            data = "";
        }
        var script = document.createElement("script"),
            head = document.head || document.getElementsByTagName("head")[0] || document.documentElement,
            fname = "callback_"+new Date().getTime();
        fname = "test";
        window[fname] = function(res){
            fn && fn(res);
            window[fname] = null;
            fn = null;
        }
        url = url.replace("callback=?","callback="+fname);
        url += '&' + this.params(data);
        script.type = "text/javascript";
        script.src = url;
        head.insertBefore(script, head.firstChild);
    },
    request: function (url,opt){
        var that = this,
            async   = opt.async !== false,
            method  = opt.method    || 'GET',
            data    = opt.data      || null,
            success = opt.success   || this.noop,
            failure = opt.failure   || this.noop;
            method  = method.toUpperCase(),
            type = opt.type || "text";
        if( method == 'GET' && data ){
            url += (url.indexOf('?') == -1 ? '?' : '&') + data;
            data = null;
        }
        var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.onreadystatechange = function(){
            that.onStateChange(xhr,success,failure,type);
        };
        xhr.open(method,url,async);
        if(method == 'POST'){
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;');
        }
        xhr.send(data);
        return xhr;
    },
    noop:function(){},
    onStateChange: function(xhr,success,failure,type){
        if(xhr.readyState == 4){
            var s = xhr.status;
            if(s>= 200 && s < 300){
                success( type === "json" ? eval("("+xhr.responseText+")") : xhr.responseText);
            }else{
                failure(xhr);
            }
        }else{}
    },
    params: function( obj ){
        var dataStr = "";
        if( typeof obj === "undefined"){
            return null;
        }
        if( typeof obj === "string"){
            return obj;
        }
        for( var i in obj ) {
            if ( obj.hasOwnProperty( i ) ) {
                dataStr += i+"="+obj[i]+"&";
            }
        }
        return dataStr.replace(/&$/,"");
    }
}