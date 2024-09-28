import io from 'socket.io-client';

export default class LobbyHandler {
    constructor(scene) {
        this.scene = scene
    }

    setupListeners(scene) {

        scene.socket.emit("player connected to lobby", scene.playerName)

        scene.socket.on("get lobby", (info) => {
            for (const [key] of Object.entries(info)) {
                scene.playersInLobby[key] = { name: info[key].name, team: info[key].team }
            }
            scene.updateLobby()
        })

        

        scene.socket.on("update lobby", info => {
            if (scene.playersInLobby[info.id]) {
                scene.playersInLobby[info.id].name = info.name
                scene.playersInLobby[info.id].team = info.team
            }
            else {
                scene.playersInLobby[info.id] = { name: info.name, team: info.team }
            }
            scene.updateLobby()
        })

        scene.socket.on("game started", () => {
            scene.scene.start('game', { playerName: scene.playerName, selectedTeam: scene.selectedTeam, speed: scene.speed, power: scene.power, size: scene.size, socket: scene.socket, roomID: scene.roomID });
        })

        scene.socket.on("validate stats", (stat, change, points) => { scene.events.emit("validate stats", stat, change, points) })

        scene.events.on("update stats", (stat, change) => { scene.socket.emit("update stats", stat, change) })
        scene.events.on("update team", (selectedTeam) => { scene.socket.emit("update team", selectedTeam) })
    }
}