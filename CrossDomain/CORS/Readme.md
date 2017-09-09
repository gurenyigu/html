* 对比 Jsonp, 比其支持的请求方法更多. 但是不兼容古老浏览器

# CORS跨域(W3C标准)
* CORS (Cross-Origin Resource Sharing)跨域资源共享,定义了必须在访问跨域资源时, 浏览器与服务器应该如何沟通.
* 其背后的思想就是使用自定义的HTTP头部让浏览器与服务器进行沟通,从而决定请求或响应是应该成功还是失败.
* 目前所有浏览器都支持该功能,IE浏览器不可以低于IE10.
* CORS通信与AJAX通信没有差别,代码完全一样.浏览器一旦发现AJAX请求跨域,就会自动添加一些附加的头部信息,有时还会多出一次附加的请求.

## 实现
* CORS通信的关键是服务器, 只要服务器实现了 CORS接口,就看可以跨域通信

## 两种请求
* 浏览器将CORS请求分为两类: 简单请求(simple request) 和非简单请求(not-so-simple request)
* 只要同时满足下面两大条件, 就是简单请求
    1. 请求方法为三种之一
        * GET
        * POST
        * HEAD
    2. HTTP的头部信息不超过以下几种字段
        * Accept
        * Accept-Language
        * Content-Language
        * Last-Event-ID
        8 Content-Type: 只限于三个值 application/x-www-form-urlencoded multipart/form-data text/planin
* 只要不同时满足上面的两个条件,就属于非简单请求
* 浏览器对两种请求的处理,不一样的