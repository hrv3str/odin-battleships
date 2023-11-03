import 'normalize.css';
import './styles.css';
import UI from './classes/UI.js';
import Gameboard from './classes/gameboard.js';

const gameboardLeft = new Gameboard;
const gameboardRight = new Gameboard;
const ui = new UI;

ui.linkSources(gameboardLeft, gameboardRight);

ui.gameScreen();

const battleship = ['b2', 'b3', 'b4'];
const aircraftCarrier = ['b9', 'c9', 'd9', 'e9'];
const patrolBoat = ['j1'];
const destroyer = ['f5', 'e5'];
gameboardLeft.placeShip(battleship);
gameboardLeft.placeShip(aircraftCarrier);
gameboardLeft.placeShip(patrolBoat);
gameboardLeft.placeShip(destroyer);
gameboardLeft.receiveAttack('b3');
gameboardLeft.receiveAttack('b5');

ui.refreshBoard();
