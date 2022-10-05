import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SquareType } from "../../types/GameTypes";
import Square from "./Square";
import styles from "./Square.module.css";

describe("Square Component", () => {
  test("has one button", () => {
    const mockCallBack = jest.fn((squareIndex: number) => squareIndex);
    render(<Square mark="" highlight={false} squareIndex={0} onSelectSquare={mockCallBack} />);
    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeInTheDocument();
  });

  test("button element renders the square type passed by props", () => {
    const mockCallBack = jest.fn((squareIndex: number) => squareIndex);
    const squareTypes: SquareType[] = ["X", "O", ""];
    for (const sqType of squareTypes) {
      render(<Square mark={sqType} highlight={false} squareIndex={0} onSelectSquare={mockCallBack} />);
      const buttonElement = screen.getByRole("button");

      expect(buttonElement).toHaveTextContent(sqType);
      cleanup(); // Cleanup is only done automatically after each test("", () => {})
    }
  });

  test("button is highlighted when highlight props is true", () => {
    const mockCallBack = jest.fn((squareIndex: number) => squareIndex);
    render(<Square mark="X" highlight={true} squareIndex={0} onSelectSquare={mockCallBack} />);
    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toHaveClass(styles.highlight);
  });

  test("button calls onClick function when clicked and returns its index value", () => {
    const mockCallBack = jest.fn((squareIndex: number) => squareIndex);
    const index = 7;

    render(<Square mark="" highlight={true} squareIndex={index} onSelectSquare={mockCallBack} />);
    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    expect(mockCallBack.mock.calls.length).toBe(1);
    expect(mockCallBack.mock.results[0].value).toBe(index);
  });

  test("square has player's X css class when mark is X", () => {
    const mockCallBack = jest.fn((squareIndex: number) => squareIndex);
    render(<Square mark="X" highlight={false} squareIndex={0} onSelectSquare={mockCallBack} />);
    const xPlayerButton = screen.getByRole("button");

    expect(xPlayerButton).toHaveTextContent(/x/i);
    expect(xPlayerButton).toHaveClass(styles.playerX);
  });

  test("square has player's O css class color when mark is O", () => {
    const mockCallBack = jest.fn((squareIndex: number) => squareIndex);
    render(<Square mark="O" highlight={true} squareIndex={0} onSelectSquare={mockCallBack} />);
    const oPlayerButton = screen.getByRole("button");

    expect(oPlayerButton).toHaveTextContent(/o/i);
    expect(oPlayerButton).toHaveClass(styles.playerO);
  });
});
