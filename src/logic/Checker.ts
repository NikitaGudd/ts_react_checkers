import { Colors } from "./Colors";
import { Cell } from "./Cell";
import logo from "../assets/white-checker.svg";

export class Checker {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  id: number;

  constructor(color: Colors, cell: Cell) {
    this.color = color;
    this.cell = cell;
    this.cell.checker = this;
    this.logo = null;
    this.id = Math.random();
  }

  canMove(target: Cell): boolean {
    if (target.checker?.color === this.color) {
      return false;
    }
    return true;
  }

  moveChecker(target: Cell) {}
}
