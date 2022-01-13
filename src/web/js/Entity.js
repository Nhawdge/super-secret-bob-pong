import Controllable from "./Components/Controllable.js";
import Render from "./Components/Render.js";
import Score from "./Components/Score.js";
import AI from "./Components/PaddleAI.js";
import BallAI from "./Components/BallAI.js";
import Sprite from "./Components/Sprite.js";

export default class Entity {
  constructor() {
    this.id = Math.random().toString().substring(2);

    this.Components = [];
  }
  GetComponentOfType(type) {
    return this.Components.find((component) => component instanceof type);
  }
}

export function BuildPlayerPaddle() {
  var paddle = new Entity();
  paddle.Components.push(new Render(20, 0, 20, 100, "black"));
  paddle.Components.push(new Controllable());
  paddle.Components.push(new Score());
  return paddle;
}

export function BuildAIPaddle() {
  var paddle = new Entity();

  var render = new Render(0, 0, 20, 100, "black");
  render.X = document.querySelector("canvas").width - 30;
  render.Y = 10;

  paddle.Components.push(render);
  paddle.Components.push(new AI("paddle"));
  paddle.Components.push(new Score());

  return paddle;
}

export function BuildBall() {
  var ball = new Entity();

  var sprite = new Sprite("bob.png");
  sprite.X = document.querySelector("canvas").width / 2;
  sprite.Y = document.querySelector("canvas").height / 2;
  ball.Components.push(sprite);
  ball.Components.push(new BallAI("ball"));

  return ball;
}
