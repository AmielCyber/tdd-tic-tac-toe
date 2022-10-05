import type { SquareType } from "../../types/GameTypes";
import cssClass from "./Square.module.css";

function getPlayerColor(mark: SquareType): string {
  return mark === "X" ? cssClass.playerX : cssClass.playerO;
}
function getButtonClass(mark: SquareType, highlight: boolean): string {
  if (mark === "") {
    return `${cssClass.square} ${cssClass.emptySquare}`;
  }
  if (highlight) {
    return `${cssClass.square} ${cssClass.highlight} ${getPlayerColor(mark)}`;
  }
  return `${cssClass.square} ${getPlayerColor(mark)}`;
}

type SquareProps = {
  squareIndex: number;
  mark: SquareType;
  highlight: boolean;
  onSelectSquare: (squareIndex: number) => void;
};

const Square = ({ squareIndex, mark, highlight, onSelectSquare }: SquareProps) => {
  const buttonStyle = getButtonClass(mark, highlight);
  const squareName = `Row ${Math.floor(squareIndex / 3) + 1}, Column ${(squareIndex % 3) + 1}`;
  return (
    <button name={squareName} className={buttonStyle} onClick={() => onSelectSquare(squareIndex)}>
      <p>{mark}</p>
    </button>
  );
};

export default Square;
