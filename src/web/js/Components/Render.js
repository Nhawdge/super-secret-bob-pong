import Component from "./Component.js";

export default class Render extends Component {
  constructor(x, y, width, height, color) {
    super();

    this.X = x;
    this.Y = y;

    this.Width = width;
    this.Height = height;
    this.Color = color;
    this.CenterX = () => this.X + (this.Width / 2);
    this.CenterY = () => this.Y + (this.Height / 2);
  }
}
