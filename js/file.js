audio = new Audio('music.mp3');
audio.volume = 0.5;
audiogo = new Audio('ouch.mp3');
audioJump = new Audio('up.mp3');
audioJump.volume = 0.1;

let container = document.querySelector("#container");
let dino = document.querySelector("#dino");
let block = document.querySelector("#block");
let road = document.querySelector("#road");
let cloud = document.querySelector("#cloud");
let score = document.querySelector("#score");
let gameOver = document.querySelector("#gameOver");

//declaring variable for score
let interval = null;
let playerScore = 0;


//function for score
let scoreCounter = () => {
    playerScore++;
    score.innerHTML = `Score <b>${playerScore}</b>`;
}


//start Game
window.addEventListener("keydown", (start) => {
    //    console.log(start);
    if (start.code == "Space") {
        audio.play();
        audio.loop = true;
        gameOver.style.display = "none";
        block.classList.add("blockActive");
        road.firstElementChild.style.animation = "roadAnimate 1.5s linear infinite";
        cloud.firstElementChild.style.animation = "cloudAnimate 10s linear infinite";
        dino.classList.add("dino2Active");

        //score
        let playerScore = 0;
        interval = setInterval(scoreCounter, 200);
    }
});


//jump Your Character
window.addEventListener("keydown", (e) => {
    //    console.log(e);

    if (e.key == "ArrowUp")
        if (dino.classList != "dinoActive") {
            dino.classList.add("dinoActive");

            //                remove class after 0.5 seconds
            setTimeout(() => {
                dino.classList.remove("dinoActive");
            }, 500);
            
            audioJump.play();
            setTimeout(() => {
                audioJump.pause();
            }, 700);
        }
});

//'Game Over' if 'Character' hit The 'Block' 
let result = setInterval(() => {
    let dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue("bottom"));
    //    console.log("dinoBottom" + dinoBottom);

    let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));
    let blockRight = parseInt(getComputedStyle(block).getPropertyValue("right"));
    //    console.log("BlockLeft" + blockLeft);

    if (dinoBottom <= 90 && blockLeft >= 20 && blockLeft <= 145) {
        audio.pause();
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
        }, 1000);
        //        console.log("Game Over");

        gameOver.style.display = "block";
        block.classList.remove("blockActive");
        road.firstElementChild.style.animation = "none";
        cloud.firstElementChild.style.animation = "none";
        dino.classList.remove("dino2Active");
        clearInterval(interval);
        playerScore = 0;
    }
}, 10);
