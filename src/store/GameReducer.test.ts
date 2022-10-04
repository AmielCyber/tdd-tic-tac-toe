import { SquareType, Game } from "../types/GameTypes";
import {
  getNextPlayer,
  getNextSquares,
  getWinningSet,
  getNextGameStatus,
  getCurrentPlay,
  initialGameHistory,
  handleSquareSelection,
  GameStateAction,
  gameReducer,
} from "./GameReducer";

function getInitialSquares(): SquareType[] {
  return new Array(9).fill("");
}

describe("getNextPlayer", () => {
  test("returns 'X' when current player is O", () => {
    expect(getNextPlayer("O")).toBe("X");
  });
  test("Returns 'O' when current player is X", () => {
    expect(getNextPlayer("X")).toBe("O");
  });
});

describe("getNextSquares", () => {
  const squares = getInitialSquares();

  test("returns a square with the updated index", () => {
    for (let i = 0; i < squares.length; i++) {
      const newSquares = getNextSquares(squares, i, "X");
      expect(newSquares[i]).toBe("X");
    }
  });

  test("returns new squares with the same values if the index is out of bounds", () => {
    expect(getNextSquares(squares, -1, "X")).toStrictEqual(squares);
    expect(getNextSquares(squares, 100, "X")).toStrictEqual(squares);
  });
});

//getWinningSet
describe("getWinningSet", () => {
  const getSquaresWithValues = (line: Array<number>): SquareType[] => {
    const squares = getInitialSquares();
    for (const index of line) {
      squares[index] = "X";
    }
    return squares;
  };
  test("returns null if an empty array is sent.", () => {
    expect(getWinningSet([])).toBe(null);
  });
  test("returns a set containing the winning indices if the squares array has a winning play.", () => {
    const LINES = [
      // Horizontal lines.
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Vertical lines.
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonal lines.
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const line of LINES) {
      const newSquares = getSquaresWithValues(line);
      const expectedSet = new Set(line);
      expect(getWinningSet(newSquares)).toEqual(expectedSet);
    }
  });
  test("returns null if squares has no winning plays.", () => {
    const squares = getInitialSquares();
    expect(getWinningSet(squares)).toBe(null);
  });
});

describe("getNextGameStatus", () => {
  test("returns a string stating which player won if a winning set is passed.", () => {
    const winingSet = new Set([0, 1, 2]);
    expect(getNextGameStatus(winingSet, "X", 6)).toBe("X Won");
    expect(getNextGameStatus(winingSet, "O", 6)).toBe("O Won");
  });
  test("returns 'A Tie' if there are no more moves are available.", () => {
    const FINAL_MOVE = 8;
    expect(getNextGameStatus(null, "X", FINAL_MOVE)).toBe("A Tie");
  });
  test("returns 'Pend' if the game is still at play", () => {
    expect(getNextGameStatus(null, "X", 0)).toBe("Pend");
    expect(getNextGameStatus(null, "O", 0)).toBe("Pend");
  });
});

describe("getCurrentPlay", () => {
  test("throws error if an invalid selectedSquare parameter is sent.", () => {
    expect(() => {
      getCurrentPlay("X", -1);
    }).toThrowError();
    expect(() => {
      getCurrentPlay("X", 9);
    }).toThrowError();
  });
  test("returns a string describing what move was made.", () => {
    for (let squareIndex = 0; squareIndex < 9; squareIndex++) {
      const expectedRow = Math.floor(squareIndex / 3) + 1;
      const expectedCol = (squareIndex % 3) + 1;
      const regexRow = new RegExp("row " + expectedRow);
      const regexCol = new RegExp("column " + expectedCol);

      const returnVal = getCurrentPlay("X", squareIndex);
      expect(returnVal).toMatch(regexRow);
      expect(returnVal).toMatch(regexCol);
    }
  });
});

describe("initialGameHistory constant variable", () => {
  const INITIAL_GAME_HIST = initialGameHistory;
  test("has a length of 1.", () => {
    expect(INITIAL_GAME_HIST).toHaveLength(1);
  });
  describe("In the initial game", () => {
    const INITIAL_GAME = INITIAL_GAME_HIST[0];
    test("player X is next.", () => {
      expect(INITIAL_GAME.getNextPlayer).toBe("X");
    });
    test("the game is pending.", () => {
      expect(INITIAL_GAME.getStatus).toBe("Pend");
    });
    test(", game squares are only empty strings and have a length of 9.", () => {
      const emptySquares: SquareType[] = new Array(9).fill("");
      expect(INITIAL_GAME.getSquares.length).toBe(9);
      expect(INITIAL_GAME.getSquares).toEqual(emptySquares);
    });
    test("winningSquares set is null.", () => {
      expect(INITIAL_GAME.getWinningSet).toBe(null);
    });
    test("currentPlay is an empty string.", () => {
      expect(INITIAL_GAME.getCurrentPlay).toBe("");
    });
  });
});

describe("handleSquareSelection", () => {
  const initialGame: Game[] = initialGameHistory;
  test("selectedSquare parameter throws error if is not within bounds: [0,8].", () => {
    expect(() => handleSquareSelection(initialGame, -1, 0)).toThrowError();
    expect(() => handleSquareSelection(initialGame, 9, 0)).toThrowError();
  });
  test("currMoveNum parameter throws error if is negative or greater than the game's history.", () => {
    expect(() => handleSquareSelection(initialGame, 0, -1)).toThrowError();
    expect(() => handleSquareSelection(initialGame, 0, 1)).toThrowError();
  });
  test("returns an updated Game state with the correct selectedSquare updated.", () => {
    for (let squareIndex = 0; squareIndex < 9; squareIndex++) {
      const newGameHistory = handleSquareSelection(initialGame, squareIndex, 0);
      const newGameSquares = newGameHistory[1].getSquares;
      for (let squareNum = 0; squareNum < 9; squareNum++) {
        if (squareNum !== squareIndex) {
          expect(newGameSquares[squareNum]).toBe("");
        } else {
          expect(newGameSquares[squareNum]).toBe("X");
        }
      }
    }
  });
});

describe("gameReducer", () => {
  const initialGame: Game[] = initialGameHistory;
  test("action.type selected-square returns an updated game state.", () => {
    const action: GameStateAction = {
      type: "selected-square",
      selectedSquareIndex: 4,
      currentMoveNum: 0,
    };
    expect(gameReducer(initialGame, action)).toHaveLength(2);
  });
});
