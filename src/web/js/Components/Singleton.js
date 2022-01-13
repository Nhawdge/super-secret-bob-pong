import Component from "./Component.js";

export const GameStates = {
  Menu: "Menu",
  Game: "Game",
  GameOver: "GameOver",
  Paused: "Paused",
};

export default class Singleton extends Component {
  constructor(engine) {
    super(engine);
    this.PlaySound = false;
    this.GameState = GameStates.Menu;
    this.LeftScore = 0;
    this.RightScore = 0;
  }
}
