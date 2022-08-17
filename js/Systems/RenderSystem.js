import Render from "../Components/Render.js";
import Singleton, { GameStates } from "../Components/Singleton.js";
import Sprite from "../Components/Sprite.js";
import System from "./System.js";

export default class RenderSystem extends System {
  UpdateAll(entities) {
    var singletonEntity = entities.find((x) => x.GetComponentOfType(Singleton));
    var singleton = singletonEntity.GetComponentOfType(Singleton);

    if (singleton.GameState == GameStates.Game) {
      var ctx = this.engine.canvas.getContext("2d");

      ctx.clearRect(0, 0, this.engine.canvas.width, this.engine.canvas.height);

      entities.forEach((entity) => {
        var sprite = entity.GetComponentOfType(Sprite);
        if (sprite) {
          // ctx.beginPath();
          // ctx.rect(sprite.X, sprite.Y, sprite.Width, sprite.Height);
          // ctx.stroke();
          ctx.drawImage(sprite.Image, sprite.X, sprite.Y, sprite.Width, sprite.Height);
        }

        var render = entity.GetComponentOfType(Render);
        if (render && !sprite) {
          ctx.fillStyle = render.Color;
          ctx.fillRect(render.X, render.Y, render.Width, render.Height);
        }
      });
    }
  }
}
