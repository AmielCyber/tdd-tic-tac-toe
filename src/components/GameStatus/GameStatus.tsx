import Board from "../Board/Board";
import DisplayStatus from "./DisplayStatus";
import cssStyles from "./GameStatus.module.css";
import type { Game } from "../../types/GameTypes";

type GameStatusProps = {
  currentGame: Game;
  onSelectSquare: (squareIndex: number) => void;
  onSelectPlayAgain: () => void;
};
const GameStatus = ({ currentGame, onSelectSquare, onSelectPlayAgain }: GameStatusProps) => {
  const gameStatus = currentGame.getStatus;
  const nextPlayer = currentGame.getNextPlayer;
  const highlightSet = currentGame.getWinningSet;
  const squares = currentGame.getSquares;

  return (
    <section className={cssStyles.gameStatus} data-testid="GameStatus">
      <DisplayStatus gameStatus={gameStatus} nextPlayer={nextPlayer} />
      <Board squares={squares} highlightSet={highlightSet} onSelectSquare={onSelectSquare} />
      {gameStatus !== "Pend" && (
        <button className={cssStyles.playAgainButton} name="reset" onClick={onSelectPlayAgain}>
          Play Again
        </button>
      )}
    </section>
  );
};

export default GameStatus;
