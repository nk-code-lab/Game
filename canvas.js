var myGameArea;
var myGamePlayer;
var myGameEnemy = [];
var myscore;


function startGame()
{
    myGameArea.start();
    myGamePlayer = new component(60,40,"plane.png",10,160,"image");
    // myGamePlayer = new component(50,40,"green",10,160);
    myScore = new component("30px","consolas", "white",400,30,"text");
}
myGameArea = 
{
    canvas : document.createElement("canvas"),
    start :function()
    {
        this.canvas.width = 600;
        this.canvas.height = 350;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas,document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea,20);
    },
    
    clear : function()
    {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    },
    stop : function()
    {
        clearInterval(this.interval);
    }
}

function component(width,height,color,x,y,type)
{
    this.type = type;
    if(type == "image" || type=="background") 
    {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function()
    {        
    ctx = myGameArea.context;
    if(this.type == "text")
    {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
    }
    else if (type == "image" || type == "background") {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        if (type == "background") 
        {
          ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    }
    else
    {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    }
    this.newPos = function()
    {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.type == "background") 
        {
            if (this.x == -(this.width)) 
            {
              this.x = 0;
            }
        }
    }
    this.crashWith = function(otherobj)
    {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if((mybottom<othertop)|| (mytop>otherbottom) || (myright<otherleft) || (myleft>otherright))
        {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() 
{
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for(i=0; i<myGameEnemy.length; i+=1)
    {
        if (myGamePlayer.crashWith(myGameEnemy[i]))
        {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if(myGameArea.frameNo==1 || everyInterval(200))
    {
        x = myGameArea.canvas.width;
        minHeight = 20;
        maxHeight = 200;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 60;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myGameEnemy.push (new component(10,height,"red",x,0));
        myGameEnemy.push(new component(10,x-height-gap,"red",x,height+gap));
    }
    for (i = 0; i<myGameEnemy.length; i+=1)
    {
        myGameEnemy[i].speedX = -1;
        myGameEnemy[i].newPos();
        myGameEnemy[i].update();
    }
    myScore.text="SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePlayer.newPos();
    myGamePlayer.update();
}
function everyInterval(n)
{
    if((myGameArea.frameNo / n)% 1 == 0)
    {
        return true;
    }
    return false;
}

function moveup()
{
    myGamePlayer.speedY = -1;   
}
function movedown()
{
    myGamePlayer.speedY = 1;   
}
function moveleft()
{
    myGamePlayer.speedX = -1;   
}
function moveright()
{
    myGamePlayer.speedX = 1;   
}

function clearmove() 
{
    myGamePlayer.speedX = 0;
    myGamePlayer.speedY = 0;
}
