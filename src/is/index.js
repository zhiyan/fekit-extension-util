{
    toString : Object.prototype.toString,
    isElement : function( obj ){
        return !!(obj && obj.nodeType === 1);
    },
    isArray : function( obj ){
        return this.toString.call(obj) == '[object Array]';
    },
    isArguments : function( obj ){
        return this.toString.call(obj) == '[object Arguments]';
    },
    isFunction : function( obj ){
        return this.toString.call(obj) == '[object Function]';
    },
    isString : function( obj ){
        return this.toString.call(obj) == '[object String]';
    },
    isNumber : function( obj ){
        return this.toString.call(obj) == '[object Number]';
    },
    isDate : function( obj ){
        return this.toString.call(obj) == '[object Date]';
    },
    isRegExp : function( obj ){
        return this.toString.call(obj) == '[object RegExp]';
    },
    isObject : function( obj ){
        return obj === Object(obj);
    },
    isBoolean: function( obj ){
        return obj === true || obj === false || this.toString.call(obj) == '[object Boolean]';
    },
    isNaN: function( obj ){
        return _.isNumber(obj) && obj != +obj;
    },
    isFinite: function( obj ){
        return isFinite(obj) && !isNaN(parseFloat(obj));
    },
    isNull: function( obj ){
        return obj === null;
    },
    isUndefined: function( obj ){
        return obj === void 0;
    },
    isEmpty: function( obj ){
        if (obj == null) return true;
        if (this.isArray(obj) || this.isString(obj)) return obj.length === 0;
        for (var key in obj) if (key in obj) return false;
        return true;
    }
}