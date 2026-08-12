import { registerAs } from "@nestjs/config";

export default registerAs('bcrypt', () => ({
    bcrypt_round: Number(process.env.BCRYPT_ROUND),
}));