import { registerAs } from "@nestjs/config";

export default registerAs('common', () => ({
    domain: process.env.DOMAIN,
    port: Number(process.env.PORT),
    
    webDomain: process.env.WEB_DOMAIN,
    webPort: Number(process.env.WEB_PORT),
}));