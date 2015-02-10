function random(min,max){
    if( arguments.length === 1 ){
        max = min;
        min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1))
}