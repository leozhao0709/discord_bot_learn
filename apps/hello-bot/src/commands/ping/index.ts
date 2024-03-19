import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '@/types/command';

export default {
  event: 'interactionCreate',
  meta: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with ping time!'),
  async execute(client, interaction) {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    await interaction.deferReply({ ephemeral: true });
    const reply = await interaction.fetchReply();

    const ping = reply.createdTimestamp - interaction.createdTimestamp;
    await interaction.editReply({
      content: `Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`,
    });
  },
} satisfies Command<'interactionCreate'>;
