let box = document.getElementsByClassName('box');
let boxarr = Array.from(box);
let reset = document.querySelector('.btn');
let content = document.querySelector('.content')
let xturn = document.querySelector('.turn1');
let oturn = document.querySelector('.turn2')
let turn = "X";
let count = 0;
let gameOver = false;

let clicksound = new Audio("play.mp3");
// Preloading the sound to play it repeatedly
clicksound.preload = 'auto';
clicksound.load();

let winsound = new Audio("win.mp3");

// Function to toggle turn
function changeTurn(){
   return turn === "X"? "O" : "X";
}

// Click Event on the div to display X and O
boxarr.forEach((element) =>{
   element.addEventListener('click',function(){
    
    if(gameOver) return;

    if(element.innerHTML === ""){
        
        // Cloning the node of the sound to play it.
        let clicknode = clicksound.cloneNode();
        clicknode.play();
        if(turn==="X"){
            element.innerHTML = turn;
            element.style.color = "red";
            turn = changeTurn();
            if (!checkWin()) checkdraw();
            xturn.classList.remove('inset');
            oturn.classList.add('inset');
        }
        else{
            element.innerHTML = turn;
            element.style.color = "blue";
            turn = changeTurn();
            if (!checkWin()) checkdraw();
            oturn.classList.remove('inset');
            xturn.classList.add('inset');
        }
     }
   })
})

// Click event on reset button to reset game
reset.addEventListener('click',function(){
    boxarr.forEach((element) =>{
        element.innerHTML = "";
    })
    turn = "X";
    content.innerHTML = "";
    document.querySelector('.gif').style.display = "none";
    gameOver = false;
    xturn.classList.add('inset');
    oturn.classList.remove('inset');
})

// Function to Check if anyone won. It returns to true if anyone won else false
function checkWin(){
    let winbox = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    for(let i = 0; i < winbox.length; i++) {
        let box1 = winbox[i][0];
        let box2 = winbox[i][1];
        let box3 = winbox[i][2];
        if((box[box1].innerHTML === box[box2].innerHTML) && (box[box1].innerHTML === box[box3].innerHTML) && (box[box1].innerHTML !== "")) {
            content.innerHTML = `Player ${box[box1].innerHTML} Won`;
            winsound.play();
            // To display gif on winning
            document.querySelector('.gif').style.display = "block";
            gameOver = true;
            return true;
        }
    }
    return false;
}

// Function to check if the game is draw
let checkdraw = () => {
    let isDraw = boxarr.every(elem => elem.innerHTML !== "");
   
    if (isDraw) {
        if (!checkWin()) {
            content.innerHTML = "Match Draw";
            gameOver = true;
        }
    }
}

