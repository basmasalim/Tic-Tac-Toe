// ? =============> Global ===============>
    const tiles = document.querySelectorAll(".tile");
const title = document.querySelector(".display-player");
const titleTic = document.querySelector(".title");
const winnerDisplay = document.getElementById("winner"); 
const displaySection = document.querySelector(".display");

let turn = "X";
let squares = [];
let gameOver = false;

const winningCombinations = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
    [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
    [1, 5, 9], [3, 5, 7]  // Diagonals
];

// * =============> Events ===============>
tiles.forEach((tile) => {
    tile.addEventListener("click", function () {
        if (!gameOver && this.textContent === "") {
            game(this.id);
        }
    });
});

// ! =============> Functions ===============>
function game(id) {
    let element = document.getElementById(id);

    if (element.textContent === "") {
        element.textContent = turn;
        turn = (turn === "X") ? "O" : "X";
        title.textContent = turn;
    }

    if (!checkWinner()) {
        checkDraw();
    }
}

function checkWinner() {
    for (let i = 1; i < 10; i++) {
        squares[i] = document.getElementById("item" + i).textContent;
    }

    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            declareWinner(squares[a], [a, b, c]);
            return squares[a];
        }
    }

    return null;
}

function checkDraw() {
    let isDraw = [...tiles].every(tile => tile.textContent !== "");
    
    if (isDraw && !gameOver) {
        gameOver = true;
        displaySection.style.display = "none";
        winnerDisplay.textContent = "Draw! 🤝";
        setTimeout(() => {
            location.reload();
        }, 2500);
    }
}

function declareWinner(winningPlayer, winningTiles) {
    gameOver = true;
    displaySection.style.display = "none";
    winnerDisplay.textContent = `${winningPlayer} Winner 🏆`;

    winningTiles.forEach(i => {
        document.getElementById("item" + i).style.backgroundColor = "#09c372";
    });

    const interval = setInterval(() => {
        titleTic.textContent += `.`;
    }, 500);

    setTimeout(() => {
        clearInterval(interval);
        location.reload();
    }, 2500);
}
