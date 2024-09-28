export default class Player extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, texture) {
        //just an static object for creating post
        super(scene.matter.world, x, y, texture);
        scene.add.existing(this)
        this.radius = 8.3
        this.setScale(this.radius * 2 / this.width, this.radius * 2 / this.height);
        const direkBody = this.scene.Bodies.circle(600, 200, 5, { isStatic: true })
        this.setExistingBody(direkBody)
        this.setPosition(x, y)
    }
}