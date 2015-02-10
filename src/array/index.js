{
    isArray: function( obj ){
        return Object.prototype.toString.call(obj) == '[object Array]';
    },
    isFunction: function(obj){
        return Object.prototype.toString.call(obj) == '[object Function]';
    },
    each:function ( array, fn, context ) {

        if ( !this.isArray( array ) ) {
            throw new TypeError("array must be an array");
        }
        if ( !this.isFunction( fn ) ) {
            throw new TypeError("fn must be a function");
        }

        var i;

        for( i=0; i < array.length; i++ ) {
            fn.call( context || array, array[ i ], i, array );
        }

        return array;
    },
    empty:function( array ){
        if ( !this.isArray( array )  ) {
            throw new TypeError("array must be an array");
        }
        array.splice( 0, array.length );

        return array;
    },
    filter:function ( array, fn, context ) {

        if ( !this.isArray( array ) ) {
            throw new TypeError("array must be an array");
        }
        if ( !this.isFunction( fn ) ) {
            throw new TypeError("fn must be a function");
        }

        var res = [];

        this.each( array, function ( v, k ) {
            if( fn.call( context || array, v, k, array ) ) {
                res.push( array[ k ] );
            }
        });
        return res;
    },
    map:function ( array, fn, context ) {

        if ( !this.isFunction( fn ) ) {
            throw new TypeError("fn must be a function");
        }

        var res = [], i;

        this.each( array, function ( v, k ) {
            res.push(
                fn.call( context || array, v, k, array ) || undefined
            );
        });

        return res;
    },
    randomFilter: function( array, limit ){
        if ( !this.isArray( array ) ) {
            throw new TypeError("array must be an array");
        }

        if( ! parseInt( limit ) > 0 || array.length <= limit ) {
            return array || false;
        }

        var newArray = [], i;
        
        for( i in array ) {
            newArray[ i ] = array[ i ];
        }

        while ( newArray.length > limit ) {
            i = Math.floor( Math.random() * newArray.length );

            newArray.splice( i, 1 );

        }

        return newArray;
    }
}