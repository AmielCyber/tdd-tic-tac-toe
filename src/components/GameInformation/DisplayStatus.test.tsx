import { render, screen } from "@testing-library/react";
import DisplayStatus from "./DisplayStatus";

describe("DisplayStatus component", () => {
  test("displays Game Over and a 'tie game' if the gameStatus props is 'A Tie'", () => {
    render(<DisplayStatus gameStatus="A Tie" nextPlayer="X" />);
    const headerElement = screen.getByRole("heading");

    expect(headerElement).toHaveTextContent(/game over/i);
    expect(headerElement).toHaveTextContent(/a tie/i);
  });
  test("displays player X won if gameStatus is 'X Won'", () => {
    render(<DisplayStatus gameStatus="X Won" nextPlayer="O" />);
    const headerElement = screen.getByRole("heading");

    expect(headerElement).toHaveTextContent(/game over/i);
    expect(headerElement).toHaveTextContent(/x won/i);
  });
  test("displays player O won if gameStatus is 'O Won'", () => {
    render(<DisplayStatus gameStatus="O Won" nextPlayer="X" />);
    const headerElement = screen.getByRole("heading");

    expect(headerElement).toHaveTextContent(/game over/i);
    expect(headerElement).toHaveTextContent(/o won/i);
  });
});
