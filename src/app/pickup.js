function pickupElementsWeb(assets, keyGenerator) {
    const camera = document.getElementById('js--camera');
  
    let hold = null;
  
    const placeholders = document.getElementsByClassName('js--placeholder');
    let scene = document.getElementById('js--scene');

    function checkAttribute(pickupElement) {
      const classNamesToCheck = ['burger', 'lettuce', 'burgerTop', 'burgerBottom', 'cheese'];

      for (const className of classNamesToCheck) {
          if (pickupElement.classList.contains(className)) {
              console.log(`The pickup has the class: ${className}`);
              if (className === 'burger') {
                  assets.setItem(keyGenerator.generateKey(BURGER_KEY_RANGE));
              } 
              else if (className === 'lettuce') {
                assets.setItem(keyGenerator.generateKey(LETTUCE_KEY_RANGE));
              } 
              else if (className === 'cheese') {
                assets.setItem(keyGenerator.generateKey(CHEESE_KEY_RANGE));
              }
              else if (className === 'tomato') {
                assets.setItem(keyGenerator.generateKey(TOMATO_KEY_RANGE));
              } 
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
