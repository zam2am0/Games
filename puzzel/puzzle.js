var rows = 4;
var columns = 3;
var currTile;
var otherTile;
var turns = 0;

document.querySelector(".control-buttons span").onclick = function () { 
    document.querySelector(".control-buttons").remove(); 
};
  

function startGame(){
    let blanks = [];
    for (let i=1; i <= rows*columns; i++) {
        blanks.push(i.toString()); 
    }
    //initialize the 5x5 board
    for (var i=0; i<rows;i++){
        for (var j = 0; j < columns; j++) {
            //<img>
            var tile = document.createElement("img");
            tile.src = "./images/blank.jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver);   //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop);       //drop an image onto another one
            tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

            document.getElementById("board").append(tile);
        }
    }
    

    //pieces
    let pieces = [];
    for (let i=1; i <= rows*columns; i++) {
        pieces.push(i.toString()); //put "1" to "25" into the array (puzzle images names)
    }
    pieces.reverse();
    for (let i =0; i < pieces.length; i++) {
        let j = Math.floor(Math.random() * pieces.length);

        //swap
        let tmp = pieces[i];
        pieces[i] = pieces[j];
        pieces[j] = tmp;
    }

    for (let i = 0; i < pieces.length; i++) {
        let tile = document.createElement("img");
        tile.src = "./images/" + pieces[i] + ".jpeg";

        //DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver);   //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
        tile.addEventListener("drop", dragDrop);       //drop an image onto another one
        tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

        document.getElementById("pieces").append(tile);
    }
}

//DRAG TILES
function dragStart() {
    currTile = this; //this refers to image that was clicked on for dragging
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to image that is being dropped on
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;

    currTile.src = otherImg;
    otherTile.src = currImg;
    turns += 1;
    document.getElementById("turns").innerText = turns;
}

function check(){
    const images = document.getElementById("board").children;
    var ordered = true;

    for (var i=0; i<images.length; i++){
        if (!images[i].src.includes(i+1)){
            ordered = false;
        } 
    }
    if (ordered){
        var qusetion0 = document.getElementById("question");
        qusetion0.classList.add("open-question");
    }
    else{
        var qusetion0 = document.getElementById("wrong");
                qusetion0.classList.add("open-wrong");
                //loss
                document.querySelector(".wrong div span").onclick = function (){
                    window. close();}

    }
}