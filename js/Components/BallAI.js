import Component from "./Component.js";

export default class BallAI extends Component {
  constructor() {
    super();
    this.Difficulty = 1;
    this.Speed = 3;
    this.Direction = (Math.random() * 360) % 360;
    this.BounceDelay = 0;
  }
}
