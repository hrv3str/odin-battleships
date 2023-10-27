import Ship from '../classes/ship.js'

const patrolBoat = new Ship (1);
const destroyer = new Ship (2);
const battleship = new Ship (3);
const aircraftCarrier = new Ship (4);

it('Ships have hit-points', () => {
    expect(patrolBoat.hitPoints).toBe(1);
    expect(destroyer.hitPoints).toBe(2);
    expect(battleship.hitPoints).toBe(3);
    expect(aircraftCarrier.hitPoints).toBe(4);
});

describe('Ships take hits and sink', () => {
    beforeEach(() => {
        battleship.hit();
        battleship.hit();
        battleship.hit();
        aircraftCarrier.hit();
    });

    it('Ships can sink', () => {
        expect(battleship.isSunk()).toBeTruthy();
    });

    it('Ships can take hits', () => {
        expect(aircraftCarrier.isSunk()).toBeFalsy();
    });

    afterEach(() => {
        battleship.hitPoints = 3;
        aircraftCarrier.hitPoints = 4;
    });
});