const BURGER_KEY_RANGE = { min: 1, max: 50 };
const CHEESE_KEY_RANGE = { min: 51, max: 100 };
const TOMATO_KEY_RANGE = { min: 101, max: 150 };
const LETTUCE_KEY_RANGE = { min: 251, max: 300 };
const BURGER_TOP_KEY_RANGE = { min: 151, max: 200 };
const BURGER_BOTTOM_KEY_RANGE = { min: 201, max: 250 };

class UniqueKeyGenerator {
    constructor() {
        this.usedKeys = new Set();
    }

    generateKey({ min, max }) {
        this.min = min;
        this.max = max;

        if (this.usedKeys.size >= this.max - this.min + 1) {
            console.error("No more unique keys available in the specified range.");
            return null;
        }

        let key;
        do {
            key = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
        } while (this.usedKeys.has(key));

        this.usedKeys.add(key);
        return key;
    }
}