import { Cell } from "./types/Cell";

export interface IGameView {
  updateGameField(field: Cell[][]):void;
  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  }):void;
  onCellClick(cb: (x: number, y: number) => void):void;
  onGameStateChange(cb: (newState: boolean) => void):void;
  onFieldSizeChange(cb: (width: number, height: number) => void):void;
}
type State = {
  width:number,
  height:number,
  isRunning:boolean
}

export class GameView implements IGameView {
  rootEl:HTMLElement;

  cssAlive:string;
  cssDead:string;
  cssCell:string;
  cssBRun:string;
  cssBStop:string;
  bTextRun:string;
  bTextStop:string;

  state:State;
  cbFn:Map<string, Set<Function>>;
  

 
  updateGameField(field: Cell[][]):void{
    console.log('!!!!updateGameField inner ', field );
    if((this.state.height != field.length) || (this.state.width != field[0].length)){
      console.log('updateGameField .updateGameState', field[0].length, field.length);
      this.updateGameState({width:field[0].length ,height:field.length});
    }
    for(let i =0; i< this.state.height; i++){      
      for (let j = 0; j< this.state.width; j++){        
        let cell = this.rootEl.querySelector(`.pos${i}_${j}`);
        if(field[i][j]){
          cell?.classList.remove(this.cssDead);
          cell?.classList.add(this.cssAlive);
        }
        else{
          cell?.classList.remove(this.cssAlive);
          cell?.classList.add(this.cssDead);
        }        
      }  
    }
  }

  updateGameState(state: {
    width?: number;
    height?: number;
    isRunning?: boolean;
  }):void{
    console.log('updateGameState ', state );
    state.width??=this.state.width;
    state.height??=this.state.height;
    if((state.width != this.state.width)
    || (state.width != this.state.height)){      
      this.cbFn.get("onFieldSizeChange")?.forEach((v1, v2,set)=>{v1(state.width, state.height)});
    }    
    state.isRunning??=this.state.isRunning;
    if(state.isRunning != this.state.isRunning)
      this.cbFn.get("onGameStateChange")?.forEach((v1, v2,set)=>{v1(state.isRunning)});    
  }
 
  onCellClick(cb: (x: number, y: number) => void):void{       
    let f = this.cbFn.get("onCellClick");
    if(!f)
      f  = new Set();
    f.add(cb);
    this.cbFn.set("onCellClick", f);
  }
  onGameStateChange(cb: (newState: boolean) => void):void{
    let f = this.cbFn.get("onGameStateChange");
    if(!f)
      f  = new Set();
    f.add(cb);
    this.cbFn.set("onGameStateChange", f);
  }
  onFieldSizeChange(cb: (width: number, height: number) => void):void{
    
    let f = this.cbFn.get("onFieldSizeChange");
    if(!f)
      f  = new Set();
    f.add(cb);
    this.cbFn.set("onFieldSizeChange", f);
  }
 /* clickPlay(){ 
    let w = Number(
      (this.rootEl.querySelector(
        "input[type='number'].field-size.field-size--width"
      ) as HTMLInputElement).value
    );
    let h = Number( (this.rootEl.querySelector(
        "input[type='number'].field-size.field-size--height" 
      ) as HTMLInputElement).value
      );
    console.log(' clickPlay() update call');
    this.updateGameState({width:w, height:h, isRunning:!this.state});
  }*/
  constructor( el: HTMLElement){
    this.rootEl = el;  
    this.cssAlive = "cell--alive";
    this.cssDead = "cell--dead";
    this.cssCell ="cell" ;
    this.cssBRun = 'run-button--stopped';
    this.cssBStop = 'run-button--runned';
    this.bTextRun= 'Play';
    this.bTextStop= 'Stop';
    this.state = {width:0, height:0, isRunning:false};

    const gameFieldEl = document.createElement('div');
    gameFieldEl.classList.add("gameField");
    this.rootEl.insertAdjacentElement("afterbegin", gameFieldEl);
    const gameControl  = document.createElement('div');
    gameControl.classList.add("gameControls");
    gameControl.innerHTML = `<form>
                    <input type='number' class="field-size field-size--width"></input>
                    <input type='number' class="field-size field-size--height"></input>
                    <button type="button" class="run-button run-button--stopped">${this.bTextRun}
                    </button></form>`;
   
    this.rootEl.insertAdjacentElement("beforeend", gameControl);
    this.rootEl.querySelector(".run-button")?.addEventListener(
      "click",
      (ev)=>{
        let w = Number(
          (this.rootEl.querySelector(
            "input[type='number'].field-size.field-size--width"
          ) as HTMLInputElement).value
        );
        let h = Number( (this.rootEl.querySelector(
            "input[type='number'].field-size.field-size--height" 
          ) as HTMLInputElement).value
          );
        if(ev.bubbles)
        this.updateGameState({width:w, height:h, isRunning:!this.state.isRunning});
      }
    );
    //for jest test
    this.rootEl.querySelector(".run-button").innerHTML = `${this.bTextRun}`;
    this.rootEl.querySelector(".field-size.field-size--width")?.addEventListener(
      "change",
      (ev)=>{if(ev.bubbles){
        let w = Number(
          (this.rootEl.querySelector(
            "input[type='number'].field-size.field-size--width"
          ) as HTMLInputElement).value
        );
        let h = Number( (this.rootEl.querySelector(
            "input[type='number'].field-size.field-size--height" 
          ) as HTMLInputElement).value
          );
        
        console.log("field-size--width updateGameState");
        this.updateGameState({width:w, height:h});}
      }
    );
    this.rootEl.querySelector(".field-size.field-size--height")?.addEventListener(
      "change",
      (ev)=>{if(ev.bubbles){
        let w = Number(
          (this.rootEl.querySelector(
            "input[type='number'].field-size.field-size--width"
          ) as HTMLInputElement).value
        );
        let h = Number( (this.rootEl.querySelector(
            "input[type='number'].field-size.field-size--height" 
          ) as HTMLInputElement).value
          );
          
          console.log("field-size--height updateGameState");
        this.updateGameState({width:w, height:h});}
      }
    );
   
    this.cbFn = new Map();
    this.onFieldSizeChange((width:number, height:number)=>{
      console.log("change size state" , width, height);
      this.state.width = width;
      this.state.height = height;
    });
    this.onFieldSizeChange((width:number, height:number)=>{
      console.log("change size input values" , width, height);
      let w  = this.rootEl.querySelector(
          "input[type='number'].field-size.field-size--width"
        ) as HTMLInputElement;
        w.value =String(width);
      let h =this.rootEl.querySelector(
          "input[type='number'].field-size.field-size--height" 
        ) as HTMLInputElement;
        h.value = String(height);
      
    });
    this.onFieldSizeChange((width:number, height:number)=>{
      console.log("change size div cell" , width, height);
      for(let el of this.rootEl.querySelectorAll(".cell")){el.remove();}
      for(let i =0; i< height; i++){
        let par:HTMLElement = document.createElement('div');
        for (let j = 0; j< width; j++){
          let cell:HTMLElement = document.createElement('div');
          cell.classList.add(this.cssCell);
          cell.classList.add(`pos${i}_${j}`);
          cell.addEventListener("click", ()=>{ 
          this.cbFn.get("onCellClick")?.forEach((v1, v2,set)=>{
            v1( j, i)});
        });
          par.insertAdjacentElement("beforeend", cell);        
        }
        this.rootEl.querySelector(".gameField")?.insertAdjacentElement("beforeend", par);
       
      }
    }
   );
    this.onCellClick((x,y)=>{
      let cell = this.rootEl.querySelector(`pos${x}_${y}`); 
        if(cell?.classList.contains(this.cssAlive)){
          cell?.classList.remove(this.cssAlive);
          cell?.classList.add(this.cssDead);
        }
        else{
          cell?.classList.remove(this.cssDead);
          cell?.classList.add(this.cssAlive);
        }
      });

  this.onGameStateChange((s)=>{this.state.isRunning = s;});
  this.onGameStateChange((s)=>{
    let el = this.rootEl.querySelector(".run-button");
    
    if(el){  
        
    if(s){
      el.classList.remove(this.cssBRun);
      el.classList.add(this.cssBStop);
      el.innerHTML = this.bTextStop;      
      
    }
    else{
      el.classList.remove(this.cssBStop);
      el.classList.add(this.cssBRun);
      el.innerHTML = this.bTextRun;      
    }
    }});
    this.updateGameState(this.state);

  }
}