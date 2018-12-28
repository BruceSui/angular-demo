const PROXY_CONFIG = [
    {
        context: [
            "/auth/login",
            "/uaa/api",
            "/api/authenticate",
            "/api/profile-info",
            "/auth/logout",
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
