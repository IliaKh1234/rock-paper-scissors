const firstPlayer = document.querySelector(".first-player");
const secondPlayer = document.querySelector(".second-player");
const firstPlayerIcon = document.querySelectorAll(".first-player i");

const paper = `<i class="fa-solid fa-hand"></i>`;
const rock = `<i class="fa-solid fa-hand-back-fist"></i>`;
const scissors = `<i class="fa-solid fa-hand-scissors"></i>`;

let startGame = true;
let firstPlayerPoint;
let secondPlayerPoint;

const nextRoundBtn = document.querySelector(".next-round");
let vsTitle = document.getElementById("vs");
const restartbtn = document.querySelector(".restart");

let player1Point = document.getElementById("firstPlayerPoint");
let player2Point = document.getElementById("secondPlayerPoint");

let firstPlayerPoints = [];
let secondPlayerPoints = [];

let firstWinner = 0;
let secondWinner = 0;

const isValidKey = (key) => {
  if (!key) return false;
  const validKeys = [49, 50, 51, 56, 57, 48];
  const isValid = validKeys.find((k) => k === +key);
  return isValid;
};

const hasValue = (plr) => {
  if (!plr) return false;
  if (
    plr.innerHTML == rock ||
    plr.innerHTML == paper ||
    plr.innerHTML == scissors
  ) {
    return true;
  }
  return false;
};

const keyPress = (key) => {
  if (startGame && isValidKey(key)) {
    const turn = options[player(key)];
    turn.wrapper.innerHTML = turn[key];
    if (hasValue(firstPlayer)) {
      secondPlayer.style.opacity = "1";
    } else {
      secondPlayer.style.opacity = "0";
    }
    if (hasValue(secondPlayer)) {
      firstPlayer.style.opacity = "1";
    } else {
      firstPlayer.style.opacity = "0";
    }
    checkDraw(firstPlayer, secondPlayer, rock);
    checkDraw(firstPlayer, secondPlayer, paper);
    checkDraw(firstPlayer, secondPlayer, scissors);

    checkWinner(
      firstPlayer,
      secondPlayer,
      rock,
      paper,
      secondPlayerPoint,
      player2Point,
      secondPlayerPoints,
      secondWinner
    );
    checkWinner(
      firstPlayer,
      secondPlayer,
      paper,
      rock,
      firstPlayerPoint,
      player1Point,
      firstPlayerPoints,
      firstWinner
    );
    checkWinner(
      firstPlayer,
      secondPlayer,
      rock,
      scissors,
      firstPlayerPoint,
      player1Point,
      firstPlayerPoints,
      firstWinner
    );
    checkWinner(
      firstPlayer,
      secondPlayer,
      scissors,
      rock,
      secondPlayerPoint,
      player2Point,
      secondPlayerPoints,
      secondWinner
    );
    checkWinner(
      firstPlayer,
      secondPlayer,
      paper,
      scissors,
      secondPlayerPoint,
      player2Point,
      secondPlayerPoints,
      secondWinner
    );
    checkWinner(
      firstPlayer,
      secondPlayer,
      scissors,
      paper,
      firstPlayerPoint,
      player1Point,
      firstPlayerPoints,
      firstWinner
    );
  }
};
const endGame = (winner) => {
  if (firstPlayerPoints.length >= 3 || secondPlayerPoints.length >= 3) {
    vsTitle.textContent = `Winner is ${winner}`;
    restartbtn.classList.remove("hidden");
    startGame = false;
  }
};

restartbtn.addEventListener("click", function () {
  startGame = true;
  firstPlayerPoints = [];
  secondPlayerPoints = [];
  vsTitle.textContent = "Vs";
  firstWinner = 0;
  secondWinner = 0;
  restartbtn.classList.add("hidden");
  firstPlayer.innerHTML = `<i class="fa-solid fa-question"></i>`;
  secondPlayer.innerHTML = `<i class="fa-solid fa-question"></i>`;
});

nextRoundBtn.addEventListener("click", function () {
  nextRound();
  firstPlayer.innerHTML = "";
  secondPlayer.innerHTML = "";
  firstPlayer.innerHTML = `<i class="fa-solid fa-question"></i>`;
  secondPlayer.innerHTML = `<i class="fa-solid fa-question"></i>`;
});
const checkDraw = (player, secondPlayer, move) => {
  if (player.innerHTML == move && secondPlayer.innerHTML == move) {
    setTimeout(() => {
      nextRoundBtn.classList.remove("hidden");
    }, 1000);
    startGame = false;
    vsTitle.textContent = "Draw";
  }
};

const nextRound = () => {
  startGame = true;
  nextRoundBtn.classList.add("hidden");
  vsTitle.textContent = "VS";
  if (firstPlayerPoints.length >= 3) {
    endGame("Player 1");
  } else if (secondPlayerPoints.length >= 3) {
    endGame("player 2");
  }
};
const checkWinner = (
  player,
  secondPlayer,
  move1,
  move2,
  winner,
  winnerIncrementPoint,
  winnerArr,
  winnerCount
) => {
  if (player.innerHTML == move1 && secondPlayer.innerHTML == move2) {
    winner = 1;
    winnerIncrementPoint.textContent = "+" + winner;
    setTimeout(() => {
      winnerIncrementPoint.textContent = "";
    }, 2000);
    startGame = false;
    setTimeout(() => {
      nextRoundBtn.classList.remove("hidden");
    }, 1000);
    winnerArr.push(winnerIncrementPoint);
    winnerCount += 1;
  }
};

const options = {
  firstPlayer: {
    49: rock,
    50: scissors,
    51: paper,
    wrapper: firstPlayer,
  },
  secondPlayer: {
    56: rock,
    57: scissors,
    48: paper,
    wrapper: secondPlayer,
  },
};

const player = (code) => {
  const first = Object.keys(options.firstPlayer); //[49, 50, 51]
  const second = Object.keys(options.secondPlayer); //[56, 57, 48]
  if (first.find((c) => c === code)) return "firstPlayer";
  if (second.find((c) => c === code)) return "secondPlayer";
};

document.addEventListener("keydown", function (e) {
  keyPress(e.keyCode.toString());
});
