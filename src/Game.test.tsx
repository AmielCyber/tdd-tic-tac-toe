import { cleanup, render, screen } from "@testing-library/react";
import Game from "./Game";
import cssClass from "./Game.module.css";

beforeEach(() => {
  render(<Game />);
});
afterEach(() => {
  cleanup();
});

describe("Game component", () => {
  test("has game css style", () => {
    const component = screen.getByTestId("game");
    expect(component).toHaveClass(cssClass.game);
  });
  test("has GameHistory component", () => {
    const gameHistoryComponent = screen.getByTestId("GameHistory");
    expect(gameHistoryComponent).toBeInTheDocument();
  });
  test("has GameStatus component", () => {
    const GameStatusComponent = screen.getByTestId("GameStatus");
    expect(GameStatusComponent).toBeInTheDocument();
  });
  test("has app title header", () => {
    const gameTitle = screen.getByText(/tic-tac-toe/i);
    expect(gameTitle).toBeInTheDocument();
  });
});
