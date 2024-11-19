import Phaser from 'phaser';

export default class Ball extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, texture, radius) {
        // just the ball
        super(scene.matter.world, x, y, texture);
        this.imageSize = 25;
        scene.add.existing(this)
        this.radius = radius
        const ballBody = this.scene.Bodies.circle(0, 0, 25, { isSensor: true })
        this.setExistingBody(ballBody)
        this.setScale(this.radius / this.imageSize);
        this.setPosition(x, y)
    }
}