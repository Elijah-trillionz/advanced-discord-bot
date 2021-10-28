const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const days = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const currentDate = date.getDate();
const currentDay = date.getDay();

const formattedMonth = months[currentMonth];

function getMonthsIndex(month) {
  return months.indexOf(month);
}

function getToday() {
  return days[currentDay];
}

function getDayIndex(day) {
  return days.indexOf(day);
}

function getTomorrow() {
  if (currentDay + 1 >= days.length) {
    return days[0];
  }

  return days[currentDay + 1];
}

const hexas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

function randomise(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomColor() {
  const colors = [];

  for (let i = 0; i < 6; i++) {
    const hexa = randomise(hexas);
    colors.push(hexa);
  }

  return `#${colors.join('')}`;
}

module.exports = {
  currentDay: currentDate,
  currentYear,
  formattedMonth,
  getMonthsIndex,
  getRandomColor,
  randomise,
  getToday,
  getTomorrow,
  getDayIndex,
  currentDay,
};
