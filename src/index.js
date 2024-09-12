const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start');
const score = document.querySelector('#score'); // Use querySelector() to get the score element
const timerDisplay = document.querySelector('#timerDisplay'); // use querySelector() to get the timer element.

let time = 0;
let timer;
let lastHole = 0;
let points = 0;
let difficulty = "hard";
/**
 * Generates a random integer within a range.
 *
 * The function takes two values as parameters that limits the range 
 * of the number to be generated. For example, calling randomInteger(0,10)
 * will return a random integer between 0 and 10. Calling randomInteger(10,200)
 * will return a random integer between 10 and 200.
 *
 */
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log("A random integer between 0 and 10");
console.log(randomInteger(0, 10));
console.log("Another random integer between 0 and 10");
console.log(randomInteger(0, 10));
console.log("A random number between 600 and 1200");
console.log(randomInteger(600, 1200));
/**
 * Sets the time delay given a difficulty parameter.
 *
 * The function takes a `difficulty` parameter that can have three values: `easy`
 * `normal` or `hard`. If difficulty is "easy" then the function returns a time delay
 * of 1500 milliseconds (or 1.5 seconds). If the difficulty is set to "normal" it should
 * return 1000. If difficulty is set to "hard" it should return a randomInteger between
 * 600 and 1200.
 *
 * Example: 
 * setDelay("easy") //> returns 1500
 * setDelay("normal") //> returns 1000
 * setDelay("hard") //> returns 856 (returns a random number between 600 and 1200).
 *
 */
function setDelay(difficulty) {
  if (difficulty === "easy") {
    return 1500; // 1.5 seconds for easy
  } else if (difficulty === "normal") {
    return 1000; // 1 second for normal
  } else if (difficulty === "hard") {
    // Return a random integer between 600 and 1200 for hard
    return Math.floor(Math.random() * (1200 - 600 + 1)) + 600;
  } else {
    throw new Error("Invalid difficulty level. Choose 'easy', 'normal', or 'hard'.");
  }
}

// Example usage:
console.log(setDelay("easy"));   // 1500
console.log(setDelay("normal")); // 1000
console.log(setDelay("hard"));   // Random number between 600 and 1200
/**
 * Chooses a random hole from a list of holes.
 *
 * This function should select a random Hole from the list of holes.
 * 1. generate a random integer from 0 to 8 and assign it to an index variable
 * 2. get a random hole with the random index (e.g. const hole = holes[index])
 * 3. if hole === lastHole then call chooseHole(holes) again.
 * 4. if hole is not the same as the lastHole then keep track of 
 * it (lastHole = hole) and return the hole
 *
 * Example: 
 * const holes = document.querySelectorAll('.hole');
 * chooseHole(holes) //> returns one of the 9 holes that you defined
 */
const holes = document.querySelectorAll('.hole');

let lastHole = 0;

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function chooseHole(holes) {
  const index = randomInteger(0, 2);
  const hole = holes[index];
  if (hole === lastHole) {
    return chooseHole(holes);
  }
  lastHole = hole;
  return hole;
}

// example
let hole = chooseHole(holes);

// highlight random hole
hole.classList.toggle("highlight");
console.log(hole.innerHTML);
console.log(hole.classList);

// choose another hole and highlight it too
hole = chooseHole(holes);
hole.classList.toggle("highlight");
console.log(hole.innerHTML);
console.log(hole.classList);
/**
*
* Calls the showUp function if time > 0 and stops the game if time = 0.
*
* The purpose of this function is simply to determine if the game should
* continue or stop. The game continues if there is still time `if(time > 0)`.
* If there is still time then `showUp()` needs to be called again so that
* it sets a different delay and a different hole. If there is no more time
* then it should call the `stopGame()` function. The function also needs to
* return the timeoutId if the game continues or the string "game stopped"
* if the game is over.
*
*  // if time > 0:
*  //   timeoutId = showUp()
*  //   return timeoutId
*  // else
*  //   gameStopped = stopGame()
*  //   return gameStopped
*
*/
function gameOver() {
  if (time > 0) { // Check if time is still remaining
    const timeoutId = showUp(); // Show another mole
    return timeoutId; // Return the ID of the timeout
  } else {
    const gameStopped = stopGame(); // Stop the game
    return "game stopped"; // Return the game status
  }
}
/**
*
* Calls the showAndHide() function with a specific delay and a hole.
*
* This function simply calls the `showAndHide` function with a specific
* delay and hole. The function needs to call `setDelay()` and `chooseHole()`
* to call `showAndHide(hole, delay)`.
*
*/
function showUp() {
  let delay = setDelay(); 
  const hole = chooseHole() ; 
  return showAndHide(hole, delay);
}
/**
*
* The purpose of this function is to show and hide the mole given
* a delay time and the hole where the mole is hidden. The function calls
* `toggleVisibility` to show or hide the mole. The function should return
* the timeoutID
*
*/
function showAndHide(hole, delay) {
  // Show the mole
  toggleVisibility(hole);

  const timeoutID = setTimeout(() => {
    // Hide the mole after the delay
    toggleVisibility(hole);
    
    // Call gameOver() after hiding the mole
    gameOver();
  }, delay); // Use the provided delay

  return timeoutID;
}
/**
*
* Adds or removes the 'show' class that is defined in styles.css to 
* a given hole. It returns the hole.
*
*/
function toggleVisibility(hole) {
  // Toggle the 'show' class to add/remove it
  hole.classList.toggle('show');
  return hole;
}
/**
*
* This function increments the points global variable and updates the scoreboard.
* Use the `points` global variable that is already defined and increment it by 1.
* After the `points` variable is incremented proceed by updating the scoreboard
* that you defined in the `index.html` file. To update the scoreboard you can use 
* `score.textContent = points;`. Use the comments in the function as a guide 
* for your implementation:
*
*/
function updateScore() {
  // Increment the points global variable by 1 point
  points += 1;

  // Update score.textContent with points
  score.textContent = points;

  // Return the updated points
  return points;
}
/**
*
* This function clears the score by setting `points = 0`. It also updates
* the board using `score.textContent = points`. The function should return
* the points.
*
*/
function clearScore() {
  // Set the points global variable to 0
  points = 0;

  // Update score.textContent to reflect the reset score
  score.textContent = points;

  // Return the reset points
  return points;
}
/**
*
* Updates the control board with the timer if time > 0
*
*/
function updateTimer() {
  if (time > 0){
    time -= 1;
    timerDisplay.textContent = time;
  }
  return time;
}
/**
*
* Starts the timer using setInterval. For each 1000ms (1 second)
* the updateTimer function get called. This function is already implemented
*
*/
function startTimer() {
   timer = setInterval(updateTimer, 1000);
  return timer;
}
/**
*
* This is the event handler that gets called when a player
* clicks on a mole. The setEventListeners should use this event
* handler (e.g. mole.addEventListener('click', whack)) for each of
* the moles.
*
*/
function whack(event) {
  // Call updateScore() to increment the score
  updateScore();

  // Return the updated points
  return points;
}
/**
*
* Adds the 'click' event listeners to the moles. See the instructions
* for an example on how to set event listeners using a for loop.
*/
function setEventListeners(moles) {
  // Add the 'whack' event handler for each mole
  moles.forEach(mole => {
    mole.addEventListener('click', whack);
  });

  // Return the array of moles with event listeners attached
  return moles;
}
/**
*
* This function sets the duration of the game. The time limit, in seconds,
* that a player has to click on the sprites.
*
*/
function setDuration(duration) {
  time = duration;
  return time;
}
/**
*
* This function is called when the game is stopped. It clears the
* timer using clearInterval. Returns "game stopped".
*
*/
function stopGame(){
  // stopAudio(song);  //optional
  clearInterval(timer);
  return "game stopped";
}
/**
*
* This is the function that starts the game when the `startButton`
* is clicked.
*
*/
function startGame(){
  setDuration(10);
  showUp();
  return "game started";
}

startButton.addEventListener("click", startGame);

// Please do not modify the code below.
// Used for testing purposes.
window.randomInteger = randomInteger;
window.chooseHole = chooseHole;
window.setDelay = setDelay;
window.startGame = startGame;
window.gameOver = gameOver;
window.showUp = showUp;
window.holes = holes;
window.moles = moles;
window.showAndHide = showAndHide;
window.points = points;
window.updateScore = updateScore;
window.clearScore = clearScore;
window.whack = whack;
window.time = time;
window.setDuration = setDuration;
window.toggleVisibility = toggleVisibility;
window.setEventListeners = setEventListeners;
