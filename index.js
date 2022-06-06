import fs from 'fs';
import { URL } from 'url';
import { Client, Collection, Intents } from 'discord.js';
import 'dotenv/config';

// Setup
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('Ready');
})

// Regester Command names/functions in client.commands
client.commands = new Collection();

const commandsPath = new URL('./commands/', import.meta.url);
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const filePath = new URL('./commands/' + file, import.meta.url);
  const command = await import(filePath);
  client.commands.set(command.data.name, command);
}

// Regester hooks
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error', ephemeral: true });
  }
})

client.login(process.env.BOT_TOKEN);
