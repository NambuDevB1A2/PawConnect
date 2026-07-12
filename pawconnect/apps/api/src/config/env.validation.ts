import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
    DATABASE_URL: Joi.string().required(),

    DOMAIN: Joi.string(),
    PORT: Joi.number().default(3001),

    WEB_DOMAIN: Joi.string(),
    WEB_PORT: Joi.number().default(3000),

    JWT_SECRET: Joi.string(),
    JWT_EXPIRES_IN: Joi.number(),
});