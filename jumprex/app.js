'use strict';
$(document).ready(function () {
    const grid = $('.grid');
    const rex = $(document.createElement('div'));
    let rexLeftSpace;
    let jumpStart = 5;
    let rexBottomSpace = jumpStart;
    let isGameOver = false;
    let platCount = 8;
    let platforms = [];
    let jumpHeight = 20;
    let upTimerId;
    let downTimerId;
    let leftTimerId;
    let rightTimerId;
    let movePlatformId;
    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;
    let isMoving = false;
    let score = 0;
    let startPlat;
    let currentPlat;

    function createRex(){
        rex.addClass('rex');
        grid.append(rex);
        startPlat = platforms[0];
        rexLeftSpace = platforms[0].left;
        rex.css('left', platforms[0].left + 'vw');
        rex.css('bottom', rexBottomSpace + 'vw');
    }

    class Platform{
        constructor(newPlatBottom){
            this.bottom = newPlatBottom;
            this.left = Math.random() * 40;
            this.visual = $(document.createElement('div'));
            const visual = this.visual;

            visual.addClass('platform');
            visual.css('left', this.left + 'vw');
            visual.css('bottom', this.bottom + 'vw');
            grid.append(visual);
        }
    }

    function createPlatforms(){
        for(let i=0; i < platCount; i++){
            let gridHeight = grid.height();
            let platGap = 90 / platCount;
            let newPlatBottom = 10 + i * platGap;
            let newPlaform = new Platform(newPlatBottom);
            platforms.push(newPlaform);
        }
    }

    function movePlatforms(){
        if(rexBottomSpace > 2){
            platforms.forEach(platform => {
                platform.bottom -= .2;
                let visual = platform.visual;
                visual.css('bottom', platform.bottom + 'vw');

                if (platform.bottom < 0){
                    let firstPlatform = platforms[0].visual;
                    firstPlatform.removeClass('platform');
                    platforms.shift();
                    // console.log(platforms);
                    let newPlaform = new Platform(90); // at top of grid
                    platforms.push(newPlaform);
                    score++;
                }
            })
        }
    }

    function gameOver(){
        // console.log('gameOver')
        isGameOver = true;
        rex.addClass('blink')
        setTimeout(()=>{
            grid.empty();
            grid.html(`<div class="result">Score: ${score}</div>`)
        }, 1000)
        
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(leftTimerId);
        clearInterval(rightTimerId); 
        $('#l').prop('disabled', true);
        $('#u').prop('disabled', true);
        $('#r').prop('disabled', true);
    }

    function fall(){
        // console.log('falling')
        isJumping = false;
        clearInterval(upTimerId);
        downTimerId = setInterval(function(){
            rexBottomSpace -= .8;
            rex.css('bottom', rexBottomSpace + 'vw');
            if (rexBottomSpace <= 0){
                gameOver();
            }

            platforms.forEach((platform, i)  => {
                if ( !isJumping && (rexBottomSpace >= platform.bottom) //if above platform
                && (rexBottomSpace <= platform.bottom + 2) //2 represents height of each platform
                && (rexLeftSpace + 8 >= platform.left) // 8 rex width
                && (rexLeftSpace <= platform.left + 10)) //10 represents height of each platform
                {
                    // console.log('jump');
                    jump();
                    jumpStart = rexBottomSpace;
                    currentPlat = platforms[i];

                    
                    if(rexBottomSpace >= 60){// at top of screen{
                        // console.log('scrolling 10ms');
                        clearInterval(movePlatformId);
                        movePlatformId = setInterval(movePlatforms, 10)
                        isMoving = true; //not rllt in use rn can remove if utility not found
                    } else if (startPlat != currentPlat){ // can also do if below screen on certain part and current greater than start
                        // console.log('scrolling')
                        clearInterval(movePlatformId);
                        movePlatformId = setInterval(movePlatforms, 20)
                        // console.log('scrolling 30ms');
                        isMoving = true;  
                    } else{
                        clearInterval(movePlatformId);
                        isMoving = false;
                    }
                    startPlat = currentPlat;
                }
            })
        }, 20)
    }
    function jump(){
        // console.log('jumping')
        isJumping = true;
        clearInterval(downTimerId);
        upTimerId = setInterval(function(){
            rexBottomSpace += .8;
            rex.css('bottom', rexBottomSpace + 'vw');
            if (rexBottomSpace > jumpStart + jumpHeight){
                fall();
            }
        },20 )
        
    }

    function moveLeft(){
        if (isGoingRight){
            // clearInterval(rightTimerId);
            isGoingRight = false;
        }
        // if (isGoingLeft){
        //     return;
        // }
        isGoingLeft = true;
        if (rexLeftSpace >= 0){
                rexLeftSpace -= .8;
                rex.css('left', rexLeftSpace + 'vw');
        }

        // leftTimerId = setInterval(function(){
        //     if (rexLeftSpace >= 0){
        //         rexLeftSpace -= .4;
        //         rex.css('left', rexLeftSpace + 'vw');
        //     } else {
        //         clearInterval(leftTimerId);
        //         isGoingLeft = false;
        //     }
        // },20)
    }

    function moveRight(){
        if (isGoingLeft){
            // clearInterval(leftTimerId);
            isGoingLeft = false;
        }

        // if (isGoingRight){
        //     return;
        // }

        isGoingRight = true;
        if (rexLeftSpace <= 60 - 8){ //acount for width of rex
                rexLeftSpace += .8;
                rex.css('left', rexLeftSpace + 'vw');
        }
        // rightTimerId = setInterval(function(){
        //     if (rexLeftSpace <= 60 - 8){ //acount for width of rex
        //         rexLeftSpace += .4;
        //         rex.css('left', rexLeftSpace + 'vw');
        //     } else{
        //         clearInterval(rightTimerId)
        //         isGoingRight = false;
        //     }
        // },20)
    }

    // function moveStraight(){
    //     isGoingLeft = false;
    //     isGoingRight = false;
    //     // clearInterval(leftTimerId)
    //     // clearInterval(rightTimerId);
    // }


    function control(e){
        if (e.key === "ArrowLeft"){
            moveLeft();
        } else if(e.key === "ArrowRight"){
            moveRight();
        }
        //else if (e.key === "ArrowUp"){
        //     moveStraight();
        // }
    }

    function start(){
        if (!isGameOver){
            createPlatforms();
            createRex();
            // setInterval(movePlatforms, 30);
            jump(); 
        }

        document.addEventListener('keydown', control);

        $('#l').on('touchstart mousedown', function(e) {
            e.preventDefault();
            clearInterval(rightTimerId);
            leftTimerId = setInterval(function () {
                moveLeft();
            }, 20);
        });

        $('#l').on('touchend mouseup', function(e) {
            e.preventDefault();
            clearInterval(leftTimerId);
         });

        // $('#u').click(function(){
        //     moveStraight();
        // });

        $('#r').on('touchstart mousedown', function(e) {
            e.preventDefault();
            clearInterval(leftTimerId);
            rightTimerId = setInterval(function () {
                moveRight();
            }, 20);
        });

        $('#r').on('touchend mouseup', function(e) {
            e.preventDefault();
            clearInterval(rightTimerId);
         });



    }
    //attach to button
    start();
    
})
    

