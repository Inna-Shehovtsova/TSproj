import { GameField, IGameField } from "./GameField";
import { GameView, IGameView } from "./GameView";
import { Cell } from "./types/Cell";

export interface IGame {
  getGameState(): Cell[][];
  getGameStep(): number;
}
export class Game implements IGame {
  field: IGameField;
  view: IGameView;
  stepDurationMs: number;
  state: Cell[][];
  maxGenerations: number;
  timerId: NodeJS.Timeout | string | number | undefined;
  getGameState() {
    return this.state;
  }
  getGameStep() {
    return this.stepDurationMs;
  }
  constructor(field: IGameField, view: IGameView, dur: number = 5) {
    this.field = field;
    this.view = view;
    this.stepDurationMs = dur;
    this.maxGenerations = 1000;
    this.timerId = undefined;
    this.view.onFieldSizeChange((width, height) => {
      this.field.setSize(width, height);
      this.state = this.field.getState();
      //console.log('updateGameField size', this.state);
      this.view.updateGameState({ width: width, height: height });
      this.view.updateGameField(this.state);
      //console.log('after updateGameField size', this.state);
    });

    this.view.onCellClick((x, y) => {
      this.field.toggleCellState(x, y);
      this.state = this.field.getState();
      console.log("updateGameField cellclick", this.state);
      this.view.updateGameField(this.state);
    });

    this.view.onGameStateChange((isPlay) => {
      this.view.updateGameState({ isRunning: isPlay });
      if (isPlay) {
        this.field.nextGeneration();
        this.state = this.field.getState();
        this.view.updateGameField(this.state);

        this.timerId = setInterval(() => {
          this.field.nextGeneration();
          this.state = this.field.getState();
          this.view.updateGameField(this.state);
        }, this.stepDurationMs);
      } else {
        clearInterval(this.timerId);
        this.state = this.field.getState();
        this.view.updateGameField(this.state);
      }
    });
    this.state = field.getState();

    this.view.updateGameState({
      isRunning: false,
      width: this.state[0].length,
      height: this.state.length,
    });

    this.view.updateGameField(this.state);
  }
}
