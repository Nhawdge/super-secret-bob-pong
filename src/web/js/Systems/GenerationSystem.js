import System from "./System.js";
import { BuildAIPaddle, BuildBall, BuildPlayerPaddle } from "../Entity.js";

export default class GenerationSystem extends System {
  constructor(engine) {
    super(engine);

    this.engine.Entities.push(BuildPlayerPaddle());
    this.engine.Entities.push(BuildAIPaddle());
    this.engine.Entities.push(BuildBall());
  }

  UpdateAll(entities) {}
}
