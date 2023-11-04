import 'normalize.css';
import './styles.css';
import UI from './classes/UI.js';
import Gameboard from './classes/gameboard.js';

const gameboardLeft = new Gameboard;
const gameboardRight = new Gameboard;
const ui = new UI;

ui.linkSources(gameboardLeft, gameboardRight);

ui.gameScreen();
