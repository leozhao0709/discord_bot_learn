import { REST, Routes } from 'discord.js';
import config from './config';
import logger from './utils/logger';
import { commandsList } from './commands';

const rest = new REST().setToken(config.DISCORD_TOKEN!);

(async () => {
  try {
    logger.info(`Started deploying slashCommand`);

    const data = await rest.put(
      Routes.applicationGuildCommands(
        config.DISCORD_CLIENT_ID!,
        config.DISCORD_UMEFY_GUILD_ID!,
      ),
      { body: commandsList },
    );

    logger.info(`Successfully reload commands`);
  } catch (error) {
    logger.error(error);
  }
})();
