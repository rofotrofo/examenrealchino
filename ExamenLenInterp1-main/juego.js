var numCircles       = 3,
    colors           = [],
    hexDigit         = ["a","b","c","d","e","f",0,1,2,3,4,5,6,7,8,9],
    pickedColor,
    rectangulos      = document.querySelectorAll(".rect"), 
    colorDisplay     = document.getElementById("hexcolor"),
    messageDisplay   = document.querySelector("#mensaje"),
    scoremessage     = document.querySelector("#scoremes"),
    h1               = document.querySelector("h1"),
    resetButton      = document.querySelector("#resetear"),
    score            = 0,
    highscore        = 0;

initiate();

function initiate (){
  Crear();
  reset();
}

function reset (){
  colors = generateRandomColors(numCircles);
  //pick a new random color from array
  pickedColor = pickRandomColor();
  //change colorDisplay to match pickedColor
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "Nuevos Colores";
  messageDisplay.textContent = "";
  scoremessage.textContent = "";
  //change colors of circles
  for (var i = 0; i < rectangulos.length; i++){
    if (colors[i]){
      rectangulos[i].style.display = "block";
      rectangulos[i].style.background = colors[i];
    } else {
      rectangulos[i].style.display = "none";
    }
  }
}

resetButton.addEventListener("click", function() {
  reset();
})

function Crear (){
  for (var i = 0; i < rectangulos.length; i++) {
    // add click listeners to circles
    rectangulos[i].addEventListener("click", function(){
        // store color of clicked circle
      var rgb = this.style.background;
      function rgb2hex(rgb) {
        if (rgb.search("rgb") == -1) {
          return rgb;
        } else {
          rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
          function hex(x) {
               return ("0" + parseInt(x).toString(16)).slice(-2);
            }
          return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]); 
          }
        }
      var clickedColor = rgb2hex(rgb);
        // compare color to pickedColor
      console.log(clickedColor, pickedColor);
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correcto";
        score++;
        changeColors(clickedColor);
        //await(1000);
        reset();
      } else {
        this.style.background = "#232323";
        messageDisplay.textContent = "Te equivocaste";
        reset();
      }
    });
  }
}

function changeColors (color){
  //loop through all circles
  for (var i = 0; i < rectangulos.length; i++) {
    //change each color to match given color
    rectangulos[i].style.background = color;
    
  }
}

function pickRandomColor (){
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function generateRandomColors (num){
  var arr = [];
  for (var i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}

function randomColor() {
  var hex1 = hexDigit[Math.floor(Math.random() * hexDigit.length)];
  var hex2 = hexDigit[Math.floor(Math.random() * hexDigit.length)];
  var hex3 = hexDigit[Math.floor(Math.random() * hexDigit.length)];
  var hex4 = hexDigit[Math.floor(Math.random() * hexDigit.length)];
  var hex5 = hexDigit[Math.floor(Math.random() * hexDigit.length)];
  var hex6 = hexDigit[Math.floor(Math.random() * hexDigit.length)];
  return "#" + hex1 + hex2 + hex3 + hex4 + hex5 + hex6;
}