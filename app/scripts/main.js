require('../../lib/pixi.js');
require('../../lib/phaser.js');
import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'config';

var game = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.CANVAS, 'game', { create });

function create() {

    var text = "some text";
    var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

    var t = game.add.text(game.world.centerX-300, 0, text, style);

}
