import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// My imports.
import { initialGameHistory } from "../../reducer/GameReducer";
import PreviousMoves from "./PreviousMoves";
import { Game } from "../../types/GameTypes";
import cssClass from "./PreviousMoves.module.css";

const onPrevMoveMock = (prevMove: number) => prevMove;

const getAFullGame = () => {
  const gameHistory: Game[] = initialGameHistory.slice();
  for (let gameNum = 0; gameNum < 9; gameNum++) {
    gameHistory.push(new Game("X", "Pend", new Array(9).fill(""), null, ""));
  }
  gameHistory.push(new Game("X", "A Tie", new Array(9).fill(""), null, ""));
  return gameHistory;
};

describe("PreviousMoves component", () => {
  const initialGame = initialGameHistory.slice();
  test("has data-testid previousMoves for GameHistory testing.", () => {
    const mockCallBack = jest.fn(onPrevMoveMock);
    render(<PreviousMoves gameHistory={initialGame} currentMoveNumber={0} onPrevMove={mockCallBack} />);
    const previousMovesComponent = screen.getByTestId("previousMoves");

    expect(previousMovesComponent).toBeInTheDocument();
  });
  test("has a sort button.", () => {
    const mockCallBack = jest.fn(onPrevMoveMock);
    render(<PreviousMoves gameHistory={initialGame} currentMoveNumber={0} onPrevMove={mockCallBack} />);
    const buttonElement = screen.getByRole("button", { name: "Sort Moves" });

    expect(buttonElement).toBeInTheDocument();
  });
  describe("History sort", () => {
    test("starts with history sorted.", () => {
      const gameHistory = getAFullGame();
      const mockCallBack = jest.fn(onPrevMoveMock);
      render(<PreviousMoves gameHistory={gameHistory} currentMoveNumber={0} onPrevMove={mockCallBack} />);
      const listElements = screen.getAllByRole("listitem");

      for (let index = 0; index < gameHistory.length; index++) {
        const element = listElements[index];
        expect(element).toHaveAttribute("id", `Move #${index}`);
      }
      const olElement = screen.getByRole("list");
      expect(olElement).not.toHaveAttribute("reversed");
    });
    test("displays history in reverse when sort button is clicked.", () => {
      const gameHistory = getAFullGame();
      const mockCallBack = jest.fn(onPrevMoveMock);
      render(<PreviousMoves gameHistory={gameHistory} currentMoveNumber={0} onPrevMove={mockCallBack} />);

      const sortButtonElement = screen.getByRole("button", { name: "Sort Moves" });
      userEvent.click(sortButtonElement);
      const listElements = screen.getByRole("list");

      expect(listElements).toHaveAttribute("reversed");
    });
    test("displays an initial move.", () => {
      const mockCallBack = jest.fn(onPrevMoveMock);
      render(<PreviousMoves gameHistory={initialGameHistory} currentMoveNumber={0} onPrevMove={mockCallBack} />);
      const listElement = screen.getByRole("list");

      expect(listElement).toHaveTextContent(/initial/i);
    });
  });
  test("current move has currentMove css style.", () => {
    const gameHistory = getAFullGame();
    const mockCallBack = jest.fn(onPrevMoveMock);
    const currMove = Math.floor(gameHistory.length / 2);
    render(<PreviousMoves gameHistory={gameHistory} currentMoveNumber={currMove} onPrevMove={mockCallBack} />);
    const currMoveButton = screen.getByRole("button", { name: `Move #${currMove}` });
    expect(currMoveButton).toHaveClass(cssClass.currentMove);
  });
});
