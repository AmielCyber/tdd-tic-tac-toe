
import { render, screen } from '@testing-library/react';
import Square from './Square';
import styles from "./Square.module.css"

test('renders learn react link', () => {
  render(<Square mark="" highlight={false} squareIndex={0}/>);

  const buttonElement = screen.getByRole("button");
  expect(buttonElement).toBeInTheDocument();
});

test("Button element renders X when passed by props", () => {
    render(<Square mark="X" highlight={false} squareIndex={0}/>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveTextContent("X")
})

test("Button element renders O when passed by props", () => {
    render(<Square mark="O" highlight={false} squareIndex={0}/>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveTextContent("O")
})

test("Button element renders an empty string when passed by props", () => {
    render(<Square mark="" highlight={false} squareIndex={0}/>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveTextContent("")
})

test("Button highlights to color yellow when highlight props is true", () => {
    render(<Square mark="" highlight={true} squareIndex={0}/>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass(styles.highlight);
})
