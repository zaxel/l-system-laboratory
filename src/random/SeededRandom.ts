const MULTIPLIER = 1664525;
const INCREMENT = 1013904223;
const MODULUS = 2 ** 32;

export class SeededRandom {
    private state: number;

    constructor(seed: number) {
        this.state = seed >>> 0;
    }

    next() {
        this.state = (
            this.state * MULTIPLIER +
            INCREMENT
        ) >>> 0;

        return this.state / MODULUS;
    }

    range(min: number, max: number) {
        return min + this.next() * (max - min);
    }

    chance(probability: number) {
        return this.next() < probability;
    }
}