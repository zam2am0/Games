var myGamePiece;
var mercury, venus, earth, mars, jupiter, saturn, uranus, neptune;
var updateInterval;
var movePieceInterval;
var myObstacles = [];

document.querySelector(".control-buttons span").onclick = function () { //when click button ==>implement this function
    document.querySelector(".control-buttons").remove(); // Remove cover Screen
};

function startGame() {
    myGameArea.start();
    sun = new component(800, 800, "sun.png", 1500,0 ,"img");
    mercury = new component(80, 80, "mercury.png", 1300, 550,"img");
    venus = new component(90, 90, "venus.png", 1100, 200,"img");
    earth = new component(100, 100, "earth.png", 900, 400,"img");
    mars = new component(60, 60, "mars.png", 700, 520,"img");
    jupiter = new component(160, 160, "jupiter.png", 550, 200,"img");
    saturn = new component(150, 150, "saturn.png", 300, 100,"img");
    uranus = new component(70, 70, "uranus.png", 200, 450,"img");
    neptune = new component(55, 55, "neptune.png", 80, 250,"img");
    myGamePiece = new component(70,75, "ufo.png", 50,50,"img");
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width =  window.innerWidth;
        this.canvas.height =window.innerHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        
        this.frameNo = 0;       
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })

    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}


function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "img") {
        this.image = new Image();
        this.image.src = color;
    }
    this.name = color;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;  
    this.update = function(){
        ctx = myGameArea.context;
        if (type == "img") {
            ctx.drawImage(this.image, this.x , this.y , this.width, this.height);
            } 
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x , this.y  , this.width, this.height);
        }
    }

    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }    
    
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)) {
            crash = false;
        }
        return crash;
        }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -1; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 1; }
    myGamePiece.newPos();
    myGamePiece.update();
    sun.update();
    mercury.update();
    venus.update();
    earth.update();
    mars.update();jupiter.update(); saturn.update(); uranus.update(); neptune.update();
    myObstacles = [sun,mercury,venus,earth,mars,jupiter,saturn,uranus,neptune];

    for(var i=0; i< myObstacles.length; i++){
        if (myGamePiece.crashWith(myObstacles[i])){
            if(myObstacles[i].name == "jupiter.png") {
                myGameArea.stop();
                var qusetion0 = document.getElementById("correct");
                qusetion0.classList.add("open-correct");
                //win
                document.querySelector(".correct div span").onclick = function (){
                    window. close();
                    
                }
            }
            else{
                myGameArea.stop();
                var qusetion0 = document.getElementById("wrong");
                qusetion0.classList.add("open-wrong");
                //loss
                document.querySelector(".wrong div span").onclick = function (){
                    window. close();

                }
            }
        }
    }
        
}
