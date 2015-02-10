{
    isFunction: function(obj){
        return Object.prototype.toString.call(obj) == '[object Function]';
    },
    bind :function (  fn, context ) {

       var slice = Array.prototype.slice;

        if ( fn.bind ) {
            return fn.bind.apply( fn, slice.call( arguments, 1 ) );
        }

        var args = slice.call(arguments, 2);

        return function () {
            return fn.apply( context, args.length ? args.concat(slice.call(arguments)) : arguments );
        };
    },
    getParamNames: (function () {
        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,
            ARGUMENT_NAMES = /([^\s,]+)/g;

        return function ( func ) {

            var fnStr = func.toString().replace(STRIP_COMMENTS, '');
            var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);

            if(result === null) {
                result = [];
            }

            return result;
        };

    })()
}