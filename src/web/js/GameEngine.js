import GenerationSystem from "./Systems/GenerationSystem.js";
import MenuSystem from "./Systems/MenuSystem.js";
import MovementSystem from "./Systems/MovementSystem.js";
import RenderSystem from "./Systems/RenderSystem.js";

export default class GameEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.Systems = [];
    this.Entities = [];
  }

  Start() {
    this.Systems.push(new MenuSystem(this));
    this.Systems.push(new GenerationSystem(this));
    this.Systems.push(new MovementSystem(this));

    this.Systems.push(new RenderSystem(this));
    setInterval(() => {
      this.Update();
    }, 1000 / 60);
  }

  Update() {
    this.Systems.forEach((system) => {
      system.UpdateAll(this.Entities);
    });
  }
}
