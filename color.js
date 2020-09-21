// let colors = generateRandomColors(numSquares);       //the argument 6 will decide how many colors to generate in the array
let colors = [];       //the argument 6 will decide how many colors to generate in the array
let pickedColor;
let numSquares = 6;
let sq = document.querySelectorAll(".square");
let cd = document.querySelector("#colorDisplay");
let m = document.querySelector("#message");
let h1 = document.querySelector("h1");
let btnReset = document.querySelector("#reset");
let btnModes = document.querySelectorAll(".mode");

init();

function init(){
    setupModeButtons();
    setupSquares();
    reset();
};

function setupModeButtons(){
    for(let i = 0; i < btnModes.length; i++){
        btnModes[i].addEventListener("click", function(){
            btnModes[0].classList.remove("selected");
            btnModes[1].classList.remove("selected");
            this.classList.add("selected");
    
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;   //ternary operator. The same function as if else statement
            // if(this.textContent === "Easy"){
            //     numSquares = 3;
            // }else{
            //     numSquares = 6;
            // }
            reset();
        });
    }
};

function setupSquares(){
    for(let i = 0; i< sq.length; i++){
        // sq[i].style.backgroundColor = colors[i];    //add initial listeners to squares
        sq[i].addEventListener("click", function(){     //add click listeners to squares
            let clickedColor = this.style.backgroundColor;    //grab color of clicked square
            if(clickedColor === pickedColor){   //compare color to pickedColor
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                btnReset.textContent = "Play Again?"
                m.textContent = "Correct!";
            }else{
                this.style.backgroundColor = "#232323";     //hide the square if it's the wrong one
                m.textContent = "Try Again";
            }
        });
        
    };
};

function reset(){
    colors = generateRandomColors(numSquares);    //generate all new colors
    pickedColor = pickColor();    //pick a new random color from array
    cd.textContent = pickedColor;    //change colorDisplay to match picked color
    btnReset.textContent = "New Colors"
    m.textContent = "";
    for(let i = 0; i < sq.length; i++){//change the colors of squares
        if(colors[i]){
            sq[i].style.display = "block";
            sq[i].style.backgroundColor = colors[i];
        }else{
            sq[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
};

btnReset.addEventListener("click", function(){
    reset();
});

function changeColors(color){   //the argument color will get the passed in value of the correct color which is the variable we created, style.background of the color that was clicked
	for(var i = 0; i < sq.length; i++){    //loop through all squares
		sq[i].style.backgroundColor = color;   //change each color to match given color
	}
};

function generateRandomColors(num){
	var arr = [];    //make an array
	for(var i = 0; i < num; i++){   //repeat num times
		arr.push(getRandomRgb())    //get random color and push into arr
	}
	return arr; //return that array
};

function getRandomRgb(){
  let num = Math.round(0xffffff * Math.random());
  let r = num >> 16;
  let g = num >> 8 & 255;
  let b = num & 255;
  return 'rgb(' + r + ', ' + g + ', ' + b + ')';
};

function pickColor(){       //this function will pick a random number
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];      //this line will access an element from the array at that index
};