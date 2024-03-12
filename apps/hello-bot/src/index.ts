import Discord from 'discord.js';
import config from './config';

function main() {
  const client = new Discord.Client({
    intents: ['Guilds'],
  });

  client.once('ready', (readyClient) => {
    console.log(`ready! Logged in as ${readyClient.user.tag},`);
  });

  client.login(config.DISCORD_TOKEN);
}

main();
