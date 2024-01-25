function pickupElementsWeb(assets, keyGenerator) {
  const camera = document.getElementById('js--camera');

  let hold = null;

  const placeholders = document.getElementsByClassName('js--placeholder');
  let scene = document.getElementById('js--scene');

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

  function addListeners() {
    let pickups = document.getElementsByClassName('js--pickup');
    for (let i = 0; i < pickups.length; i++) {
      pickups[i].addEventListener('click', function(evt){
        if (hold == null) {
          checkAttribute(this);
          let cloneObject = this.cloneNode(true);
          cloneObject.setAttribute('position', {x: "1", y:"0.01", z: "-1"});
          cloneObject.setAttribute('rotation', {x: "50", y:"120", z:"-40"});
          cloneObject.setAttribute('id', "js--hold");
          camera.appendChild(cloneObject);
          hold = "box"
          this.remove();
        }
      });
    }
  } 

  addListeners();

  // for (let i = 0; i < placeholders.length; i++) {
  //     placeholders[i].addEventListener('click', function(evt){
  //         if (hold == "box"){
  //             var originalObject = document.getElementById('js--hold');
  //             var cloneObject = originalObject.cloneNode(true);
  //             // Set the position of the cloned object to the position of the placeholder
  //             const placeholderPosition = this.getAttribute('position');
  //             cloneObject.setAttribute("position", placeholderPosition);
  //             cloneObject.setAttribute('id', "free");
  //             scene.appendChild(cloneObject);
  //             originalObject.parentNode.removeChild(originalObject);
  //             addListeners();
  //             hold = null;
  //         }
  //     });
  // }

  let stackHeight = 0;

  for (let i = 0; i < placeholders.length; i++) {
      placeholders[i].addEventListener('click', function(evt){
          if (hold == "box"){
              var originalObject = document.getElementById('js--hold');
              var cloneObject = originalObject.cloneNode(true);
              
              // Set the position of the cloned object to the position of the placeholder
              const placeholderPosition = this.getAttribute('position');
              
              // Adjust the y-coordinate based on the current height of the stack
              cloneObject.setAttribute("position", { x: placeholderPosition.x, y: placeholderPosition.y + stackHeight, z: placeholderPosition.z });
              stackHeight += 0.03; // Adjust this value as needed
              
              cloneObject.setAttribute('id', "free");
              scene.appendChild(cloneObject);
              originalObject.parentNode.removeChild(originalObject);
              addListeners();
              hold = null;
          }
      });
  }
  // let stackHeight = 0;

// for (let i = 0; i < placeholders.length; i++) {
//     placeholders[i].addEventListener('click', function(evt){
//         if (hold == "box"){
//             var originalObject = document.getElementById('js--hold');
//             var cloneObject = originalObject.cloneNode(true);

//             // Set the position of the cloned object to the position of the placeholder
//             const placeholderPosition = this.getAttribute('position');

//             // Get the bounding box of the originalObject
//             const boundingBox = new THREE.Box3().setFromObject(originalObject.object3D);
//             const objectHeight = (boundingBox.max.y - boundingBox.min.y)/2;

//             if (originalObject.classList.contains('burgerBottom')) 
//               stackHeight = 0;
//             else
//               stackHeight = objectHeight * 0.5;

//             cloneObject.setAttribute("position", { x: placeholderPosition.x, y: placeholderPosition.y + stackHeight, z: placeholderPosition.z });
//             console.log(stackHeight);           
//             cloneObject.setAttribute('id', "free");
//             scene.appendChild(cloneObject);
//             originalObject.parentNode.removeChild(originalObject);
//             addListeners();
//             hold = null;
//         }
//     });
// }

}

