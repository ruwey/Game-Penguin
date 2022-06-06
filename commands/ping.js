import { SlashCommandBuilder } from '@discordjs/builders';

const data = new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Repply to usr');

async function execute(interaction) {
  await interaction.reply('Pong!');
};
export {data, execute};
