//Declare global variables to be used later
var youHit;
var playerName;
var damageThisRound;
var dragHit;
var playaDamageThisRound;
var playaHP = 25;
var dragHP = 30;
//0 = still playing, -1 = dead, 1 = victory
var gameState = 0;
var turnChoice;
var readyToPlay;
//declare class characteristic vars
var noble = 0;
var foolhardy = 0;
var magic = 0;
var lurker = 0;
var user;

//calculate class characteristics
var generateClass = function () {
  user = prompt("Are you a WARRIOR, MAGE, ROUGE, or ARCHER?").toUpperCase();
switch (user) {
    case "WARRIOR":
        console.log("You are now a brave WARRIOR!");
        noble = 1;
        foolhardy = 1;
        break;
    case "MAGE":
        console.log("You are a almighty MAGE!");
        foolhardy = 1;
        magic = 1;
        break;
    case "ARCHER":
        console.log("You are a sly ARCHER. Great choice!");
        noble = 1;
        lurker = 1;
        break;
    case "ROUGE":
        console.log("You are now a cunning ROUGE!");
        magic = 1;
        lurker = 1;
        break;
    default:
        console.log("I'm sorry, I don't understand. Assigned WARRIOR.");
        noble = 1;
        foolhardy = 1;
        break;
}
  
  //apply HP class changes
  if (magic && lurker == 1) {
    playaHP = playaHP * 1.25;
}
else {}
};


//Calculate damage player does to dragon
var CalcDamage = function () {
    youHit = Math.floor(Math.random() * 2);
  if (youHit === 1) {
    damageThisRound = Math.floor(Math.random() * 5 + 3);
    //account for class char
    if (noble || foolhardy == 1) {
    damageThisRound *= 1.25;
}
    else {}
    if (lurker == 1 && noble != 1) {
    damageThisRound *= 0.9;
}
else {}
  }
  else {
    console.log(playerName + " the " + user + " missed! :(");
    damageThisRound = 0;
  }
  dragHP -= damageThisRound;
};

//Calculate damage dragon does to player
var CalcPlayerDamage = function () {
     dragHit = Math.floor(Math.random() * 2);
  if (dragHit === 1) {
    playaDamageThisRound = Math.floor(Math.random() * 6 + 2);
   	//account for class char
    if (magic && noble == 1) {
    playaDamageThisRound *= 0.75;
		}
    else{}
  }
  else {
    console.log("The dragon's attack missed! :D");
    playaDamageThisRound = 0;
  }
  playaHP -= playaDamageThisRound;
};


//Get player name
var getName = function () {
  playerName = prompt("Please enter your name");
};

//Check if game should continue
var checkGameEnd = function () {
  //Check for loss
  if (playaHP <= 0) {
    gameState = -1;
    console.log(playerName + " the " + user + " died :(");
  }
  else{
    //Check for win
  if (dragHP <= 0) {
    gameState = 1;
    console.log(playerName + " the " + user + " slayed the dragon! :D");
  }
  else{
    //displays stats
    console.log("New Turn!");
    console.log(playerName + " the " + user + "'s HP: " + playaHP);
    console.log("Dragon's HP: " + dragHP);
    gameState = 0;
  }
  }
};

//Confirm user choice
var getTurnChoice = function () {
  turnChoice = prompt("Enter 'a' to attack or q to quit");
};


//DURING A TURN
var turn = function () {
getTurnChoice();
  if (turnChoice === 'a') {
    //work out turn's damages
    CalcDamage();
    CalcPlayerDamage();
    //check to see turn's outcome
    checkGameEnd();
  }
  else if (turnChoice === 'q'){
    //quits the game if user wishes
    console.log("You quit the game! :(");
    gameState = -1;
  }
  else {
    console.log("input not valid- new turn starting");
    gameState = 0;
  }
};

//===================
//MAIN TURN FUNCTION
//===================
var main = function () {
	//get player name
getName();
generateClass();
//start turn mechanism
  while (gameState === 0) {
    turn();
  }
};

var ready2play = function () {
  readyToPlay = prompt("Are you ready to play? 'y' or 'n'");
  if (readyToPlay === 'y') {
    console.log("Game Loading...");
    main();
  }
  else {
    //quits the game if user wishes
    console.log("Maybe later? ¯\\\_(ツ)_/¯");
  }
};




/*====================
INITIAL FUNCTION CALL
====================*/
ready2play();
