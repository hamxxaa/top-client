import Phaser from "phaser";

export default class PlayerInputs {
    constructor(scene, player) {
        this.player = player
        this.scene = scene
        this.cursors = scene.input.keyboard.createCursorKeys()
        this.totalInput = 0

        this.scene.input.keyboard.on('keydown-SPACE', () => {
            this.scene.socket.emit("space is down")
            this.player.reach.setAlpha(1)
        })
        this.scene.input.keyboard.on('keyup-SPACE', () => { this.player.reach.setAlpha(0.5) })

        this.scene.events.on("inputUpdate", () => { this.inputUpdate() })
    }



    inputUpdate() {
        //geting inputs and sending to server
        if (this.cursors.left.isDown) this.totalInput += 1;
        if (this.cursors.right.isDown) this.totalInput += 2;
        if (this.cursors.up.isDown) this.totalInput += 4;
        if (this.cursors.down.isDown) this.totalInput += 8;

        //sending inputs to server
        this.scene.socket.emit('player input', this.totalInput)
        this.totalInput = 0
    }
}