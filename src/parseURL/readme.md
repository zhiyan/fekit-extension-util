URL处理
parseURL("http://www.baidu.com:90/index.html?a=123&b=2#hash")
.file: "index.html"
.hash: "hash"
.host: "www.baidu.com"
.params: {a:123,b:2}
.path: "/"
.port: "90"
.protocol: "http"
.query: "?a=123&b=2"
.relative: "/?a=123&b=2"
.source: "http://www.baidu.com?a=123&b=2"