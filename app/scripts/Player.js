import { randInt } from 'utils';

export default class Player {
  constructor (sprite) {
    this.position = sprite.position;
    this.game = sprite.game;
    this.width = sprite.width;
    this.height = sprite.height;
  }

  update () {
    const children = this.game.world.children;
    let xVel = 0;
    let yVel = 0;

    const players = _.filter(children, child => child.key === 'player');
    const goal = _.find(children, child => child.key === 'goal');

    xVel = goal.position.x < this.position.x ? -1 : 1;
    yVel = goal.position.y < this.position.y ? -1 : 1;

    this.position.x += this.width * xVel;
    this.position.y += this.height * yVel;
  }
}
