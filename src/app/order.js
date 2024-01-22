const BURGER_CLASS = ".burger";
const LETTUCE_CLASS = ".lettuce";
const TOMATO_CLASS = ".tomato";
const BURGER_TOP_CLASS = ".burger.top";
const BURGER_BOTTOM_CLASS = ".burger.bottom";

class Order {
    burgers;
    lettuce;
    tomato;
    burgerTop;
    burgerBottom;

    constructor(
        burgers,
        lettuce,
        tomato,
        burgerTop,
        burgerBottom
    ) {
        this.burgers = burgers;
        this.lettuce = lettuce;
        this.tomato = tomato;
        this.burgerTop = burgerTop;
        this.burgerBottom = burgerBottom;
    }
}

function loadAssets() {
    let burgerEntities = document.querySelectorAll(BURGER_CLASS);
    let lettuceEntities = document.querySelectorAll(BURGER_CLASS);
    let tomatoEntities = document.querySelectorAll(BURGER_CLASS);
    let burgerTopEntities = document.querySelectorAll(BURGER_CLASS);
    let burgerBottomEntities = document.querySelectorAll(BURGER_CLASS);

    let order = new Order(
        burgerEntities,
        lettuceEntities,
        tomatoEntities,
        burgerTopEntities,
        burgerBottomEntities);

    return {
        get: () => order,
        set: (newOrder) => order = newOrder
    }
}

window.onload = () => {
    console.log(loadAssets().get());
}

function resolveOrder(componentList) {
    
}

function checkOrder(orderList) {

}