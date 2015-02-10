操作日期date相关函数
.format(date, parseString, lang) : format( new Date(), 'Y-m-d', 'zh' ) 

参数
date : 日期对象
parseString : 格式化参数
lang : 语言，默认en， 支持中文zh

格式化参数: ( 2015-02-09 15:33:11)
d : 10
D : 周二
j : 10 (不补全0)
l : 星期二
W : 7 ( 当年第七周 )
F : 二月
m : 02
M : 2月
n : 2
L : false (是否闰年)
o : 2015
Y : 2015
y : 15
a : pm | 下午
A : PM | 下午
g : 3 ( 小时不补零 )
G : 15 ( 小时不补零 )
h : 03 ( 时间12小时制 )
H : 15 ( 时间24小时制 )
i : 33 ( 分钟 )
s : 11 ( 秒 )
u : 045 ( 毫妙 )
P : +08:00 (时区)
O : +0800
T : 中国标准时间
r : Tue Feb 10 2015 15:33:11 GMT+0800 (中国标准时间)

