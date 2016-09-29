import { randFloat } from 'utils';

export default class Player {

  constructor (sprite) {
    this.sprite = sprite;
    this.position = sprite.position;
    this.game = sprite.game;
    this.width = sprite.width;
    this.height = sprite.height;
    this.speed = randFloat(1.5, 2.2);

    this.behaviors = [
      {
        conditions: [
          () => false
        ],
        action: () => {
          this.setGoal('gather', 'wood');
        }
      },
      {
        conditions: [
          () => true
        ],
        action: () => {
          this.setGoal('gather', 'stone');
        }
      }
    ];
  }

  initialize () {
    this.siblings = _.filter(this.game.world.children, child => child.key === 'player' && this.sprite !== child);
  }

  update () {
    if (this.willCollideWithSiblings()) {
      this.moveAwayFromSiblings();
    }
    this.processBehavior();
    this.makeMove();
  }

  makeMove () {
    this.objective && this.move({ target: this.objective });
  }

  processBehavior () {
    _.each(this.behaviors, behavior => {
      _.every(behavior.conditions, condition => condition()) && behavior.action();
    });
  }

  setGoal (action, target) {
    const fxn = {
      gather: (target) => {
        this.objective = this.getSprite(target);
      }
    }[action];
    fxn && fxn(target);
  }

  getSprite (key) {
    return _.find(this.game.world.children, child => child.key === key);
  }

  move ({ target, direction = 1, speed = 1 }) {
    const xDiff = target.position.x - this.position.x;
    const yDiff = target.position.y - this.position.y;

    const distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
    const xDir = xDiff / distance;
    const yDir = yDiff / distance;

    this.position.x += (this.speed * speed) * xDir * direction;
    this.position.y += (this.speed * speed) * yDir * direction;
  }

  isAtGoal (fuzziness = 5) {
    const xDiff = Math.abs(this.goal.position.x - this.position.x);
    const yDiff = Math.abs(this.goal.position.y - this.position.y);
    return xDiff < this.width + fuzziness && yDiff < this.height + fuzziness;
  }

  willCollideWith ({ sprite, fuzziness = 3 }) {
    const xDiff = Math.abs(sprite.position.x - this.position.x);
    const yDiff = Math.abs(sprite.position.y - this.position.y);
    return (xDiff < this.width + fuzziness && yDiff < this.height + fuzziness);
  }

  willCollideWithSiblings () {
    let colliding = false;
    _.each(this.siblings, sibling => {
      colliding = colliding || this.willCollideWith({ sprite: sibling });
    });
    return colliding;
  }

  moveAwayFromSiblings () {
    _.each(this.siblings, sibling => {
      if (this.willCollideWith({ sprite: sibling })) {
        this.move({ direction: -1, target: sibling, speed: this.speed * 1.5 });
      }
    });
  }
}
