import Phaser from 'phaser'
// import LobbyHandler from '../LobbyHandler'

export default class LobbyBase extends Phaser.Scene {
    constructor(config) {
        super(config);  // Pass the config object to the Phaser.Scene
    }

    preload() {
        this.load.image('plus', 'assets/+.png');
        this.load.image('minus', 'assets/-.png');
    }

    create() {
        this.playersInLobby = {};
        this.playerNameTextObjects = [];
        this.selectedTeam = "spec"

        //draw the UI for managing stats 
        this.add.text(1700, 200, 'Stats', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5)

        this.add.text(1700, 250, 'Speed', {
            fontSize: '15px',
            fill: '#ffffff'
        }).setOrigin(0.5)

        this.add.text(1700, 350, 'Power', {
            fontSize: '15px',
            fill: '#ffffff'
        }).setOrigin(0.5)

        this.add.text(1700, 450, 'Size', {
            fontSize: '15px',
            fill: '#ffffff'
        }).setOrigin(0.5)

        this.points = 10;
        this.pointsText = this.add.text(1700, 150, "Points: " + this.points, {
            fontSize: '12px',
            fill: '#ffffff'
        }).setOrigin(0.5)

        this.speedBars = []
        this.speed = 0;

        for (let i = 0; i < 10; i++) {
            let speedBar = this.add.rectangle(1605 + i * 20, 300, 10, 20, 0xffffff).setOrigin(0.5);
            this.speedBars.push(speedBar)
        }

        var speedPlus = this.add.image(1835, 300, 'plus').setOrigin(0.5);
        speedPlus.setInteractive({ useHandCursor: true });
        speedPlus.on('pointerdown', () => {
            this.events.emit("update stats", 1, 2)
        })

        var speedMinus = this.add.image(1550, 300, 'minus').setOrigin(0.5);
        speedMinus.setInteractive({ useHandCursor: true });
        speedMinus.on('pointerdown', () => {
            this.events.emit("update stats", 1, 1)
        })

        this.powerBars = []
        this.power = 0;

        for (let i = 0; i < 10; i++) {
            let powerBar = this.add.rectangle(1605 + i * 20, 400, 10, 20, 0xffffff).setOrigin(0.5);
            this.powerBars.push(powerBar)
        }

        var powerPlus = this.add.image(1835, 400, 'plus').setOrigin(0.5);
        powerPlus.setInteractive({ useHandCursor: true });
        powerPlus.on('pointerdown', () => {
            this.events.emit("update stats", 2, 2)
        })

        var powerMinus = this.add.image(1550, 400, 'minus').setOrigin(0.5);
        powerMinus.setInteractive({ useHandCursor: true });
        powerMinus.on('pointerdown', () => {
            this.events.emit("update stats", 2, 1)
        })

        this.sizeBars = []
        this.size = 0;

        for (let i = 0; i < 10; i++) {
            let sizeBar = this.add.rectangle(1605 + i * 20, 500, 10, 20, 0xffffff).setOrigin(0.5);
            this.sizeBars.push(sizeBar)
        }

        var sizePlus = this.add.image(1835, 500, 'plus').setOrigin(0.5);
        sizePlus.setInteractive({ useHandCursor: true });
        sizePlus.on('pointerdown', () => {
            this.events.emit("update stats", 3, 2)
        })

        var sizeMinus = this.add.image(1550, 500, 'minus').setOrigin(0.5);
        sizeMinus.setInteractive({ useHandCursor: true });
        sizeMinus.on('pointerdown', () => {
            this.events.emit("update stats", 3, 1)
        })


        this.add.text(300, 200, 'Choose Your Team', {
            fontSize: '24px',
            fill: '#ffffff'
        }).setOrigin(0.5)



        // Team A button (Blue rectangle)
        var teamAButton = this.add.rectangle(200, 300, 100, 50, 0x0000ff);
        teamAButton.setInteractive({ useHandCursor: true });
        teamAButton.on('pointerdown', () => {
            this.selectedTeam = 'Team A';
            // Highlight the selected button
            teamAPulseTween.play()
            teamBPulseTween.pause();
            this.events.emit("update team", this.selectedTeam)

            // startButton.setInteractive({ useHandCursor: true });
        });

        // Team A button animation
        var teamAPulseTween = this.tweens.add({
            targets: teamAButton,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 200,
            yoyo: true,
            repeat: -1
        });
        teamAPulseTween.pause();


        // Team B button (Pink rectangle)
        var teamBButton = this.add.rectangle(400, 300, 100, 50, 0xff00ff);
        teamBButton.setInteractive({ useHandCursor: true });
        teamBButton.on('pointerdown', () => {
            this.selectedTeam = 'Team B';
            // Highlight the selected button
            teamBPulseTween.play()
            teamAPulseTween.pause();
            this.events.emit("update team", this.selectedTeam)

            // startButton.setInteractive({ useHandCursor: true });

        });

        //Team B button animation
        var teamBPulseTween = this.tweens.add({
            targets: teamBButton,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 200,
            yoyo: true,
            repeat: -1
        });
        teamBPulseTween.pause();

        //Change the state of the stat with info from server
        this.events.on("validate stats", (stat, change, points) => {
            switch (stat) {
                //speed
                case 1:
                    switch (change) {
                        //plus
                        case 1:
                            this.speed -= 1
                            this.points = points
                            this.pointsText.setText("Points: " + this.points)
                            this.speedBars[this.speed].setFillStyle(0xffffff)
                            break;
                        //minus
                        case 2:
                            this.speed += 1
                            this.points = points
                            this.pointsText.setText("Points: " + this.points)
                            this.speedBars[this.speed - 1].setFillStyle(0xff0000)
                            break;
                    }
                    break;
                //power
                case 2:
                    switch (change) {
                        //plus
                        case 1:
                            this.power -= 1
                            this.points = points
                            this.pointsText.setText("Points: " + this.points)
                            this.powerBars[this.power].setFillStyle(0xffffff)
                            break;
                        //minus
                        case 2:
                            this.power += 1
                            this.points = points
                            this.pointsText.setText("Points: " + this.points)
                            this.powerBars[this.power - 1].setFillStyle(0xff0000)
                            break;
                    }
                    break;
                //size
                case 3:
                    switch (change) {
                        //plus
                        case 1:
                            this.size -= 1
                            this.points = points
                            this.pointsText.setText("Points: " + this.points)
                            this.sizeBars[this.size].setFillStyle(0xffffff)
                            break;
                        //minus
                        case 2:
                            this.size += 1
                            this.points = points
                            this.pointsText.setText("Points: " + this.points)
                            this.sizeBars[this.size - 1].setFillStyle(0xff0000)
                            break;
                    }
                    break;
            }
        })
    }

    updateLobby() {
        var teamA = 0;
        var teamB = 0;
        var spec = 0;
        this.playerNameTextObjects.forEach(text => text.destroy());
        this.playerNameTextObjects = [];

        for (const [key] of Object.entries(this.playersInLobby)) {
            if (this.playersInLobby[key].team === 'Team A') {
                let textObject = this.add.text(200, 350 + (teamA * 50), this.playersInLobby[key].name, {
                    fontSize: '15px',
                    fill: '#0000ff'
                }).setOrigin(0.5)
                this.playerNameTextObjects.push(textObject)
                teamA++;
            } else if (this.playersInLobby[key].team === 'Team B') {
                let textObject = this.add.text(400, 350 + (teamB * 50), this.playersInLobby[key].name, {
                    fontSize: '15px',
                    fill: '#ff00ff'
                }).setOrigin(0.5)
                this.playerNameTextObjects.push(textObject)
                teamB++;
            } else {
                let textObject = this.add.text(600, 350 + (spec * 50), this.playersInLobby[key].name, {
                    fontSize: '15px',
                    fill: '#ffffff'
                }).setOrigin(0.5)
                this.playerNameTextObjects.push(textObject)
                spec++;
            }
        }
    }
}

