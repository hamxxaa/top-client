import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, texture) {
        //just the ball
        super(scene.matter.world, x, y, texture);
        scene.add.existing(this)
        this.radius = 8.3 * 9 / 5
        this.setScale(this.radius * 2 / this.width, this.radius * 2 / this.height);
        const ballBody = this.scene.Bodies.circle(300, 300, 9)
        this.setExistingBody(ballBody)
        this.setPosition(x, y)
    }

    setcx(x) {
        this.setX(x)
    }
    setcy(y) {
        this.setY(y)
    }
}