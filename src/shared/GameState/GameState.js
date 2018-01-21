export default class GameState {
  static get NORMAL() { return normal; }
  static get DRAW() { return draw; }
  static get TIC_TAC_TOE() { return ticTacToe; }

  constructor(value) {
    this.value = value;
  }

  toString = () => (this.value);
}
const normal = new GameState('normal');
const draw = new GameState('draw');
const ticTacToe = new GameState('tic-tac-toe');
