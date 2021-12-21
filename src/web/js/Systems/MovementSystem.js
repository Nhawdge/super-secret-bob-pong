import PaddleAI from "../Components/PaddleAI.js";
import BallAI from "../Components/BallAI.js";
import Controllable from "../Components/Controllable.js";
import Render from "../Components/Render.js";
import Sprite from "../Components/Sprite.js";
import System from "./System.js";

export default class MovementSystem extends System {
  constructor(engine) {
    super(engine);
    document.addEventListener("keydown", this.keyDown.bind(this));
    document.addEventListener("keyup", this.keyUp.bind(this));
    this.KeysPressed = new Set();
  }

  UpdateAll(entities) {
    var borders = {
      top: 0,
      bottom: this.engine.canvas.height,
      left: 0,
      right: this.engine.canvas.width,
    };

    entities.forEach((entity) => {
      var control = entity.GetComponentOfType(Controllable);
      var render = entity.GetComponentOfType(Render);
      if (control && render) {
        if (this.KeysPressed.has(control.Up)) {
          render.Y -= control.Speed;
        }
        if (this.KeysPressed.has(control.Down)) {
          render.Y += control.Speed;
        }
      }

      var ballAi = entity.GetComponentOfType(BallAI);
      if (ballAi) {
        var sprite = entity.GetComponentOfType(Sprite);

        var verticalVelocity =
          Math.sin((ballAi.Direction * Math.PI) / 180) * ballAi.Speed;
        var horizontalVelocity =
          Math.cos((ballAi.Direction * Math.PI) / 180) * ballAi.Speed;

        if (sprite.X + sprite.Width / 2 > borders.right) {
          verticalVelocity *= -1;
          console.log("too far right", sprite);
        }

        if (sprite.X < borders.left) {
          verticalVelocity *= -1;
          console.log("too far left");
        }

        if (sprite.Y < borders.top) {
          horizontalVelocity *= -1;
          console.log("too far up");
        }

        if (sprite.Y + sprite.Height / 2 > borders.bottom) {
          horizontalVelocity *= -1;
          console.log("too far down");
        }

        var newDirection =
          (Math.atan2(verticalVelocity, horizontalVelocity) * 180) / Math.PI;
        ballAi.Direction = newDirection;

        sprite.X += verticalVelocity;
        sprite.Y += horizontalVelocity;
      }

      var paddleAi = entity.GetComponentOfType(PaddleAI);
      if (paddleAi) {
        var ball = entities.find((e) => e.GetComponentOfType(BallAI));
        var ballRender = ball.GetComponentOfType(Sprite);
        var myRender = entity.GetComponentOfType(Render);

        if (myRender.Y > ballRender.Y) {
          myRender.Y -= paddleAi.Speed;
        }
        if (myRender.Y < ballRender.Y) {
          myRender.Y += paddleAi.Speed;
        }
      }
    });
    //this.KeysPressed = new Set();
  }

  keyDown(event) {
    this.KeysPressed.add(event.keyCode);
  }
  keyUp(event) {
    this.KeysPressed.delete(event.keyCode);
  }
}