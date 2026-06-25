# OpenChat

> Minimal realtime chat app using Socket.IO, Express and MongoDB.

Preview: a small single-room chat where messages are stored in MongoDB and broadcast in real time to connected clients.

## Features
- Realtime messaging with Socket.IO
- Persisted messages in MongoDB
- Simple browser frontend (HTML/CSS/Vanilla JS)

## Repository layout
- `backend/` - Node.js server, Socket.IO, Mongoose models
- `frontend/` - Static client (HTML, CSS, JS)

Key files:
- [backend/server.js](backend/server.js) — Socket.IO server and Express setup
- [backend/models/Messages.js](backend/models/Messages.js) — Mongoose schema for messages
- [frontend/index.html](frontend/index.html) — Chat UI
- [frontend/script.js](frontend/script.js) — Client socket logic

## Requirements
- Node.js (v16+ recommended)
- npm
- MongoDB instance (Atlas or local)

## Environment
Create a `.env` file in `backend/` with at least:

```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.example.mongodb.net/openchat
PORT=3000
```

## Install & Run

Backend

```bash
cd backend
npm install
# development (auto-restart)
npm run dev
# or production
npm start
```

Frontend

- Option 1 (quick): Open `frontend/index.html` in your browser.
- Option 2 (recommended): Serve the `frontend/` folder with a static server so Socket.IO loads from correct origin.

Note: `frontend/script.js` currently connects to `http://api.joinchat.app`. To test locally, change the socket URL to point at your backend, e.g. `http://localhost:3000`.

## How it works
- When a client connects the server loads saved messages from MongoDB and emits `load_old_messages` with the message list.
- Clients emit `send_message` with `{ username, message }`.
- Server saves messages (Mongoose) and broadcasts `receive_messages` to all clients.

Socket events

- `load_old_messages` (server → client): array of saved messages
- `send_message` (client → server): { username, message }
- `receive_messages` (server → clients): { username, message }

Data model

- `Message` (Mongoose)
  - `username`: String
  - `message`: String

## Development notes
- `backend/package.json` includes `nodemon` for local development and dependencies: `express`, `socket.io`, `mongoose`, `cors`, `dotenv`.
- `backend/index.js` is currently empty and not required by the app (server entrypoint is `server.js`).levelupdev

## Deploying
- Use a Node host (Heroku, Railway, Render, etc.) and configure `MONGO_URI` and `PORT` as environment variables.
- Ensure CORS and Socket.IO origins are configured appropriately for your production domain.

## Security & Improvements
- Validate and sanitize incoming messages to avoid XSS when rendering user input.
- Add timestamps and pagination for message history.
- Add user identities, rooms, or authentication for multi-room/private chats.
- Consider rate-limiting or moderation tools to prevent spam.

## License
This project is provided as-is. Add a license file if you intend to publish or share.

## Contact
If you'd like, I can help extend this README with usage screenshots, or add a Dockerfile and CI workflow.
