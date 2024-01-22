const BURGER_CLASS = ".burger";
const LETTUCE_CLASS = ".lettuce";
const CHEESE_CLASS = ".cheese";
const TOMATO_CLASS = ".tomato";
const BURGER_TOP_CLASS = ".burgertop";
const BURGER_BOTTOM_CLASS = ".burgerbottom";

class OrderSceneComponents {
    constructor(
        burgers,
        cheese,
        tomato,
        lettuce,
        burgerTop,
        burgerBottom
    ) {
        this.items = [];
        this.burgers = Array.from(burgers).map(element => ({ key: null, element }));
        this.cheese = Array.from(cheese).map(element => ({ key: null, element }));
        this.tomato = Array.from(tomato).map(element => ({ key: null, element }));
        this.lettuce = Array.from(lettuce).map(element => ({ key: null, element }));
        this.burgerTop = Array.from(burgerTop).map(element => ({ key: null, element }));
        this.burgerBottom = Array.from(burgerBottom).map(element => ({ key: null, element }));
    }

    setKeys(keyGenerator) {
        this.burgers.forEach(item => item.key = keyGenerator.generateKey(BURGER_KEY_RANGE));
        this.cheese.forEach(item => item.key = keyGenerator.generateKey(CHEESE_KEY_RANGE));
        this.tomato.forEach(item => item.key = keyGenerator.generateKey(TOMATO_KEY_RANGE));
        this.lettuce.forEach(item => item.key = keyGenerator.generateKey(LETTUCE_KEY_RANGE));
        this.burgerTop.forEach(item => item.key = keyGenerator.generateKey(BURGER_TOP_KEY_RANGE));
        this.burgerBottom.forEach(item => item.key = keyGenerator.generateKey(BURGER_BOTTOM_KEY_RANGE));
    }

    setItem(key) {
        this.items.push("BurgerTop");
        if (key > 0 && key < 51)
            this.items.push("Burger");
        if (key > 50 && key < 101)
            this.items.push("Cheese");
        if (key > 100 && key < 151)
            this.items.push("Tomato");
        if (key > 250 && key < 301)
            this.items.push("Lettuce");
        this.items.push("BurgerBottom")
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