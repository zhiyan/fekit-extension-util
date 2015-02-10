{
    isObject: function( obj ){
        return obj === Object(obj);
    },
    isFunction: function(obj){
        return Object.prototype.toString.call(obj) == '[object Function]';
    },
    each:function ( object, fn, context ) {

       if ( !this.isObject( object ) ) {
            throw new TypeError("object must be an object");
        }
        if ( !this.isFunction( fn ) ) {
            throw new TypeError("fn must be a function");
        }

        var i;

        for( i in object ) {
            if ( object.hasOwnProperty( i ) ) {
                fn.call( context || object, object[ i ], i, object );
            }
        }

        return object;
    },
    filter:function ( object, fn, context ) {

       if ( !this.isObject( object ) ) {
            throw new TypeError("object must be an object");
        }
        if ( !this.isFunction( fn ) ) {
            throw new TypeError("fn must be a function");
        }

        var res = {}, i;

        this.each( object, function ( v, k ) {
            if( fn.call( context || object, v, k, object ) ) {
                res[ k ] = object[ k ];
            }
        });

        return res;
    },
    map:function ( object, fn, context ) {

        if ( !this.isFunction( fn ) ) {
            throw new TypeError("fn must be a function");
        }

        var res = {}, i;

        this.each( object, function ( v, k ) {
            res[ k ] = fn.call( context || object, v, k, object );
        });

        return res;
    }
}