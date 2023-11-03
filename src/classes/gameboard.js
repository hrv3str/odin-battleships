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

    // Takes ship coordinates and calculates surrounding coordinates to add to misses array
    surroundWithMisses (ship) {
        // Takes coordinates from ship objject
        const source = ship.coordinates;

        // Iterates trough ship coordinates
        for (const item of source) {
            // deconstruct string to ease operations
            const [letter, number] = item;
            // converts string to number
            const num = parseInt(number);

            // Calculate the set of coordinates, checking if they are an boundaries
            const left = () => {
                if (num - 1 >= 1) {
                    return`${letter}${num - 1}`
                };
            };

            const right = () => {
                if (num + 1 <= 10) {
                    return`${letter}${num + 1}`
                };
            };

            const above = () => {
                const delta = letter.charCodeAt(0) - 1;
                if (String.fromCharCode(delta) >= 'a') {
                    return String.fromCharCode(delta) + number;
                };
            };

            const aboveLeft = () => {
                const deltaY = letter.charCodeAt(0) - 1;
                const deltaX = num - 1;
                if (deltaX >= 1 && String.fromCharCode(deltaY) >= 'a') {
                    return String.fromCharCode(deltaY) + deltaX;
                }
            }

            const aboveRight = () => {
                const deltaY = letter.charCodeAt(0) - 1;
                const deltaX = num + 1;
                if (deltaX <= 10 && String.fromCharCode(deltaY) >= 'a') {
                    return String.fromCharCode(deltaY) + deltaX;
                }
            }

            const below = () => {
                const delta = letter.charCodeAt(0) + 1
                if (String.fromCharCode(delta) <= 'j') {
                    return String.fromCharCode(delta) + number;
                }
            };

            const belowLeft = () => {
                const deltaY = letter.charCodeAt(0) + 1;
                const deltaX = num - 1;
                if (String.fromCharCode(deltaY) <= 'j' && deltaX >= 1) {
                    return String.fromCharCode(deltaY) + deltaX;
                }
            }

            const belowRight = () => {
                const deltaY = letter.charCodeAt(0) + 1;
                const deltaX = num + 1;
                if (String.fromCharCode(deltaY) <= 'j' && deltaX <= 10) {
                    return String.fromCharCode(deltaY) + deltaX;
                }
            }

            // Form output
            const output = [
                    aboveLeft(),
                    above(),
                    aboveRight(),
                    right(),
                    belowRight(),
                    below(),
                    belowLeft(),
                    left()
            ]

            // Check if output items are not used before of are not 'undefined' and push them into misses
            output.forEach(item => {
                if (!this.misses.includes(item) && !source.includes(item) && item !== undefined) {
                    this.misses.push(item);
                };
            });
        };
    };

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
                    if (ship.isSunk()) surroundWithMisses(ship);
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