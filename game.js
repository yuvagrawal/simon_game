var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern = [];
var Nokey = 0;
var level=0;
function nextsequence()
{
    var r = Math.round((Math.random())*3);
    var randomChosenColour = buttonColours[r];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level "+level);
    
}
function handler()
{
    var userChosenColour=this.getAttribute("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    correctSequence();
}
function playSound(name)
{
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour)
{
    var i = "#"+currentColour;
    $(i).addClass("pressed");
    setTimeout(function(){$(i).removeClass("pressed");},100);
}
function correctSequence()
{
    var G = gamePattern.length;
    var U = userClickedPattern.length;
    if(G===U)
    {
        if(gamePattern[G-1]===userClickedPattern[U-1])
        {
            playSound(userClickedPattern[U-1]);
            setTimeout(function(){nextsequence();},1000);
            userClickedPattern = [];
        }
        else
        {
            gameOver();
        }
    }
    else if(G>U)
    {
        if(gamePattern[U-1]===userClickedPattern[U-1])
        {
            playSound(userClickedPattern[U-1]);
        }
        else
        {
            gameOver();
        }
    }
    else{
        gameOver();
    }

}
function gameOver()
{
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");},200);
    startOver();
    
}
function startOver()
{
    gamePattern=[];
    userClickedPattern = [];
    Nokey = 0;
    level = 0;
}
$(document).keydown(function(){
    if(Nokey===0)
    {
        nextsequence();
        Nokey++;
    }
});
$(".btn").click(handler);

