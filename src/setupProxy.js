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
        )
        );
};