
let assets;
let orderList = [];
let userList = [];

window.onload = () => {
    reload();

    teleport();
    pickup();
}

function reload() {
    assets = loader.load().get();
    userList = assets.items;
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
    originalList.push("BurgerBottom");


    if (originalList.length == 0)
        return [];
    return originalList;
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
    
    correctFlag = compareListEquel(orderList, userList);
    if (correctFlag){
        alert("The order is correct");
        location.reload();
    }
    else {
        alert("The order is incorrect");
        reload();
    }
}