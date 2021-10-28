const { MessageEmbed } = require('discord.js');
const { commands } = require('../config/config');
const {
  getToday,
  getTomorrow,
  getDayIndex,
  currentDay,
} = require('../utils/date');
const makeRequest = require('../utils/request');
const { generateToken } = require('../utils/utils');

function aboutTodo() {
  return 'Hey there! this is the about section for todo';
}

function verifyTodo(cmd) {
  const day = cmd.split('-').at(-1).trim();

  if (commands.days.test(day)) {
    let formattedDay = day;
    if (day === 'today') {
      formattedDay = getToday();
    } else if (day === 'tomorrow') {
      formattedDay = getTomorrow();
    }
    return printConfirmationMessage(formattedDay);
  } else {
    return 'Day is invalid';
  }
}

function printConfirmationMessage(day) {
  const embed = new MessageEmbed()
    .setColor('#3caf50')
    .setTitle(
      `Adding new activity to ${day === 'all' ? 'all days' : `every ${day}`}`
    )
    .setDescription(`Reply this message with your new activity`)
    .addField('Sample', 'Go for fellowship');

  return {
    embed: [embed],
  };
}

async function addNewActivity(cmd, lastCmd, author) {
  const token = generateToken(author);
  const day = lastCmd.split('-').at(-1).trim();

  let formattedDay = day.toLowerCase();
  if (day === 'today') {
    formattedDay = getToday();
  } else if (day === 'tomorrow') {
    formattedDay = getTomorrow();
  }

  const res = await makeRequest('user/daily-activities/new', 'post', token, {
    activity: cmd,
    recurringType: formattedDay === 'all' ? 'daily' : 'weekly',
    recurringDay: formattedDay === 'all' ? null : getDayIndex(formattedDay),
  });

  if (res.err) {
    return `**Error**: ${res.errorMsg}`;
  }

  return 'New activity added';
}

async function fetchTodos(author, raw) {
  const token = generateToken(author);
  const today = getToday();

  // get all activities for the day
  const res = await makeRequest('user/daily-activities', 'get', token);

  if (res.err) {
    return `**Error**: ${res.errorMsg}`;
  }

  const todayActivities = [];
  res.forEach((activity) => {
    if (activity.recurringType === 'daily') {
      todayActivities.push(activity);
    } else if (activity.recurringDay === currentDay) {
      todayActivities.push(activity);
    }
  });

  if (raw) {
    return todayActivities;
  }

  const embeds = [
    `**Activities for ${today.substr(0, 1).toUpperCase() + today.substr(1)}**`,
  ];
  todayActivities.forEach((activity, index) => {
    embeds.push(`${index + 1}. ${activity.activity}`);
  });
  embeds.push(
    `Use *!del-todo-[s/n]* to delete an activity. **Sample:** !del-todo-2`
  );

  return embeds.join('\n\n');
}

async function deleteTodo(cmd, author) {
  const token = generateToken(author);

  try {
    const todayActivities = await fetchTodos(author, true);
    const fullCmd = cmd.match(/(del-todo-\d+)/)[0];
    const todoIndex = fullCmd.match(/(\d+)/)[0];

    if (todoIndex - 1 >= todayActivities.length) {
      return '**Error**: Invalid activity number. Check the activities list (*!today*) and try again!';
    }

    const res = await makeRequest(
      `user/daily-activities/${todayActivities[todoIndex - 1].id}`,
      'delete',
      token
    );

    if (res.err) {
      return `**Error**: ${res.errorMsg}`;
    }

    // fetch new activities
    const updatedActivities = await fetchTodos(author, false);

    return `Activity deleted.\n\n${updatedActivities}`;
  } catch (error) {
    console.log(error);
    return '**Error**: An unexpected error occurred. Kindly try again!';
  }
}

module.exports = {
  verifyTodo,
  addNewActivity,
  fetchTodos,
  deleteTodo,
  aboutTodo,
};
