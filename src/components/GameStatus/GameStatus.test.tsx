import { screen, render, cleanup } from "@testing-library/react";
import GameStatus from "./GameStatus";
import { initialGameHistory } from "../../reducer/GameReducer";
import { Game, GameStatus as gameStatus } from "../../types/GameTypes";
import cssClass from "./GameStatus.module.css";

const onPrevMoveMock = (prevMove: number) => prevMove;
const onSelectPlayAgain = () => console.log("hello");

describe("GameStatus component", () => {
  test("has the gameStatus css class", () => {
    const initial = initialGameHistory;
    const initialGame = initial[0];
    const mockOnSelectSquare = jest.fn(onPrevMoveMock);
    const mockOnSelectPlayAgain = jest.fn(onSelectPlayAgain);

    render(
      <GameStatus
        currentGame={initialGame}
        onSelectSquare={mockOnSelectSquare}
        onSelectPlayAgain={mockOnSelectPlayAgain}
      />
    );

    const gameStatusComponent = screen.getByTestId("GameStatus");
    expect(gameStatusComponent).toHaveClass(cssClass.gameStatus);
  });
  test("play again button does not appear when game status is not pending.", () => {
    const initial = initialGameHistory;
    const initialGame = initial[0];
    const mockOnSelectSquare = jest.fn(onPrevMoveMock);
    const mockOnSelectPlayAgain = jest.fn(onSelectPlayAgain);

    render(
      <GameStatus
        currentGame={initialGame}
        onSelectSquare={mockOnSelectSquare}
        onSelectPlayAgain={mockOnSelectPlayAgain}
      />
    );
    const playAgainButton = screen.queryByRole("button", { name: "reset" });
    expect(playAgainButton).not.toBeInTheDocument();
  });
  test("play again button appears after status is not pending.", () => {
    const statusArray: gameStatus[] = ["A Tie", "X Won", "O Won"];
    const mockOnSelectSquare = jest.fn(onPrevMoveMock);
    const mockOnSelectPlayAgain = jest.fn(onSelectPlayAgain);
    const initialSquares = new Array(9).fill("");

    for (const status of statusArray) {
      const player = status[0] === "X" ? "X" : "O";
      const newGame = new Game(player, status, initialSquares, null, "");
      render(
        <GameStatus
          currentGame={newGame}
          onSelectSquare={mockOnSelectSquare}
          onSelectPlayAgain={mockOnSelectPlayAgain}
        />
      );
      const playAgainButton = screen.getByRole("button", { name: /play again/i });
      expect(playAgainButton).toBeInTheDocument();
      cleanup();
    }
  });
  test("play again button displays 'Play Again'", () => {
    const mockOnSelectSquare = jest.fn(onPrevMoveMock);
    const mockOnSelectPlayAgain = jest.fn(onSelectPlayAgain);
    const initialSquares = new Array(9).fill("");
    const newGame = new Game("X", "X Won", initialSquares, null, "");
    render(
      <GameStatus currentGame={newGame} onSelectSquare={mockOnSelectSquare} onSelectPlayAgain={mockOnSelectPlayAgain} />
    );
    const playAgainButton = screen.getByRole("button", { name: /play again/i });
    expect(playAgainButton).toHaveTextContent(/play again/i);
  });
});
