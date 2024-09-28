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
        this.roomPlayerCountElements = [];
        this.playerName = null

        // Create Room Button
        var createRoomButton = this.add.image(1500, 400, 'create').setScale(0.5).setOrigin(0.5);
        createRoomButton.setInteractive({ useHandCursor: true });
        createRoomButton.on('pointerdown', () => {
            this.roomName = prompt('İSİM');
            this.roomName = this.roomName.slice(0, 15);
            this.roomInfo = {
                Name: this.roomName,
            }
            this.playerName = prompt('İSİM');
            this.playerName = this.playerName.slice(0, 15);
            if (this.roomName && this.playerName) {
                this.events.emit("create room")
            }
        });

        // Create refresh button
        var refreshButton = this.add.image(350, 400, 'refresh').setOrigin(0.5);
        refreshButton.setInteractive({ useHandCursor: true });
        refreshButton.on('pointerdown', () => {
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
        this.roomPlayerCountElements.forEach(text => text.destroy());
        this.roomPlayerCountElements = [];

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
                this.playerName = prompt('İSİM');
                this.playerName = this.playerName.slice(0, 15);
                if (this.playerName) {
                    this.joinRoom(room.id);
                }
            });

            let countText = this.add.text(1100,yPosition,room.online);

            if(room.playing){
                countText.setTint(0x00ff00);
            }
            else{
                countText.setTint(0xff0000);
            }

            // Add the room text to the list of elements
            this.roomTextElements.push(roomText);

            // Increment Y position for the next room
            yPosition += 50;
        }
    }



    joinRoom(roomID) {
        this.events.emit("join room", roomID);
        // Additional logic to transition to the game scene can be added here
    }
}