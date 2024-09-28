import Phaser from 'phaser'

export default class PauseScreen extends Phaser.Scene {

    create() {
        //goal animation
        this.goal = this.add.text(1000, 500, 'GOLL', { fontSize: '32px', fill: '#ffffff' }).setOrigin(0.5).setScale(10)
        this.tweens.add({
            targets: this.goal,
            scaleX: 1.1,
            scaleY: 1.1,
            duration: 200,
            yoyo: true,
            repeat: -1
        });
        //go back to game scene after 3 seconds of animation
        this.time.delayedCall(3000, () => {
            this.scene.manager.resume("game")
            this.scene.manager.stop("pause")
        });
    }
}
