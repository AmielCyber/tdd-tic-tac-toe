// My imports.
import DisplayStatus from "./DisplayStatus";
import GameHistory from "./GameHistory";
import cssClass from "./GameInformation.module.css";
import type { Game } from "../../types/GameTypes";

type GameInformationProps = {
  currentGame: Game;
  gameHistory: Game[];
  moveNumber: number;
  onPrevMove: (prevMove: number) => void;
};

const GameInformation = ({ currentGame, gameHistory, moveNumber, onPrevMove }: GameInformationProps) => {
  return (
    <section className={cssClass.gameInfo} id="Game Information" data-testid="Game Information">
      <DisplayStatus gameStatus={currentGame.getStatus} nextPlayer={currentGame.getNextPlayer} />
      <GameHistory gameHistory={gameHistory} currentMoveNumber={moveNumber} onPrevMove={onPrevMove} />
    </section>
  );
};

export default GameInformation;
