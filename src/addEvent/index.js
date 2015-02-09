function addEvent(obj,evt,fn){ 
    if(!obj){return;}
    if (obj.addEventListener) { 
        obj.addEventListener(evt, fn, false); 
    }else if(obj.attachEvent){ 
        obj.attachEvent('on'+evt,fn); 
    }else{
        obj["on" + evt] = fn;
    } 
}