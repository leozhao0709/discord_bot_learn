import { Command } from '@/types/command';
import { SlashCommandBuilder } from 'discord.js';

export default {
  event: 'interactionCreate',
  meta: new SlashCommandBuilder()
    .setName('add')
    .setDescription('Add 2 numbers')
    .addNumberOption((option) =>
      option
        .setName('first-number')
        .setDescription('The first number')
        .setRequired(true),
    )
    .addNumberOption((option) =>
      option
        .setName('second-number')
        .setDescription('The second number')
        .setRequired(true),
    )
    .setDMPermission(false),
  async execute(client, interaction) {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const num1 = interaction.options.getNumber('first-number', true);
    const num2 = interaction.options.getNumber('second-number', true);
    await interaction.reply({
      content: (num1 + num2).toString(),
      ephemeral: true,
    });
  },
} satisfies Command<'interactionCreate'>;
