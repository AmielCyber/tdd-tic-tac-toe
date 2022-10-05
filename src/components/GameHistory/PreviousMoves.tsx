import { useState } from "react";
// My imports.
import { Game } from "../../types/GameTypes";
import cssClass from "./PreviousMoves.module.css";

function getMoveButtonClass(currentMove: number, moveNumber: number): string {
  return currentMove === moveNumber ? `${cssClass.moveButton} ${cssClass.currentMove}` : cssClass.moveButton;
}
type GameHistoryProps = {
  gameHistory: Game[];
  currentMoveNumber: number;
  onPrevMove: (prevMove: number) => void;
};

const PreviousMoves = ({ gameHistory, currentMoveNumber, onPrevMove }: GameHistoryProps) => {
  const [isReverse, setIsReverse] = useState(false);

  const prevMovesList = gameHistory.map((game, moveNumber) => {
    const buttonStyle = getMoveButtonClass(currentMoveNumber, moveNumber);
    const description = `Move #${moveNumber}`;
    const buttonText = moveNumber === 0 ? "Go to initial game" : "Go to move " + moveNumber;

    return (
      <li key={description} id={description}>
        <button className={buttonStyle} aria-label={description} onClick={() => onPrevMove(moveNumber)}>
          {buttonText}
        </button>
        <p>{game.getCurrentPlay}</p>
      </li>
    );
  });

  if (isReverse) {
    prevMovesList.reverse();
  }

  return (
    <div data-testid="previousMoves" className={cssClass.previousMoves}>
      <button
        id="Sort Moves"
        name="Sort Moves"
        className={cssClass.sortButton}
        onClick={() => setIsReverse((prev) => !prev)}
      >
        Sort Moves
      </button>
      <ol id="History List" reversed={isReverse}>
        {prevMovesList}
      </ol>
    </div>
  );
};

export default PreviousMoves;
