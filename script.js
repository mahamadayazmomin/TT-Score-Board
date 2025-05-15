const p1Btn = document.getElementById("incrementP1");
const p2Btn = document.getElementById("incrementP2");
const resetBtn = document.getElementById("reset");

const p1ScoreDisplay = document.getElementById("player1points");
const p2ScoreDisplay = document.getElementById("player2points");
const winnerDisplay = document.getElementById("winnerName");
const winScoreSelect = document.getElementById("winningScoreCount");

const nameP1 = document.getElementById("nameP1");
const nameP2 = document.getElementById("nameP2");

const labelP1 = document.getElementById("labelP1");
const labelP2 = document.getElementById("labelP2");

const clickSound = document.getElementById("clickSound");
const scoreHistory = document.getElementById("scoreHistory");

let p1Score = 0;
let p2Score = 0;
let gameOver = false;

p1Btn.addEventListener("click", () => updateScore(1));
p2Btn.addEventListener("click", () => updateScore(2));
resetBtn.addEventListener("click", resetGame);

document.addEventListener("keydown", (e) => {
  if (e.key === "a" || e.key === "A") updateScore(1);
  if (e.key === "l" || e.key === "L") updateScore(2);
  if (e.key === "r" || e.key === "R") resetGame();
});

nameP1.addEventListener("input", () => {
  labelP1.textContent = nameP1.value || "Player 1";
});

nameP2.addEventListener("input", () => {
  labelP2.textContent = nameP2.value || "Player 2";
});

window.onload = () => {
  labelP1.textContent = nameP1.value || "Player 1";
  labelP2.textContent = nameP2.value || "Player 2";
};

function updateScore(player) {
  if (gameOver) return;
  clickSound.play();

  if (player === 1) {
    p1Score++;
    p1ScoreDisplay.textContent = p1Score;
    checkWinner(p1Score, 1);
  } else {
    p2Score++;
    p2ScoreDisplay.textContent = p2Score;
    checkWinner(p2Score, 2);
  }
}

function checkWinner(score, player) {
  const winningScore = Number(winScoreSelect.value);
  if (score === winningScore) {
    gameOver = true;
    const winnerName = player === 1 ? nameP1.value || "Player 1" : nameP2.value || "Player 2";
    winnerDisplay.textContent = `${winnerName} Wins!`;
    addToHistory(winnerName);
    p1Btn.disabled = true;
    p2Btn.disabled = true;
  }
}

function resetGame() {
  gameOver = false;
  p1Score = 0;
  p2Score = 0;
  p1ScoreDisplay.textContent = "0";
  p2ScoreDisplay.textContent = "0";
  winnerDisplay.textContent = "";
  p1Btn.disabled = false;
  p2Btn.disabled = false;

  // Clear input names
  nameP1.value = "";
  nameP2.value = "";

  // Reset labels to default
  labelP1.textContent = "Player 1";
  labelP2.textContent = "Player 2";

  // Clear score history
  scoreHistory.innerHTML = "";
}

function addToHistory(winnerName) {
  const li = document.createElement("li");
  li.textContent = `${winnerName} won with ${p1Score}-${p2Score}`;
  scoreHistory.appendChild(li);
}
