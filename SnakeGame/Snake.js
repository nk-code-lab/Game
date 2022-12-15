// Creating variables
var snake;
var field;
var startbtn;

// Stating game and running necessary
function startGame()
{
    field.start();
    // Adding new component to the game also create a function for same below
    snake = new component(30, 30, "red", 230, 120);
}
// Creating canvas for game field
field =
{
    canvas : document.createElement("canvas"),
    start : function()
    {
        this.canvas.width=600;
        this.canvas.height=300;
        this.context = this.canvas.getContext("2D");
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
    }
}

// Creating button for PLAY GAME
startbtn = document.createElement("button");
startbtn.innerHTML="PLAY";

// Attaching button
div = document.getElementsByClassName("btnclass")[0];
div.appendChild(startbtn);

// On Click function on button
startbtn.addEventListener("click",function()
{
    // hiding button
    startbtn.style.display="none";

    // starting game function 
    startGame();
});


// Function for player component 

function component(width, height, color, x, y) 
{
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    ctx = field.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
}