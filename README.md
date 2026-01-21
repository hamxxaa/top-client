# TOP - Multiplayer Game Client 🎮

A real-time multiplayer web-based simple soccer game built with Phaser.js and Socket.IO.  This is the client-side application that runs in the browser.

## 🎯 Overview

This is the client portion of a multiplayer physics-based game where players control tops in a competitive arena. The game features real-time synchronization with a dedicated game server, lobby system, and spectator mode.

## 🚀 Tech Stack

- **[Phaser 3.80.1](https://phaser.io/)** - HTML5 game framework
- **[Socket.IO Client 4.7.5](https://socket.io/)** - Real-time bidirectional communication
- **[Parcel](https://parceljs.org/)** - Fast, zero-configuration bundler
- **Matter.js** - 2D physics engine (integrated with Phaser)

## 📦 Installation

```bash
npm install
```

## 🎮 Running the Game

Start the development server:

```bash
npm start
```

This will: 
1. Clean the dist directory
2. Copy assets (images and audio)
3. Start Parcel dev server
4. Open the game at `http://localhost:1234`

**Note:** Make sure the server (`hamxxaa/top-server`) is running on `http://localhost:3000` before starting the client.

## 🏗️ Project Structure

```
src/
├── main.js                      # Entry point, game configuration
├── index.html                   # HTML template
├── defaults.js                  # Default values for game objects
├── RoomHandler.js              # Room creation and joining logic
├── socketHandler.js            # Main game socket event handlers
├── LobbyHandler.js             # Base lobby functionality
├── LobbyHandlerOwner.js        # Lobby owner-specific handlers
├── LobbyHandlerPlayer.js       # Player-specific lobby handlers
├── scenes/
│   ├── MainMenu.js             # Main menu scene
│   ├── LobbySetup.js           # Room creation/setup
│   ├── LobbyOwner.js           # Owner lobby view
│   ├── LobbyPlayer.js          # Player lobby view
│   ├── Game.js                 # Main game scene
│   └── PauseScreen.js          # Pause/goal celebration screen
├── classes/
│   ├── Player.js               # Player entity
│   ├── Ball.js                 # Ball entity
│   ├── ListenerRemover.js      # Socket listener cleanup
│   └── PlayerInputs.js         # Input handling
├── actions/
│   ├── moveActionX.js          # X-axis interpolation
│   ├── moveActionY.js          # Y-axis interpolation
│   ├── RotationAction.js       # Rotation interpolation
│   └── textAction.js           # Text update action
├── assets/                      # Game sprites and images
└── audio/                       # Sound effects
```

## 🎯 Features

### Game Modes
- **Player Mode**: Join a room and compete with customizable stats
- **Spectator Mode**: Watch ongoing games in real-time
- **Lobby System**: Create/join rooms with configurable player limits

### Gameplay Features
- Real-time multiplayer physics synchronization
- Player customization (speed, power, size stats)
- Team selection
- Goal detection and scoring
- Sound effects (shots, goals, post hits)
- Client-side prediction and interpolation

### UI Scenes
1. **Main Menu** - Entry point, player name input
2. **Room Browser** - View and join available rooms
3. **Lobby Setup** - Configure room settings (for host)
4. **Lobby** - Pre-game team selection and stat distribution
5. **Game** - Main gameplay with physics-based top control
6. **Pause Screen** - Shows between goals

## 🎮 Game Configuration

The game uses Matter.js physics with the following setup: 
- Canvas:  2000x1100
- Zero gravity (top-down gameplay)
- Debug mode enabled
- Background color: `0xdbaa48`

## 🔌 Socket Events

### Emitted Events
- `game started on client side`
- `spec connected`
- `join room`
- `create room`
- `refresh rooms`
- `player connected to lobby`
- `update stats`
- `update team`
- `start game` (owner only)
- `player ready`

### Received Events
- `rooms` - Available rooms list
- `draw players` - Initial game state
- `update clients` - Physics updates (60 FPS)
- `user disconnected` - Player left
- `pause` - Goal scored
- `update specs` - Spectator list
- `get lobby` - Initial lobby state
- `update lobby` - Lobby changes
- `game started` - Transition to game
- `validate stats` - Stat validation from server

## 🎨 Assets

The game includes:
- Team sprites (e.g., `galatasaray. png`, `top.png`)
- Goal line graphics
- Sound effects for: 
  - Goals (`goool.mp3`)
  - Shots (`vuroglumvur1-8.mp3`)
  - Post hits (`direek1-7.mp3`)

## 🔧 Development

### Scripts
- `npm run clean-dist` - Remove dist folder
- `npm run copy-image` - Copy image assets
- `npm run copy-audio` - Copy audio files
- `npm run init` - Clean and copy all assets
- `npm start` - Full build and dev server

## 🌐 Server Connection

The client connects to the server at `http://localhost:3000/` by default. Update the connection URL in `RoomHandler.js` if your server runs elsewhere: 

```javascript
scene.socket = io('http://localhost:3000/')
```

## 🐛 Troubleshooting

- **Can't connect to server**:  Ensure `top-server` is running on port 3000
- **Assets not loading**: Run `npm run init` to copy assets to dist
- **Black screen**: Check browser console for errors, ensure Phaser loaded correctly

## 📝 Notes

- This project is approximately 2 years old and may need dependency updates
- Debug mode is currently enabled in the physics configuration
- The game was designed for desktop browsers (2000x1100 canvas)

## 🤝 Related Repository

- **Server**: [hamxxaa/top-server](https://github.com/hamxxaa/top-server)
