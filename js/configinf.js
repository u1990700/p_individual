import { PlayScene } from "./sceneinf.js";

var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    parent: '#game',
    scene: [PlayScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    }
}

var game = new Phaser.Game(config);


