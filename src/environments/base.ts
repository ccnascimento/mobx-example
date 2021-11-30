require("dotenv").config();

export default function baseEnv() {
  return {
    REACT_APP_PRIVATE_KEY: process.env.REACT_APP_PRIVATE_KEY,
    REACT_APP_PUBLIC_KEY: process.env.REACT_APP_PUBLIC_KEY,
    isProduction: true,
    isDevelopment: false,
  };
}

export type Environment = ReturnType<typeof baseEnv>;
