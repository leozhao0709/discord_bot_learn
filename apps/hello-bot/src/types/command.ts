import { Client, ClientEvents, SlashCommandBuilder } from 'discord.js';

export type Command<Event extends keyof ClientEvents> = {
  event: Event;
  meta: SlashCommandBuilder;
  execute: (client: Client, ...args: ClientEvents[Event]) => Awaited<void>;
};
