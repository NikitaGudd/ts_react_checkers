import React, { FC, useState, useEffect } from "react";
import { Board } from "../logic/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../logic/Cell";
import { Player } from "../logic/Player";
import { Colors } from "../logic/Colors";

interface BoardElements {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardElements> = ({
  board,
  setBoard,
  swapPlayer,
  currentPlayer,
}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  function onClickCell(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.checker?.canMove(cell)
    ) {
      selectedCell.moveChecker(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.checker?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
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

  console.log(currentPlayer);

  return (
    <>
      <div className="current-player">
        Поточний гравець:
        {!!currentPlayer &&
          (currentPlayer?.color === Colors.BLACK ? "Чорні" : "Білі")}
      </div>
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
    </>
  );
};

export default BoardComponent;
