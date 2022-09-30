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
  return (
    <button name={`square: ${squareIndex}`} className={buttonStyle} onClick={() => onSelectSquare(squareIndex)}>
      <div className={playerStyle}>{mark}</div>
    </button>
  );
};

export default Square;
