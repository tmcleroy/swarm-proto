import '../../lib/pixi.js';
import '../../lib/phaser.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, STAGE_COLOR } from 'config';
import { randInt } from 'utils';
import playerImg from 'assets/player.png';
import diamondImg from 'assets/diamond.png';
import dirtImg from 'assets/dirt.png';
import woodImg from 'assets/wood.png';
import stoneImg from 'assets/stone.png';
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
const numPlayers = 10;
const players = [];

function preload () {
  game.load.image('player', playerImg);
  game.load.image('goal', diamondImg);
  game.load.image('dirt', dirtImg);
  game.load.image('wood', woodImg);
  game.load.image('stone', stoneImg);
  game.stage.backgroundColor = STAGE_COLOR;
}

function create () {
  _.times(4, () => placeResource('dirt'));
  _.times(4, () => placeResource('wood'));
  _.times(4, () => placeResource('stone'));
  placePlayers();
}

function update (one, two, three) {
  if (frame % Math.round((frameRate / updatesPerSecond)) === 0) {
    _.invokeMap(players, 'update');
  }
  frame++;
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

function placeResource (name) {
  const resourceSize = 32;
  game.add.sprite(randInt(resourceSize, game.world.width) - resourceSize, randInt(resourceSize, game.world.height) - resourceSize, name);
}
