export interface EnviromentInterface {
  port: number;
  nodeEnv: string;
  fallBackLanguage: string;
  mongodbUri: string;
  jwtSecret: string;
  expiresIn: string;
  refreshTokenExpiration: string;
}
