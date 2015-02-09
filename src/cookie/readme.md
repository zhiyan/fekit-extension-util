cookie存取
cookie("a"): 读取cookie
cookie("a","b"): 添加cookie
cookie("a",null): 删除cookie
cookie("a","b",{domain:"xxx.com"}): domain设置
cookie("a","b",{path:"/"}): path设置
cookie("a","b",{expires:new Date()}): 设置过期时间
cookie("a","b",{hours:24}): 通过hours设置过期时间