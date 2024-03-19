import loadEnv from './load_env';

loadEnv();

const config = {
  APP_ENV: process.env.APP_ENV ?? 'development',
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
  DISCORD_UMEFY_GUILD_ID: process.env.DISCORD_UMEFY_GUILD_ID,
} as const;

export default config;
