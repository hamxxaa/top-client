import io from 'socket.io-client';
import ListenerRemover from './classes/ListenerRemover';

export default class RoomHandler {
    constructor(scene) {
        scene.socket = io('http://localhost:3000/')

        //get initial rooms
        scene.socket.on("rooms", rooms => {
            scene.rooms = rooms;
            scene.updateRoomList()
        })

        scene.socket.on("player can connect to lobby", (roomID) => {
            scene.events.removeAllListeners()
            scene.scene.start('lobbyplayer', { socket: scene.socket, roomID: roomID, name: scene.playerName });
        })

        scene.socket.on("game already started", () => {
            scene.events.removeAllListeners()
            scene.socket.emit("spec info", scene.playerName)
            scene.scene.start('game', { playerName: scene.playerName, selectedTeam: 'spec', speed: 0, power: 0, size: 0, socket: scene.socket, roomID: scene.roomID });
        })

        scene.events.on("create room", () => {
            scene.events.removeAllListeners()
            // scene.scene.start('lobbyowner', { socket: scene.socket, roomID: roomID, name: scene.playerName });
            scene.scene.start('lobbysetup', { socket: scene.socket, name: scene.playerName })
        })

        scene.socket.on("room is full", () => {
            var alert = scene.add.text(1000, 500, 'room is full', { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5).setScale(10)
            scene.tweens.add({
                targets: alert,
                scaleX: 1.1,
                scaleY: 1.1,
                duration: 500,
                yoyo: true,
                repeat: -1
            });
            //go back to game scene after 3 seconds of animation
            scene.time.delayedCall(1000, () => {
                alert.destroy()
            });
            scene.createRoomButton.setInteractive({ useHandCursor: true })
            scene.refreshButton.setInteractive({ useHandCursor: true })
            scene.roomTextElements.forEach(obj => {
                obj.setInteractive({ useHandCursor: true })
            })
        })

        scene.events.on("refresh rooms", () => { scene.socket.emit("refresh rooms") })
        scene.events.on("join room", (roomID) => { scene.socket.emit("join room", roomID); })

        global.listenerRemover = new ListenerRemover(scene.socket)
    }
}