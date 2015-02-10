原生ajax封装
.get(url,data,fn)
.post(url,data,fn)
.request(url,options)
.getJSON(url,data,fn)
.getJSON(url?callback=?,data,fn)

options:
async: true,false
method: "get","post"
data: string,object
success: fn
failure: fn
