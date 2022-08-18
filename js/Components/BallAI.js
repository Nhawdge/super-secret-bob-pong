import Component from "./Component.js";

export default class BallAI extends Component {
  constructor() {
    super();
    this.Difficulty = 1;
    this.Speed = 3;
    var rand = Math.floor(Math.random() * 90);

    if (rand > 45) {
      this.Direction = rand + 225;
    } else {
      this.Direction = Math.random() + 45;
    }
    console.log(rand, this.Direction);
    this.BounceDelay = 0;
  }
}
