const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/v1', {
        target: 'https://zbdx.jzjtong.com/o2o-admin' ,
        secure: false,
        changeOrigin: true
        // cookieDomainRewrite: "http://localhost:3000"
    }));
};