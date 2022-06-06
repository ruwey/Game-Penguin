import { SlashCommandBuilder, userMention } from "@discordjs/builders";
import express from "express";
import { Formatters, ThreadManager } from "discord.js";
import EventEmitter from "events";

class MyEmitter extends EventEmitter {}

const emit = new MyEmitter();

const app = express();
const port = 3000;
app.listen(port);

app.get('/return/:id/:boardState/:turn', (req, res) => {
  res.send("Sucsess");
  emit.emit('state-update', req.params);
})

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
      .addSubcommand(subcommand =>
        subcommand.setName('tictactoe')
                  .setDescription('a bunch of squares idk')
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
      interaction.reply("not implemented yet =(");
      break;
    case 'tictactoe':
      tictactoe(interaction);
      break;
    case 'test':
      interaction.reply("sup");
      break;
  }
}

async function tictactoe(interaction) {
  const user = interaction.options.getUser('opponent')
  let msg = await interaction.reply({ content: interaction.user.username + " has challenged " +
                      Formatters.userMention(user.id) + " to a dual!\n" +
                      "[Accept?](http://localhost:3001/?pos=NNNNNNNNN&turn=X&id=" + interaction.id+")",
                      fetchReply: true})
  let thread = await msg.startThread({name: "TicTacToe: " + user.username + " vs " + interaction.user.username});
  emit.on('state-update', (p) => {
    if (p.id != interaction.id) return;
    if (p.turn === '0')
      thread.send({content: Formatters.userMention(interaction.user.id) + " http://localhost:3001/?pos="+p.boardState+"&turn="+p.turn+"&id="+p.id+""})
    else
      thread.send({content: Formatters.userMention(user.id) + " http://localhost:3001/?pos="+p.boardState+"&turn="+p.turn+"&id="+p.id+""})
  })
}

export {data, execute};
