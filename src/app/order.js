const BURGER_CLASS = ".burger";
const LETTUCE_CLASS = ".lettuce";
const CHEESE_CLASS = ".cheese";
const TOMATO_CLASS = ".tomato";
const BURGER_TOP_CLASS = ".burgertop";
const BURGER_BOTTOM_CLASS = ".burgerbottom";

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

class OrderSceneComponents {
    constructor(
        burgers,
        cheese,
        tomato,
        lettuce,
        burgerTop,
        burgerBottom
    ) {
        this.burgers = Array.from(burgers).map(element => ({ key: null, element }));
        this.cheese = Array.from(cheese).map(element => ({ key: null, element }));
        this.tomato = Array.from(tomato).map(element => ({ key: null, element }));
        this.lettuce = Array.from(lettuce).map(element => ({ key: null, element }));
        this.burgerTop = Array.from(burgerTop).map(element => ({ key: null, element }));
        this.burgerBottom = Array.from(burgerBottom).map(element => ({ key: null, element }));
    }

    setKeys(keyGenerator) {
        this.burgers.forEach(item => item.key = keyGenerator.generateKey({ min: 1, max: 50 }));
        this.cheese.forEach(item => item.key = keyGenerator.generateKey({ min: 51, max: 100 }));
        this.tomato.forEach(item => item.key = keyGenerator.generateKey({ min: 101, max: 150 }));
        this.lettuce.forEach(item => item.key = keyGenerator.generateKey({ min: 251, max: 300 }));
        this.burgerTop.forEach(item => item.key = keyGenerator.generateKey({ min: 151, max: 200 }));
        this.burgerBottom.forEach(item => item.key = keyGenerator.generateKey({ min: 201, max: 250 }));
    }
}

function loadAssets() {
    const keyGenerator = new UniqueKeyGenerator();

    let order;

    return {
        load: () => {
            let burgerEntities = document.querySelectorAll(BURGER_CLASS);
            let cheeseEntities = document.querySelectorAll(CHEESE_CLASS);
            let tomatoEntities = document.querySelectorAll(TOMATO_CLASS);
            let lettuceEntities = document.querySelectorAll(LETTUCE_CLASS);
            let burgerTopEntities = document.querySelectorAll(BURGER_TOP_CLASS);
            let burgerBottomEntities = document.querySelectorAll(BURGER_BOTTOM_CLASS);

            order = new OrderSceneComponents(
                burgerEntities,
                cheeseEntities,
                tomatoEntities,
                lettuceEntities,
                burgerTopEntities,
                burgerBottomEntities
            );

            order.setKeys(keyGenerator);

            return {
                get: () => order,
                set: (newOrderSceneComponents) => order = newOrderSceneComponents,
            };
        },
        reload: () => {
            order.setKeys(keyGenerator);
            order = new OrderSceneComponents(
                Array.from(document.querySelectorAll(BURGER_CLASS)),
                Array.from(document.querySelectorAll(CHEESE_CLASS)),
                Array.from(document.querySelectorAll(TOMATO_CLASS)),
                Array.from(document.querySelectorAll(LETTUCE_CLASS)),
                Array.from(document.querySelectorAll(BURGER_TOP_CLASS)),
                Array.from(document.querySelectorAll(BURGER_BOTTOM_CLASS))
            );
        },
        get: () => order,
    };
}

const loader = loadAssets();

let assets;
let orderList = [];

window.onload = () => {
    reload();

    teleport();
    pickup();
}

function reload() {
    assets = loader.load().get();
    orderList = resolveOrderSceneComponents(assets);
    console.log(assets);
}

function resolveOrderSceneComponents(componentList) {
    const originalList = [];

    let burgerAmount = componentList.burgers.length;
    let cheeseAmount = componentList.cheese.length;
    let tomatoAmount = componentList.tomato.length;
    let lettuceAmount = componentList.lettuce.length;

    originalList.push("BurgerTop");
    if (cheeseAmount > 0) 
        originalList.push("Cheese");
    if (tomatoAmount > 0) 
        originalList.push("Tomato");
    if (lettuceAmount > 0) 
        originalList.push("Lettuce");
    if (burgerAmount > 0) 
        originalList.push("Burger");
    shuffledList.push("BurgerBottom");


    if (originalList.length == 0)
        return [];
    return randomizeAndRefactor(originalList);
}

// For replayability
function randomizeAndRefactor(list) {
    function rearrange(list) {
        const result = [...list];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }

        return result;
    }

    const keys = list.map(element => element.toLowerCase());
    const shuffledKeys = rearrange(keys);
    const shuffledList = shuffledKeys.map(key => key.charAt(0).toUpperCase() + key.slice(1));

    shuffledList.unshift("BurgerTop");
    shuffledList.push("BurgerBottom");

    return { keys: shuffledKeys, shuffledList };
}

function compareListEquel(originalList, listToCheck) {
    if (originalList.length !== listToCheck.length) {
        return false;
    }
    for (let i = 0; i < originalList.length; i++) {
        if (originalList[i] !== listToCheck[i]) {
            return false;
        }
    }
    return true;
}

function checkOrder() {
    let correctFlag = false;
    
    correctFlag = compareListEquel(orderList, orderList);
    if (correctFlag){
        alert("The order is correct");
        location.reload();
    }
    else {
        alert("The order is incorrect");
        reload();
    }
}