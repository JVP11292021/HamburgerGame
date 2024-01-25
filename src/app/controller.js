let inHand = false;
let obbCollisionStarted = false;
let gripDown = false;
let interactedObject = null;

function pickup() {
    if (obbCollisionStarted && gripDown && !inHand) {
        // Get the hand element
        let hand = document.getElementById("rightHand");

        // Get the box element

        // Clone the box element
        interactedObject.setAttribute("visible", "false");
        let clonedObject = interactedObject.cloneNode(true);
        clonedObject.removeAttribute("obb-collider");

        // Modify the position attribute of the cloned box
        clonedObject.setAttribute("position", "0 0 0");
        clonedObject.setAttribute("id", "cloneobject");

        // Append the cloned box to the hand element
        hand.appendChild(clonedObject);
        inHand = true;
    }
}

function release() {
    inHand = false
    let cloneobject = document.getElementById("cloneobject")
    let hand = document.getElementById("rightHand");
    const position = hand.getAttribute("position")
    const rotation = hand.getAttribute("rotation")
    cloneobject.remove();
    interactedObject.setAttribute("position", position)
    interactedObject.setAttribute("rotation", rotation)
    interactedObject.setAttribute("visible", "true");
}

function checkAttribute(pickupElement) {
    const classNamesToCheck = ['burger', 'lettuce', 'tomato', 'burgerTop', 'burgerBottom', 'cheese'];

    for (const className of classNamesToCheck) {
        if (pickupElement.classList.contains(className)) {
            if (className === 'burger') 
            assets.setItem(keyGenerator.generateKey(BURGER_KEY_RANGE));
            else if (className === 'lettuce') 
            assets.setItem(keyGenerator.generateKey(LETTUCE_KEY_RANGE));
            else if (className === 'cheese') 
            assets.setItem(keyGenerator.generateKey(CHEESE_KEY_RANGE));
            else if (className === 'tomato') 
            assets.setItem(keyGenerator.generateKey(TOMATO_KEY_RANGE));
            else if (className === 'burgerTop') 
            assets.setItem(keyGenerator.generateKey(BURGER_TOP_KEY_RANGE));
            else if (className === 'burgerBottom') 
            assets.setItem(keyGenerator.generateKey(BURGER_BOTTOM_KEY_RANGE));
            break;
        }
    }
}

const main = () => {
    let stackHeight = 0;
    let bel = document.getElementById("bel")
    let objectList = document.getElementsByClassName("js--interact")
    let hand = document.getElementById("rightHand");
    let stovecol = document.getElementById("col-stove")
    let platecol = document.getElementById("col-plate")

    for (let i = 0; i < objectList.length; i++) {
        const object = objectList[i];
    object.addEventListener("obbcollisionstarted", function (event) {
        console.log(event.currentTarget)
        obbCollisionStarted = true;
        if (!gripDown) {
           interactedObject = object 
        }
        pickup();
    });
    object.addEventListener("obbcollisionended", function () {
        obbCollisionStarted = false;
        if (!gripDown) {
           interactedObject = null 
        }
        
    });
    }

    hand.addEventListener("gripdown", function () {
        gripDown = true;
        if (interactedObject != null) {
            pickup();
            if (interactedObject.getAttribute("data-stackheight") == stackHeight) {
                stackHeight -= 0.03;
            }
            interactedObject.setAttribute("data-stackheight", 0)
        }
    });

    // Reset the flags when the corresponding events end


    hand.addEventListener("gripup", function () {
        release();
        gripDown = false;
    });

    stovecol.addEventListener("obbcollisionstarted", function () {
        if (!gripDown) {
            interactedObject.setAttribute("position", stovecol.getAttribute("position"))
            interactedObject.setAttribute("rotation", "0 0 0")
        }
    });
    platecol.addEventListener("obbcollisionstarted", function () {
        if (!inHand) {
            //Nu zet hij het ingrediënt de position op de position van het bord en rotation naar 0 0 0 (zodat die horizontaal is)
            const placeholderPosition = platecol.getAttribute('position');
            interactedObject.setAttribute("position", { x: placeholderPosition.x, y: placeholderPosition.y + stackHeight, z: placeholderPosition.z })
            interactedObject.setAttribute("rotation", "0 0 0")
            stackHeight += 0.03;
            interactedObject.setAttribute("data-stackheight", stackHeight);
            checkAttribute(interactedObject);
        }
    });
    bel.addEventListener("obbcollisionstarted", function () {
        checkOrder();
    })
    hand.addEventListener("gripup", function () {
        gripDown = false;
        release();
        interactedObject = null
    });
};

window.addEventListener("load", main);