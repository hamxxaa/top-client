export default class LobbySetup extends Phaser.Scene {
    constructor(config) {
        super(config);
    }

    preload() {
        this.load.image('start', './assets/start.png');
    }

    create() {
        this.socket = this.scene.settings.data.socket;
        this.playerName = this.scene.settings.data.name;
        this.maxPlayerArray = [];
        this.roomName = "";
        this.maxPlayers = 2;
        this.roomNameTextObject = this.add.text(200, 150, '').setOrigin(0.5);

        this.enterNameTextObject = this.add.text(200, 100, "Click here to enter room's name").setOrigin(0.5).setInteractive({ useHandCursor: true })
        this.enterNameTextObject.on('pointerdown', () => {
            this.startButton.disableInteractive()
            const keyboardListener = (event) => {
                if ((event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) && this.roomName.length < 10) {
                    this.roomName += event.key;
                    this.roomNameTextObject.setText(this.roomName);

                }
                else if (event.keyCode === 8 && this.roomName.length > 0) {
                    this.roomName = this.roomName.slice(0, -1);
                    this.roomNameTextObject.setText(this.roomName);
                }
                else if (event.keyCode === 13 && this.roomName.length > 0) {
                    this.input.keyboard.off('keydown', keyboardListener);
                    this.startButton.setInteractive({ useHandCursor: true })
                }
            }
            this.input.keyboard.on('keydown', keyboardListener)
        })

        this.maxPlayerTextObject = this.add.text(200, 500, "choose maximum number of players").setOrigin(0.5)
        this.twoTextObject = this.add.text(200, 550, '2').setOrigin(0.5).setTint(0x00ff00).setInteractive({ useHandCursor: true }).on('pointerdown', () => { this.maxPlayers = 2; this.setColors(0) })
        this.maxPlayerArray.push(this.twoTextObject)
        this.threeTextObject = this.add.text(200, 600, '3').setOrigin(0.5).setTint(0xff0000).setInteractive({ useHandCursor: true }).on('pointerdown', () => { this.maxPlayers = 3; this.setColors(1) })
        this.maxPlayerArray.push(this.threeTextObject)
        this.fourTextObject = this.add.text(200, 650, '4').setOrigin(0.5).setTint(0xff0000).setInteractive({ useHandCursor: true }).on('pointerdown', () => { this.maxPlayers = 4; this.setColors(2) })
        this.maxPlayerArray.push(this.fourTextObject)
        this.fiveTextObject = this.add.text(200, 700, '5').setOrigin(0.5).setTint(0xff0000).setInteractive({ useHandCursor: true }).on('pointerdown', () => { this.maxPlayers = 5; this.setColors(3) })
        this.maxPlayerArray.push(this.fiveTextObject)
        this.sixTextObject = this.add.text(200, 750, '6').setOrigin(0.5).setTint(0xff0000).setInteractive({ useHandCursor: true }).on('pointerdown', () => { this.maxPlayers = 6; this.setColors(4) })
        this.maxPlayerArray.push(this.sixTextObject)

        this.startButton = this.add.image(1000, 500, 'start').setInteractive({ useHandCursor: true })

        this.startButton.on('pointerdown', () => {
            if (this.roomName.length > 0) {
                this.socket.emit("create room", { maxPlayers: this.maxPlayers, name: this.roomName })
            }
        })

        this.socket.on("owner can connect to lobby", () => {
            this.scene.start('lobbyowner', { socket: this.socket, name: this.playerName });
        }

        )
    }

    setColors(num) {
        this.maxPlayerArray.forEach(obj => {
            obj.setTint(0xff0000);
        });
        this.maxPlayerArray.at(num).setTint(0x00ff00)
    }

}