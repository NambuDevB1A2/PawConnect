import { registerAs } from "@nestjs/config";

export default registerAs('common', () => ({
    domain: process.env.DOMAIN,
    port: process.env.PORT || 3001,
    
    webDomain: process.env.WEB_DOMAIN,
    webPort: process.env.WEB_PORT || 3000,
}));