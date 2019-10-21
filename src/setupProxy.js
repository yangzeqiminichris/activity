const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/jf-api', {
        target: 'https://zbdx.jzjtong.com' ,
        secure: false,
        changeOrigin: true
        // cookieDomainRewrite: "http://localhost:3000"
    }),
    proxy(
        '/zbdx-api', {
            target: 'https://zbdx.jzjtong.com',
            secure: false,
            changeOrigin: true
        }
    ),
    proxy(
        '/v1', {
            target: 'http://192.168.1.199:8098',
            secure: false,
            changeOrigin: true
        }
    )
    );
};