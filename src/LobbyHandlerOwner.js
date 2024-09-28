import LobbyHandler from "./LobbyHandler";

export default class LobbyHandlerClient extends LobbyHandler {
    constructor(scene) {
        super(scene)
        this.setupListeners(scene)

        scene.events.on("start game", () => { scene.socket.emit("start game")
            console.log("started");
            
         })
    }
}