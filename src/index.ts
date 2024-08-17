import { Game } from "./Game";
import { GameField } from "./GameField";
import { GameView } from "./GameView";
// import "./style/style.css";

const el = document.getElementById("app") as HTMLElement;

const gameView = new GameView(el);
const gameField = new GameField(5, 5);
new Game(gameField, gameView, 1000);
