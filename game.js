var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

//Game will not start until a keypress switches the started boolean
$(document).keypress(function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

//Logs the users choice into the userClickedPattern, plays a sound, animates
//the click and checks if it's the correct sequence
$(".btn").on("click", function() {
  var userChosenColor = (this.id);
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//Resets the users sequence, increases the level, randomly chooses the next game
//sequence color, and shows the user said sequence with a fade and sound
function nextSequence() {
  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut().fadeIn();
  playSound(randomChosenColor);
}

//plays sound based on button clicked
function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

//anmiates a button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//compares the user sequence to the games sequence, starts next level if correct.
//if wrong: plays game over screen and waits for a button press to reset the game
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over. Press Any Key to Restart.");
    startOver();
  }
}

//resets all game states
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
