// game components
var myGamePiece;
var myBackground;
var myObstacles = [];
var myScore;
var myLevel;
var gameOverText;
var obstacleSpeed = 2; // Initial speed of obstacles
var maxObstacleSpeed = 20; // Maximum speed of obstacles
var obstacleAcceleration = 1; // Acceleration rate
var levelThreshold = 300; // Level threshold to increase speed
var gameoverSound = document.getElementById("gameoverSound");
//https://mixkit.co/free-sound-effects/game-over/


function startGame() {
    document.getElementById("playAgain").style.visibility = "hidden"; 
    myGamePiece = new component(40, 50, "../Final Project/SpaceExplore/media/Spaceship1.png", 10, 250, "image");
    myBackground = new component(1000, 700, "../Final Project/SpaceExplore/media/spacebackground.jpg", 0, 0, "background")
    myLevel = new component("30px", "Consolas", "cyan", 400, 40, "text");
    myScore = new component("30px", "Consolas", "white", 800, 40, "text");
    gameOverText = new component("70px", "Cursive", "cyan", 280, 330, "text");
    myGameArea.start();
}

// creates a canvas which is the game area
var myGameArea = {
    canvas : document.getElementById("myCanvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        //document.body.innerHTML(this.canvas, document.div.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);

        // cheks if a key is pressed
        window.addEventListener('keydown', function(e){
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function(e){
            myGameArea.keys[e.keyCode] = false;
        })

        },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    stop : function() {
        clearInterval(this.interval);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image" || type == "background") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    


    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image" || type == "background") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
            if(type == "background"){
                ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
            }
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        if(this.type == "text"){
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }
    }

    // function to change the x and y positions
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;     
        
        // checks if the x position has reach the end of the image
        if(this.type == "background"){
            if(this.x == -(this.width)){
                this.x = 0;
            }
        }   
    }

    // function that returns boolean value for if the game piece crashed with game obstacles
    this.crashWith = function(otherobj){
        var myLeft = this.x;
        var myRight = this.x + (this.width);
        var myTop = this.y;
        var myBottom = this.y + (this.height);
        var otherLeft = otherobj.x;
        var otherRight = otherobj.x + (otherobj.width);
        var otherTop = otherobj.y;
        var otherBottom = otherobj.y + (otherobj.height);
        var crash = true;
        if((myBottom < otherTop) ||
            (myTop > otherBottom) ||
            (myRight < otherLeft) ||
            (myLeft > otherRight)){
            
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for(i = 0; i < myObstacles.length; i += 1){
        if(myGamePiece.crashWith(myObstacles[i])){
            gameoverSound.play();
            myGameArea.stop();
            myGameArea.clear();
            myBackground.update();
            myScore.text = "SCORE: " + myGameArea.frameNo;
            myScore.update();
            myLevel.text="Level: " + Math.round(myGameArea.frameNo/500);
            myLevel.update();
            gameOverText.text = "GAME OVER";
            gameOverText.update();
            document.getElementById("playAgain").style.visibility = "visible"; 
            return;
        }       
        // Increase obstacle speed based on level
        if (myGameArea.frameNo % levelThreshold === 0 && obstacleSpeed < maxObstacleSpeed) {
            obstacleSpeed += obstacleAcceleration;
        }

        // Move and update existing obstacles with increased speed
        for (var i = 0; i < myObstacles.length; i++) {
            myObstacles[i].x -= obstacleSpeed; // Move the obstacle with increased speed
            myObstacles[i].update();
            
            // Remove obstacle if it goes out of screen
            if (myObstacles[i].x <= -myObstacles[i].width) {
                myObstacles.splice(i, 1);
                i--; // Decrement i to account for removed obstacle
            }

            // Check collision with game piece
            if (myGamePiece.crashWith(myObstacles[i])) {
                gameoverSound.play();
                myGameArea.stop();
                myGameArea.clear();
                myBackground.update();
                myScore.text = "SCORE: " + myGameArea.frameNo;
                myScore.update();
                myLevel.text="Level: " + Math.round(myGameArea.frameNo/500);
                myLevel.update();
                gameOverText.text = "GAME OVER";
                gameOverText.update();
                document.getElementById("playAgain").style.visibility = "visible"; 
                return;
            }
        }
    }

    myGameArea.clear();
    myBackground.speedX = -1;
    myBackground.newPos();
    myBackground.update();

    myGameArea.frameNo += 1;
    if(myGameArea.frameNo == 1 || everyInterval(100)){
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 300;
        height = Math.floor(Math.random()*(maxHeight - minHeight + 1) +minHeight);
        minGap = 100;
        maxGap = 300;
        gap = Math.floor(Math.random()*(maxGap - minGap +1) +minGap);
                // create array of colors, get random number, use random number to index array so we can set our obstacle to a random color!
                var colors = ["navy", "yellow", "red", "purple", "black"];
                var randomColorIndex = 0;
                switch(myLevel.text){
                case "Level: 0":
                case "Level: 7":
                randomColorIndex = 0;
                break;
                case "Level: 1":
                case "Level: 8":
                randomColorIndex = 0;
                break;
                case "Level: 2":
                case "Level: 9":
                randomColorIndex = 1;
                break;
                case "Level: 3":
                case "Level: 10":
                randomColorIndex = 2;
                break;
                case "Level: 4":
                case "Level: 11":
                randomColorIndex = 3;
                break;
                case "Level: 5":
                case "Level: 12":
                randomColorIndex = 4;
                break;
                case "Level: 6":
                case "Level: 13":
                randomColorIndex = 5;
                break;
                }
                var randomColor = colors[randomColorIndex];
                myObstacles.push(new component(10, height, randomColor, x, 0));
                myObstacles.push(new component(10, x - height - gap, randomColor, x, height + gap));    
    }
    
    for(i = 0; i < myObstacles.length; i += 1){
        myObstacles[i].x += 0;
        myObstacles[i].update();
    }

    // update the score
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    myLevel.text="Level: " + Math.round(myGameArea.frameNo/500);
    myLevel.update();
    myGamePiece.newPos();    
    myGamePiece.update();
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
    if(myGameArea.keys && myGameArea.keys[37]){myGamePiece.speedX = -3;} //move left
    if(myGameArea.keys && myGameArea.keys[39]){myGamePiece.speedX = 3;} // move right
    if(myGameArea.keys && myGameArea.keys[38]){myGamePiece.speedY = -3;} // move up
    if(myGameArea.keys && myGameArea.keys[40]){myGamePiece.speedY = 3;} // move down
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyInterval(n){
    if((myGameArea.frameNo / n) % 1 == 0) {return true;}
        return false;
}

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 38 || event.keyCode === 40) { // Up or Down arrow keys
        event.preventDefault();
    }
});

document.getElementById("readmeSpace").addEventListener("click",function(){              
    window.open("ReadMe.txt","readme","height=600","width=600","menubar=1","scrollbars=1","status=1","toolbar=1","titlebar=1");
})