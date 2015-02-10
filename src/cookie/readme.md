cookie存取
.set("cname","cvalue"): 设置cookie
.get("cname"): 读取cookie
.remove("cname"): 删除cookie

.set("a","b",{domain:"xxx.com"}): domain设置
.set("a","b",{path:"/"}): path设置
.set("a","b",{expires:new Date()}): 设置过期时间
.set("a","b",{hours:24}): 通过hours设置过期时间