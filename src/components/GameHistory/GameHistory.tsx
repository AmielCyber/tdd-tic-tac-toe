import { useState } from "react";
// My imports.
import PreviousMoves from "./PreviousMoves";
import cssClass from "./GameHistory.module.css";
import { Game } from "../../types/GameTypes";

type GameHistoryProps = {
  gameHistory: Game[];
  currentMoveNumber: number;
  onPrevMove: (prevMove: number) => void;
};

const GameHistory = ({ gameHistory, currentMoveNumber, onPrevMove }: GameHistoryProps) => {
  const [showHistory, setShowHistory] = useState(false);

  const handleClick = () => {
    setShowHistory((prev) => !prev);
  };

  return (
    <section id="Game History" className={cssClass.history}>
      <div className={cssClass.historyHeader}>
        <h2>Game History</h2>
        <button name="Toggle History" onClick={handleClick}>
          {showHistory ? "Hide History" : "Show History"}
        </button>
      </div>
      {showHistory && (
        <PreviousMoves gameHistory={gameHistory} currentMoveNumber={currentMoveNumber} onPrevMove={onPrevMove} />
      )}
    </section>
  );
};

export default GameHistory;
