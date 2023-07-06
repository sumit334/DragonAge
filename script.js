score = 0;
cross = true;

audioMusic = new Audio('music.wav');
audioMusic.loop = true;
audioGameOver = new Audio('gameover.mp3');

setTimeout(() => {
    audioMusic.play();
}, 1000);

document.onkeydown = function (e) {

    if (e.key == "ArrowUp") {
        dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        }, 600);
    }
    if (e.key == "ArrowRight") {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }
    if (e.key == "ArrowLeft") {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX - 112 + "px";
    }

}

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offSetX = Math.abs(dx - ox);
    offSetY = Math.abs(dy - oy);

    if (offSetX < 90 && offSetY < 54) {

        document.onkeydown = function (e) {
            if (e.key == "Enter") {
                location.reload();
            }
        }
        gameOver.innerHTML = "GAME OVER! - Press Enter to Restart";
        obstacle.classList.remove('obstacleAnimate');
        audioGameOver.play();
        setTimeout(() => {
            if (score == 0) {
                scoreUpdate(score);
            }
            else scoreUpdate(score - 100);
        }, 1);
        setTimeout(() => {
            audioMusic.pause();
            audioGameOver.pause();
            if (score == 0) {
                scoreUpdate(score);
            }
            else scoreUpdate(score - 100);
        }, 1000);
        cross = false;
    }
    else if (offSetX < 145 && cross) {
        score += 100;
        scoreUpdate(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDuration = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            if (aniDuration >= 2.5) {
                newDuration = aniDuration - 0.1;
                obstacle.style.animationDuration = newDuration + 's';
            }
        }, 500);
    }
}, 10);

function scoreUpdate(score) {
    gameScrore.innerHTML = "YOUR SCORE: " + score;
}