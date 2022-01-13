import Singleton, { GameStates } from "../Components/Singleton.js";
import System from "./System.js";

export default class MenuSystem extends System {
  constructor(engine) {
    super(engine);
    document.addEventListener("click", this.Click.bind(this));
  }

  UpdateAll(entities) {
    var singletonEntity = entities.find((x) => x.GetComponentOfType(Singleton));
    var singleton = singletonEntity.GetComponentOfType(Singleton);

    if (singleton.GameState === GameStates.Menu) {
      this.DrawButton("Click anywhere to start");
    }
  }

  DrawButton(message) {
    var ctx = this.engine.canvas.getContext("2d");

    ctx.font = "48px consolas";
    const textWidth = ctx.measureText(message).width;

    var horizontalCenter = (this.engine.canvas.width - textWidth) / 2;
    var verticalCenter = this.engine.canvas.height / 2;

    ctx.rect(horizontalCenter - 10, verticalCenter - 50, textWidth + 20, 68);
    ctx.stroke();
    ctx.fillText(message, horizontalCenter, verticalCenter);
  }
  Click(event) {
    var singletonEntity = this.engine.Entities.find((x) => x.GetComponentOfType(Singleton));
    var singleton = singletonEntity.GetComponentOfType(Singleton);
    if (singleton.GameState === GameStates.Menu) {
      singleton.GameState = GameStates.Game;
      singleton.PlaySound = "wikakakakakawah";
    }
  }
}
