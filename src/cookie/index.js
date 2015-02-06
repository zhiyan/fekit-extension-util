function cookie( name, value ,options ){
    var exp;
    if( !value ){
        // 取
        var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
        if (arr != null && value !== null) return unescape(arr[2]);
        if( value === null ){
            exp = new Date();
            exp.setTime(exp.getTime() - 1); 
            document.cookie = name + '=' + arr[2] +';expires=' +  exp.toGMTString(); 
        }
        return null
    }else{
        // 存
        var str = name + '=' + escape(value) + ';';
        if( options ){
            options.path && ( str += 'path='+options.path + ';' )
            options.domain && ( str += 'domain=' + options.domain + ';')
            options.expires && ( str += 'expires=' + options.expires + ';')
            if( options.hours ){
                var d = new Date();
                var offset = 8;
                var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
                var nd = utc + (3600000 * offset);
                exp = new Date(nd);
                exp.setTime(exp.getTime() + options.hours * 60 * 60 * 1000);
                str += 'expires=' + exp.toGMTString() + ';';
            }
        }

        document.cookie = str;
    }
}