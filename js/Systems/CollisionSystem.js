import System from "./System.js";
import Render from "../Components/Render.js";
import Sprite from "../Components/Sprite.js";
import Singleton, { GameStates } from "../Components/Singleton.js";
import BallAI from "../Components/BallAI.js";

export default class CollisionSystem extends System {
  UpdateAll(entities) {
    var singletonEntity = entities.find((x) => x.GetComponentOfType(Singleton));
    var singleton = singletonEntity.GetComponentOfType(Singleton);

    if (singleton.GameState === GameStates.Game) {
      var ball = entities.find((x) => x.GetComponentOfType(BallAI));
      if (!ball) {
        return;
      }
      var ballAi = ball.GetComponentOfType(BallAI);

      var paddles = entities.filter((x) => x.GetComponentOfType(Render));

      var ballSprite = ball?.GetComponentOfType(Sprite);
      var ctx = this.engine.canvas.getContext("2d");

      paddles.forEach((paddle) => {
        if (!ball) {
          return;
        }
        var paddleRender = paddle.GetComponentOfType(Render);

        var ballPos = { X: ballSprite.X + ballSprite.Width / 2, Y: ballSprite.Y + ballSprite.Height / 2 };
        var xMiddle = false;
        var yMiddle = false;
        var nearestPoint = { x: 0, y: 0 };

        if (ballPos.X < paddleRender.X) {
          nearestPoint.X = paddleRender.X;
        } else if (ballPos.X > paddleRender.X + paddleRender.Width) {
          nearestPoint.X = paddleRender.X + paddleRender.Width;
        } else {
          nearestPoint.X = ballPos.X;
          xMiddle = true;
        }
        if (ballPos.Y < paddleRender.Y) {
          nearestPoint.Y = paddleRender.Y;
        } else if (ballPos.Y > paddleRender.Y + paddleRender.Height) {
          nearestPoint.Y = paddleRender.Y + paddleRender.Height;
        } else {
          nearestPoint.Y = ballPos.Y;
          yMiddle = true;
        }
        // ctx.arc(nearestPoint.X, nearestPoint.Y, 10, 0, Math.PI * 2);
        // ctx.fillStyle = "black";
        // ctx.fill();

        // ctx.arc(ballPos.X, ballPos.Y, 10, 0, Math.PI * 2);
        // ctx.fillStyle = "green";
        // ctx.fill();
        //if (xMiddle && yMiddle) {
        var xDistance = Math.abs(ballPos.X - nearestPoint.X);
        var yDistance = Math.abs(ballPos.Y - nearestPoint.Y);
        var distanceDiff = xDistance + yDistance;
        if (distanceDiff < 50) {
          if (ballAi.BounceDelay <= 0) {
            var currentDirection = ballAi.Direction;
            var modifier = 360 - currentDirection;

            ballAi.Direction = modifier % 360;
            singleton.PlaySound = "pong";
            ballAi.BounceDelay = 100;
            ballAi.Speed += 0.5;
          }
        }
      });
      ballAi.BounceDelay--;
    }
  }
}
