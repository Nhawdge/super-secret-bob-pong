import System from "./System.js";
import Entity, { BuildAIPaddle, BuildBall, BuildPlayerPaddle } from "../Entity.js";
import Singleton from "../Components/Singleton.js";

export default class GenerationSystem extends System {
  constructor(engine) {
    super(engine);

    this.engine.Entities.push(BuildPlayerPaddle());
    this.engine.Entities.push(BuildAIPaddle());
    this.engine.Entities.push(BuildBall());

    var singleton = new Entity();
    singleton.Components.push(new Singleton(this.engine));

    this.engine.Entities.push(singleton);
  }

  UpdateAll(entities) {}
}
