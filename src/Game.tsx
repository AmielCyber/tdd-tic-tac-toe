import { useReducer, useState, useRef } from "react";
// My imports.
import { initialGameHistory, gameReducer } from "./reducer/GameReducer";
import { Game as GameClass } from "./types/GameTypes";
import GameHistory from "./components/GameHistory/GameHistory";
import GameStatus from "./components/GameStatus/GameStatus";
import cssClass from "./Game.module.css";

const Game = () => {
  const [gameHistory, dispatch] = useReducer(gameReducer, initialGameHistory);
  const [moveNumber, setMoveNumber] = useState(0);
  const topOfPageRef = useRef<HTMLHeadingElement>(null);

  const handleSquareClick = (indexNumber: number) => {
    const currentGame: GameClass = gameHistory[moveNumber];
    if (currentGame.getSquares[indexNumber] !== "" || currentGame.getStatus !== "Pend") {
      // Do not do anything if user already selected a square or the game is already over.
      return;
    }
    dispatch({
      type: "selected-square",
      selectedSquareIndex: indexNumber,
      currentMoveNum: moveNumber,
    });
    setMoveNumber(moveNumber + 1);
  };

  const handleGoToPreviousMove = (prevMove: number) => {
    if (prevMove < 0 || prevMove >= gameHistory.length) {
      throw new Error("Out of bounds move selected!");
    }
    setMoveNumber(prevMove);
    if (topOfPageRef && topOfPageRef.current) {
      topOfPageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  const handlePlayAgain = () => {
    dispatch({
      type: "selected-play-again",
    });
    setMoveNumber(0);
  };

  const currentGame: GameClass = gameHistory[moveNumber];
  return (
    <section className={cssClass.app}>
      <h1 id="title" className={cssClass.title} ref={topOfPageRef}>
        Tic-Tac-Toe
      </h1>
      <div className={cssClass.game} data-testid="game">
        <GameHistory gameHistory={gameHistory} currentMoveNumber={moveNumber} onPrevMove={handleGoToPreviousMove} />
        <GameStatus currentGame={currentGame} onSelectSquare={handleSquareClick} onSelectPlayAgain={handlePlayAgain} />
      </div>
    </section>
  );
};

export default Game;
