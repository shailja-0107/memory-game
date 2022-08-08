//alert("Working");

var gamePattern =[];
var userClickedPattern=[];

var buttonColours=["red", "blue", "green","yellow"];

var level=0;
var start=false;

$(document).keypress(function(){
    if(!start){
        $("#level-title").text("Level "+level);
        nextSequence();
        start=true;
    }
})
var i=0;
function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);

    var randomNumber=Math.random();
    randomNumber=Math.floor(4*randomNumber);
    var randomChosenColour= buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
}

$(".btn").click(function(){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[i]){
        i++;
        if(i==level){
            setTimeout(nextSequence,1000);
            userClickedPattern=[];
            i=0;
        }
    }
    else {
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over! Press any key to restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    start=false;
    i=0;
}