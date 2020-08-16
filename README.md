This is the back-end/server for the ChatApp. The front-end/client code can be found [here](https://github.com/Todd-Gardner/react-node-socketio_ChatApp-client).

# This is a live, real-time chat app. Created using React, Node, Express and Socket.io.
The main purpose of this app was to give me more experience with socket.io and also deploying to Heroku and Netlify.
The front end is hosted on Netlify and the back end hosted on Heroku.

Users enter their username and room that they want to join. When joining a room they are greeted a welcome message from the Admin. The Admin also announces when other users join or leave the chat room. To the right of the chat, users can also see a list of all other users in that room.

## Connection URLs
The front-end is hosted on Netlify and can be accessed using [Netlify](https://react-node-socketio-chat-app.netlify.app).
The back-end is being hosted on [Heroku](https://chat-app-react-node-socket.herokuapp.com/).

#### To run locally:
- client/src/components/Chat.js - change the ENDPOINT with the commented one.
- server/index.js - comment out cors references x2.
- server/package.json - scripts/start change 'node' back to 'nodemon' to watch for changes.

## TODO:
I am eager to continue my learning on other things, so the following is a 'list to self' for improvements that could be done in the future.
(Again, this app was for socket.io, Heroku and Netlify experience.)

- The CSS needs modifications - or bootstrap.
- Remove the .tolowercase() on the front end.
- Change from entering in a room name to a dropdown list to limit the amount of rooms.
- Save messages to either server or local storage so they wont be lost when you leave the room.
- Send push notifications with new messages or joins?
- Be able to send private messages (w/ push).
- Send images / attachments?
- Check for empty strings (messages).
- Add timestamps?
- Check for repeat messages (spam).

I also welcome anyone else's thoughts for improvements!
