import { Checker } from "./Checker";
import { Cell } from "./Cell";
import { Colors } from "./Colors";
import blackChecker from "../assets/black-checker.png";
import whiteChecker from "../assets/white-checker.png";

export class CheckerElem extends Checker {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.WHITE ? whiteChecker : blackChecker;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }

    const direction = this.cell.checker?.color === Colors.BLACK ? 1 : -1;
    const dx = target.x - this.cell.x;
    const dy = target.y - this.cell.y;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (
      absDy === 1 &&
      absDx === 1 &&
      ((direction === 1 && dy === 1) || (direction === -1 && dy === -1)) &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }

    if (
      absDy === 2 &&
      absDx === 2 &&
      ((direction === 1 && dy === 2) || (direction === -1 && dy === -2)) &&
      this.cell.board.getCell(target.x, target.y).isEmpty() &&
      !this.cell.board
        .getCell(this.cell.x + dx / 2, this.cell.y + dy / 2)
        .isEmpty() &&
      this.cell.board.getCell(this.cell.x + dx / 2, this.cell.y + dy / 2)
        .checker?.color !== this.color
    ) {
      return true;
    }

    return false;
  }

  moveChecker(target: Cell) {
    super.moveChecker(target);
  }
}
