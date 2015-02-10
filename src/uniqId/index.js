function uniqId( prefix ){
    return ( prefix || "" ) + Math.floor( Math.random() * 11 ) +''+ Math.floor( Math.random() * 1000000 );
}