import Phaser from 'phaser'

import Player from '../classes/Player'
import Ball from '../classes/Ball'
import Direk from '../classes/Direk'

import SocketHandler from '../socketHandler'

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

        //sounds
        this.vurSounds = ['vur1', 'vur2', 'vur3', 'vur4', 'vur5', 'vur6', 'vur7', 'vur8'];
        this.direkSounds = ['direk1', 'direk2', 'direk3', 'direk4', 'direk5', 'direk6', 'direk7'];

        //object to keep players
        this.players = {};
        this.specs = [];

        //for handling socket processes
        this.SocketHandler = new SocketHandler(this);

        //drawing map
        this.goalline1 = this.matter.add.image(30, 250, 'goalline', null, { isStatic: true, isSensor: true }).setScale(0.5, 1)
        this.goalline2 = this.matter.add.image(770, 250, 'goalline', null, { isStatic: true, isSensor: true }).setScale(0.5, 1)
        this.direk = new Direk(this, 770, 200, 'top')
        this.direk2 = new Direk(this, 770, 300, 'top')
        this.direk3 = new Direk(this, 30, 200, 'top')
        this.direk4 = new Direk(this, 30, 300, 'top')
    }
    update() {
        //running every players update constantly
        for (const [key, player] of Object.entries(this.players)) {
            player.update()
        }
    }

}