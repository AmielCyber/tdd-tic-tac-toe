import type  {SquareMark} from "../../../types/Square"
import styles from  "./Square.module.css"

// Button Styles.
const highlightedStyles = `${styles.square} ${styles.highlight}`
const regularStyle = styles.square;

type SquareProps = {
  mark: SquareMark; 
  highlight: boolean;
  squareIndex: number;
}
const Square = ({mark, highlight, squareIndex}: SquareProps) => {
  const buttonStyle = highlight?  highlightedStyles : regularStyle;
  return (
    <button name={`square: ${squareIndex}`} className={buttonStyle}>{mark}</button>
  )

}

export default Square;