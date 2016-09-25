import '../../lib/pixi.js';
import '../../lib/phaser.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, STAGE_COLOR } from 'config';
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
const updatesPerSecond = 60;
const numPlayers = 40;
let goal = null;
const goalSize = 32;
const players = [];

function preload () {
  game.load.image('player', playerImg);
  game.load.image('goal', diamondImg);
  game.stage.backgroundColor = STAGE_COLOR;
}

function create () {
  placeGoal();
  placePlayers();
}

function update (one, two, three) {
  if (frame % Math.round((frameRate / updatesPerSecond)) === 0) {
    _.invokeMap(players, 'update');
  }
  if (frame % 480 === 0) {
    moveGoal();
  }
  frame++;
}

function moveGoal () {
  goal.position.x = randInt(goalSize, game.world.width) - goalSize;
  goal.position.y = randInt(goalSize, game.world.height) - goalSize;
}

function placePlayers () {
  const playerSize = 24;
  _.times(numPlayers, () => {
    players.push(new Player(game.add.sprite(
      randInt(playerSize, game.world.width) - playerSize,
      randInt(playerSize, game.world.height) - playerSize,
      'player'
    )));
  });
  _.invokeMap(players, 'initialize');
}

function placeGoal () {
  goal = game.add.sprite(randInt(goalSize, game.world.width) - goalSize, randInt(goalSize, game.world.height) - goalSize, 'goal');
}
