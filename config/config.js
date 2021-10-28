const { Intents } = require('discord.js');

const {
  DIRECT_MESSAGES,
  DIRECT_MESSAGE_REACTIONS,
  DIRECT_MESSAGE_TYPING,
  GUILD_MESSAGES,
  GUILD_MESSAGE_TYPING,
  GUILDS,
  GUILD_MESSAGE_REACTIONS,
  GUILD_PRESENCES,
} = Intents.FLAGS;

const botIntents = [
  DIRECT_MESSAGES,
  DIRECT_MESSAGE_REACTIONS,
  DIRECT_MESSAGE_TYPING,
  GUILD_MESSAGES,
  GUILD_MESSAGE_TYPING,
  GUILDS,
  GUILD_MESSAGE_REACTIONS,
  GUILD_PRESENCES,
];
const prefix = '!';

const secrets = {
  DISCORD_TOKEN: 'Your token',
};

const sayHi = /(?:say-hi)|(?:s\.h)/;
const rorbot = /rorbot/;
const interact = /(?:hey)|(?:hello)/;
const signIn = /(?:sign-in)|(?:s\.in)/;
const signInLvl2 = /(?:username)|(?:password)/;
const signup = /(?:sign-up)|(?:s\.up)/;
const signout = /(?:sign-out)|(?:s\.out)/;

// commands for articles
const read = /(?:read)|(?:article)/;

// commands for todos
const aboutTodo = /(?:about-todo)/;
const addTodo = /(?:add-todo-)/;
const days =
  /(?:all)|(?:sunday)|(?:monday)|(?:tuesday)|(?:wednesday)|(?:thursday)|(?:friday)|(?:saturday)|(?:today)|(?:tomorrow)/;
const today = /(?:today)/;
const delTodo = /(?:del-todo-)/;

const commands = {
  sayHi,
  rorbot,
  interact,
  signIn,
  signInLvl2,
  signup,
  signout,
  read,
  aboutTodo,
  addTodo,
  days,
  today,
  delTodo,
};

module.exports = { secrets, botIntents, prefix, commands };

// bot prefix: !
// commands: say-hi [s.h]: rorbot introduces itself
// rorbot: about rorbot
// sign-up [su]: registers users
// sign-in [si]: login users
// sign-out [so]: logs users out

// article
// read [r]: read today's article
// setups [s]: for all users setups
// set-time [st]: to change time for posting new article
// praise-reports [pr]: see all praise reports from all users
// add-pr: add a praise report
// glory [amen, hallelujah]: simply respond back
// lesson-[dd//mm//yy]: to view a lesson
// add-lesson-[dd//mm//yy]: to submit a lesson
// salvation [save]: prayer of salvation
// mark done when a user reacts to article with an emoji
// status

// todos
// about-todo: learn more about todo /daily activities
// add-todo-[day] [at]: add to todo list (day: always, today, monday, tuesday ...)
// today: all todos/daily activities for that day
// set-reminder [sr]: sets reminder for the time to remind user of that day's todo (with the todo listed)

// goals // bot is limited to just a goal and steps of achieving
// about-goal: learn more about goals
// add-goal [ag]: adds a new goal only if there are no pending goals
// add-goal-force [agf]: adds a new goal and overrides the previous goal as completed
// goal [g]: returns the current goal
// done [d]: to mark goal as completed
// add-step [as]: adds a new step of achieving goal (step 1 to n)
// steps: returns all steps of achieving the goal, react to any with an icon to mark complete

// after a user signs in, use the user's discord username as auth

// you can use multiple providers. all you have do is sign up with one provider, and use that provider to register other providers. so if you are on discord, you can register facebook to be part of your account with your facebook username
// register initialId
// get-initialId
