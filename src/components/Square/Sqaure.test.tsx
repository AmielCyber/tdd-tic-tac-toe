import { fireEvent, render, screen } from "@testing-library/react";
import Square from "./Square";
import styles from "./Square.module.css";

test("Square has one button", () => {
  const mockCallBack = jest.fn((squareIndex: number) => squareIndex);
  render(<Square mark="" highlight={false} squareIndex={0} onSelectSquare={mockCallBack} />);

  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

test("Button element renders X when passed by props", () => {
  const mockCallBack = jest.fn((squareIndex: number) => squareIndex);
  render(<Square mark="X" highlight={false} squareIndex={0} onSelectSquare={mockCallBack} />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toHaveTextContent("X");
});

test("Button element renders O when passed by props", () => {
  const mockCallBack = jest.fn((squareIndex: number) => squareIndex);
  render(<Square mark="O" highlight={false} squareIndex={0} onSelectSquare={mockCallBack} />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toHaveTextContent("O");
});

test("Button element renders an empty string when passed by props", () => {
  const mockCallBack = jest.fn((squareIndex: number) => squareIndex);
  render(<Square mark="" highlight={false} squareIndex={0} onSelectSquare={mockCallBack} />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toHaveTextContent("");
});

test("Button highlights to color yellow when highlight props is true", () => {
  const mockCallBack = jest.fn((squareIndex: number) => squareIndex);
  render(<Square mark="" highlight={true} squareIndex={0} onSelectSquare={mockCallBack} />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toHaveClass(styles.highlight);
});

test("Button calls onClick function when clicked and returns its index value", () => {
  const mockCallBack = jest.fn((squareIndex: number) => squareIndex);
  const index = 7;

  render(<Square mark="" highlight={true} squareIndex={index} onSelectSquare={mockCallBack} />);
  const buttonElement = screen.getByRole("button");
  fireEvent.click(buttonElement);
  expect(mockCallBack.mock.calls.length).toBe(1);
  expect(mockCallBack.mock.results[0].value).toBe(index);
});

test("Square has Player X color when mark is X", () => {
  const mockCallBack = jest.fn((squareIndex: number) => squareIndex);
  render(<Square mark="X" highlight={true} squareIndex={0} onSelectSquare={mockCallBack} />);
  const xPlayer = screen.getByText(/X/);
  expect(xPlayer).toHaveClass(styles.playerX);
});

test("Square has Player O color when mark is O", () => {
  const mockCallBack = jest.fn((squareIndex: number) => squareIndex);
  render(<Square mark="O" highlight={true} squareIndex={0} onSelectSquare={mockCallBack} />);
  const xPlayer = screen.getByText(/O/);
  expect(xPlayer).toHaveClass(styles.playerO);
});
