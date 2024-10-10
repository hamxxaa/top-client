import Phaser, { Physics } from 'phaser'
import LobbyBase from './scenes/LobbyBase'
import Game from './scenes/Game'
import PauseScreen from './scenes/PauseScreen'
import MainMenu from './scenes/MainMenu'
import LobbyOwner from './scenes/LobbyOwner'
import LobbyPlayer from './scenes/LobbyPlayer'
import LobbySetup from './scenes/LobbySetup'

const config = {
    width: 2000,
    height: 1100,
    type: Phaser.AUTO,
    backgroundColor: '0xdbaa48',
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {
                y: 0,
                x: 0
            }
        }
    }
}

const game = new Phaser.Game(config)

//adding scenes
game.scene.add('pause', PauseScreen)
game.scene.add('mainmenu', MainMenu)
game.scene.add('game', Game)
game.scene.add('lobbyplayer', LobbyPlayer)
game.scene.add('lobbyowener', LobbyOwner)
game.scene.add('lobbysetup', LobbySetup)
game.scene.start('mainmenu')


