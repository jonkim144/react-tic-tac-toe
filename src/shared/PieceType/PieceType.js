export default class PieceType {
  static get Empty() { return empty; }
  static get X() { return x; }
  static get O() { return o; }

  constructor(value) {
    this.value = value;
  }

  toString = () => (this.value);
}
const empty = new PieceType(' ');
const x = new PieceType('X');
const o = new PieceType('O');
