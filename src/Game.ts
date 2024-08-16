import { GameField, IGameField } from "./GameField";
import { GameView, IGameView } from "./GameView";
import { Cell } from "./types/Cell";

export interface IGame {

}
export class Game implements IGame{
    field:IGameField;
    view:IGameView;
    stepDurationMs:number;
    state:Cell[][];
    maxGenerations:number;
    timerId:any;
    constructor(field:IGameField, view:IGameView, dur:number=5){
        this.field = field;
        this.view = view;
        this.stepDurationMs = dur;
        this.maxGenerations = 1000;
        this.timerId = undefined;
        this.view.onFieldSizeChange((width, height)=>{
            this.field.setSize(width, height)
            this.state = field.getState();   
            //console.log('updateGameField size', this.state);
            this.view.updateGameState({width:width, height: height});
            this.view.updateGameField(this.state);
            //console.log('after updateGameField size', this.state);
        });  
     
        this.view.onCellClick((x,y)=>{
            this.field.toggleCellState(x,y);  
            this.state = field.getState(); 
            console.log('updateGameField cellclick', this.state);  
            this.view.updateGameField(this.state);      
        });
        
        this.view.onGameStateChange((isPlay)=>{
            this.view.updateGameState({isRunning: isPlay});    
           
            let i = 1;
            //console.log("dur", this.stepDurationMs);
           //console.log("state", isPlay);
            if(isPlay){
                //console.log("n gen ", i++)
                this.field.nextGeneration();
                this.state = this.field.getState();
                this.view.updateGameField(this.state);
                
                this.timerId = setInterval(()=>{
                    //console.log("n gen ", i++)
                    this.field.nextGeneration();
                    this.state=this.field.getState();
                    this.view.updateGameField(this.state);
                    },
                     this.stepDurationMs);
                    
            }
            else{
                //console.log("clearInterval", this.timerId);
                clearInterval(this.timerId);
                this.state = this.field.getState();
                this.view.updateGameField(this.state);
            }
        });
        this.state = field.getState();
        
        this.view.updateGameState({
            isRunning: false,
            width: this.state[0].length,
            height: this.state.length
          });
        //console.log('updateGameField initial', this.state);
        this.view.updateGameField(this.state);
    

    }
}