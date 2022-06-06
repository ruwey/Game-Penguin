import { URL } from 'url';
import { readdirSync } from 'fs';
import { SlashCommandBuilder } from "@discordjs/builders";
import { MessageActionRow, MessageButton, MessageSelectMenu } from 'discord.js';

const data = new SlashCommandBuilder()
      .setName('challenge')
      .setDescription('Challenge another user to a game')
      .addSubcommand(subcommand =>
        subcommand.setName('8ball')
                  .setDescription('Pool Ripoff')
                  .addUserOption(option =>
                    option.setName('opponent')
                          .setDescription('who you play against')
                          .setRequired(true)))
      .addSubcommand(subcommaond =>
        subcommaond.setName('test')
                   .setDescription('worlds easiest game, by design')
                  .addUserOption(option =>
                    option.setName('opponent')
                          .setDescription('who you play against')
                          .setRequired(true)));

async function execute(interaction) {
  switch(interaction.options.getSubcommand()) {
    case '8ball':
      interaction.reply("hi");
      break;
    case 'test':
      interaction.reply("sup");
      break;
  }
}

export {data, execute};
