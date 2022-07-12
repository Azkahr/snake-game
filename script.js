const canvas = document.getElementById('game')
const wrapper = document.getElementById('wrapper')
const ctx = canvas.getContext('2d')

class SnakePart {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

let speed = 7
let tileCount = 20
let tileSize = canvas.width / tileCount - 2
let headX = 10
let headY = 10
const snakeParts = []
let taillength = 6

let appleX = 5
let appleY = 5

let xVelocity = 0
let yVelocity = 0

let score = 6

function drawGame() {
    changeSnakePosition()
    let result = isGameOver()
    if(result) return
    
    clearScreen()

    checkAppleCollision()
    drawApple()
    drawSnake()

    drawScore()
    
    setTimeout(drawGame, 1000 / speed)
}

function isGameOver() {
    let gameOver = false
    
    if(yVelocity === 0 && xVelocity === 0) return false
    
    // walls
    if(headX < 0) {
        gameOver = true
    } else if(headX === tileCount) {
        gameOver = true 
    } else if(headY < 0) {
        gameOver = true
    } else if(headY === tileCount) {
        gameOver = true
    }

    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i]
        if(part.x === headX && part.y === headY) {
            gameOver = true
            break
        }
    }
    
    if(gameOver) {
        ctx.fillStyle = 'white'
        ctx.font = '50px Verdana'
        ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height /2)
    }

    return gameOver
}

function drawScore() {
    ctx.fillStyle = 'white'
    ctx.font = '20px Verdana'
    ctx.fillText("Score : " + score, canvas.width-100, 20)
}

function clearScreen() {
    const img = new Image()
    img.src = 'img/board.jpg'
    const pattern = ctx.createPattern(img, 'repeat')
    ctx.fillStyle = pattern
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // ctx.fillStyle = 'black'
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
}   

function drawSnake() {
    ctx.fillStyle = 'green'
    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i]
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new SnakePart(headX, headY)) 
    while(snakeParts.length > taillength) {
        snakeParts.shift()
    }

    ctx.fillStyle = 'orange'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}

function changeSnakePosition() {
    headX = headX + xVelocity
    headY = headY + yVelocity
}

function drawApple() {
    ctx.fillStyle = 'red'
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision() {
    if(appleX == headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount)
        appleY = Math.floor(Math.random() * tileCount)
        taillength++
        score++
    }
}

document.body.addEventListener('keydown', keyDown)

function keyDown(e) {
    // up
    if(e.keyCode == 87) {
        // agar ular tidak bisa bergerak ke arah berlawanan
        if(yVelocity == 1) return
            yVelocity = -1
            xVelocity = 0
    }

    // down
    if(e.keyCode == 83) {
        if(yVelocity == -1) return
            yVelocity = 1
            xVelocity = 0
    }

    // left
    if(e.keyCode == 65) {
        if(xVelocity == 1) return
            yVelocity = 0
            xVelocity = -1
    }

    // right
    if(e.keyCode == 68) {
        if(xVelocity == -1) return
            yVelocity = 0
            xVelocity = 1
    }
}

function show() {
	document.getElementById("wrapper").style.display = 'block'
	document.getElementById("intro").style.display = 'none'
}

window.onload = function() {
    var reloading = sessionStorage.getItem("reloading");
    if (reloading) {
        sessionStorage.removeItem("reloading");
        show();
    }
}

function play() {
    sessionStorage.setItem("reloading", "true");
    document.location.reload();
}

function refresh() {
    location.reload()
}

// function testIlang() {
//     wrapper.style.display = 'none'
// }

drawGame()