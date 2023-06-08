import React, { FC } from "react";
import { Cell } from "../logic/Cell";

interface CellElements {
  cell: Cell;
  selected: boolean;
  onClickCell: (cell: Cell) => void;
}

const CellComponent: FC<CellElements> = ({ cell, selected, onClickCell }) => {
  return (
    <div
      className={["cell", cell.color, selected ? "selected" : ""].join(" ")}
      onClick={() => onClickCell(cell)}
    >
      {cell.available && !cell.checker && <div className={"available"}></div>}
      {cell.checker?.logo && <img src={cell.checker.logo} alt="" />}
    </div>
  );
};

export default CellComponent;
