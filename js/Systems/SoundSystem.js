import Singleton from "../Components/Singleton.js";
import System from "./System.js";

export default class RenderSystem extends System {
  constructor(engine) {
    super(engine);
    this.Audio = {
      pong: {
        a: new Audio("/assets/pong-a.wav"),
        b: new Audio("/assets/pong-b.wav"),
        c: new Audio("/assets/pong-c.wav"),
        d: new Audio("/assets/pong-d.wav"),
        e: new Audio("/assets/pong-e.wav"),
        f: new Audio("/assets/pong-f.wav"),
        g: new Audio("/assets/pong-g.wav"),
      },
      other: {
        buwawawump: new Audio("/assets/buwawawump.wav"),
        weeeeeaaahhhum: new Audio("/assets/weeeeeaaahhhum.wav"),
        wikakakakakawah: new Audio("/assets/wikakakakakawah.wav"),
        youwin: new Audio("/assets/you-win.wav"),
      },
    };
  }
  UpdateAll(entities) {
    var singletonEntity = entities.find((x) => x.GetComponentOfType(Singleton));
    var singleton = singletonEntity.GetComponentOfType(Singleton);

    if (singleton.PlaySound) {
      if (singleton.PlaySound === "pong") {
        var random = ["a", "b", "c", "d", "e", "f", "g"][Math.floor(Math.random() * 7)];
        this.Audio.pong[random].play();
      } else {
        this.Audio.other[singleton.PlaySound].play();
      }
      singleton.PlaySound = false;
    }
  }
}
