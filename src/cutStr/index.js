function cutStr(fullWord, number) {
    if( !fullWord ) return "";
    number = number || fullWord.length;
    var r = ''
    var sizeLimit = (number-1)*2;
    var shortWord = ''
    var size = 0, i=0;
    var hanPattern = /^[\u2E80-\u9FFF]+$/;
    while(size<sizeLimit){
        var c = fullWord.substr(i++, 1) || '';
        size += hanPattern.test(c) ? 2 : 1;
        r += c;
    }
    var restChars = fullWord.replace(r, '');
    if(restChars.length > 2){
        r += '...';
    }else if (restChars.length <= 1){
        r += restChars;
    }else{
        if(hanPattern.test(restChars.charAt(0)) || hanPattern.test(restChars.charAt(1)))
            r += '...';
        else
            r += restChars;
    }
    return r;
}