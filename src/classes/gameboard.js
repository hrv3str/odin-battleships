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

    // Iterates through all 'coordinates' keys of Ships stored in docks to find if given coordinates are not occupied
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

    // Gets coordinates in the string type
    receiveAttack (string) {
        // Check if coordinates for attack are avaible
        for (const item of this.hits) {
            if (item === string) return false;
        };

        for (const item of this.misses) {
            if (item === string) return false
        };

        // Checks if coordinates are belong to any of ships
        for (const ship of this.docks) {
            for (const item of ship.coordinates) {
                if (item === string) {
                    ship.hit();
                    this.hits.push(string);
                    return true;
                };
            };
        };

        // if not found in ships then coordinates stored in misses
        this.misses.push(string);
        return null
    };

    isFleetSunk () {
        return this.docks.every((ship) => ship.isSunk());
    }
}