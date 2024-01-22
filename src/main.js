let swBool = false;
let obbCollisionStarted = false;
let gripDown = false;

function pickup() {
    if (obbCollisionStarted && gripDown && !swBool) {
        // Get the hand element
        let hand = document.getElementById("rightHand");

        // Get the box element
        let box = document.getElementById("box");
        box.setAttribute("visible", "false");

        // Clone the box element
        let clonedBox = box.cloneNode(true);

        // Modify the position attribute of the cloned box
        clonedBox.setAttribute("position", "0 0 0");
        clonedBox.setAttribute("id", "clonebox");
        clonedBox.removeAttribute("obb-collision");

        // Append the cloned box to the hand element
        hand.appendChild(clonedBox);

        swBool = true;
    }
}

function release() {
    swBool = false
    let clonebox = document.getElementById("clonebox")
    let hand = document.getElementById("rightHand");
    let box = document.getElementById("box");
    const position = hand.getAttribute("position")
    const rotation = hand.getAttribute("rotation")
    clonebox.remove();
    box.setAttribute("position", position)
    box.setAttribute("rotation", rotation)
    box.setAttribute("visible", "true");
}

const main = () => {
    var box = document.getElementById("box");
    let hand = document.getElementById("rightHand");

    box.addEventListener("obbcollisionstarted", function () {
        obbCollisionStarted = true;
        pickup();
    });

    hand.addEventListener("gripdown", function () {
        gripDown = true;
        pickup();
    });

    // Reset the flags when the corresponding events end
    box.addEventListener("obbcollisionended", function () {
        obbCollisionStarted = false;
    });

    hand.addEventListener("gripup", function () {
        gripDown = false;
        release();
    });
};

window.addEventListener("load", main);