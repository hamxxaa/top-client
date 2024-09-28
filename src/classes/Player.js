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


        //cursors for input
        this.cursors = scene.input.keyboard.createCursorKeys()
    }

    update() {
        //geting inputs and sending to server
        if (this.cursors.left.isDown) this.scene.socket.emit('left is down');
        if (this.cursors.right.isDown) this.scene.socket.emit('right is down');
        if (this.cursors.up.isDown) this.scene.socket.emit('up is down');
        if (this.cursors.down.isDown) this.scene.socket.emit('down is down');
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.scene.socket.emit("shoot")
            //making reach brigther when shooting
            this.reach.setAlpha(1)
        }
        //turning reach to normal after shoot
        if (Phaser.Input.Keyboard.JustUp(this.cursors.space)) this.reach.setAlpha(0.5)

        //keeping reach and name with player
        this.name.setPosition(this.x, this.y)
        this.reach.setPosition(this.x, this.y)
    }
}