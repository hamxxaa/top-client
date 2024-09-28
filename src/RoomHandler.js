import io from 'socket.io-client';

export default class RoomHandler {
    constructor(scene) {
        scene.socket = io('http://localhost:3000/')

        //
        scene.socket.on("rooms", rooms => {
            scene.rooms = rooms;
            scene.updateRoomList()
        })

        scene.socket.on("owner can connect to lobby", (roomID) => {
            // scene.socket.removeAllListeners();
            scene.scene.start('lobbyowner', { socket: scene.socket, roomID: roomID, name: scene.playerName });
        })

        scene.socket.on("player can connect to lobby", (roomID) => {
            // scene.socket.removeAllListeners();
            scene.scene.start('lobbyplayer', { socket: scene.socket, roomID: roomID, name: scene.playerName });
        })

        scene.socket.on("game already started", () => {
            scene.socket.emit("spec info", scene.playerName)
            scene.scene.start('game', { playerName: scene.playerName, selectedTeam: 'spec', speed: 0, power: 0, size: 0, socket: scene.socket, roomID: scene.roomID });
        })

        scene.events.on("create room", () => { scene.socket.emit("create room", scene.roomInfo); })
        scene.events.on("refresh rooms", () => { scene.socket.emit("refresh rooms") })
        scene.events.on("join room", (roomID) => { scene.socket.emit("join room", roomID); })
    }
}