// Select Start Button
document.querySelector(".control-buttons span").onclick = function () { //when click button ==>implement this function
    document.querySelector(".control-buttons").remove(); // Remove cover Screen
};
  
// Select cards Container
let cardContainer = document.querySelector(".memory-game-blocks");
// Create Array From Game cards
let cards = Array.from(cardContainer.children); //form => convert attribute to array //.children ==> لأنه احنا تريد العناصر بداخل هذا الدف الكبير
let order_Range = Array.from(Array(cards.length).keys()); //Create array has (length)number of elements ==> this element is key ==>this key is index

//call  shuffle function to make random array
shuffle(order_Range);

// Function to add Order Css Property To Game cards
cards.forEach((card, index) => {
    card.style.order = order_Range[index]; //add order property to css style
    //add event ==> click then implement function
    card.addEventListener('click', function () {
        flipBlock(card); }); //call function of flip card
}
);


// Flip Block Function
function flipBlock(selectedCard) {
    selectedCard.classList.add('is-flipped');// Add Class ==> is-flipped
    // Collect All Flipped Cards
    //each card we will click it add to function and add class to it
    let allFlippedCards = cards.filter(flippedCard => flippedCard.classList.contains('is-flipped'));
    // If  Two Selected card
    if (allFlippedCards.length === 2) {
        // Stop click 
        stopClicking();//call function
        checkMatchedBlocks(allFlippedCards[0], allFlippedCards[1]); //function  Check if the tow cards is same or no
    }
}

// Stop Clicking Function
let duration = 1000; // Effect Duration ==>to need it  card until flip  
function stopClicking() {
    cardContainer.classList.add('no-clicking'); // Add Class No Clicking on Main Container
    // Wait Duration after end remove 'no-clicking' class
    setTimeout(() => {
        // Remove Class 'No Clicking' After The Duration
        cardContainer.classList.remove('no-clicking');
    },duration);
}

//open popup النافذة الصغيرة
let popup = document.getElementById("popup");
function openpopup() {
    popup.classList.add("openpopup");
}
function closepopup() {
    popup.classList.remove("openpopup");
}
/////////////////////////
////////////problem//////
const problemElement = document.querySelector(".problem")
const ourForm = document.querySelector(".our-form")
const ourField = document.querySelector(".our-field")
const pointsNeeded = document.querySelector(".points-needed")
const mm = document.querySelector(".mm")
const mistakesAllowed = document.querySelector(".mistakes-allowed")
const endMessage = document.querySelector(".end-message")
const con_message = document.querySelector(".con-message")

let state = {
    score: 0,
    wrongAnswers: 0,
    card:0
  }
  
  function updateProblem() {
    state.currentProblem = generateProblem()
    problemElement.innerHTML = `${state.currentProblem.numberOne} ${state.currentProblem.operator} ${state.currentProblem.numberTwo}`
    ourField.value = ""
    ourField.focus()
  }
  
  updateProblem()
  //random 
  function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1))
    
}
  
  function generateProblem() {
    return {
      numberOne: generateNumber(10),//عشان يكون من صفر إلى عشرة
      numberTwo: generateNumber(10),
      operator: ['+', '-', 'x'][generateNumber(2)]
    }
  }
  
  function updateText(){
    mm.textContent = "";

  }
  ourForm.addEventListener("submit", handleSubmit)
  
  function handleSubmit(e) {
    e.preventDefault()
    
    let correctAnswer;
    const p = state.currentProblem;
    if (p.operator == "+") correctAnswer = p.numberOne + p.numberTwo
    if (p.operator == "-") correctAnswer = p.numberOne - p.numberTwo
    if (p.operator == "x") correctAnswer = p.numberOne * p.numberTwo
  
    if (parseInt(ourField.value, 10) === correctAnswer) {
        state.score++
        pointsNeeded.textContent = 0 + state.score
        mm.textContent = "صحيح";
        //document.body.classList.add("overlay-is-open")
        //alert('true');
        
    


    } else {
        mm.textContent = "خطأ";
        problemElement.classList.add("animate-wrong")
        setTimeout(() => problemElement.classList.remove("animate-wrong"), 451)
        //setTimeout(() => closepopup().focus(), 331)
    }
    setTimeout(() => closepopup(), 766)
    setTimeout(() =>  updateProblem(), 767)
    setTimeout(() =>  updateText(), 767)


  }
  
///////////////////////////////////
// Check Matched Block
function checkMatchedBlocks(firstCard, secondCard) {
    //let attempts_s = document.querySelector('.attempts_s span'); //select element (span) from document
    //let attempts_w = document.querySelector('.attempts_w span'); //select element (span) from document

    //if the two card match(same)
    if (firstCard.dataset.technology === secondCard.dataset.technology) { //name.dataset.element ==> fristCard.dataset.technolog==> technolog is the name of class ==> اذا كان نفس الداتا نفس الكلاس 
        state.score++
        state.card++
        pointsNeeded.textContent = 0 + state.score        
        //attempts_s.innerHTML = parseInt(attempts_s.innerHTML) + 1; //count number of true attempt ==> attempts_s is class name from dom
        //remove class 'is-flipped' ==> عشان لما نجي نشيك عليه مرة ثانية يشكيك بس لأخر بطاقتين احنا ضغطنا عليهم
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');
        // add class 'has-match' ==> to spesific this tow element have the same properties
        firstCard.classList.add('has-match');
        secondCard.classList.add('has-match');   
        

    }
    
     else {//remove is-flipped class after duration
        setTimeout(() => {
        firstCard.classList.remove('is-flipped');
        secondCard.classList.remove('is-flipped');
        //prompt("slove Q : 333 x 7 = ")
        openpopup();
        }, duration);
        //attempts_w.innerHTML = parseInt(attempts_w.innerHTML) + 1;
        state.wrongAnswers++
        mistakesAllowed.textContent = 0 + state.wrongAnswers
    
    }
    checkLogic()


    
}



// Shuffle Function ==> make the order of card be random
function shuffle(array) { //put array  as prammeter
    // Settings Vars
    let element_current = array.length, //number of element in array
        temp, //temporary value that we store valut to return it at last function
        random; //random index
       
        while (element_current > 0) { //if number of element > 0 ==> implement loop
            random = Math.floor(Math.random() * element_current); //get random number ==>number will be from 1 - 12 because the length of array 12
            element_current--; //decrement length
            //make swap for element
            /*
            array = [1,2,3,4,5,6,7,8,9,10,11,12]
            array[element_current]= 12
            temp = array[element_current] ==> temp =12
            array[element_current] = array[random] ==> current number equal any random element for example 3
            array[random] = temp  ==> array = [1,2,12,4,5,6,7,8,9,10,11,3]
            ----
            array[element_current]= 11 
            ....
            ....
            ....
            continue the same operations in loop until be current < 0
            */
            temp = array[element_current]; // Save Current Element in var temp
            array[element_current] = array[random]; //current Element = Random Element
            array[random] = temp; //Random Element = temp
        }
        
        return array;
        
    
    
    


}

function checkLogic() {
    // if you won
    if (state.card === 4) {
        if(state.score >= state.wrongAnswers)
        {
            con_message.textContent = "مبارك لقد فزت بجدارة"
            endMessage.textContent = " عدد النقاط المكتسبة أكبر من عدد النقاط المفقودة "
            document.body.classList.add("overlay-is-open")
        }
        else if (state.score == state.wrongAnswers) 
        {
            con_message.textContent = "مبارك لك لقد اجتزت اللعبة"
            endMessage.textContent = " عدد النقاط المكتسبة تساوي عدد النقاط المفقودة"
            document.body.classList.add("overlay-is-open")
        }
        else 
        {
            con_message.textContent = "للأسف لقد خسرت اللعبة"
            endMessage.textContent = " عدد النقاط المكتسبة أقل من عدد النقاط المفقودة"
            document.body.classList.add("overlay-is-open")
        }
  
   
  }
}