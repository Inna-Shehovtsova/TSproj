import { Cell } from "./types/Cell";

export interface IGameField {
  getState(): Cell[][];
  toggleCellState(x: number, y: number):any;
  nextGeneration():any;
  setSize(width: number, height: number):any;
}

export class GameField implements IGameField{
    state:Cell[][];
    constructor(width:number = 0, height:number = 0){
        this.state = [[]];
        for(let i:number = 0; i< width; i++){
            for (let j:number = 0; j<height; j++){
                this.state[i][j]=0;
            }
        }
    }
    getState(): Cell[][]{
        
        return this.state;
    };
    toggleCellState(x: number, y: number):void{
        this.state[x][y] = this.state[x][y]===0?1:0;
    };
    nextGeneration():any{};
    setSize(width: number, height: number):void{
        let nState:Cell[][] =[[]];
        for(let i:number = 0; i< width; i++){
            for (let j:number = 0; j<height; j++){
                if(i < this.state.length && j < this.state[i].length)
                    nState[i][j]=this.state[i][j];
                else
                    nState[i][j]=0;

            }
        }
    };
}