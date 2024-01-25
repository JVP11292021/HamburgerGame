
let assets;
let orderList = [];

window.onload = () => {
    assets = loader.load().get();
    keyGenerator = loader.getKeys();
    orderList = resolveOrderSceneComponents(assets);

    teleport();
    // pickupElementsWeb(assets, keyGenerator);
      
}

function reload() {
    assets = loader.load().get();
    keyGenerator = loader.getKeys();
    orderList = resolveOrderSceneComponents(assets);
    console.log(orderList);
    teleport();
    // pickupElementsWeb(assets, keyGenerator);
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
    correctFlag = compareListEquel(orderList.reverse(), assets.items);

    let scene = document.getElementById('js--scene');
    const SCENE_RELOAD_DELAY = 15000;

    if (correctFlag){
        alert("The order is correct");

        const winText = document.createElement('a-text');
        winText.setAttribute('value', 'You Did It! Game will be reloaded');
        winText.setAttribute('position', '-0.814 1.854 -0.093');
        winText.setAttribute('rotation', '0 90 0');
        winText.setAttribute('color', 'white');
        winText.setAttribute('align', 'center');
        winText.setAttribute('scale', '0.5 0.5 0.5');
        winText.setAttribute('font', 'kelsonsans');
        scene.appendChild(winText);

        setTimeout(() => location.reload(), SCENE_RELOAD_DELAY);
    }
    else {
        alert("The order is incorrect");
        reload();

        const loseText = document.createElement('a-text');
        loseText.setAttribute('value', 'You Lose! Game will be reloaded');
        loseText.setAttribute('position', '-0.814 1.854 -0.093');
        loseText.setAttribute('rotation', '0 90 0');
        loseText.setAttribute('color', 'white');
        loseText.setAttribute('align', 'center');
        loseText.setAttribute('scale', '0.5 0.5 0.5');
        loseText.setAttribute('font', 'kelsonsans');
        scene.appendChild(loseText);

        setTimeout(() => location.reload(), SCENE_RELOAD_DELAY);
    }
}