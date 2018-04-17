const express = require('express');
const proxy = require('http-proxy-middleware');
const app = express();

app.use('/poi/*', proxy({
    target: 'http://10.0.10.162:8080',
    pathRewrite: {
        '^/poi': ''
    },
    changeOrigin: true,
    
    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function (proxyRes, req, res) {
        res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
        res.header('Access-Control-Allow-Credentials', 'true');
    },

    // 修改响应信息中的cookie域名
    cookieDomainRewrite: false // 可以为false，表示不修改
}));

app.use('/geoserver/*', proxy({
    target: 'http://10.0.10.162:9090',
    changeOrigin: true,
    
    // 修改响应头信息，实现跨域并允许带cookie
    onProxyRes: function (proxyRes, req, res) {
        res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
        res.header('Access-Control-Allow-Credentials', 'true');
    },

    // 修改响应信息中的cookie域名
    cookieDomainRewrite: false // 可以为false，表示不修改
}));

app.listen(9001, () => {
    console.log('server is on 9001');
});