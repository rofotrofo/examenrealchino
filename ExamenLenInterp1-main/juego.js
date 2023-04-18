var numCircles       = 3,
    colors           = [],
    hexDigit         = ["a","b","c","d","e","f",0,1,2,3,4,5,6,7,8,9],
    pickedColor,
    rectangulos      = document.querySelectorAll(".rect"), 
    colorDisplay     = document.getElementById("hexcolor"),
    messageDisplay   = document.querySelector("#mensaje"),
    scoremessage     = document.querySelector("#scoremes"),
    h1               = document.querySelector("h1"),
    resetButton      = document.querySelector("#resetear");

let score            = 0,
    highscore        = localStorage.getItem("high-score") || 0;

    //scoremessage.textContent = `Score: ${scoremessage}`;

scoredisplay();
initiate();

function initiate (){
  Crear();
  reset();
}

function reset (){
  colors = generateRandomColors(numCircles);
  pickedColor = pickRandomColor();
  colorDisplay.textContent = pickedColor;
  resetButton.textContent = "Nuevos Colores";
  //messageDisplay.textContent = `Score: ${score}`;
  //scoremessage.textContent = `Highscore: ${highscore}`;
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

function scoredisplay(){
  if(highscore != null && highscore != undefined)
  {
    scoremessage.textContent = `High Score: ${highscore}`;
  }
}

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
        highscore = score >= highscore ? score : highscore;
        localStorage.setItem("high-score",highscore);
        messageDisplay.textContent = `Score: ${score}`;
        scoremessage.textContent = `High Score: ${highscore}`;
        changeColors(clickedColor);
        //await(1000);
        setTimeout(reset,2000);
        //reset();
      } else {
        this.style.background = "#232323";
        messageDisplay.textContent = "Te equivocaste";
        score===0;
        changeColors(clickedColor);
        setTimeout(reset,1000);
      }
    });
  }
}

function changeColors (color){
  for (var i = 0; i < rectangulos.length; i++) {
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