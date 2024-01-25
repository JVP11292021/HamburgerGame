
function pickupElementsWeb(assets, keyGenerator) {
  const camera = document.getElementById('js--camera');
  let hold = null;
  let stackHeight = 0;
  const placeholders = document.getElementsByClassName('js--placeholder');
  let scene = document.getElementById('js--scene');
  var sound = document.querySelector('[sound]');
  

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

  function handleObjectPlacement(targetElement) {
    let pickups = document.getElementsByClassName('js--pickup');
    for (let i = 0; i < pickups.length; i++) { 
      if (hold == "box") {
        var originalObject = document.getElementById('js--hold');
        var cloneObject = originalObject.cloneNode(true);
    
        if (targetElement.classList.contains("stove")) {
          cloneObject.setAttribute("position", { x: '-0.122', y: '1.418', z: '1.317' });
          cloneObject.setAttribute('id', "free");
          scene.appendChild(cloneObject);
          originalObject.parentNode.removeChild(originalObject);
          sound.components.sound.playSound();
          addListeners();
          hold = null;
        } else if (targetElement.classList.contains("plate")) {
          checkAttribute(pickups[i])
          const placeholderPosition = targetElement.getAttribute('position');
          cloneObject.setAttribute("position", { x: placeholderPosition.x, y: placeholderPosition.y + stackHeight, z: placeholderPosition.z });
          stackHeight += 0.03;
          cloneObject.setAttribute('id', "free");
          scene.appendChild(cloneObject);
          originalObject.parentNode.removeChild(originalObject);
          addListeners();
          hold = null;
        }
      }
    }
  }

  addListeners();

  for (let i = 0; i < placeholders.length; i++) {
    placeholders[i].addEventListener('click', function (evt) {
      handleObjectPlacement(this);
    });
  }
}

