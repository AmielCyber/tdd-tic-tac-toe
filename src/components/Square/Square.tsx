import type  {SquareMark} from "../../../types/Square"
import styles from  "./Square.module.css"

// Button Styles.
const highlightedStyles = `${styles.square} ${styles.highlight}`
const regularStyle = styles.square;

type SquareProps = {
  mark: SquareMark; 
  highlight: boolean;
  squareIndex: number;
  onSelectSquare: (squareIndex: number) => void;
}
const Square = ({mark, highlight, squareIndex, onSelectSquare}: SquareProps) => {
  const buttonStyle = highlight?  highlightedStyles : regularStyle;

  const clickHandler = () => {
    onSelectSquare(squareIndex);
  } 

  return (
    <button name={`square: ${squareIndex}`} className={buttonStyle} onClick={clickHandler}>{mark}</button>
  )

}

export default Square;