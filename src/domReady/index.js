function domReady( fn ){
    var callbacks = [],
        isReady = false,
        w3c = 'addEventListener' in document,
        top;

    var LOAD = 'load',
        COMPLETE = 'complate',
        DOMCONTENTLOADED = 'DOMContentLoaded',
        ONLOAD = 'onload',
        ONREADYSTATECHANGE = 'onreadystatechange';

    function ready(){
        if( !isReady ){

            isReady = true;

            for( var i = 0,l = callbacks.length; i < l; i++ ){
                defer( callbacks[i] );
            }
        }
    }

    function completed( event ){
        if( w3c || event.type === LOAD || event.readyState === COMPLETE ){
            detach();
            ready();
        }
    }

    function bind(){
        if( w3c ){
            document.addEventListener( DOMCONTENTLOADED, completed, false );
            window.addEventListener( LOAD, completed, false );
        }else{
            document.attachEvent( ONREADYSTATECHANGE, completed );
            window.attachEvent( ONLOAD, completed );
        }
    }

    function detach(){
        if( w3c ){
            document.removeEventListener( DOMCONTENTLOADED, completed, false );
            window.removeEventListener( LOAD, completed, false );
        }else{
            document.detachEvent( ONREADYSTATECHANGE, completed );
            window.detachEvent( ONLOAD, completed );
        }
    }

    function defer( fn, time ){
        setTimeout( fn, time || 0 );
    }

    if( document.readyState === "complete" ){
        ready();
    }else{
        bind();

        if( window.frameElement === null && document.documentElement && window.doScroll ){
            (function doScrollCheck() {
                if ( !isReady ) {
                    try {
                        // Use the trick by Diego Perini
                        // http://javascript.nwbox.com/IEContentLoaded/
                        window.doScroll("left");
                    } catch(e) {
                        return defer( doScrollCheck, 50 );
                    }
                    detach();
                    ready();
                }
            })();
        }
    }

    if( typeof fn === 'function' ){
        if( !!isReady ){
            defer( fn );
        }else{
            callbacks.push( fn );
        }
    }else{
        return isReady;
    }
}