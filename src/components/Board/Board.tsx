import type { SquareType } from "../../types/GameTypes";
import Square from "../Square/Square";
import cssClass from "./Board.module.css";

interface BoardProps {
  squares: SquareType[];
  highlightSet: Set<number> | null;
  onSelectSquare: (squareIndex: number) => void;
}
const Board = ({ squares, highlightSet, onSelectSquare }: BoardProps) => {
  return (
    <section className={cssClass.board} id="Tic-Tac-Toe Board">
      {squares.map((squareValue: SquareType, index: number) => (
        <Square
          key={index}
          squareIndex={index}
          mark={squareValue}
          highlight={highlightSet !== null && highlightSet.has(index)}
          onSelectSquare={onSelectSquare}
        />
      ))}
    </section>
  );
};

export default Board;
