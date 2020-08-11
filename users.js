// Helper functions for users (signing in/out, joining, disconnecting etc)

const users = [];

// user{id, name, room}
const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Make sure that the user isn't already in the room
  const existingUsers = users.find(
    (user) => user.name === name && user.room === room
  );

  // Error checking
  if (!name || !room) {
    return {error: 'You must enter a username and a room'}
  }
  // Can't have 2 users with the same name in a room
  if (existingUsers) {
    return { error: "Username is already taken for this room!" };
  }

  const user = { id, name, room };

  // Add user to users array
  users.push(user);

  // Return user so you know what user was pushed
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  // if user is there, remove from users array, return spliced user
  if (index !== -1) {
    return users.splice(index, 1)[0]; //[0] spliced user
  }
};

//one liner.. returns user
const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// Longer way...
/* const getUsersInRoom = (room) => {
  users.filter((user) => {
    user.room === room;
    return user;
  });
}; */

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
