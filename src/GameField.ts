import { Cell } from "./types/Cell";

export interface IGameField {
  getState(): Cell[][];
  toggleCellState(x: number, y: number):any;
  nextGeneration():any;
  setSize(width: number, height: number):any;
}

export class GameField implements IGameField{
    state:Cell[][];
    nextState:Cell[][];

    makeField(width:number = 0, height:number = 0):Cell[][]{
        let outer = new Array(height);
        for(let i:number = 0; i< height; i++){
            let inner = new Array(width);
            inner.fill(0);
            outer[i] = inner;
        }
        if(width==0 && height==0)
            outer = [[]];
        return outer;
    }
    constructor(width:number = 0, height:number = 0){
        this.state = this.makeField(width, height);
        this.nextState = this.makeField(width, height);
    }
    getState(): Cell[][]{
        
        return this.state;
    };
    toggleCellState(x: number, y: number):void{
        //console.log("toggle x ", x, " y ", y, " state ", this.state[y][x]," all ",  this.state) ;
        this.state[y][x] = this.state[y][x]?0:1;
        //console.log("end toggle x ", x, " y ", y, " state ", this.state[y][x]," all ",  this.state) ;
    };
    needChange(x:number, y:number, newNeed:boolean = false):boolean{
        let i_init:number =Math.max(x-1, 0);
        let j_init:number =Math.max(y-1, 0);
        let maxX:number = Math.min(this.state.length, x+2);
        let maxY:number = Math.min(this.state[x].length, y+2);
        //console.log("needChange i", i_init, " j ", j_init, " mX ", maxX, " my ", maxY, ' x ', x, ' y ', y);
        let sum:number = 0;
        for(let i = i_init; i<maxX; ++i){
            for(let j = j_init;j<maxY; ++j){
                sum += this.state[i][j];
            }            
        }        
        let needChange:boolean = false;
        if(newNeed )
            {if (this.state[x][y]==0)
            needChange =  sum ===3;}
        else{
           if(this.state[x][y]==1){
                needChange = (sum <3 || sum >4);
            }
        }
       
        //console.log("needChange sum ", sum, " change ", needChange);
        return needChange;
    }
    nextGeneration():any{
        let GrowNew = true;
        for(let i:number = 0; i<this.state.length; i++){
            for (let j:number = 0; j< this.state[i].length; j++){
                if(this.needChange(i,j, GrowNew)){
                    this.toggleCellState(j, i);
                }
            }
        }
        for(let i:number = 0; i<this.state.length; i++){
            for (let j:number = 0; j< this.state[i].length; j++){
                if(this.needChange(i,j)){
                    this.toggleCellState(j, i);
                }
            }
        }
    }

    setSize(width: number, height: number):void{
        let nState:Cell[][] = this.makeField(width, height);
       
        for(let i:number = 0; i< Math.min(this.state.length, height); i++){
            for (let j:number = 0; j<Math.min(this.state[i].length, width); j++){
                    nState[i][j]=this.state[i][j];
            }
        }
        this.state = nState;
    };
}