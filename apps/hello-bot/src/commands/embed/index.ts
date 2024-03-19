import { Command } from '@/types/command';
import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export default {
  event: 'interactionCreate',
  meta: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('create embed'),
  async execute(client, interaction) {
    if (!interaction.isChatInputCommand()) {
      return;
    }
    const embed = new EmbedBuilder()
      .setTitle('Title')
      .setURL('https://discord.js.org/')
      .setDescription('this is description')
      .setTimestamp()
      .setFooter({ text: 'footer' });

    await interaction.reply({ embeds: [embed] });
  },
} satisfies Command<'interactionCreate'>;
