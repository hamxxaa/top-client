import LobbyHandler from "./LobbyHandler";

export default class LobbyHandlerClient extends LobbyHandler {
    constructor(scene) {
        super(scene)
        this.setupListeners(scene)

        scene.events.on("player ready", () => scene.socket.emit("player ready"))
    }
}