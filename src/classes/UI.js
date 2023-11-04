 class UI {
    constructor() {
        this.body = document.body;

        this.gameboard = {
            left: undefined,
            right: undefined
        };

        this.cells = {
            left: undefined,
            right: undefined
        };

        this.source = {
            left:undefined,
            right:undefined
        };

        this.fpMeter = {
            left:undefined,
            right: undefined
        };
    }

    linkSources (left, right) {
        this.source.left = left;
        this.source.right = right;
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
            <div class="panel">
                <h2>player 1</h2>
                <div class="numbers">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                </div>
                <div class="letters">
                    <span>a</span>
                    <span>b</span>
                    <span>c</span>
                    <span>d</span>
                    <span>e</span>
                    <span>f</span>
                    <span>g</span>
                    <span>h</span>
                    <span>i</span>
                    <span>j</span>
                </div>
                <div class="gameboard"
                    id="gameboard-left">
                </div>
                <div class="fleet-power plate">
                    <div id="fp-left"
                        style="width:0%">
                    </div>
                </div>
            </div>
            <div class="panel">
                <h2>player 2</h2>
                <div class="numbers">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                </div>
                <div class="letters">
                    <span>a</span>
                    <span>b</span>
                    <span>c</span>
                    <span>d</span>
                    <span>e</span>
                    <span>f</span>
                    <span>g</span>
                    <span>h</span>
                    <span>i</span>
                    <span>j</span>
                </div>
                <div class="gameboard"
                    id="gameboard-right">
                </div>
                <div class="fleet-power plate">
                    <div id="fp-right"
                        style="width:0%">
                    </div>
                </div>
            </div>
        `
        this.body.appendChild(plate);

        this.gameboard.left = document.getElementById('gameboard-left');
        this.gameboard.right = document.getElementById('gameboard-right');
        this.fpMeter.left = document.getElementById('fp-left');
        this.fpMeter.right = document.getElementById('fp-right');

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

        fillGameboard(this.gameboard.left);
        fillGameboard(this.gameboard.right);
        this.cells.left = this.gameboard.left.querySelectorAll('.cell');
        this.cells.right = this.gameboard.right.querySelectorAll('.cell');
    }

    updatePowerMeter (meter, number) {
        
    }

    async showMessage(string) {
        return new Promise((resolve) => {
          const background = this.body.firstElementChild;
          background.style.pointerEvents = 'none';
          const body = document.createElement('div');
          body.classList.add('plate');
          body.classList.add('message');
          body.innerHTML = `
            <h2>Attention!</h2>
            <p>${string}</p>
            <button>OK</button>
          `;
          this.body.appendChild(body);
          body.style.animationName = 'appear';
      
          const removeMessage = () => {
            body.style.animationName = 'disappear';
            body.addEventListener('animationend', () => {
              this.body.removeChild(body);
              background.style.pointerEvents = 'all';
              resolve(); // Resolve the promise when the "OK" button is clicked
            });
          };
      
          const button = body.querySelector('button');
          button.addEventListener('click', removeMessage);
        });
    }

    searchCell (x, y) {
        for (let i = 0; i < this.cells.left.length; i++) {
            const cell = this.cells.left[i];
            if (cell.dataset.x === x && cell.dataset.y === y) return cell;
        }
    }

    refreshBoard () {
        const source = this.source.left;
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

        this.gameboard.left.addEventListener('mouseover', shipFrame);
        document.addEventListener('keydown', rotate)
    }
}

export default UI