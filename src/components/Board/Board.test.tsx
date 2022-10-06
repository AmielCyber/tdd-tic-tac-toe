import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// My imports.
import Board from "./Board";
import squareStyles from "../Square.module.css";
import type { SquareType } from "../../types/GameTypes";

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

const getInitialSquares = () => {
  const squares = new Array(9);
  squares.fill("");

  return squares;
};

const getFilledWinningSquares = (xPlayer: boolean, highlightedIndices: number[]): SquareType[] => {
  const squares = getInitialSquares();
  for (const index of highlightedIndices) {
    squares[index] = xPlayer ? "X" : "O";
  }
  return squares;
};

const onSelectSquare = (squareIndex: number) => {
  return squareIndex;
};

describe("Board component", () => {
  test("renders 9 squares(buttons).", async () => {
    const squares = getInitialSquares();
    const mockCallBack = jest.fn(onSelectSquare);

    render(<Board squares={squares} highlightSet={null} onSelectSquare={mockCallBack} />);
    const squareElements = await screen.findAllByRole("button");
    expect(squareElements).toHaveLength(9);
  });
  test("highlights the squares in the highlightSet.", async () => {
    const mockCallBack = jest.fn(onSelectSquare);
    let playerX_IsNext = true;

    for (const line of WINNING_LINES) {
      const squares = getFilledWinningSquares(playerX_IsNext, line);
      const highlightSet = new Set(line);
      render(<Board squares={squares} highlightSet={highlightSet} onSelectSquare={mockCallBack} />);
      const squareElements = await screen.findAllByRole("button");

      for (const squareIndex of line) {
        const squareElement = squareElements[squareIndex];
        expect(squareElement).toHaveClass(squareStyles.highlight);
      }
      cleanup();
      playerX_IsNext = !playerX_IsNext;
    }
  });
  test("each button in the component passes its square number when it calls its callback", async () => {
    const squares = getInitialSquares();
    const mockCallBack = jest.fn(onSelectSquare);
    render(<Board squares={squares} highlightSet={null} onSelectSquare={mockCallBack} />);
    const squareElements = await screen.findAllByRole("button");

    for (let squareIndex = 0; squareIndex < 9; squareIndex++) {
      const buttonElement = squareElements[squareIndex];
      userEvent.click(buttonElement);
    }
    for (let index = 0; index < 9; index++) {
      expect(mockCallBack.mock.results[index].value).toBe(index);
    }
  });
});
