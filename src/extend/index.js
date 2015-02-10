function extend( target ) {
    var srcs,
        r = false,
        i, j, len, src;

    if ( target === true){
        target = arguments[1];
        r = true;
        srcs = Array.prototype.slice.call(arguments, 2);
    } else {
        srcs = Array.prototype.slice.call(arguments, 1);
    }

    for ( j = 0, len = srcs.length; j < len; j++ ) {
        src = srcs[j];
        for ( i in src ) {
            if ( r && typeof target[i] == 'object' )
                this.extend( target[i], src[i] );
            else
                target[i] = src[i];
        }
    }
    return target;
};