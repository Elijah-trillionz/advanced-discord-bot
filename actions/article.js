const { commands, prefix } = require('../config/config');
const { MessageEmbed } = require('discord.js');
const makeRequest = require('../utils/request');
const {
  currentDay,
  formattedMonth,
  currentYear,
  getMonthsIndex,
  getRandomColor,
} = require('../utils/date');

async function getTodaysArticle() {
  const res = await makeRequest(
    `bot/article/${currentDay}/${formattedMonth}/${currentYear}`,
    'get',
    null,
    null
  );

  if (res.err) {
    return `**Error**: ${res.errorMsg}`;
  }

  const color = getRandomColor();

  const headerEmbed = new MessageEmbed()
    .setColor(color)
    .setAuthor(
      'Rhapsody of Realities',
      'https://spacecoastdaily.com/wp-content/uploads/2021/07/pastor-chris-oyakhilome-600.jpg',
      'https://rhapsodyofrealities.org'
    )
    .setTitle(res.title)
    .setFields([
      {
        name: 'Date:',
        value: `${
          res.month?.substr(0, 1).toUpperCase() + res.month?.substr(1)
        } ${res.day}, ${res.year}`,
        inline: true,
      },
      { name: 'Author:', value: 'Pastor Chris', inline: true },
    ])
    .setThumbnail(
      'https://spacecoastdaily.com/wp-content/uploads/2021/07/pastor-chris-oyakhilome-600.jpg'
    )
    .setTimestamp(res.createdAt);

  const scriptureEmbed = new MessageEmbed()
    .setColor(color)
    .setTitle('Theme Verse')
    .setDescription(`**${res.scripture}**`);

  const paragraphs = res.body?.split('\n\n');
  const moreEmbeds = [];

  paragraphs.forEach((paragraph) => {
    const paragraphEmbed = new MessageEmbed()
      .setDescription(paragraph)
      .setColor(color);

    moreEmbeds.push(paragraphEmbed);
  });

  const actEmbed = new MessageEmbed()
    .setColor(color)
    .setTitle(res.actType?.substr(0, 1).toUpperCase() + res.actType?.substr(1))
    .setDescription(`**${res.act}**`);

  const furtherStudyEmbed = new MessageEmbed()
    .setColor(color)
    .setTitle('Further Study')
    .setDescription(`*${res.furtherStudy}*`)
    .setFooter('Extract from Rhapsody of Realities. RoRbot');

  const completeEmbed = new MessageEmbed()
    .setColor(color)
    .setTitle('Mark as Complete')
    .setDescription(
      `React with any emoji to this article to mark completion (for tracking)`
    );

  return {
    embed: [
      headerEmbed,
      scriptureEmbed,
      ...moreEmbeds,
      actEmbed,
      furtherStudyEmbed,
      completeEmbed,
    ],
  };
}

function markArticleAsRead(timestamp) {}

module.exports = { getTodaysArticle, markArticleAsRead };
