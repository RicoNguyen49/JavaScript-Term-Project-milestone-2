// array of flag images
var flagsArray = [
    { name: 'Argentina', img: 'media/argentina.png'}, 
    { name: 'Belgium', img: 'media/'}, 
    { name: 'Colombia', img: 'media/'},
    { name: 'Egypt', img: 'media/'}, 
    { name: 'India', img: 'media/'}, 
    { name: 'Kenya', img: 'media/'},
    { name: 'Latvia', img: 'media/'}, 
    { name: 'Morocco', img: 'media/'}
  ];

// array of the country names
var namesArray = [
  { name: 'Argentina', img: 'media/argentina-text.png'}, 
  { name: 'Belgium', img: 'media/belgium-text.png'}, 
  { name: 'Colombia', img: 'media/colombia-text.png'},
  { name: 'Egypt', img: 'media/egypt-text.png'}, 
  { name: 'India', img: 'media/india-text.png'}, 
  { name: 'Kenya', img: 'media/kenya-text.png'},
  { name: 'Latvia', img: 'media/latvia-text.png'}, 
  { name: 'Morocco', img: 'media/morocco-text.png'} 
];

  // hide the hidden div and the play again buttton
  document.getElementById("hidden").style.visibility = "hidden"; 
  document.getElementById("playAgain").style.visibility = "hidden"; 

// the gameGrid consist of both arrays.
var gameGrid = flagsArray
.concat(namesArray)
.sort(function(){return 0.5 - Math.random()});

// get the div with the id 'game' and creade a section element
var game = document.getElementById('game');
var grid = document.createElement('section');

// game variables
var firstGuess = '';
var secondGuess = '';
// count for cards selected
var count = 0;
var previousTarget = null;
var delay = 1200;
var attempt = 0;
var correctCount = 0;

// audio effects
var correct = new Audio();
correct.src = 'media/correct.wav';

var flip = new Audio();
flip.src = 'media/flip.wav';

var victory = new Audio();
victory.src = 'media/victory.wav';

// set a class attribute to grid called grid and append to game
grid.setAttribute('class', 'grid');
game.appendChild(grid);

// create a new card div for each object, and set the data-name attribute and background-image style property of the div. 
//We will then append that div to the grid. This will give us 12 divs in total.


// loop through each item in the gameGrid
gameGrid.forEach(item => {
  var { name, img } = item;

  // create a flag dic
  var flag = document.createElement('div');
  flag.classList.add('flag');
  // set a data-name attribute to the flag that is the name in the array
  // the name will determine if the two cards match
  flag.dataset.name = name;

  // create a front and back class
  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  // add the img form the array to the back 
  back.style.backgroundImage = `url(${img})`;

  // append flag to div and back and front to the flag
  grid.appendChild(flag);
  flag.appendChild(front);
  flag.appendChild(back);
});

// function loops trhough selected elements
function match(){
  var selected = document.querySelectorAll('.selected');
  selected.forEach(flag => {
    flag.classList.add('match');
  });
};

// resets guesses
function resetGuesses(){
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  // remove selected class
  var selected = document.querySelectorAll('.selected');
  selected.forEach(flag => {
    flag.classList.remove('selected');
  });
};

  // function runs of all the matches are found
  function win(){
    document.getElementById("hidden").style.visibility = "visible";
    document.getElementById("playAgain").style.visibility = "visible"; 
    victory.play();
  }

// event listener for the grid to determine if an item is clicked
grid.addEventListener('click', event => {

  // the target is the item clicked
  var clicked = event.target;
  
  // make sure that the section itsels is not clickes
  // the previous target is not clickes
  // a alreadye selected card is not clicked
  // and a card in the match class is not clicked
  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  // only 2 cards can be selected
  if (count < 2) {
    // add to count
    count++;
    flip.play();
    // determine if first guess
    if (count === 1) {
      // assing first guess to clicked
      firstGuess = clicked.parentNode.dataset.name;
      // add to selected class
      clicked.parentNode.classList.add('selected');
    } else {
      // if second card add second guess to clicked
      secondGuess = clicked.parentNode.dataset.name;
      // add to selected class
      clicked.parentNode.classList.add('selected');
    }

    // if both are true
    if (firstGuess && secondGuess) {
      // check to see if their names match
      if (firstGuess === secondGuess) {
        // if match, run match function
        setTimeout(match, delay);
        setTimeout("correct.play()", 1000);
        // add to correct count
        correctCount++;
      }else{
        // if no match, add to attempt
        attempt++;
        document.getElementById('attempts').innerHTML = attempt;
      }
      // reset guesses function
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;

    // if correctCount is 12, the number of pairs. The game has been won
    if(correctCount == 12){
      setTimeout(win, 2000);
    }

  }
});



document.getElementById("readme").addEventListener("click",function(){              
    window.open("ReadMe.txt","readme","height=600","width=600","menubar=1","scrollbars=1","status=1","toolbar=1","titlebar=1");
})

