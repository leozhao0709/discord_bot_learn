import Discord, { ActivityType } from 'discord.js';
import config from './config';
import logger from './utils/logger';
import registerAllCommands from './commands';

function main() {
  const client = new Discord.Client({
    intents: [Discord.GatewayIntentBits.Guilds],
  });

  client.once('ready', (readyClient) => {
    logger.log(`ready! Logged in as ${readyClient.user.tag},`);
    readyClient.user.setActivity({
      name: 'xx',
      type: ActivityType.Playing,
    });
  });

  registerAllCommands(client);

  client.login(config.DISCORD_TOKEN);

  process.on('SIGINT', () => {
    client.destroy();
    logger.info('SIGINT: Bot is shutting down.');
    process.exit();
  });

  process.on('SIGTERM', () => {
    client.destroy();
    logger.info('SIGTERM: Bot is shutting down.');
    process.exit();
  });
}

main();
