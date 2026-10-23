//factroy function used to create
import { EnviromentInterface } from '../enviroment.interface';

export const defaultEnv = (): EnviromentInterface => {
  return {
    port: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV as string,
    fallBackLanguage: process.env.FALLBACK_LANGUAGE as string,
    mongodbUri: process.env.MONGODB_URI as string,
    jwtSecret: process.env.JWT_SECRET as string,
    expiresIn: process.env.EXPIRES_IN as string,
    refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION as string,
  };
};
