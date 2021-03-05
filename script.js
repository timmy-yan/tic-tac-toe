const container = document.querySelector(".container");
const button = document.querySelector("button");

let player1Wins = 0;
let player2Wins = 0;

let grid;
let playerOne;
let counter;

reset();
button.addEventListener("click", reset);

container.addEventListener("click", (e) => {
  if (!e.target.closest("div")) {
    return;
  }
  const coords = e.target.className.slice(-2);
  const coord1 = parseInt(coords.charAt(0));
  const coord2 = parseInt(coords.charAt(1));
  if (
    grid[coord1][coord2] !== 1 &&
    grid[coord1][coord2] !== 2 &&
    !checkWinner()
  ) {
    grid[coord1][coord2] = playerOne ? 1 : 2;
    e.target.innerText = playerOne ? "X" : "O";
    counter++;
    if (checkWinner()) {
      document.querySelector("h1").innerText = displayText();
      updateScores();
      return;
    } else if (counter === 9) {
      document.querySelector("h1").innerText = "Draw!";
      return;
    }
    playerOne = !playerOne;

    if (playerOne)
      document.querySelector("h2").innerHTML = "Player 1 your turn!";
    else document.querySelector("h2").innerHTML = "Player 2 your turn!";
  } else {
    return;
  }
});

function checkWinner() {
  // check rows and columns
  for (let i = 0; i < 3; i++) {
    if (
      (grid[i][0] === grid[i][1] && grid[i][0] === grid[i][2]) ||
      (grid[0][i] === grid[1][i] && grid[0][i] === grid[2][i])
    ) {
      return true;
    }
  }
  // check diagonals
  if (
    (grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) ||
    (grid[2][0] === grid[1][1] && grid[2][0] === grid[0][2])
  ) {
    return true;
  }
  return false;
}

function displayText() {
  document.querySelector("h2").innerHTML = "";

  if (playerOne) {
    player1Wins++;
    return "Player One has won!";
  } else {
    player2Wins++;
    return "Player Two has won!";
  }
}

function updateScores() {
  document.querySelector("h3").innerHTML =
    "Player 1 Score: " +
    player1Wins +
    " &nbsp;|&nbsp; Player 2 Score: " +
    player2Wins;
}

function reset() {
  grid = [
    [-1, -2, -3],
    [-4, -5, -6],
    [-7, -8, -9],
  ];
  playerOne = true;
  counter = 0;
  document.querySelector("h1").innerText = "";
  document.querySelector("h2").innerHTML = "Player 1 your turn!";
  document
    .querySelectorAll(".container div")
    .forEach((div) => (div.innerText = ""));

  updateScores();
}
