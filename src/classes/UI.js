class UI {
    constructor() {
        this.body = document.body;
    }

    start () {
        this.body.innerHTML = ''
        const plate = document.createElement('div');
        plate.classList.add('plate');
        plate.classList.add('start');
        plate.innerHTML = `
            <h1>NAVAL WARFARE</h1>
            <ul>
                <li>
                    <button id="cpu-game">
                        CPU game
                    </button>
                </li>
                <li>
                    <button id="pvp-game">
                        2 player game
                    </button>
                </li>
            </ul>
        `
        this.body.appendChild(plate);
    }

    game () {
        this.body.innerHTML = ''
        const plate = document.createElement('div');
        plate.classList.add('plate');
        plate.classList.add('game');
        plate.innerHTML = `
            <div>
                <h2>player 1</h2>
                <div class="gameboard"
                    id="gameboard-left">
                </div>
            </div>
            <div>
                <h2>player 2</h2>
                <div class="gameboard"
                    id="gameboard-right">
                </div>
            </div>
        `
        this.body.appendChild(plate);

        const gameboardLeft = document.getElementById('gameboard-left');
        const gameboardRight = document.getElementById('gameboard-right');

        const fillGameboard = (gameboard) => {
            const createCell = () => {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                gameboard.appendChild(cell);
            }

            for (let i = 0; i < 100; i++) {
                createCell();
            }

            const cellList = gameboard.querySelectorAll('.cell');

            let letter = 'a';
            let number = 1;

            for (let i = 0; i < cellList.length; i++) {
                const coordinate = letter + number;
                cellList[i].dataset.coordinate = coordinate;

                number++

                if (number > 10) {
                    letter = String.fromCharCode(letter.charCodeAt(0) + 1);
                    number = 1;
                }
            }
        }

        fillGameboard(gameboardLeft);
        fillGameboard(gameboardRight);
    }
}

export default UI