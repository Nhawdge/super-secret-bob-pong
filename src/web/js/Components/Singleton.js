import Component from "./Component.js";

export const GameStates = {
  Menu: 1,
  Game: 2,
  GameOver: 3,
  Paused: 4,
};

export default class Singleton extends Component {
  constructor(engine) {
    super(engine);
    this.PlaySound = false;
    this.GameState = GameStates.Menu;
  }
}
