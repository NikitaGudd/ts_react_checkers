import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { CheckerElem } from "./CheckerElem";

export class Board {
  cells: Cell[][] = [];

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null));
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null));
        }
      }
      this.cells.push(row);
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    return newBoard;
  }

  public highLightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.checker?.canMove(target);
      }
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addCheckers() {
    for (let row = 0; row < 8; row += 2) {
      new CheckerElem(Colors.BLACK, this.getCell(row, 0));
      new CheckerElem(Colors.BLACK, this.getCell(row, 2));
      new CheckerElem(Colors.BLACK, this.getCell(7 - row, 1));

      new CheckerElem(Colors.WHITE, this.getCell(row, 6));
      new CheckerElem(Colors.WHITE, this.getCell(7 - row, 7));
      new CheckerElem(Colors.WHITE, this.getCell(7 - row, 5));
    }
  }

  public addElements() {
    this.addCheckers();
  }
}
