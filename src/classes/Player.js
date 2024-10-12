import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Matter.Image {
    constructor(scene, x, y, texturekey, key, name, team, size) {
        super(scene.matter.world, x, y, texturekey);

        scene.add.existing(this)

        //datas from constructor
        this.id = key
        this.team = team
        this.size = size + 20

        this.setScale(this.size / 20);

        //players shoot reach
        this.reach = scene.add.graphics()
        this.reach.setAlpha(0.5);
        this.reach.lineStyle(4, (team == 'Team B') ? 0xff00ff : 0x0000ff, 0.5)
        this.reach.strokeCircle(0, 0, this.size + 15)
        //players name on top of image
        this.name = scene.add.text(x, y - this.size - 10, name.slice(0, 2)).setOrigin(0.5).setScale(1.5).setResolution(3)


        //creating body and setting position
        const playerBody = this.scene.Bodies.circle(x, y, 1)
        this.setExistingBody(playerBody)
        this.setPosition(x, y)
        this.reach.setPosition(x, y)
        this.name.setPosition(x, y)

    }

    setcx(x) {
        this.setX(x)
        this.name.setX(x)
        this.reach.setX(x)
    }

    setcy(y) {
        this.setY(y)
        this.name.setY(y)
        this.reach.setY(y)
    }

    update() {
        //keeping reach and name with player
        // this.name.setPosition(this.x, this.y)
        // this.reach.setPosition(this.x, this.y)
    }
}