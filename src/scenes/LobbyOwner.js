import LobbyBase from "./LobbyBase";
import LobbyHandlerOwner from '../LobbyHandlerOwner'


export default class LobbyOwner extends LobbyBase {

    constructor() {
        super({ key: 'lobbyowner' });
    }

    preload() {
        this.load.image('startButton', 'assets/start.png');
        super.preload()
        this.socket = this.scene.settings.data.socket
        this.roomID = this.scene.settings.data.roomID
        this.playerName = this.scene.settings.data.name
    }

    create() {
        this.lobbyhandler = new LobbyHandlerOwner(this)
        super.create();

        // Start button
        var startButton = this.add.image(1000, 800, 'startButton').setScale(0.5);

        // Start button animation
        this.tweens.add({
            targets: startButton,
            scale: { from: 0.5, to: 0.55 },
            duration: 500,
            yoyo: true,
            repeat: -1
        });
        startButton.setInteractive({ useHandCursor: true });

        // Start game event
        startButton.on('pointerdown', () => {
            this.events.emit("start game")
        });
    }
}