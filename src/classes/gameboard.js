import Ship from './ship.js'

export default class Gameboard {
    constructor () {
        this.docks = [];
        this.misses = [];
        this.hits = [];
    }

    // Creates 'Ship' object with given array of coordinates and stores it into 'docks' array
    placeShip (coordinatesArray) {
        if (!this.checkDocks(coordinatesArray)) return false;
        const ship = new Ship(coordinatesArray.length);
        ship.coordinates = coordinatesArray;
        this.docks.push(ship);
    }

    checkDocks (coordinatesArray) {
        coordinatesArray.forEach(coordinate => {
            this.docks.forEach(ship => {
                ship.coordinates.forEach(item => {
                    if (item === coordinate) return false
                });
            });
        });

        return true;
    }
}