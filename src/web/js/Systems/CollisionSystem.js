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
      var paddles = entities.filter((x) => x.GetComponentOfType(Render));
      paddles.forEach((paddle) => {
        var ballSprite = ball.GetComponentOfType(Sprite);
        var collidedPaddleRender = paddle.GetComponentOfType(Render);

        if (this.CheckCollision(ballSprite, collidedPaddleRender)) {
          var ballAi = ball.GetComponentOfType(BallAI);
          singleton.PlaySound = "pong";
          var data = {
            ballcenterY: ballSprite.Y + ballSprite.Height / 2,
            ballcenterX: ballSprite.X + ballSprite.Width / 2,
            paddlecenterY: collidedPaddleRender.Y + collidedPaddleRender.Height / 2,
          };
          data.y = data.ballcenterY - data.paddlecenterY;
          data.x = data.ballcenterX - collidedPaddleRender.X;
          data.inRadians = Math.atan2(data.y, data.x);
          data.inDegrees = data.inRadians * ((180 / Math.PI) + 360) % 360;

          ballAi.Direction = data.inDegrees;
          ballAi.Speed = Math.min(ballAi.Speed + 0.5, 10);
          console.log(ballAi);
        }
      });
    }
  }

  CheckCollision(render1, render2) {
    var RectA = {
      left: render1.X,
      right: render1.X + render1.Width,
      top: render1.Y,
      bottom: render1.Y + render1.Height,
    };
    var RectB = {
      left: render2.X,
      right: render2.X + render2.Width,
      top: render2.Y,
      bottom: render2.Y + render2.Height,
    };

    var leftCheck = RectA.left < RectB.right;
    var rightCheck = RectA.right > RectB.left;
    var topCheck = RectA.top < RectB.bottom;
    var bottomCheck = RectA.bottom > RectB.top;

    return leftCheck && rightCheck && topCheck && bottomCheck;
  }
}
