import { Client, ClientEvents, InteractionReplyOptions } from 'discord.js';
import add from './add';
import embed from './embed';
import ping from './ping';
import { Command } from '@/types/command';
import logger from '@/utils/logger';

const allCommands = [ping, add, embed] as const;

const groupCommands = (<Event extends keyof ClientEvents>(
  commands: readonly Command<Event>[],
) => {
  const map: Map<
    keyof ClientEvents,
    Map<string, Command<Event>['execute']>
  > = new Map();
  commands.forEach((command) => {
    if (!map.has(command.event)) {
      map.set(command.event, new Map());
    }

    map.get(command.event)!.set(command.meta.name, command.execute);
  });
  return map;
})(allCommands);

const registerAllCommands = (client: Client) => {
  for (const [eventName, eventMap] of groupCommands) {
    client.on(eventName, async (...args) => {
      if (
        typeof args[0] === 'object' &&
        args[0] !== null &&
        !Array.isArray(args[0]) &&
        'commandName' in args[0]
      ) {
        const interaction = args[0];
        logger.info(`trigger command ${interaction.commandName}`);

        try {
          if (eventMap.has(interaction.commandName)) {
            eventMap.get(interaction.commandName)?.(client, interaction);
          }
        } catch (error) {
          logger.error(error);
          if (interaction.isRepliable()) {
            const reply = {
              content: 'There was an error while executing this command!',
              ephemeral: true,
            } satisfies InteractionReplyOptions;

            if (interaction.replied || interaction.deferred) {
              await interaction.followUp(reply);
            } else {
              await interaction.reply(reply);
            }
          }
        }
      }
    });
  }
};

export default registerAllCommands;
export const commandsList = allCommands.map(({ meta }) => meta);
