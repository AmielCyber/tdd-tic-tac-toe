import { useReducer, useState } from "react";
// My imports.
import { initialGameHistory, gameReducer } from "./store/GameReducer";
import GameInformation from "./components/GameInformation/GameInformation";
import Board from "./components/Board/Board";
import cssClass from "./Game.module.css";
import type { Game as GameClass } from "./types/GameTypes";

const Game = () => {
  const [gameHistory, dispatch] = useReducer(gameReducer, initialGameHistory);
  const [moveNumber, setMoveNumber] = useState(0);

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
  };

  const currentGame: GameClass = gameHistory[moveNumber];
  return (
    <div className={cssClass.game} data-testid="game">
      <GameInformation
        currentGame={currentGame}
        gameHistory={gameHistory}
        moveNumber={moveNumber}
        onPrevMove={handleGoToPreviousMove}
      />
      <Board
        squares={currentGame.getSquares}
        highlightSet={currentGame.getWinningSet}
        onSelectSquare={handleSquareClick}
      />
    </div>
  );
};

export default Game;
