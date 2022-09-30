export type Player = "X" | "O";
export type SquareType = Player | "";
export type GameStatus = "Pend" | "X Won" | "O Won" | "A Tie";

export class Game {
  private readonly nextPlayer: Player;
  private readonly status: GameStatus;
  private readonly squares: SquareType[];
  private readonly winningSquares: Set<number> | null;
  private readonly currentPlay: string;

  constructor(
    nextPlayer: Player,
    status: GameStatus,
    squares: SquareType[],
    winningSquares: Set<number> | null,
    currentPlay: string
  ) {
    this.nextPlayer = nextPlayer;
    this.status = status;
    this.squares = squares;
    this.winningSquares = winningSquares;
    this.currentPlay = currentPlay;
  }

  get getNextPlayer(): Player {
    return this.nextPlayer;
  }

  get getStatus(): GameStatus {
    return this.status;
  }

  get getSquares(): SquareType[] {
    return this.squares;
  }

  get getWinningSet(): Set<number> | null {
    return this.winningSquares;
  }

  get getCurrentPlay(): string {
    return this.currentPlay;
  }
}

export type GameState = {
  history: Game[];
  moveNumber: number;
};
