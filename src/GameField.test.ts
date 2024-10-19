import { GameField } from "./GameField";

describe("GameField", () => {
  describe("public interface", () => {
    it("is a class", () => {
      expect(GameField).toBeInstanceOf(Function);
      expect(new GameField()).toBeInstanceOf(GameField);
    });

    it("has a function getState", () => {
      const gameField = new GameField();
      expect(gameField.getState).toBeInstanceOf(Function);
      expect(gameField.getState()).toEqual([[]]);
    });
  });

  describe("functional tests", () => {
    const width = 2;
    const height = 3;
    let gameField: GameField;
    beforeEach(() => {
      gameField = new GameField(width, height);
    });

    it("supports settings side from constructor", () => {
      expect(gameField.getState()).toEqual([
        [0, 0],
        [0, 0],
        [0, 0],
      ]);
    });

    it("has .toggleCellState method", () => {
      expect(gameField.toggleCellState).toBeInstanceOf(Function);
      //console.log('l 36   ', gameField.getState());
      const [x1, y1] = [0, 0];
      const [x2, y2] = [1, 2];
      gameField.toggleCellState(x1, y1);
      gameField.toggleCellState(x2, y2);

      expect(gameField.getState()).toEqual([
        [1, 0],
        [0, 0],
        [0, 1],
      ]);
      gameField.toggleCellState(x2, y2);

      expect(gameField.getState()).toEqual([
        [1, 0],
        [0, 0],
        [0, 0],
      ]);
    });

    it("has method .nextGeneration", () => {
      expect(gameField.nextGeneration).toBeInstanceOf(Function);
      const [x1, y1] = [0, 0];
      const [x2, y2] = [1, 2];
      gameField.toggleCellState(x1, y1);
      gameField.toggleCellState(x2, y2);
      //console.log('l 62  ', gameField.getState());
      expect(gameField.getState()).toEqual([
        [1, 0],
        [0, 0],
        [0, 1],
      ]);
      gameField.nextGeneration();
      console.log('l 69  ', gameField.getState());
      expect(gameField.getState()).toEqual([
        [0, 0],
        [0, 0],
        [0, 0],
      ]);
      gameField.toggleCellState(0, 0);
      gameField.toggleCellState(1, 0);
      gameField.toggleCellState(0, 1);
      //console.log('l 78  ', gameField.getState());
      expect(gameField.getState()).toEqual([
        [1, 1],
        [1, 0],
        [0, 0],
      ]);
      gameField.nextGeneration();
      //console.log('l 85  ', gameField.getState());
      expect(gameField.getState()).toEqual([
        [1, 1],
        [1, 1],
        [0, 0],
      ]);
    });

    it("has method .setSize(newWidth, newHeight)", () => {
      gameField.toggleCellState(0, 0);
      gameField.toggleCellState(1, 1);
      gameField.toggleCellState(0, 2);
      expect(gameField.getState()).toEqual([
        [1, 0],
        [0, 1],
        [1, 0],
      ]);
      gameField.setSize(3, 4);
      expect(gameField.getState()).toEqual([
        [1, 0, 0],
        [0, 1, 0],
        [1, 0, 0],
        [0, 0, 0],
      ]);
      gameField.setSize(2, 2);
      expect(gameField.getState()).toEqual([
        [1, 0],
        [0, 1],
      ]);
    });
    
  });
});
