import type { SquareType } from "../../types/GameTypes";
import cssClass from "./Square.module.css";

// Button Styles
const REGULAR = cssClass.square;
const HIGHLIGHTED = cssClass.square + " " + cssClass.highlight;

function getPlayerColor(mark: SquareType) {
  if (mark === "") {
    return "";
  } else if (mark === "X") {
    return cssClass.playerX;
  } else {
    return cssClass.playerO;
  }
}

type SquareProps = {
  squareIndex: number;
  mark: SquareType;
  highlight: boolean;
  onSelectSquare: (squareIndex: number) => void;
};

const Square = ({ squareIndex, mark, highlight, onSelectSquare }: SquareProps) => {
  const buttonStyle = highlight ? HIGHLIGHTED : REGULAR;
  const playerStyle = getPlayerColor(mark);
  const squareName = `Row ${Math.floor(squareIndex / 3) + 1}, Column ${(squareIndex % 3) + 1}`;
  return (
    <button name={squareName} className={buttonStyle} onClick={() => onSelectSquare(squareIndex)}>
      <p className={playerStyle}>{mark}</p>
    </button>
  );
};

export default Square;
