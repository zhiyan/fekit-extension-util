function ua(){

   var engine={ 
      trident:0,
      gecko:0,
      webkit:0,
      khtml:0,
      presto:0,
      ver:null   
   };
   var browser={  
      ie:0,
      firefox:0,
      safari:0,
      konq:0,
      opera:0,
      chrome:0,
      ver:null    
   };
   var system={   
      win:false,
      mac:false,
      x11:false
   };

   var ua=navigator.userAgent;
   if(/AppleWebKit\/(\S+)/.test(ua)){      
      engine.ver=RegExp["$1"];
      engine.webkit=parseFloat(engine.ver);
      if(/OPR\/(\S+)/.test(ua)){            
         browser.ver=RegExp["$1"];
         browser.opera=parseFloat(browser.ver);
      }else if(/Chrome\/(\S+)/.test(ua)){   
         browser.ver=RegExp["$1"];
         browser.chrome=parseFloat(browser.ver);
      }else if(/Version\/(\S+)/.test(ua)){   
         browser.ver=RegExp["$1"];
         browser.safari=parseFloat(browser.ver);
      }else{                               
         var SafariVersion=1;
         if(engine.webkit<100){
            SafariVersion=1;
         }else if(engine.webkit<312){
            SafariVersion=1.2;
         }else if(engine.webkit<412){
            SafariVersion=1.3;
         }else{
            SafariVersion=2;
         }
            browser.safari=browser.ver=SafariVersion;
      }
   }else if(window.opera){                
      engine.ver=browser.ver=window.opera.version();
      engine.presto=browser.opera=parseFloat(engine.ver);
   }else if(/Opera[\/\s](\S+)/.test(ua)){ 
      engine.ver=browser.ver=RegExp["$1"];
      engine.presto=browser.opera=parseFloat(engine.ver);
   }else if(/KHTML\/(\S+)/.test(ua)||/Konqueror\/([^;]+)/.test(ua)){
      engine.ver=browser.ver=RegExp["$1"];
      engine.khtml=browser.konq=parseFloat(engine.ver);
   }else if(/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){ 
      engine.ver=RegExp["$1"];
      engine.gecko=parseFloat(engine.ver);
      if(/Firefox\/(\S+)/.test(ua)){               
         browser.ver=RegExp["$1"];
         browser.firefox=parseFloat(browser.ver);
      }
   }else if(/Trident\/([\d\.]+)/.test(ua)){       
      engine.ver=RegExp["$1"];
      engine.trident=parseFloat(engine.ver);
      if(/rv\:([\d\.]+)/.test(ua)||/MSIE ([^;]+)/.test(ua)){   
         browser.ver=RegExp["$1"];
         browser.ie=parseFloat(browser.ver);
      }
   }else if(/MSIE ([^;]+)/.test(ua)){             
      browser.ver=RegExp["$1"];
      browser.ie=parseFloat(browser.ver);
      engine.ver=browser.ie-4.0;
      engine.trident=parseFloat(engine.ver);
   }

   var p=navigator.platform;                       
   system.win=p.indexOf("Win")==0;
   system.mac=p.indexOf("Mac")==0;
   system.x11=(p.indexOf("X11")==0)||(p.indexOf("Linux")==0);
   if(system.win){
      if(/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
         if(RegExp["$1"]=="NT"){
            switch(RegExp["$2"]){
               case "5.0":
                  system.win="2000";
                  break;
               case "5.1":
                  system.win="XP";
                  break;
               case "6.0":
                  system.win="Vista";
                  break;
               case "6.1":
                  system.win="7";
                  break;
               case "6.2":
                  system.win="8";
                  break;
               case "6.3":
                  system.win="8.1";
                  break;
               case "6.4":
                  system.win="10";
                  break;
               case "10":
                  system.win="10";
                  break;
               default:
                  system.win="NT";
                  break;
            }
         }else if(RegExp["$1"]=="9x"){
            system.win="ME";
         }else{
            system.win=RegExp["$1"];
         }
      }
   }

   return {
      ua:ua,          
      engine:engine,  
      browser:browser,
      system:system 
   };

}

