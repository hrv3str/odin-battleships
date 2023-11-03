class UI {
    constructor() {
        this.body = document.body;
        this.gameboardLeft = undefined;
        this.gameboardRight = undefined;
        this.cellsLeft = undefined;
        this.cellsRight = undefined;
        this.sourceRight = undefined;
        this.sourceLeft = undefined;
    }

    linkSources (left, right) {
        this.sourceLeft = left;
        this.sourceRight = right;
    }

    startScreen () {
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

    gameScreen () {
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

        this.gameboardLeft = document.getElementById('gameboard-left');
        this.gameboardRight = document.getElementById('gameboard-right');

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
                cellList[i].dataset.y = letter;
                cellList[i].dataset.x = number;

                number++

                if (number > 10) {
                    letter = String.fromCharCode(letter.charCodeAt(0) + 1);
                    number = 1;
                }
            }
        }

        fillGameboard(this.gameboardLeft);
        fillGameboard(this.gameboardRight);
        this.cellsLeft = this.gameboardLeft.querySelectorAll('.cell');
        this.cellsRight = this.gameboardRight.querySelectorAll('.cell');
    }

    

    searchCell (x, y) {
        for (let i = 0; i < this.cellsLeft.length; i++) {
            const cell = this.cellsLeft[i];
            if (cell.dataset.x === x && cell.dataset.y === y) return cell;
        }
    }

    refreshBoard () {
        const source = this.sourceLeft;
        const shipQ = [];
        const docks = source.docks;
        const misses = source.misses;
        const hits = source.hits;

        const translate = (item) => {
            const translatedCoordinates = [...item];
            const [x, y] = translatedCoordinates;
            return [y, x];
        }

        docks.forEach(ship => {
            ship.coordinates.forEach(item => {
                shipQ.push(item);
            })
        });

        shipQ.forEach(item => {
            const translation = translate(item);
            console.log(...translation);
            const cell = this.searchCell(...translation);
            console.log(cell);
            cell.classList.add('ship-body');
        });

        misses.forEach(item => {
            const translation = translate(item);
            const cell = this.searchCell(...translation);
            const prop = document.createElement('span');
            prop.classList.add('miss');
            cell.appendChild(prop);
        });

        hits.forEach(item => {
            const translation = translate(item);
            const cell = this.searchCell(...translation);
            const prop = document.createElement('span');
            prop.classList.add('hit');
            cell.appendChild(prop);
        })

        
    }

    placeBattleship (shipLength) {
        let rotation = 'vertical'
        const length = shipLength;

        const rotate = (e) => {
            if (e.key === 'r' || e.key === 'R') {
                if (rotation === 'horizontal') rotation = 'vertical';
                else rotation = 'horizontal';
            } else return
        }

        const shipFrame = (e) => {
            const target = e.target;

            const template = []

            switch (rotation) {
                case 'horizontal':
                    if (target.dataset.x < length) return;
                    for (let i = 0; i < length; i++) {
                        const x = (parseInt(target.dataset.x) - length + 1 + i).toString();
                        const cell = this.searchCell(x, target.dataset.y);
                        template.push(cell);
                    }
                    break;
                case 'vertical':
                    if(!target.dataset.y) return;
                    for (let i = 0; i < length; i++) {
                        const y = String.fromCharCode(target.dataset.y.charCodeAt(0) - shipLength + 1 + i);
                        if (y < 'a') return;
                        const cell = this.searchCell(target.dataset.x, y);
                        template.push(cell);
                      }
                    break;
            }
            
            const unHover = () => {
                template.forEach(item => {
                    if (item !== undefined && item.classList.contains('hovered')) {
                        item.classList.remove('hovered');
                    }
                })
            }

            template.forEach(item => {
                if (item !== undefined && !item.classList.contains('gameboard')) {
                    item.classList.add('hovered');
                }
            })

            target.addEventListener('mouseleave', unHover);
        }

        this.gameboardLeft.addEventListener('mouseover', shipFrame);
        document.addEventListener('keydown', rotate)
    }
}

export default UI