// My import.
import type { GameStatus, Player } from "../../types/GameTypes";

function getStatusMessageElement(gameStatus: GameStatus, nextPlayer: Player): JSX.Element {
  if (gameStatus === "Pend") {
    // Game is pending.
    return <h2>Player {nextPlayer} is next</h2>;
  }
  if (gameStatus === "A Tie") {
    return <h2>Game Over! Is a tie game.</h2>;
  }
  // Game is over.
  return <h2>Game Over. Player {gameStatus}!</h2>;
}

type DisplayStatusProps = {
  gameStatus: GameStatus;
  nextPlayer: Player;
};

const DisplayStatus = ({ gameStatus, nextPlayer }: DisplayStatusProps) => {
  return getStatusMessageElement(gameStatus, nextPlayer);
};

export default DisplayStatus;
