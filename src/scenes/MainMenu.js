import io from 'socket.io-client';
import Phaser from "phaser";
import RoomHandler from '../RoomHandler'

export default class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainmenu' });
    }

    preload() {
        this.load.image('create', 'assets/createroom.png');
        this.load.image('refresh', 'assets/refresh.png');
    }

    create() {
        //roomhandler object to handle room interactions
        this.RoomHandler = new RoomHandler(this);

        //objects to keep rooms and interactive texts of rooms
        this.rooms = {};
        this.roomTextElements = [];
        this.countTextElements = [];
        this.playerName = ""


        // Create Room Button
        this.createRoomButton = this.add.image(1500, 400, 'create').setScale(0.5).setOrigin(0.5);
        this.createRoomButton.setInteractive({ useHandCursor: true });
        this.createRoomButton.on('pointerdown', () => {
            this.createRoomButton.disableInteractive()
            this.refreshButton.disableInteractive()
            const askName = this.add.text(200, 200, "enter your name").setOrigin(0.5)
            this.playerNameTextObject = this.add.text(100, 100, '').setOrigin(0.5);
            const keyboardListener = (event) => {
                if ((event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) && this.playerName.length < 10) {
                    this.playerName += event.key;
                    this.playerNameTextObject.setText(this.playerName);

                }
                else if (event.keyCode === 8 && this.playerName.length > 0) {
                    this.playerName = this.playerName.slice(0, -1);
                    this.playerNameTextObject.setText(this.playerName);
                }
                else if (event.keyCode === 13 && this.playerName.length > 0) {
                    askName.destroy();
                    this.playerNameTextObject.destroy();
                    this.input.keyboard.off('keydown', keyboardListener);
                    this.events.emit("create room")
                }
            }

            this.input.keyboard.on('keydown', keyboardListener)
        });

        // Create refresh button
        this.refreshButton = this.add.image(350, 400, 'refresh').setOrigin(0.5);
        this.refreshButton.setInteractive({ useHandCursor: true });
        this.refreshButton.on('pointerdown', () => {
            this.events.emit("refresh rooms")
        })

        this.add.text(1000, 200, 'Game Rooms', {
            fontSize: '24px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.updateRoomList();
    }

    updateRoomList() {
        // Clear previous room text elements
        this.roomTextElements.forEach(text => text.destroy());
        this.roomTextElements = [];
        this.countTextElements.forEach(text => text.destroy());
        this.countTextElements = [];

        // Starting Y position for the first room
        let yPosition = 250;

        // Display each room as an interactive text
        for (let roomKey in this.rooms) {
            let room = this.rooms[roomKey];

            // Create text for the room name
            let roomText = this.add.text(1000, yPosition, room.name, {
                fontSize: '24px',
                fill: '#00ffff'
            }).setOrigin(0.5).setScale(2);

            // Set a high depth to ensure visibility
            roomText.setDepth(1000);

            // Make the text interactive

            roomText.setInteractive({ useHandCursor: true });
            roomText.on('pointerdown', () => {
                this.createRoomButton.disableInteractive()
                this.refreshButton.disableInteractive()
                this.roomTextElements.forEach(obj => {
                    obj.disableInteractive()
                })
                const askName = this.add.text(200, 200, "enter your name").setOrigin(0.5)
                this.playerNameTextObject = this.add.text(100, 100, '').setOrigin(0.5);
                const keyboardListener = (event) => {
                    if ((event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode <= 90)) && this.playerName.length < 10) {
                        this.playerName += event.key;
                        this.playerNameTextObject.setText(this.playerName);

                    }
                    else if (event.keyCode === 8 && this.playerName.length > 0) {
                        this.playerName = this.playerName.slice(0, -1);
                        this.playerNameTextObject.setText(this.playerName);
                    }
                    else if (event.keyCode === 13 && this.playerName.length > 0) {
                        askName.destroy();
                        this.playerNameTextObject.destroy();
                        this.input.keyboard.off('keydown', keyboardListener);
                        this.joinRoom(room.id);
                    }
                }
                this.input.keyboard.on('keydown', keyboardListener)
            });

            let countText = this.add.text(1100, yPosition, room.online + "/" + room.maxPlayers);

            if (room.playing) {
                countText.setTint(0xff0000);
            }
            else {
                countText.setTint(0x00ff00);
            }


            // Add the room text to the list of elements
            this.roomTextElements.push(roomText);
            this.countTextElements.push(countText);

            // Increment Y position for the next room
            yPosition += 50;
        }
    }



    joinRoom(roomID) {
        this.events.emit("join room", roomID);
        // Additional logic to transition to the game scene can be added here
    }
}