// window.onload = () => {
  
//     const places = document.getElementsByClassName("js--place");
//     const camera = document.getElementById("js--camera");
//     const cursor = document.getElementById("js--cursor");
  
//     // Teleport camera to position of selected small red sphere
//     for (let i = 0; i < places.length; i++) {
//       places[i].addEventListener("click", function(e) {
//         let att = document.createAttribute("animation");
//         att.value = "property: position; easing: linear; dur: 1000; to: " + this.getAttribute("position").x + " 1.6 " + this.getAttribute("position").z;
//         camera.setAttribute("animation", att.value);
//       });
//     }

//     let hold = null;
  
//     const placeholders = document.getElementsByClassName('js--placeholder');
//     let scene = document.getElementById('js--scene');

//     function addListeners() {
//         let pickups = document.getElementsByClassName('js--pickup');
//         for (let i = 0; i < pickups.length; i++) {
//           pickups[i].addEventListener('click', function(evt){
//             if (hold == null) {
//               let cloneObject = this.cloneNode(true);
//               cloneObject.setAttribute('position', {x: "1", y:"0.01", z: "-1"});
//               cloneObject.setAttribute('rotation', {x: "50", y:"120", z:"-40"});
//               cloneObject.setAttribute('id', "js--hold");
//               camera.appendChild(cloneObject);
//               hold = "box"
//               console.log(hold);
//               console.log(cloneObject.id)
//               this.remove();
//             }
//           });
//         }
//       }

//     addListeners();

//     for (let i = 0; i < placeholders.length; i++) {
//         placeholders[i].addEventListener('click', function(evt){
//           if (hold == "box"){
//             var originalObject = document.getElementById('js--hold');
//             var cloneObject = originalObject.cloneNode(true);
//             cloneObject.setAttribute("position",{x: '-0.122', y: '1.418', z: '1.317'});
//             cloneObject.setAttribute('id', "free");
//             scene.appendChild(cloneObject);
//             originalObject.parentNode.removeChild(originalObject);
//             addListeners();
//             hold = null;
//           }
//         });
//       }

// }