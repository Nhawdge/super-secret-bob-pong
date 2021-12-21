import Render from "../Components/Render.js";
import Sprite from "../Components/Sprite.js";
import System from "./System.js";

export default class RenderSystem extends System {
  UpdateAll(entities) {
    var ctx = this.engine.canvas.getContext("2d");

    ctx.clearRect(0, 0, this.engine.canvas.width, this.engine.canvas.height);

    entities.forEach((entity) => {
      var sprite = entity.GetComponentOfType(Sprite);
      if (sprite) {
        ctx.drawImage(
          sprite.Image,
          sprite.X,
          sprite.Y,
          sprite.Width / 2,
          sprite.Height / 2
        );
      }

      var render = entity.GetComponentOfType(Render);
      if (render && !sprite) {
        ctx.fillStyle = render.Color;
        ctx.fillRect(render.X, render.Y, render.Width, render.Height);
      }
    });
  }
}
