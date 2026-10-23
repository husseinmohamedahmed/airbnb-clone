import { stagingEnv } from './enviroment-modes/staging.env';
import { productionEnv } from './enviroment-modes/production.env';
import { developmentEnv } from './enviroment-modes/development.env';
import { EnviromentInterface } from './enviroment.interface';

const enviroments = {
  development: developmentEnv,
  production: productionEnv,
  staging: stagingEnv,
};

export default (): EnviromentInterface => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const getNodeEnv = enviroments[nodeEnv];
  return getNodeEnv();
};
