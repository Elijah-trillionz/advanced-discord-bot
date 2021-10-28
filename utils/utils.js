// generate token for user
function generateToken(author) {
  const { id, tag, createdTimestamp, avatar } = author;

  return [id, tag, createdTimestamp, avatar, 'discord'].join('*_*');
}

// get username and password from command
// function getCredentials(cmd) {
//   const credentials = cmd.split(',');
//   if (credentials.length > 2) {
//     return {
//       err: 'Invalid format: Make sure to separate the username from the password with a comma',
//     };
//   }

//   const username = credentials[0].split(':')[1]?.trim();
//   const password = credentials[1].split(':')[1]?.trim();

//   if (!username || !password) {
//     return {
//       err: 'Invalid format: Username and password are required. **Sample** username: john_doe, password: 123',
//     };
//   }

//   return { username, password };
// }

module.exports = { generateToken };
