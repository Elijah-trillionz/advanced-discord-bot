const { Client, MessageEmbed } = require('discord.js');
const { getTodaysArticle } = require('./actions/article');
const {
  sayHi,
  getStarted,
  interactUser,
  signInUser,
  signoutUser,
  signupUser,
} = require('./actions/global');
const {
  verifyTodo,
  addNewActivity,
  fetchTodos,
  deleteTodo,
  aboutTodo,
} = require('./actions/todos');
const { botIntents, commands, secrets, prefix } = require('./config/config');

const client = new Client({
  intents: botIntents,
  partials: ['CHANNEL', 'MESSAGE'],
});

client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag + ' and ready to go');
});

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;
  if (msg.channel.type !== 'DM' && !msg.content.includes('!')) return;

  const messages = await msg.channel.messages.fetch({ limit: 3 });

  const lastCmd = messages.last().content;

  const cmd = msg.content.slice(prefix.length);
  const username = msg.author.username;

  let reply;
  switch (true) {
    case commands.addTodo.test(lastCmd):
      reply = await addNewActivity(msg.content, lastCmd, msg.author);
      break;
    case commands.sayHi.test(cmd):
      reply = sayHi(username);
      break;
    case commands.rorbot.test(cmd):
      reply = getStarted();
      break;
    // case commands.interact.test(cmd):
    //   reply = interactUser(username);
    //   break;
    case commands.signIn.test(cmd):
      reply = await signInUser(msg.author);
      break;
    case commands.signup.test(cmd):
      reply = await signupUser(msg.author);
      break;
    case commands.signout.test(cmd):
      reply = await signoutUser(msg.author);
      break;
    case commands.read.test(cmd):
      reply = await getTodaysArticle();
      break;
    // todos||activities
    case commands.aboutTodo.test(cmd):
      reply = aboutTodo(cmd);
      break;
    case commands.addTodo.test(cmd):
      reply = verifyTodo(cmd);
      break;
    case commands.today.test(cmd):
      reply = await fetchTodos(msg.author, false);
      break;
    case commands.delTodo.test(cmd):
      reply = await deleteTodo(cmd, msg.author);
      break;
    default:
      reply = "I do not understand what you're saying";
  }

  if (msg.channel.type !== 'DM') {
    msg.reply(reply.embed ? { embeds: [...reply.embed] } : reply);
  } else {
    msg.author.send(reply.embed ? { embeds: [...reply.embed] } : reply);
  }
});

client.on('messageReactionAdd', (reaction) => {
  if (reaction.message.embeds <= 0) return;
  markArticle;
  console.log(reaction.message.embeds[0].timestamp);
});

// send messages based on reminders when client comes online
client.on('presenceUpdate', (oldPresence, newPresence) => {
  // console.log(oldPresence.status, 'old');
  console.log(newPresence.status);
});

client.login(secrets.DISCORD_TOKEN);
