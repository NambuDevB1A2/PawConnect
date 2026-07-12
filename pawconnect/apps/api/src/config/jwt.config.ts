import { registerAs } from "@nestjs/config";

export default registerAs('jwt', () => ({
    jwt_secret: process.env.JWT_SECRET,
    jwt_expires_in: Number(process.env.JWT_EXPIRES_IN),
}));