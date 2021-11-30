import environment, { Environment } from "./base";

const env = environment();

const developmentEnv: Environment = {
  ...env,
  isProduction: false,
  isDevelopment: true,
};

export default developmentEnv;
