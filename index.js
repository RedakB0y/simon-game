let started = false;
let randomColor = ["green", "red", "yellow", "blue"];
let randomColorGenerate = [];
let userClickColorGenerate = [];
let level = 1;
let count = 0;
let i = 0;
$(document).keypress(function () {
    if (!started) {
        started = true;
        randomSeq();
        $("#heading").text("Level " + level);
    }
});


function randomSeq() {
    if (i <= count) {
        setTimeout(function () {
            let randonNumber = Math.floor((Math.random() * 4));
            let generateColor = randomColor[randonNumber];
            $("#" + generateColor).fadeOut().fadeIn(1);
            playAudio(generateColor);
            randomColorGenerate.push(generateColor);
            i++;
            randomSeq();
        }, 1000);
    }
}


$(".box").click(function () {
    $(this).fadeOut().fadeIn(0.01);
    let userClickColor = $(this).attr("id");
    playAudio(userClickColor);
    userClickColorGenerate.push(userClickColor);
    match(userClickColorGenerate.length - 1);
})


function playAudio(val) {
    let sound = new Audio("sound/" + val + ".mp3");
    sound.play();
}


function match(val) {
    if (randomColorGenerate[val] === userClickColorGenerate[val]) {
        if (randomColorGenerate.length === userClickColorGenerate.length) {
            setTimeout(function () {
                randomColorGenerate = [];
                userClickColorGenerate = [];
                count++;
                i = 0;
                level++;
                $("#heading").text("Level " + level);
                randomSeq();

            }, 1000);
        }
    }
    else {
        restartGame();
    }
}

function restartGame() {
    $("#heading").text("GameOver\n You Lose!!");
    level = 0;
    let sound = new Audio("sound/gameover.mp3");
    sound.play();
    started = false;
    randomColorGenerate = [];
    userClickColorGenerate = [];


}