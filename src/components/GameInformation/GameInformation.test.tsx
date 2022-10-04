import { render, screen } from "@testing-library/react";
import { initialGameHistory } from "../../store/GameReducer";
import GameInformation from "./GameInformation";
import styles from "./GameInformation.module.css";
const onPrevMoveMock = (prevMove: number) => prevMove;
test("GameInformation component has gameInfo css style", () => {
  const initialGame = initialGameHistory;
  const mockCallBack = jest.fn(onPrevMoveMock);
  render(
    <GameInformation currentGame={initialGame[0]} gameHistory={initialGame} moveNumber={0} onPrevMove={mockCallBack} />
  );
  const component = screen.getByTestId("Game Information");
  expect(component).toHaveClass(styles.gameInfo);
});
