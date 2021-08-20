// Set starting life totals here
let playerLife = 1;
let monsterLife = 1;

// Message when the game is over
let monsterWinnerMessage = "Game over: You were defeated!";
let playerWinnerMessage = "You really know The Doctor!";


// Game code starts here
let playerStartLife = parseInt(playerLife);
let monsterStartLife = parseInt(monsterLife);

let roundFinished = false;
let cardSelected = false;

updateScores();

document.querySelector(".game-board").classList.add("before-game");

let allCardElements = document.querySelectorAll(".card");

// Adds click handler to all player card elements
for(let i = 0; i < allCardElements.length; i++) {
  let card = allCardElements[i];
  if(card.classList.contains("player-card")) {
    card.addEventListener("click",function(e){
      cardClicked(this);
    });
  }
}


// When a card is clicked
function cardClicked(cardEl) {

  if(cardSelected) { return; }
  cardSelected = true;

  cardEl.classList.add("played-card");

  document.querySelector(".game-board").classList.add("card-selected");

  // Wait 500ms to reveal the monster power
  setTimeout(function(){
    revealMonsterPower();
  },500)

  // Wait 750ms to reveal the player power
  setTimeout(function(){
    revealPlayerPower();
  },800)

  // Wait 1250ms to compare the card scoers
  setTimeout(function(){
    compareCards();
  }, 1400);
}

// Shows the power level on the player card
function revealPlayerPower(){
  let playerCard = document.querySelector(".played-card");
  playerCard.classList.add("reveal-power");
}

// Shows the power level on the monster card
function revealMonsterPower(){
  let monsterCard = document.querySelector(".monster-card");
  monsterCard.classList.add("reveal-power");
}

function compareCards(){
  let playerCard = document.querySelector(".played-card");
  let playerPowerEl = playerCard.querySelector(".power");

  let monsterCard = document.querySelector(".monster-card");
  let monsterPowerEl = monsterCard.querySelector(".power");

  let playerPower = parseInt(playerPowerEl.innerHTML);
  let monsterPower = parseInt(monsterPowerEl.innerHTML);

  let powerDifference = playerPower - monsterPower;

  if (powerDifference < 0) {
    // Player Loses
    playerLife = playerLife + powerDifference;
    monsterCard.classList.add("better-card");
    playerCard.classList.add("worse-card");
    document.querySelector(".player-stats .thumbnail").classList.add("ouch");
  } else if (powerDifference > 0) {
    // Player Wins
    monsterLife = monsterLife - powerDifference;
    playerCard.classList.add("better-card");
    monsterCard.classList.add("worse-card");
    document.querySelector(".monster-stats .thumbnail").classList.add("ouch");
  } else {
    playerCard.classList.add("tie-card");
    monsterCard.classList.add("tie-card");
  }

  updateScores();

  if(playerLife <= 0) {
    gameOver("Monster");

    alert("You lose")
    window.location = '/Users/Keira/Documents/Lessons/Portfolio/index.html';
  } else if (monsterLife <= 0){
    gameOver("Player")
  }

  roundFinished = true;

  document.querySelector("button.next-turn").removeAttribute("disabled");
}

// Shows the winner message
function gameOver(winner) {
  document.querySelector(".game-board").classList.add("game-over");
  document.querySelector(".winner-section").style.display = "flex";
  document.querySelector(".winner-section").classList.remove("player-color");
  document.querySelector(".winner-section").classList.remove("monster-color");

  if(winner == "Monster") {
    document.querySelector(".winner-message").innerHTML = monsterWinnerMessage;
    document.querySelector(".winner-section").classList.add("monster-color");
  } else {
    document.querySelector(".winner-message").innerHTML = playerWinnerMessage;
    document.querySelector(".winner-section").classList.add("player-color");
  }
}


// Starts the game
function startGame() {
  document.querySelector(".game-board").classList.remove("before-game");
  document.querySelector(".game-board").classList.add("during-game");
  playTurn();
}


// Start the game over from scratch
function restartGame(){
  document.querySelector(".game-board").classList.remove("game-over");
  document.querySelector(".game-board").classList.remove("during-game");
  document.querySelector(".game-board").classList.add("before-game");

  document.querySelector(".winner-section").style.display = "none";
  document.querySelector(".monster-card").style.display = "none";

  let cards = allCardElements;

  document.querySelector("button").removeAttribute("disabled");

  for(let i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }

  playerLife = playerStartLife;
  monsterLife = monsterStartLife;

  roundFinished = true;
  cardSelected = false;

  updateScores();
}

// Updates the displayed life bar and life totals
function updateScores(){

  // Update life totals for each player
  document.querySelector(".player-stats .life-total").innerHTML = playerLife;
  document.querySelector(".monster-stats .life-total").innerHTML = monsterLife;

  // Update the player lifebar
  let playerPercent = playerLife / playerStartLife * 100;
  if (playerPercent < 0) {
    playerPercent = 0;
  }
  document.querySelector(".player-stats .life-left").style.height =  playerPercent + "%";

  // Update the monster lifebar
  let monsterPercent = monsterLife / monsterStartLife * 100
  if (monsterPercent < 0) {
    monsterPercent = 0;
  }
  document.querySelector(".monster-stats .life-left").style.height =  monsterPercent + "%";
}


// Shuffles an array
function shuffleArray(a) {
  let j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
}


// Plays one turn of the game
function playTurn() {

  roundFinished = true;
  cardSelected = false;

  document.querySelector(".game-board").classList.remove("card-selected");

  // Remove "ouch" class from player and monster thumbnails
  document.querySelector(".monster-stats .thumbnail").classList.remove("ouch");
  document.querySelector(".player-stats .thumbnail").classList.remove("ouch");

  // Hides the "next turn" button, will show again when turn is over
  document.querySelector(".next-turn").setAttribute("disabled", "true");

  for(let i = 0; i < allCardElements.length; i++) {
    let card = allCardElements[i];
    card.classList.remove("showCard");
  }

  setTimeout(function(){
    revealCards();
  }, 500);
}

function revealCards(){


  let j = 0;
  let cardIndexes = shuffleArray([0, 1, 2]);

  // Get scenario cards
  console.log("scenarios.length == " + scenarios.length);

  let randomScenarioIndex = Math.floor(Math.random() * scenarios.length);
  let scenario = scenarios[randomScenarioIndex];
  console.log(scenario.monsterCard.description);

  scenarios.splice(randomScenarioIndex, 1);

  console.log("scenarios.length after splice == " + scenarios.length);

  let monsterCard = scenario.monsterCard;
  let monsterCardEl = document.querySelector(".monster-area .card");

  // Contents of the player cards
  let playerCards = scenario.playerCards;

  for(let i = 0; i < allCardElements.length; i++) {
    let card = allCardElements[i];

    card.classList.remove("worse-card");
    card.classList.remove("better-card");
    card.classList.remove("played-card");
    card.classList.remove("tie-card");
    card.classList.remove("prepared");
    card.classList.remove("reveal-power");

    // Display the payer card details
    if(card.classList.contains("player-card")) {
      card.querySelector(".text").innerHTML = playerCards[cardIndexes[j]].description;
      card.querySelector(".power").innerHTML = playerCards[cardIndexes[j]].power;
      j++;
    }

    // Reveal each card one by one with a delay of 100ms
    setTimeout(function(card, j){
      return function() {
        card.classList.remove("prepared");
        card.style.display = "block";
        card.classList.add("showCard");
      }
    }(card,i), parseInt(i+1) * 200);
  }

  // Display the monster card
  monsterCardEl.querySelector(".text").innerHTML = monsterCard.description;
  monsterCardEl.querySelector(".power").innerHTML = monsterCard.power;
}



//disable the back option on page
(function (global) {

  if(typeof (global) === "undefined") {
      throw new Error("window is undefined");
  }

  var _hash = "!";
  var noBackPlease = function () {
      global.location.href += "#";

      // Making sure we have the fruit available for juice (^__^)
      global.setTimeout(function () {
          global.location.href += "!";
      }, 50);
  };

  global.onhashchange = function () {
      if (global.location.hash !== _hash) {
          global.location.hash = _hash;
      }
  };

  global.onload = function () {
      noBackPlease();

      // Disables backspace on page except on input fields and textarea..
      document.body.onkeydown = function (e) {
          var elm = e.target.nodeName.toLowerCase();
          if (e.which === 8 && (elm !== 'input' && elm  !== 'textarea')) {
              e.preventDefault();
          }
          // Stopping the event bubbling up the DOM tree...
          e.stopPropagation();
      };
  }
})(window);