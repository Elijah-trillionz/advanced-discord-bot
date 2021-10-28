const { commands, prefix } = require('../config/config');
const { MessageEmbed } = require('discord.js');
const makeRequest = require('../utils/request');
const { generateToken, getCredentials } = require('../utils/utils');

function sayHi(username) {
  return `Hey **${username}**, Am RoRbot. I am here to keep you committed to studying God's word through the Rhapsody of Realities. \nI will also help you keep track of how you act on God's word. \n\nExcited to get started? Type *!rorbot* to get started.`;
}

function getStarted() {
  const embed = new MessageEmbed()
    .setColor('GREYPLE')
    .setTitle('Getting started with RoRbot')
    .setDescription(
      `Hello again. With RoRbot you get access to daily articles depending on your desired time. There is no need signing up to read daily articles.\n\nBut if you want your progress to be tracked as you study, as well as other features of the bot you will need an account.\n\nGetting an account is free and easy, you can do it here and now (use *!sign-up* or *!sign-in* if you already have an account).\n\nUse *!help* to see all available commands and descriptions.`
    )
    .setURL('https://somewhere.com')
    .setFooter('RoRbot');

  return {
    embed: [embed],
  };
}

function interactUser(username) {
  return `Hey ${username}, I trust you're having a great time.`;
}

// function signInIntro() {
//   const embed = new MessageEmbed()
//     .setColor('ORANGE')
//     .setTitle('Sign In to RoRbot')
//     .setDescription(
//       'Your request to sign in has been received, kindly reply this message with your username and password (with comma separation).'
//     )
//     .addField('Sample', 'username: john_doe, password: 123');

//   return {
//     embed: [embed],
//   };
// }

// function signUpIntro() {
//   const embed = new MessageEmbed()
//     .setColor('#3caf50')
//     .setTitle('Create an account')
//     .setDescription(
//       'Your request to create an account has been received, kindly reply this message with your username and password (with comma separation).'
//     )
//     .addField('Sample', 'username: john_doe, password: 123');

//   return {
//     embed: [embed],
//   };
// }

// function signoutIntro() {
//   const embed = new MessageEmbed()
//     .setColor('RED')
//     .setTitle('Are you sure you wanna sign out?')
//     .setDescription('If yes, type in your registered username (only) below')
//     .addField('Sample', 'john_doe');

//   return {
//     embed: [embed],
//   };
// }

async function signInUser(author) {
  const token = generateToken(author);

  const res = await makeRequest('users/login', 'post', token, {
    token,
  });

  if (res.err) {
    return `**Error**: ${res.errorMsg}`;
  }

  return 'You have successfully signed in.';
}

async function signupUser(author) {
  const token = generateToken(author);

  const res = await makeRequest('users/register', 'post', null, {
    token,
    id: author.id,
    username: author.username,
  });

  if (res.err) {
    if (res.statusCode === 400) {
      return `**Error**: ${res.errorMsg}. Use *!sign-in* to sign in to your account.`;
    }
  }

  return 'You have successfully signed up, you now have full access to all features.';
}

async function signoutUser(author) {
  const token = generateToken(author);

  const res = await makeRequest('users/logout', 'get', token, null);

  if (res.err) {
    return `**Error**: ${res.errorMsg}`;
  }

  return 'You have successfully signed out! Use *!sign-in* to sign in at any time.';
}

module.exports = {
  sayHi,
  getStarted,
  interactUser,
  signupUser,
  signInUser,
  signoutUser,
};
