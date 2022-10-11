const gameboardFactory = (player, boardLength, marker) => {
    let gb = [];
    for (let j = 1; j <= boardLength; j++) {
        for (let i = 1; i <= boardLength; i++) {
            let ini = "";
            gb.push(ini);
        }
    }

    function move(uId) {
        // let units = document.querySelectorAll(".unit");
        // console.log(units);
        gb[uId] = marker;
    }

    function moved() {
        let result = [];
        result = gb.filter((i) => i.length > 0);

        return result;
    }

    return { player, gb, move, moved };
};

let playerOne = gameboardFactory("playerOne", 3, "O");
let playerTwo = gameboardFactory("playerTwo", 3, "X");
let displayController = ["", "", "", "", "", "", "", "", ""];
console.log(playerOne);
console.log(playerTwo);

function gameStart() {
    // let displayController = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    // let displayController = playerOne.gb;
    let stepCount = 0;
    const playArea = document.querySelector(".play-area");

    playArea.style.cssText = "grid-template-columns: repeat(3, 1fr);";

    for (x in displayController) {
        let boardUnit = document.createElement("div");
        boardUnit.classList.add("unit");
        boardUnit.setAttribute("id", `unit${x}`);
        boardUnit.textContent = displayController[x];
        playArea.appendChild(boardUnit);
    }

    let units = document.querySelectorAll(".unit");
    units.forEach((unit) => {
        unit.addEventListener("click", () => {
            let uId = unit.getAttribute("id").replace(/[^0-9]/gi, "");
            console.log("uId:");
            console.log(uId);

            // gb[uId] = marker

            pOneMoved = playerOne.moved();
            pTwoMoved = playerTwo.moved();

            if (pOneMoved.length == 0) {
                playerOne.move(uId);
                displayController[uId] = playerOne.gb[uId];
                pOneMoved++;
                stepCount++;
                unit.textContent = displayController[uId];
                gameCheck();
            } else if (
                pOneMoved.length > pTwoMoved.length &&
                displayController[uId] == ""
            ) {
                playerTwo.move(uId);
                displayController[uId] = playerTwo.gb[uId];
                stepCount++;
                unit.textContent = displayController[uId];
                gameCheck();
            } else if (displayController[uId] == "") {
                playerOne.move(uId);
                displayController[uId] = playerOne.gb[uId];
                stepCount++;
                unit.textContent = displayController[uId];
                gameCheck();
            }

            pOneMoved = playerOne.moved();
            pTwoMoved = playerTwo.moved();

            console.log("P1 moved: " + pOneMoved.length);
            console.log("P2 moved: " + pTwoMoved.length);

            console.log("playerOne:");
            console.log(playerOne.gb);

            console.log("playerTwo:");
            console.log(playerTwo.gb);

            console.log({ displayController });
            console.log(stepCount);
            // console.log(playerOne.gb.filter((i) => i.length > 0));

            if (stepCount == 9) {
                gameEnd("draw");
            }
        });
    });
}

function gameCheck() {
    // check for player one
    for (let i = 0; i < 3; i++) {
        if (
            displayController[i] == "O" &&
            displayController[i + 3] == "O" &&
            displayController[i + 6] == "O"
        ) {
            gameEnd("player 1");
        } else if (
            i == 0 &&
            displayController[i] == "O" &&
            displayController[i + 4] == "O" &&
            displayController[i + 8] == "O"
        ) {
            gameEnd("player 1");
        } else if (
            i == 2 &&
            displayController[i] == "O" &&
            displayController[i + 2] == "O" &&
            displayController[i + 4] == "O"
        ) {
            gameEnd("player 1");
        } else if (
            i == 0 &&
            displayController[i] == "O" &&
            displayController[i + 1] == "O" &&
            displayController[i + 2] == "O"
        ) {
            gameEnd("player 1");
        } else {
            console.log("game checked");
        }
    }
    for (let i = 3; i < 5; i++) {
        if (
            i == 3 &&
            displayController[i] == "O" &&
            displayController[i + 1] == "O" &&
            displayController[i + 2] == "O"
        ) {
            gameEnd("player 1");
        }
    }
    for (let i = 6; i < 8; i++) {
        if (
            i == 6 &&
            displayController[i] == "O" &&
            displayController[i + 1] == "O" &&
            displayController[i + 2] == "O"
        ) {
            gameEnd("player 1");
        }
    }

    // check for player two
    for (let i = 0; i < 3; i++) {
        if (
            displayController[i] == "X" &&
            displayController[i + 3] == "X" &&
            displayController[i + 6] == "X"
        ) {
            gameEnd("player 2");
        } else if (
            i == 0 &&
            displayController[i] == "X" &&
            displayController[i + 4] == "X" &&
            displayController[i + 8] == "X"
        ) {
            gameEnd("player 2");
        } else if (
            i == 2 &&
            displayController[i] == "X" &&
            displayController[i + 2] == "X" &&
            displayController[i + 4] == "X"
        ) {
            gameEnd("player 2");
        } else if (
            i == 0 &&
            displayController[i] == "X" &&
            displayController[i + 1] == "X" &&
            displayController[i + 2] == "X"
        ) {
            gameEnd("player 2");
        } else {
            console.log("game checked");
        }
    }
    for (let i = 3; i < 5; i++) {
        if (
            i == 3 &&
            displayController[i] == "X" &&
            displayController[i + 1] == "X" &&
            displayController[i + 2] == "X"
        ) {
            gameEnd("player 2");
        }
    }
    for (let i = 6; i < 8; i++) {
        if (
            i == 6 &&
            displayController[i] == "X" &&
            displayController[i + 1] == "X" &&
            displayController[i + 2] == "X"
        ) {
            gameEnd("player 2");
        }
    }
}

function gameEnd(player) {
    playerOne = gameboardFactory("playerOne", 3, "O");
    playerTwo = gameboardFactory("playerTwo", 3, "X");
    displayController = ["", "", "", "", "", "", "", "", ""];
    const playArea = document.querySelector(".play-area");
    const overButton = document.createElement("button");
    overButton.textContent = `Start Over`;
    console.log(`${player} win the game`);

    playArea.style.cssText = "";
    playArea.style.cssText =
        "display: flex; justify-content:center; align-items:center; flex-direction:column; gap:50px; border:0px;";
    if (player == "draw") {
        playArea.textContent = "Draw!";
    } else {
        playArea.textContent = `${player} win the game!`;
    }

    playArea.appendChild(overButton);

    overButton.addEventListener("click", () => {
        playArea.textContent = "";
        gameStart();
    });
}

gameStart();

// function moved() {
//     const result = playerOne.gb.filter((i) => i.length > 0);
//     console.log(result);
// }

// function move(marker) {
//     let units = document.querySelectorAll(".unit");
//     console.log(units);

//     units.forEach((unit) => {
//         unit.addEventListener("click", () => {
//             let uId = unit.getAttribute("id").replace(/[^0-9]/gi, "");
//             console.log("uId:");
//             console.log(uId);
//             displayController.gb[uId] = marker;

//             unit.textContent = displayController.gb[uId];
//             console.log(unit);
//         });
//     });
// }
