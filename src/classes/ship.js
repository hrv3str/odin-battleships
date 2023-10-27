class Ship {
    constructor (length) {
        this.length = length;
        this.hitPoints = length;
    }

    hit() {
        if (this.hitPoints === 0) return;
        this.hitPoints -= 1;
    }

    isSunk() {
        if (this.hitPoints === 0) return true;
        else return false
    }
}

export default Ship;