import Component from "./Component.js";

export default class Sprite extends Component {
  constructor(img) {
    super();
    var url = `/images/${img}`;

    this.Image = document.createElement("img");

    this.Image.onload = (e) => {
      this.Width = e.target.width;
      this.Height = e.target.height;
    };

    this.Image.src = url;
    this.X = 0;
    this.Y = 0;
    this.Width = 0;
    this.Height = 0;

    this.CenterX = () => this.X + (this.Width / 2);
    this.CenterY = () => this.Y + (this.Height / 2);
  }
}
