function teleport () {
  
    const places = document.getElementsByClassName("js--place");
    const camera = document.getElementById("js--camera");
    const cursor = document.getElementById("js--cursor");
  
    // Teleport camera to position of selected small red sphere
    for (let i = 0; i < places.length; i++) {
      places[i].addEventListener("click", function(e) {
        let att = document.createAttribute("animation");
        att.value = "property: position; easing: linear; dur: 1000; to: " + this.getAttribute("position").x + " 1.6 " + this.getAttribute("position").z;
        camera.setAttribute("animation", att.value);
      });
    }
}