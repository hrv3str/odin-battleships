class Player {
    constructor () {
        this.isCPU = false;
        this.turn = undefined;
    };

    switchToCPU () {
        this.isCPU = true;
    }

    startTurn () {
        this.turn = new Promise ((resolve, reject) => {
            this.resolveTurn = resolve;
        })
    }

    endTurn () {
        if (this.resolveTurn) this.resolveTurn();
    }

    pickRandomCoordinates () {
        const x = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        const y = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
        const index = () => {
            return Math.floor(Math.random() * 10);
        }

        return x[index()] + y[index()];
    }
}

export default Player