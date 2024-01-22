const BURGER_CLASS = ".burger";
const CHEESE_CLASS = ".cheese";
const TOMATO_CLASS = ".tomato";
const BURGER_TOP_CLASS = ".burgertop";
const BURGER_BOTTOM_CLASS = ".burgerbottom";

class OrderSceneComponents {
    burgers;
    cheese;
    tomato;
    burgerTop;
    burgerBottom;

    constructor(
        burgers,
        cheese,
        tomato,
        burgerTop,
        burgerBottom
    ) {
        this.burgers = burgers;
        this.cheese = cheese;
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
            let cheeseEntities = document.querySelectorAll(CHEESE_CLASS);
            let tomatoEntities = document.querySelectorAll(TOMATO_CLASS);
            let burgerTopEntities = document.querySelectorAll(BURGER_TOP_CLASS);
            let burgerBottomEntities = document.querySelectorAll(BURGER_BOTTOM_CLASS);
        
            order = new OrderSceneComponents(
                burgerEntities,
                cheeseEntities,
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
                document.querySelectorAll(CHEESE_CLASS),
                document.querySelectorAll(TOMATO_CLASS),
                document.querySelectorAll(BURGER_TOP_CLASS),
                document.querySelectorAll(BURGER_BOTTOM_CLASS)),
        get: () => order
        
    }
}

const loader = loadAssets();

let assets = new OrderSceneComponents();
let orderList = [];

window.onload = () => {
    assets = loader.load().get();
    orderList = resolveOrderSceneComponents(assets);
    console.log(assets);
    teleport();

    // PICKUP CODE

    let hold = null;
  
    const placeholders = document.getElementsByClassName('js--placeholder');
    let scene = document.getElementById('js--scene');

    function addListeners() {
        let pickups = document.getElementsByClassName('js--pickup');
        for (let i = 0; i < pickups.length; i++) {
          pickups[i].addEventListener('click', function(evt){
            if (hold == null) {
              let cloneObject = this.cloneNode(true);
              cloneObject.setAttribute('position', {x: "1", y:"0.01", z: "-1"});
              cloneObject.setAttribute('rotation', {x: "50", y:"120", z:"-40"});
              cloneObject.setAttribute('id', "js--hold");
              camera.appendChild(cloneObject);
              hold = "box"
              console.log(hold);
              console.log(cloneObject.id)
              this.remove();
            }
          });
        }
      }

    addListeners();

    for (let i = 0; i < placeholders.length; i++) {
        placeholders[i].addEventListener('click', function(evt){
          if (hold == "box"){
            var originalObject = document.getElementById('js--hold');
            var cloneObject = originalObject.cloneNode(true);
            cloneObject.setAttribute("position",{x: '-0.122', y: '1.418', z: '1.317'});
            cloneObject.setAttribute('id', "free");
            scene.appendChild(cloneObject);
            originalObject.parentNode.removeChild(originalObject);
            addListeners();
            hold = null;
          }
        });
      }
}

function resolveOrderSceneComponents(componentList) {
    const originalList = [];

    let burgerAmount = componentList.burgers.length;
    let cheeseAmount = componentList.cheese.length;
    let tomatoAmount = componentList.tomato.length;
    
    if (burgerAmount > 0) 
        originalList.push("Burger");
    if (cheeseAmount > 0) 
        originalList.push("cheese");
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
    let correctFlag = false;
    

    if (correctFlag){

    }
    else {
        alert("The order is incorrect");
        location.reload();
    }
}