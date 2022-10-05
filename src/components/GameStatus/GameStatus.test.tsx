import { screen, render } from "@testing-library/react";
import GameStatus from "./GameStatus";
import { initialGameHistory } from "../../reducer/GameReducer";
import cssClass from "./GameStatus.module.css";

const onPrevMoveMock = (prevMove: number) => prevMove;

describe("GameStatus component", () => {
  test("has the gameStatus css class", () => {
    const initial = initialGameHistory;
    const initialGame = initial[0];
    const mockCallBack = jest.fn(onPrevMoveMock);
    render(<GameStatus currentGame={initialGame} onSelectSquare={mockCallBack} />);

    const gameStatusComponent = screen.getByTestId("GameStatus");
    expect(gameStatusComponent).toHaveClass(cssClass.gameStatus);
  });
});
