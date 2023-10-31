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
}

export default UI