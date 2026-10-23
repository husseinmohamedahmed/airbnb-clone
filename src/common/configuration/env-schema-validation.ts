import * as joi from 'joi';

export const envSchema = joi.object({
  PORT: joi.number().integer().default(3000),
  NODE_ENV: joi.string().required(),
  FALLBACK_LANGUAGE: joi.string().default('en'),
  MONGODB_URI: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  EXPIRES_IN: joi.string().required(),
  REFRESH_TOKEN_EXPIRATION: joi.string().required(),
});
