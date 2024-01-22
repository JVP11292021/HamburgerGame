const BURGER_CLASS = ".burger";
const LETTUCE_CLASS = ".lettuce";
const TOMATO_CLASS = ".tomato";
const BURGER_TOP_CLASS = ".burgertop";
const BURGER_BOTTOM_CLASS = ".burgerbottom";

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
    let order = new Order();

    return {
        load: () => {
            let burgerEntities = document.querySelectorAll(BURGER_CLASS);
            let lettuceEntities = document.querySelectorAll(LETTUCE_CLASS);
            let tomatoEntities = document.querySelectorAll(TOMATO_CLASS);
            let burgerTopEntities = document.querySelectorAll(BURGER_TOP_CLASS);
            let burgerBottomEntities = document.querySelectorAll(BURGER_BOTTOM_CLASS);
        
            order = new Order(
                burgerEntities,
                lettuceEntities,
                tomatoEntities,
                burgerTopEntities,
                burgerBottomEntities);

            return {
                get: () => order,
                set: (newOrder) => order = newOrder,
            }
        },
        reload: () => order = new Order(
                document.querySelectorAll(BURGER_CLASS),
                document.querySelectorAll(LETTUCE_CLASS),
                document.querySelectorAll(TOMATO_CLASS),
                document.querySelectorAll(BURGER_TOP_CLASS),
                document.querySelectorAll(BURGER_BOTTOM_CLASS)),
        get: () => order
        
    }
}

window.onload = () => {
    const assets = loadAssets().load().get();
    const orderList = resolveOrder(assets);
    console.log(assets);
    // TELEPORT CODE 
    const places = document.getElementsByClassName("js--place");
    const camera = document.getElementById("js--camera");
    const cursor = document.getElementById("js--cursor");
  
    // Teleport camera to position of selected small red sphere
    for (let i = 0; i < places.length; i++) {
      places[i].addEventListener("click", function(e) {
        let att = document.createAttribute("animation");
        att.value = "property: position; easing: linear; dur: 1000; to: " + this.getAttribute("position").x + " 1.6 " + this.getAttribute("position").z;
        camera.setAttribute("animation", att.value);
      });
    }

    pickup()
    teleport()
}

function resolveOrder(componentList) {
    
}

function checkOrder(orderList) {

}