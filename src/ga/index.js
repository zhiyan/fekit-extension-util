function ga( type, options ){
    var send,
        baseparams,
        params,
        defaultOptions;

    defaultOptions = {
        "utmwv" : '0.2',
        "t" : Math.random(),
        "utmsr" : screen.width + "*" + screen.height,
        "utmasr" : screen.availWidth + "*" + screen.availHeight,
        "utmr" : document.referrer || "-1",
        "utmp" : window.location.href.toString(),
        "utmhn" : window.location.host.toString(),
        "s" : window['_ba_utm_s'] || null
    }

    try {
        zoomVal = getZoom();
        zoomVal = "" + zoomVal;
        if (zoomVal.length > 10) {
            zoomVal = zoomVal.substring(0, 10);
        }
    } catch (e) {
    }
    if (typeof zoomVal != 'undefined') {
        defaultOptions.utmz = zoomVal;
    }

    baseparams = function( options ){
        for( var i in defaultOptions ){
            if( !options[i] ){
                options[i] = defaultOptions[i];
            }
        }
    }

    params = function( options ){
        var s = [];
        baseparams( options )
        for (var k in options) {
            s.push(k + '=' + encodeURIComponent(options[k]));
        }
        return s.join('&');
    }

    send = function( type, options ){

        if (!type) return;

        options = ( typeof options === "string" || typeof options === "number" ) ? {a:options} : ( options || {})

        var img = new Image();
        img.onload = function () {
            img.onload = null;
            img = null;
        };
        img.src = "http://bc.qunar.com/" + type + "?" + params( options );
    }

    send( type, options);
}