import { Cell } from "./types/Cell";

export interface IGameField {
  getState(): Cell[][];
  toggleCellState(x: number, y: number): void;
  nextGeneration(): void;
  setSize(width: number, height: number): void;
}

export class GameField implements IGameField {
  state: Cell[][];
  nextState: Cell[][];

  makeField(width: number = 0, height: number = 0): Cell[][] {
    let outer = new Array(height);
    for (let i: number = 0; i < height; i++) {
      const inner = new Array(width);
      inner.fill(0);
      outer[i] = inner;
    }
    if (width == 0 && height == 0) outer = [[]];
    return outer;
  }
  constructor(width: number = 0, height: number = 0) {
    this.state = this.makeField(width, height);
    this.nextState = this.makeField(width, height);
  }
  getState(): Cell[][] {
    return this.state;
  }
  toggleCellState(x: number, y: number, state:Cell[][]=this.state): void {
    //console.log("toggle x ", x, " y ", y, " state ", this.state[y][x]," all ",  this.state) ;
    state[y][x] = state[y][x] ? 0 : 1;
    //console.log("end toggle x ", x, " y ", y, " state ", this.state[y][x]," all ",  this.state) ;
  }
  makeAlive(x: number, y: number, state:Cell[][]=this.state): boolean {
    const i_init: number = Math.max(x - 1, 0);
    const j_init: number = Math.max(y - 1, 0);
    const maxX: number = Math.min(state.length, x + 2);
    const maxY: number = Math.min(state[x].length, y + 2);
    //console.log("needChange i", i_init, " j ", j_init, " mX ", maxX, " my ", maxY, ' x ', x, ' y ', y);
    let sum: number = 0;
    for (let i = i_init; i < maxX; ++i) {
      for (let j = j_init; j < maxY; ++j) {
        sum += state[i][j];
      }
    }
    let makeAliveTrue = false;
    if (state[x][y] == 0) makeAliveTrue = sum === 3;
   
    if (state[x][y] == 1) {
      makeAliveTrue = sum >2 && sum < 5; 
    } 

    //console.log("needChange sum ", sum, " change ", makeAliveTrue);
    return makeAliveTrue;
  }

  growNew(prevState:Cell[][]):Cell[][]{
    let n = this.makeField(prevState[0].length, prevState.length);
    for (let i: number = 0; i < prevState.length; i++) {
      for (let j: number = 0; j < prevState[i].length; j++) {
        if (this.makeAlive(i, j, prevState)) {
          this.toggleCellState(j, i, n);
        }
      }
    }
    //console.log("grow new", n);
    return n;
  }
  
  nextGeneration(): void {
    //console.log(' state 0 ', this.state);
    this.state = this.growNew(this.state)
    //console.log('next state 1 ', this.state);
 
    this.nextState =this.growNew(this.state);
    //console.log('next state 2', this.nextState);
  }

  copyToNextSize(width: number, height: number, state:Cell[][]){
    const nState: Cell[][] = this.makeField(width, height);

    for (let i: number = 0; i < Math.min(state.length, height); i++) {
      for (let j: number = 0; j < Math.min(state[i].length, width); j++) {
        nState[i][j] = state[i][j];
      }
    }
    return nState;
  }

  setSize(width: number, height: number): void {    
    this.state = this.copyToNextSize(width, height, this.state);
    this.nextState = this.copyToNextSize(width, height, this.nextState );
  }
}
