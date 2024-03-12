import loadEnv from './load_env';

loadEnv();

const config = {
  APP_ENV: process.env.APP_ENV ?? 'development',
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
} as const;

export default config;
