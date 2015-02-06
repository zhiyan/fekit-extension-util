function getElementsByClassName(name) {
    var tags = document.getElementsByTagName('*'),
        els = [],
        cs;
    for (var i = 0,l=tags.length; i < l; i++) {
        cs = tags[i].className && ( " " + tags[i].className + " " ) || ""
        if ( cs.indexOf( " " + name + " " ) > -1 ) {
            els.push( tags[i] )
        }
    }
    return els
}