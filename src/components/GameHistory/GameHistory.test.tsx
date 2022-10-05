import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// My imports.
import { initialGameHistory } from "../../reducer/GameReducer";
import GameHistory from "./GameHistory";
import { Game } from "../../types/GameTypes";

const onPrevMoveMock = (prevMove: number) => prevMove;

const getAFullGame = () => {
  const gameHistory: Game[] = initialGameHistory.slice();
  for (let gameNum = 0; gameNum < 9; gameNum++) {
    gameHistory.push(new Game("X", "Pend", new Array(9).fill(""), null, ""));
  }
  gameHistory.push(new Game("X", "A Tie", new Array(9).fill(""), null, ""));
  return gameHistory;
};

beforeEach(() => {
  const gameHistory = getAFullGame();
  const mockCallBack = jest.fn(onPrevMoveMock);
  render(
    <GameHistory gameHistory={gameHistory} currentMoveNumber={gameHistory.length - 1} onPrevMove={mockCallBack} />
  );
});

describe("GameHistory component", () => {
  test("displays 'Game History' to the user.", () => {
    const headerElement = screen.getByRole("heading");
    expect(headerElement).toHaveTextContent(/game history/i);
  });
  test("toggle history button displays 'Show History' on initial render.", () => {
    const toggleHistoryButton = screen.getByRole("button");
    expect(toggleHistoryButton).toHaveTextContent(/show history/i);
  });
  test("showHistory is not shown on initial render.", () => {
    const previousMoveComponent = screen.queryByTestId("previousMoves");
    expect(previousMoveComponent).not.toBeInTheDocument();
  });
  test("clicking the button when is 'Show History', renders PreviousMoves component.", () => {
    const toggleHistoryButton = screen.getByRole("button");
    userEvent.click(toggleHistoryButton);
    const previousMoveComponent = screen.queryByTestId("previousMoves");
    expect(previousMoveComponent).toBeInTheDocument();
  });
});
