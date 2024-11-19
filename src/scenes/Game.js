import Phaser from 'phaser'

import Player from '../classes/Player'
import Ball from '../classes/Ball'
import SocketHandler from '../socketHandler'
import defaults from '../defaults';

export default class Game extends Phaser.Scene {

    Bodies = Phaser.Physics.Matter.Matter.Bodies;

    preload() {
        this.load.image('toptop', 'assets/bententop.png');
        this.load.image('top', 'assets/top.png');
        this.load.image('galatasaray', 'assets/galatasaray.png');
        this.load.image('goalline', 'assets/cizgi.png')
        this.load.audio('gol', 'audio/goool.mp3')
        this.load.audio('vur1', 'audio/vuroglumvur1.mp3')
        this.load.audio('vur2', 'audio/vuroglumvur2.mp3')
        this.load.audio('vur3', 'audio/vuroglumvur3.mp3')
        this.load.audio('vur4', 'audio/vuroglumvur4.mp3')
        this.load.audio('vur5', 'audio/vuroglum5.mp3')
        this.load.audio('vur6', 'audio/vuroglum6.mp3')
        this.load.audio('vur7', 'audio/vuroglum7.mp3')
        this.load.audio('vur8', 'audio/vuroglum8.mp3')
        this.load.audio('direk1', 'audio/direek1.mp3')
        this.load.audio('direk2', 'audio/direek2.mp3')
        this.load.audio('direk3', 'audio/direek3.mp3')
        this.load.audio('direk4', 'audio/direek4.mp3')
        this.load.audio('direk5', 'audio/direek5.mp3')
        this.load.audio('direk6', 'audio/direek6.mp3')
        this.load.audio('direk7', 'audio/direek7.mp3')

    }
    create() {

        //data from title screen
        this.name = this.scene.settings.data.playerName
        this.team = this.scene.settings.data.selectedTeam
        this.socket = this.scene.settings.data.socket
        this.roomID = this.scene.settings.data.roomID
        this.speed = this.scene.settings.data.speed
        this.power = this.scene.settings.data.power
        this.size = this.scene.settings.data.size

        this.defaults = defaults

        //sounds
        this.vurSounds = ['vur1', 'vur2', 'vur3', 'vur4', 'vur5', 'vur6', 'vur7', 'vur8'];
        this.direkSounds = ['direk1', 'direk2', 'direk3', 'direk4', 'direk5', 'direk6', 'direk7'];

        //object to keep players
        this.objects = {};
        this.specs = [];
        this.actions = [];

        //for handling socket processes
        this.SocketHandler = new SocketHandler(this);
    }
    update() {
        this.actions.forEach(action => {
            action.run()
            // console.log(action.date);
        });
        this.actions = []

        //getting and sending client inputs
        this.events.emit("inputUpdate")

    }

    drawInitialObjects(config) {
        config.ball.forEach(ball => {
            const style = Object.assign({}, this.defaults.ballDefaults, ball)
            const { x, y, radius, id } = style
            this.objects[id] = new Ball(this, x, y, 'toptop', radius)
        });

        config.score.forEach(score => {
            const style = Object.assign({}, this.defaults.textDefaults, score.style)
            this.objects[score.id] = this.add.text(score.x, score.y, 0, style)
        })

        config.goalline.forEach(goalline => {
            const style = Object.assign({}, this.defaults.goallineDefaults, goalline)
            const { x, y, height, width, goalareaoffset, fillColor, angle, posts, id } = style
            this.matter.add.rectangle(style.x + Math.cos(angle) * goalareaoffset, y + Math.sin(angle) * goalareaoffset, width, height, { isStatic: true, isSensor: true, angle: angle })
            this.objects[id] = this.add.rectangle(x, y, width, height, fillColor,).setAngle(Phaser.Math.RadToDeg(angle))
            this.objects[id + 'a'] = this.add.circle(x - height / 2 * Math.sin(angle), y + height / 2 * Math.cos(angle), posts.radius, posts.fillColor)
            this.objects[id + 'b'] = this.add.circle(x + height / 2 * Math.sin(angle), y - height / 2 * Math.cos(angle), posts.radius, posts.fillColor)
        });

        config.obstacles.forEach(obstacle => {
            this.objects[obstacle.id] = this.createShape(obstacle.config);

        })
    }

    createShape(config) {
        const style = Object.assign({}, config, this.defaults.obstacleDefaults)
        const { type, x, y, fillColor } = style;

        let shape;

        switch (type) {
            case 'rectangle':
                shape = this.add.rectangle(x, y, style.width, style.height, fillColor);
                break;

            case 'circle':
                shape = this.add.circle(x, y, style.radius, fillColor);
                break;

            case 'polygon':
                shape = this.add.polygon(x, y, style.path, fillColor);
                break;

            default:
                throw new Error(`Unknown shape type: ${type}`);
        }
        return shape;
    }

}