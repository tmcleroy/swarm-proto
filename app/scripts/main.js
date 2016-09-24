import '../../lib/pixi.js';
import '../../lib/phaser.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'config';
import { randInt } from 'utils';
import playerImg from 'assets/player.png';
import diamondImg from 'assets/diamond.png';
import Player from 'Player';

var game = new Phaser.Game(
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  Phaser.AUTO,
  '',
  { preload, create, update }
);
window.game = game;

let frame = 0;
const frameRate = 60;
const updatesPerSecond = 2;
const players = [];

function preload () {
  game.load.image('player', playerImg);
  game.load.image('goal', diamondImg);
}

function create () {
  placePlayers();
  placeGoal();
}

function update (one, two, three) {
  if (frame % Math.round((frameRate / updatesPerSecond)) === 0) {
    _.invokeMap(players, 'update');
  }
  frame++;
}

function placePlayers () {
  const playerSize = 24;
  players.push(new Player(game.add.sprite(0, 0, 'player')));
  players.push(new Player(game.add.sprite(game.world.width - playerSize, game.world.height - playerSize, 'player')));
}

function placeGoal () {
  const goalSize = 32;
  game.add.sprite(randInt(goalSize, game.world.width) - goalSize, randInt(goalSize, game.world.height) - goalSize, 'goal');
}
