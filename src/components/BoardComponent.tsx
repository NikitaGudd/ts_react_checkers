import React, { FC, useState, useEffect } from "react";
import { Board } from "../logic/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../logic/Cell";

interface BoardElements {
  board: Board;
  setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardElements> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function onClickCell(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.checker?.canMove(cell)
    ) {
      selectedCell.moveChecker(cell);
      setSelectedCell(null);
    } else {
      setSelectedCell(cell);
    }
  }

  useEffect(() => {
    highLightCells();
  }, [selectedCell]);

  function highLightCells() {
    board.highLightCells(selectedCell);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div className="board">
      {board.cells.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((cell) => (
            <CellComponent
              cell={cell}
              onClickCell={onClickCell}
              key={cell.id}
              selected={
                cell.x === selectedCell?.x && cell.y === selectedCell?.y
              }
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;
