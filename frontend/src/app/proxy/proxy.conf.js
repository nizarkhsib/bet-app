const PROXY_CONFIG = [
    {
        context: [
            "/api/**",
        ],
        target: "https://www.pointdevente.parionssport.fdj.fr",
        secure: false
    },
    {
        context: [
            "/app/**",
        ],
        target: "http://localhost:8080",
        secure: false
    }

]
module.exports = PROXY_CONFIG;