{
    isString: function( obj ){
        return Object.prototype.toString.call(obj) == '[object String]';
    },
    trim: function( str ){
        return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
    },
    splitWords: function( str ){
        return this.trim(str).replace(/,/g, ' ').split(/\s+/);
    },
    capitalize: function ( str ) {
        return str.slice(0,1).toUpperCase() + str.slice(1);
    },
    decapitalize: function ( str ) {
        return str.slice(0,1).toLowerCase() + str.slice(1);
    },
    smartTrim: function ( str ) {
        var CODEs = [];

        return str
            .replace( /(?:<pre[\s\S]*?<\/pre>|<code[\s\S]*?<\/code>)/gi, function ( code ) { CODEs.push( code ); return '__CODE_BLOCK__'; })
            .replace( /\>[\t\n]+/ig, '>' ).replace( /[\t\n]+\</ig, '<' )
            .replace( /\>\s+/ig, '> ' ).replace( /\s+\</ig, ' <' )
            .replace( /\s+/ig, ' ' ).replace( /\>\s+\</ig, '> <' )
            .trim()
            .replace( /__CODE_BLOCK__/g, function () { return CODEs.shift(); });
    },
    fromCamelToDash: function ( str ){
        return str
            .replace(/([A-Z])/g, function ( l ){return "-"+l.toLowerCase();})
            .replace(/^\-/g,'');
    },
    fromCamelToUnderscore: function ( str ){
        return str
            .replace(/([A-Z])/g, function ( l ){return "_"+l.toLowerCase();})
            .replace(/^\_/g,'');
    },
    fromCamelToSpaced: function ( str ){
        return str
            .replace(/([A-Z])/g, function ( l ){return " "+l;})
            .replace(/^ /g,'');
    },
    fromDashToCamel: function ( str ){
            return str
                .replace(/(\-[a-z])/g, function ( l ){return l.toUpperCase().replace('-','');})
                .replace(/^[a-z]{1}/g,function ( l ){return l.toUpperCase();});
    },
    fromDashToUnderscore: function ( str ){
        return str
            .replace(/(\-[a-z])/g, function ( l ){return l.replace('-','_');})
            .replace(/^\_/g,'');
    },
   fromDashToSpaced: function ( str ){
        return str
            .replace(/(\-[a-z])/g, function ( l ){return l.toUpperCase().replace('-',' ');})
            .replace(/^\ /g,'')
            .replace(/^[a-z]{1}/g,function ( l ){return l.toUpperCase();});
    },
    fromUnderscoreToCamel: function ( str ){
        return str
            .replace(/(\_[a-z])/g, function ( l ){return l.toUpperCase().replace('_','');})
            .replace(/^[a-z]{1}/g,function ( l ){return l.toUpperCase();});
    },
    fromUnderscoreToDash: function ( str ){
        return str
            .replace(/(\_[a-z])/g, function ( l ){return l.replace('_','-');})
            .replace(/^\-/g,'');
    },
    fromUnderscoreToSpaced: function ( str ){
        return str
            .replace(/(\_[a-z])/g, function ( l ){return l.toUpperCase().replace('_',' ');})
            .replace(/^[a-z]{1}/g,function ( l ){return l.toUpperCase();});
    }
}