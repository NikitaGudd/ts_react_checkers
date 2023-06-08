import { Colors } from "./Colors";
import { Checker } from "./Checker";
import { Board } from "./Board";

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  checker: Checker | null;
  board: Board;
  available: boolean;
  id: number;

  constructor(
    board: Board,
    x: number,
    y: number,
    color: Colors,
    checker: Checker | null
  ) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.checker = checker;
    this.board = board;
    this.available = false;
    this.id = Math.random();
  }

  isEmpty() {
    return this.checker === null;
  }

  isEnemy(target: Cell): boolean {
    if (target.checker) {
      return this.checker?.color !== target.checker.color;
    }
    return false;
  }

  removeChecker() {
    return this.checker === null;
  }

  setChecker(checker: Checker) {
    this.checker = checker;
    this.checker.cell = this;
  }

  moveChecker(target: Cell) {
    if (this.checker && this.checker?.canMove(target)) {
      this.checker.moveChecker(target);
      target.setChecker(this.checker);
      this.checker = null;
    }
  }
}
