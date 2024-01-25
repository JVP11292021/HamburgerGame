let swBool = false;
let obbCollisionStarted = false;
let gripDown = false;
let interactedObject;

function pickup() {
    if (obbCollisionStarted && gripDown && !swBool) {
        // Get the hand element
        let object = document.getElementById("burgert")
        let hand = document.getElementById("rightHand");

        // Get the box element
        object.setAttribute("visible", "false");

        // Clone the box element
        let clonedObject = object.cloneNode(true);

        // Modify the position attribute of the cloned box
        clonedObject.setAttribute("position", "0 0 0");
        clonedObject.setAttribute("id", "cloneobject");
        clonedObject.removeAttribute("obb-collision");

        // Append the cloned box to the hand element
        hand.appendChild(clonedObject);

        swBool = true;
    }
}

function release() {
    swBool = false
    let cloneobject = document.getElementById("cloneobject")
    let hand = document.getElementById("rightHand");
    let box = document.getElementById("box");
    const position = hand.getAttribute("position")
    const rotation = hand.getAttribute("rotation")
    cloneobject.remove();
    box.setAttribute("position", position)
    box.setAttribute("rotation", rotation)
    box.setAttribute("visible", "true");
}

const main = () => {
    let objectList = document.getElementsByClassName("js--interact")
    let hand = document.getElementById("rightHand");

    for (let i = 0; i < objectList.length; i++) {
        const object = objectList[i];
    object.addEventListener("obbcollisionstarted", function () {
        obbCollisionStarted = true;
        pickup();
    });
    object.addEventListener("obbcollisionended", function () {
        obbCollisionStarted = false;
    });
    }

    hand.addEventListener("gripdown", function () {
        gripDown = true;
        pickup();
    });

    // Reset the flags when the corresponding events end


    hand.addEventListener("gripup", function () {
        gripDown = false;
        release();
    });
};

window.addEventListener("load", main);