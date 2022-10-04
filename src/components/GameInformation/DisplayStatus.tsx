import type { GameStatus, Player } from "../../types/GameTypes";

function getStatusMessageElement(gameStatus: GameStatus, nextPlayer: Player): JSX.Element {
  let statusMessage: JSX.Element;

  if (gameStatus === "Pend") {
    // Game is pending.
    statusMessage = <h1>Player {nextPlayer} is next.</h1>;
  } else {
    // Game is over.
    if (gameStatus === "A Tie") {
      statusMessage = (
        <h1>
          Game Over!
          <br />
          Is a tie game.
        </h1>
      );
    } else {
      statusMessage = (
        <h1>
          Game Over!
          <br />
          Player {gameStatus}
        </h1>
      );
    }
  }
  return statusMessage;
}

type DisplayStatusProps = {
  gameStatus: GameStatus;
  nextPlayer: Player;
};

const DisplayStatus = ({ gameStatus, nextPlayer }: DisplayStatusProps) => {
  return getStatusMessageElement(gameStatus, nextPlayer);
};

export default DisplayStatus;
