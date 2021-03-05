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
