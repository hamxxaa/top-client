import LobbyBase from "./LobbyBase";
import LobbyHandlerPlayer from '../LobbyHandlerPlayer'


export default class LobbyPlayer extends LobbyBase {

    constructor() {
        super({ key: 'lobbyplayer' });
    }

    preload() {
        this.load.image('readyButton', 'assets/ready.png');
        super.preload()
        this.socket = this.scene.settings.data.socket
        this.roomID = this.scene.settings.data.roomID
        this.playerName = this.scene.settings.data.name
    }

    create() {
        super.create();

        this.LobbyHandler = new LobbyHandlerPlayer(this)

        // Start button
        var readyButton = this.add.image(1000, 800, 'readyButton').setScale(0.5);

        // Start button animation
        this.tweens.add({
            targets: readyButton,
            scale: { from: 0.5, to: 0.55 },
            duration: 500,
            yoyo: true,
            repeat: -1
        });
        readyButton.setInteractive({ useHandCursor: true });

        // Start game event
        readyButton.on('pointerdown', () => {
            this.events.emit("player ready")
        });
    }
}