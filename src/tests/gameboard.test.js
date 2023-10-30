import Gameboard from '../classes/gameboard.js'

const deepSea = new Gameboard;

describe('Gameboard', () => {
    describe('Ship placing', () => {
        beforeEach(() => {
            deepSea.placeShip(['a1', 'a2', 'a3']);
        });
            it('Battleship placing', () => {
                expect(deepSea.docks).toEqual([
                    {
                        length: 3,
                        hitPoints: 3,
                        coordinates: ['a1', 'a2', 'a3']
                    }
                ]);
            });

            it('Trying to place destroyer on occupied space', () => {
                expect(deepSea.placeShip(['a1', 'b1'])).toBeFalsy;
            });
            
        afterEach(() => {
            deepSea.docks = [];
        })
    });
});