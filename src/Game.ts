import { GameField, IGameField } from "./GameField";
import { GameView, IGameView } from "./GameView";
import { Cell } from "./types/Cell";

export interface IGame {

}
export class Game implements IGame{
    field:IGameField;
    view:IGameView;
    stepDurationMs:number;
    constructor(field:IGameField, view:IGameView, dur:number=5){
        this.field = field;
        this.view = view;
        this.stepDurationMs = dur;
    }
}