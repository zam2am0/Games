// Select Start Button
document.querySelector(".control-buttons span").onclick = function () { //when click button ==>implement this function
  document.querySelector(".control-buttons").remove(); // Remove cover Screen
};
// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";

// Get Array From Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach(letter => {

  // Create Span
  let span = document.createElement("span");

  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);

  // Append The Letter To Span
  span.appendChild(theLetter);

  // Add Class On Span
  span.className = 'letter-box';

  // Append Span To The Letters Container
  lettersContainer.appendChild(span);

});

// Object Of Words + Categories
const words = {
  برمجة: ["python", "mySql","js","java"],
}

// Get Random Property

let allKeys = Object.keys(words);

// Random Number Depend On Keys Length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);

// Category
let randomPropName = allKeys[randomPropNumber];

// Category Words
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);

// The Chosen Word
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category Info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen Word To Array
let lettersAndSpace = Array.from(randomValueValue);

// Create Spans Depened On Word
lettersAndSpace.forEach(letter => {

  // Create Empty Span
  let emptySpan = document.createElement("span");

  // If Letter Is Space
  if (letter === ' ') {

    // Add Class To The Span
    emptySpan.className = 'with-space';

  }

  // Append Span To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);

});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// Set Wrong Attempts
let wrongAttempts = 0;

// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");
let corectLette =[];

// Handle Clicking On Letters
document.addEventListener("click", (e) => {

  // Set The Choose Status
  let theStatus = false;

  if (e.target.className === 'letter-box') { 

    e.target.classList.add("clicked");//لما نضغط على الحرف يضيف كلاس كليك وهذا نسقه ب css

    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase(); //الحرف بضغط عليه

    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());//الكلمة المختارة كاملة
    theChosenWord.forEach((wordLetter, WordIndex) => {

      // If The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter == wordLetter) {
        
        // Set Status To Correct
        theStatus = true;
        
        
        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (WordIndex === spanIndex) {

            span.innerHTML = theClickedLetter;
            
            

          }
        }
        
        
        );
        corectLette.push(theClickedLetter);
        return corectLette;

      }
    });
    

    // Outside Loop

    // If Letter Is Wrong
    if (theStatus !== true) {
        // Create Popup Div
        let div = document.createElement("div");

    

      // Increase The Wrong Attempts
      wrongAttempts++;

      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      // Play Fail Sound

      if (wrongAttempts === 8) {

        endGameF();

        lettersContainer.classList.add("finished");
     

      }

    } else {
      /*
       if (corectLette.length == theChosenWord.length){


          endGames();
        }

      
      */
     console.log(corectLette)
      console.log(corectLette.length);
      console.log(theChosenWord.length);
        
        if (corectLette.length == theChosenWord.length){


          endGames();
        }



      

    }

  }

});



// End Game Function
function endGameF() {

  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(` ${randomValueValue}لقد خسرت الكلمة هي  `);

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = 'popup';

  // Append To The Body
  document.body.appendChild(div);

}
function endgsu(){
  if (corectLette.length == theChosenWord.length){
    endGames();
  }
}
function endGames() {

  // Create Popup Div
  let div = document.createElement("div");

  // Create Text
  let divText = document.createTextNode(` ${randomValueValue} رائع الكلمة هي `);

  // Append Text To Div
  div.appendChild(divText);

  // Add Class On Div
  div.className = 'popup';

  // Append To The Body
  document.body.appendChild(div);

}