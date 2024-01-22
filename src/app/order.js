const BURGER_CLASS = ".burger";
const LETTUCE_CLASS = ".lettuce";
const TOMATO_CLASS = ".tomato";
const BURGER_TOP_CLASS = ".burgertop";
const BURGER_BOTTOM_CLASS = ".burgerbottom";

class OrderSceneComponents {
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
    let order = new OrderSceneComponents();

    return {
        load: () => {
            let burgerEntities = document.querySelectorAll(BURGER_CLASS);
            let lettuceEntities = document.querySelectorAll(LETTUCE_CLASS);
            let tomatoEntities = document.querySelectorAll(TOMATO_CLASS);
            let burgerTopEntities = document.querySelectorAll(BURGER_TOP_CLASS);
            let burgerBottomEntities = document.querySelectorAll(BURGER_BOTTOM_CLASS);
        
            order = new OrderSceneComponents(
                burgerEntities,
                lettuceEntities,
                tomatoEntities,
                burgerTopEntities,
                burgerBottomEntities);

            return {
                get: () => order,
                set: (newOrderSceneComponents) => order = newOrderSceneComponents,
            }
        },
        reload: () => order = new OrderSceneComponents(
                document.querySelectorAll(BURGER_CLASS),
                document.querySelectorAll(LETTUCE_CLASS),
                document.querySelectorAll(TOMATO_CLASS),
                document.querySelectorAll(BURGER_TOP_CLASS),
                document.querySelectorAll(BURGER_BOTTOM_CLASS)),
        get: () => order
        
    }
}

let assets = new OrderSceneComponents();
let orderList = [];

window.onload = () => {
    assets = loadAssets().load().get();
    orderList = resolveOrderSceneComponents(assets);

    teleport();
}

function resolveOrderSceneComponents(componentList) {
    const originalList = [];

    let burgerAmount = componentList.burgers.length;
    let lettuceAmount = componentList.lettuce.length;
    let tomatoAmount = componentList.tomato.length;
    
    if (burgerAmount > 0) 
        originalList.push("Burger");
    if (lettuceAmount > 0) 
        originalList.push("Lettuce");
    if (tomatoAmount > 0) 
        originalList.push("Tomato");

    if (originalList.length == 0)
        return [];
    return randomizeAndRefactor(originalList);

}

function randomizeAndRefactor(list) {
    function rearrange(list) {
        const result = [...list]; // Create a new array to avoid modifying the original array
    
        // Rearrange the list with randomness
        for (let i = result.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [result[i], result[j]] = [result[j], result[i]];
        }
    
        return result;
      }
    
      const rearrangedList = rearrange(list);
      rearrangedList.unshift("BurgerTop");
      rearrangedList.push("BurgerBottom");
    
      return rearrangedList;
}

function checkOrder() {
    alert("Working")
}