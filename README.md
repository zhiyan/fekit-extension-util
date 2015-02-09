# fekit-extension-util 

##安装插件

    npm install -g fekit-extension-util

## 初始化

    fekit util --install

## 列出所有支持的函数

    fekit util -l

## 安装函数

    fekit util -i [funcName]

## 删除函数

    fekit util -u [funcName]

## 展示函数内容

    fekit util -g [funcName]

## 在项目中使用

    <!-- fekit compile: modular -->
    var util = require("fekit-util");
    util.parseURL("xxx")

    <!-- fekit compile: false -->
    requre("fekit-util");
    window.fekitUtil.parseURL("xxx")

