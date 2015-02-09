function thousands(str){
    return str.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
}