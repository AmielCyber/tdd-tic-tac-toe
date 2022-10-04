import { render, screen } from "@testing-library/react";
import Game from "./Game";
import styles from "./Game.module.css";

describe("Game component", () => {
  test("has game css style", () => {
    render(<Game />);
    const component = screen.getByTestId("game");
    expect(component).toHaveClass(styles.game);
  });
});
