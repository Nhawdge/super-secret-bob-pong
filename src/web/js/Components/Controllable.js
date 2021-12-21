import Component from "./Component.js";

export default class Controllable extends Component {
  constructor() {
    super();
    this.Left = 65;
    this.Right = 68;
    this.Up = 87;
    this.Down = 83;
    
    this.Speed = 3;
  }
}
