let swBool = false;
let obbCollisionStarted = false;
let gripDown = false;
let interactedObject;

function pickup() {
    if (obbCollisionStarted && gripDown && !swBool) {
        // Get the hand element
        let hand = document.getElementById("rightHand");

        // Get the box element

        // Clone the box element
        let clonedObject = interactedObject.cloneNode(true);
        clonedObject.removeAttribute("obb-collider");
        interactedObject.setAttribute("visible", "false");

        // Modify the position attribute of the cloned box
        clonedObject.setAttribute("position", "0 0 0");
        clonedObject.setAttribute("id", "cloneobject");

        // Append the cloned box to the hand element
        hand.appendChild(clonedObject);
        swBool = true;
    }
}

function release() {
    swBool = false
    let cloneobject = document.getElementById("cloneobject")
    let hand = document.getElementById("rightHand");
    const position = hand.getAttribute("position")
    const rotation = hand.getAttribute("rotation")
    cloneobject.remove();
    interactedObject.setAttribute("position", position)
    interactedObject.setAttribute("rotation", rotation)
    interactedObject.setAttribute("visible", "true");
}

const main = () => {
    let objectList = document.getElementsByClassName("js--interact")
    let hand = document.getElementById("rightHand");
    let stovecol = document.getElementById("stove")
    let platecol = document.getElementById("plate")

    for (let i = 0; i < objectList.length; i++) {
        const object = objectList[i];
    object.addEventListener("obbcollisionstarted", function () {
        obbCollisionStarted = true;
        if (!gripDown) {
           interactedObject = object 
        }
        pickup();
    });
    object.addEventListener("obbcollisionended", function () {
        obbCollisionStarted = false;
    });
    }

    hand.addEventListener("gripdown", function () {
        gripDown = true;
        if (interactedObject != null) {
            pickup();
        }
    });

    // Reset the flags when the corresponding events end


    hand.addEventListener("gripup", function () {
        gripDown = false;
        release();
        interactedObject = null
    });

    stovecol.addEventListener("obbcollisionstarted", function () {
        if (!gripDown) {
            interactedObject.setAttribute("position", stovecol.getAttribute("position"))
            interactedObject.setAttribute("rotation", "0 0 0")
        }
    });
    platecol.addEventListener("obbcollisionstarted", function () {
        if (!gripDown) {
            //Nu zet hij het ingrediënt de position op de position van het bord en rotation naar 0 0 0 (zodat die horizontaal is)
            interactedObject.setAttribute("position", { x: placeholderPosition.x, y: placeholderPosition.y + stackHeight, z: placeholderPosition.z })
            interactedObject.setAttribute("rotation", "0 0 0")
            stackHeight += 0.03;
        }
    });
    hand.addEventListener("gripup", function () {
        gripDown = false;
        release();
        interactedObject = null
    });
};

window.addEventListener("load", main);