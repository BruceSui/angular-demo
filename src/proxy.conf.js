const PROXY_CONFIG = [
    {
        context: [
            "/auth/login",
            "/auth/logout",
            "/uaa/api",
            "/api/authenticate",
            "/cart/api",
            "/order/api",
            "/product/api",
            "/boss/api",
            "/member/api",
            "/seller/api",
            "/settle/api",
            "/base/api",
            "/car/api",
            "/home/api",
            "/contentm/api",
            "/notify/api",
            "/news/api",
            "/pay/api",
            "/community/api"
        ],
        "target": "http://39.106.198.77:8100",
        "secure": false,
        "pathRewrite": {
            "^/api": ""
        },
        "changeOrigin": true,
        "logLevel": "debug"
    }
]
 
module.exports = PROXY_CONFIG;
