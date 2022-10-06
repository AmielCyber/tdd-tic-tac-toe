import { Game } from "../types/GameTypes";
import type { Player, SquareType, GameStatus } from "../types/GameTypes";

// Winning lines for tic-tac-toe.
const WINNING_LINES: number[][] = [
  // Horizontal lines.
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical lines.
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal lines.
  [0, 4, 8],
  [2, 4, 6],
];

export function getNextPlayer(currentPlayer: Player): Player {
  return currentPlayer === "X" ? "O" : "X";
}

export function getNextSquares(currentSquares: SquareType[], selectedSquareIndex: number, nextPlayer: Player) {
  return currentSquares.map((currentSquareValue, index) =>
    index !== selectedSquareIndex ? currentSquareValue : nextPlayer
  );
}

export function getWinningSet(squares: SquareType[]): Set<number> | null {
  let winningSet = null;
  if (squares.length === 0) {
    return winningSet;
  }
  for (let i = 0; i < WINNING_LINES.length && winningSet === null; i++) {
    const [a, b, c] = WINNING_LINES[i];
    if (squares[a] !== "" && squares[a] === squares[b] && squares[b] === squares[c]) {
      // Found a winning line in the board.
      winningSet = new Set<number>(WINNING_LINES[i]); // By Association.
    }
  }
  return winningSet;
}

export function getNextGameStatus(
  nextWinningSet: Set<number> | null,
  currentPlayer: Player,
  currMoveNum: number
): GameStatus {
  let nextStatus: GameStatus;

  if (nextWinningSet !== null) {
    nextStatus = currentPlayer === "X" ? "X Won" : "O Won";
  } else if (currMoveNum > 7) {
    nextStatus = "A Tie";
  } else {
    nextStatus = "Pend";
  }

  return nextStatus;
}

export function getCurrentPlay(currentPlayer: Player, selectedSquare: number): string {
  if (selectedSquare < 0 || selectedSquare > 8) {
    throw new Error(`Invalid selectedSquare value passed: ${selectedSquare}`);
  }
  return `Player ${currentPlayer} selected row ${Math.floor(selectedSquare / 3) + 1}, column ${
    (selectedSquare % 3) + 1
  }`;
}

export function handleSquareSelection(state: Game[], selectedSquare: number, currMoveNum: number): Game[] {
  if (selectedSquare < 0 || selectedSquare > 8) {
    throw new Error("Valid selected squares are 0-8");
  }
  if (currMoveNum < 0 || currMoveNum >= state.length) {
    throw new Error("Out of bounds move number.");
  }

  const currGame: Game = state[currMoveNum];
  if (currGame.getStatus !== "Pend") {
    throw new Error("Game has already ended!");
  }
  if (currGame.getSquares[selectedSquare] !== "") {
    throw new Error("Player can not select a square already played.");
  }

  // Get next squares.
  const nextSquares: SquareType[] = getNextSquares(currGame.getSquares, selectedSquare, currGame.getNextPlayer);
  // Get next player.
  const nextPlayer: Player = getNextPlayer(currGame.getNextPlayer);
  // Get next winning set.
  const nextWinningSet: Set<number> | null = getWinningSet(nextSquares);
  // Get next game status.
  const nextStatus: GameStatus = getNextGameStatus(nextWinningSet, currGame.getNextPlayer, currMoveNum);
  // Get the play made.
  const getPlay = getCurrentPlay(currGame.getNextPlayer, selectedSquare);
  // Get next Game.
  const nextGame: Game = new Game(nextPlayer, nextStatus, nextSquares, nextWinningSet, getPlay);
  // Get next move number.
  const nextMoveNum: number = currMoveNum + 1;
  // Get next history.
  const nextHistory: Game[] = state.slice(0, nextMoveNum);
  nextHistory.push(nextGame);

  // Return next game history.
  return nextHistory;
}

export function handlePlayAgainSelection(state: Game[]): Game[] {
  const newInitialGame = state.slice(0, 1);
  return newInitialGame;
}

const initialSquares: SquareType[] = new Array(9);
initialSquares.fill("");
const initialGame: Game = new Game("X", "Pend", initialSquares, null, "");
export const initialGameHistory: Game[] = [initialGame];

export type selectedSquareAction = {
  type: "selected-square" | "selected-play-again";
  selectedSquareIndex: number;
  currentMoveNum: number;
};
export type selectedPlayAgainAction = {
  type: "selected-play-again";
};
export type GameStateAction = selectedSquareAction | selectedPlayAgainAction;

export function gameReducer(state: Game[], action: GameStateAction): Game[] {
  switch (action.type) {
    case "selected-square": {
      return handleSquareSelection(state, action.selectedSquareIndex, action.currentMoveNum);
    }
    case "selected-play-again": {
      return handlePlayAgainSelection(state);
    }
    default: {
      throw new Error(`No action type in game reducer for action:\n\t${action}`);
    }
  }
}
