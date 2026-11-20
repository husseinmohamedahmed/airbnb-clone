export interface EnviromentInterface {
  port: number;
  nodeEnv: string;
  fallBackLanguage: string;
  mongodbUri: string;
  jwtSecret: string;
  expiresIn: string;
  refreshTokenExpiration: string;
  systemadmin: ISystemAdminEnviroment;
}

export interface ISystemAdminEnviroment {
  name: string;
  email: string;
  password: string;
}
