import System from "./System.js";
import Entity, { BuildAIPaddle, BuildBall, BuildPlayerPaddle } from "../Entity.js";
import Singleton, { GameStates } from "../Components/Singleton.js";
import BallAI from "../Components/BallAI.js";

export default class GenerationSystem extends System {
  constructor(engine) {
    super(engine);

    this.engine.Entities.push(BuildPlayerPaddle());
    this.engine.Entities.push(BuildAIPaddle());
    this.engine.Entities.push(BuildBall());

    var singleton = new Entity();
    singleton.Components.push(new Singleton(this.engine));

    this.engine.Entities.push(singleton);
    this.IsResetting = false;
  }

  UpdateAll(entities) {
    var singletonEntity = entities.find((x) => x.GetComponentOfType(Singleton));
    var singleton = singletonEntity.GetComponentOfType(Singleton);

    if (singleton.GameState == GameStates.Goal) {
      this.IsResetting = true;
      var ball = entities.findIndex((x) => x.GetComponentOfType(BallAI));
      //this.engine.Entities.splice(ball, 1);
      if (this.IsResetting) {
        this.IsResetting = false;

        setTimeout(() => {
          this.engine.Entities.push(BuildBall());
          singleton.GameState = "Game";
        }, 1000);
      }
    }
  }
}
