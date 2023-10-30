import Gameboard from '../classes/gameboard.js'

const deepSea = new Gameboard;

describe('Gameboard', () => {
    deepSea.placeShip(['a1', 'a2', 'a3']);

    describe('Ship placing', () => {
            it('Battleship placing', () => {
                expect(deepSea.docks).toEqual([
                    {
                        length: 3,
                        hitPoints: 2,
                        coordinates: ['a1', 'a2', 'a3']
                    }
                ]);
            });

            it('Trying to place destroyer on occupied space', () => {
                expect(deepSea.placeShip(['a1', 'b1'])).toBeFalsy;
            });
    });

    describe('Attack', () => {
        deepSea.receiveAttack('a2');
        it('Attack on ship', () => {
            expect(deepSea.docks[0].hitPoints).toBe(2);
            expect(deepSea.hits).toEqual(['a2']);
            expect(deepSea.receiveAttack('a3')).toBeTruthy;
        });

        deepSea.receiveAttack('c3');
        it('Miss attack', () => {
            expect(deepSea.misses).toEqual(['c3']);
            expect(deepSea.receiveAttack('c4')).toBe(null);
        });

        it('Attack on the used coordinates', () => {
            expect(deepSea.receiveAttack('c4')).toBeFalsy;
            expect(deepSea.receiveAttack('a2')).toBeFalsy;
        });
    })
});