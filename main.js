let boxes = document.querySelectorAll(".boxes")
let reset = document.querySelector(".reset")
let newGamebtn = document.querySelector(".new");
let winPlayer = document.querySelector(".winner");
let msgContainer = document.querySelector(".msgContainer")
let playerXTurn = document.querySelector(".playerX")
let playerOTurn = document.querySelector(".playerO")

var turnO = true;

let winPattern = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


//enabling all the boxes
const enable = () => {
    boxes.forEach((box) => {
        box.disabled = false;
    })
    reset.classList.remove("hide");
}

//disabling all the boxes
const disable = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    })
}

//since playerO starts
playerOTurn.classList.remove("hidePlayer");
playerXTurn.classList.add("hidePlayer");

//marking X or O
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO === true) {
            box.innerText = "O";
            playerXTurn.classList.remove("hidePlayer");
            playerOTurn.classList.add("hidePlayer");
            turnO = false;
        } else {
            box.innerText = "X";
            playerOTurn.classList.remove("hidePlayer");
            playerXTurn.classList.add("hidePlayer");
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
    })

})


//checks for winner(matching the winPattern)
const checkWinner = () => {
    for (let pattern of winPattern) {
        pos0val = boxes[pattern[0]].innerText;
        pos1val = boxes[pattern[1]].innerText;
        pos2val = boxes[pattern[2]].innerText;

        if (pos0val === pos1val && pos1val === pos2val && pos2val === "O") {
            disable();
            winnerDisplay("O");
        } else if (pos0val === pos1val && pos1val === pos2val && pos2val === "X") {
            disable();
            winnerDisplay("X");
        }

    }

    // checking for a tie
    if ([...boxes].every(box => box.innerText !== "")) {
        disable();
        msgContainer.classList.remove("hide");
        winPlayer.innerText = `It's a tie!`;
        newGamebtn.classList.remove("hide");
        reset.classList.add("hide");
        playerXTurn.classList.add("hidePlayer");
        playerOTurn.classList.add("hidePlayer");
    }

}

//displaying winner and new game
const winnerDisplay = (player) => {
    playerXTurn.classList.add("hidePlayer");
    playerOTurn.classList.add("hidePlayer");
    msgContainer.classList.remove("hide");
    winPlayer.innerText = `Congratulations! Player${player} wins!`
    newGamebtn.classList.remove("hide");
    reset.classList.add("hide");

}

//reset game button
reset.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.innerText = "";
        enable();
        turnO = true;
        playerXTurn.classList.add("hidePlayer");
        playerOTurn.classList.remove("hidePlayer");
    })
})

//new game button
newGamebtn.addEventListener("click", () => {
    msgContainer.classList.add("hide");
    boxes.forEach((box) => {
        box.innerText = "";
        enable();
    })
    playerOTurn.classList.remove("hidePlayer");

})

