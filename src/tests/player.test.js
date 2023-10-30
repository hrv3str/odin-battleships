import Player from '../classes/player.js'

describe('Testing "Player" class', () => {
    const player = new Player;
    describe('Random coordinates generation', () => {
        const regex = /^[a-j][1-9]|10$/;
        it('Regex probe', () => {
            expect(player.pickRandomCoordinates()).toMatch(regex);
            expect(player.pickRandomCoordinates()).toMatch(regex);
            expect(player.pickRandomCoordinates()).toMatch(regex);
        })
    })
});