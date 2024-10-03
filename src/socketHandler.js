import io from 'socket.io-client';
import Player from './classes/Player'
import Ball from './classes/Ball'
import ListenerRemover from './classes/ListenerRemover';

export default class SocketHandler {
    constructor(scene) {
        global.listenerRemover.removeLobbyHandlerListeners()

        this.specConnected = false;

        scene.socket.emit("game started on client side")

        if (scene.team == "spec") {
            scene.socket.emit("spec connected")
        }

        //Draw the ball, scores and players to the scene
        scene.socket.on("draw players", (info) => {
            scene.players['ball'] = new Ball(scene, 300, 300, "toptop")
            scene.score1 = 0
            scene.score2 = 0
            scene.scoreText1 = scene.add.text(50, 50, scene.score1, { fontSize: '32px', fill: '#ffffff' })
            scene.scoreText2 = scene.add.text(700, 50, scene.score2, { fontSize: '32px', fill: '#ffffff' })
            for (const [key] of Object.entries(info)) {
                scene.players[key] = new Player(scene, info[key].x, info[key].y, "galatasaray", key, info[key].name, info[key].team, info[key].size)
            }
        })


        //update clients according to servers calculated updates
        scene.socket.on("update clients", (updates) => {
            for (const [key, player] of Object.entries(updates)) {
                if (updates[key].x) {
                    scene.players[key].setX(updates[key].x)
                }
                if (updates[key].y) {
                    scene.players[key].setY(updates[key].y)
                }
            }
        })

        //play sound when ball hit post
        scene.socket.on("direk", () => {
            const soundToPlay = Math.floor(Math.random() * scene.direkSounds.length);
            scene.sound.play(scene.direkSounds[soundToPlay])
        })

        //update scores on goal
        scene.socket.on("update score1", score => {
            scene.score1 = score
            scene.scoreText1.setText(scene.score1)
        })
        scene.socket.on("update score2", score => {
            scene.score2 = score
            scene.scoreText2.setText(scene.score2)
        })

        //play sound when player shoot the ball
        scene.socket.on("play shoot sounds on client", () => {
            const soundToPlay = Math.floor(Math.random() * scene.vurSounds.length);
            scene.sound.play(scene.vurSounds[soundToPlay])
        })

        //destroy player when client disconnected
        scene.socket.on("user disconnected", ID => {
            scene.players[ID].reach.destroy()
            scene.players[ID].name.destroy()
            scene.players[ID].destroy()
            delete scene.players[ID]
        })

        //go to pause scene after a goal for a few seconds 
        scene.socket.on("pause", () => {
            scene.time.delayedCall(1, () => {
                scene.scene.manager.pause("game")
                scene.scene.manager.start("pause")
            })
        })

        // Update spectators on the game
        scene.socket.on("update specs", (specs) => {

            if (!this.specConnected) {
                scene.add.text(800, 35, "Spectators", {
                    fontSize: '18px',
                    fill: '#ffffff'
                }).setOrigin(0.5)
                this.specConnected = true
            }

            scene.specs.forEach(element => {
                element.destroy
            });
            scene.specs = [];
            for (const [key] of Object.entries(specs)) {
                let spec = scene.add.text(800, 50 + (Object.keys(scene.specs).length * 20), specs[key].name, {
                    fontSize: '15px',
                    fill: '#ffffff'
                }).setOrigin(0.5)

                scene.specs.push(spec);
            }
        })
    }
}