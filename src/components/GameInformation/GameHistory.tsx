import { useState } from "react";
// My imports.
import cssClass from "./GameInformation.module.css";
import type { Game } from "../../types/GameTypes";

type GameHistoryProps = {
  gameHistory: Game[];
  currentMoveNumber: number;
  onPrevMove: (prevMove: number) => void;
};

const GameHistory = ({ gameHistory, currentMoveNumber, onPrevMove }: GameHistoryProps) => {
  const [isReverse, setIsReverse] = useState(false);

  const gameHistoryElements = gameHistory.map((game, move) => {
    const buttonStyle = currentMoveNumber === move ? cssClass.currentMove : "";
    const desc = `Move #${move}`;
    return (
      <li key={desc} id={desc}>
        <button data-testid={`Move Button ${move}`} className={buttonStyle} onClick={() => onPrevMove(move)}>
          {move === 0 ? "Go to initial Game" : "Go to move " + move}
        </button>
        <p>{game.getCurrentPlay}</p>
      </li>
    );
  });

  isReverse && gameHistoryElements.reverse();

  return (
    <section id="Game History">
      <h2>Game history</h2>
      <button
        id="Sort Moves"
        name="Sort Moves"
        className={cssClass.sortButton}
        onClick={() => setIsReverse((prev) => !prev)}
      >
        Sort Moves
      </button>
      <ol id="History List" reversed={isReverse}>
        {gameHistoryElements}
      </ol>
    </section>
  );
};

export default GameHistory;
