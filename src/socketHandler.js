import io from 'socket.io-client';
import Player from './classes/Player'
import Ball from './classes/Ball'
import ListenerRemover from './classes/ListenerRemover';
import PlayerInputs from './classes/PlayerInputs'
import moveActionX from './actions/moveActionX';
import moveActionY from './actions/moveActionY';
import textAction from './actions/textAction';
import moveActionRotate from './actions/RotationAction';
import RotationAction from './actions/RotationAction';

export default class SocketHandler {
    constructor(scene) {
        global.listenerRemover.removeLobbyHandlerListeners()

        this.specConnected = null;

        scene.socket.emit("game started on client side")

        if (scene.team == "spec") {
            scene.socket.emit("spec connected")
        }

        //Draw the ball, scores and players to the scene
        scene.socket.on("draw players", (info, id, config) => {
            scene.drawInitialObjects(config)
            for (const [key] of Object.entries(info)) {
                scene.objects[key] = new Player(scene, info[key].x, info[key].y, "galatasaray", key, info[key].name, info[key].team, info[key].size)
            }
            if (id) {
                scene.inputGetter = new PlayerInputs(scene, scene.objects[id])
            }
        })


        //update clients according to servers calculated updates
        scene.socket.on("update clients", (updates) => {
            // console.log("update at: " + Date.now() + " length of the updates: " + Object.keys(updates).length);
            scene.actions = []
            for (const [key, player] of Object.entries(updates)) {
                if (updates[key].x) {
                    scene.actions.push(new moveActionX(scene.objects[key], updates[key].x))
                }
                if (updates[key].y) {
                    scene.actions.push(new moveActionY(scene.objects[key], updates[key].y))
                }
                if (updates[key].text) {
                    scene.actions.push(new textAction(scene.objects[key], updates[key].text))
                }
                if (updates[key].angle) {
                    scene.actions.push(new RotationAction(scene.objects[key], updates[key].angle))
                }
            }
        })

        //play sound when ball hit post
        // scene.socket.on("direk", () => {
        //     const soundToPlay = Math.floor(Math.random() * scene.direkSounds.length);
        //     scene.sound.play(scene.direkSounds[soundToPlay])
        // })

        //play sound when player shoot the ball
        // scene.socket.on("play shoot sounds on client", () => {
        //     const soundToPlay = Math.floor(Math.random() * scene.vurSounds.length);
        //     scene.sound.play(scene.vurSounds[soundToPlay])
        // })

        //destroy player when client disconnected
        scene.socket.on("user disconnected", ID => {
            scene.objects[ID].reach.destroy()
            scene.objects[ID].name.destroy()
            scene.objects[ID].destroy()
            delete scene.objects[ID]
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
                this.specConnected = scene.add.text(800, 35, "Spectators", {
                    fontSize: '18px',
                    fill: '#ffffff'
                }).setOrigin(0.5)
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