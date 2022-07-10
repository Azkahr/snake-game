const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

let speed = 7
let tileCount = 20
let tileSize = canvas.width / tileCount - 2
let headX = 10
let headY = 10

let xVelocity = 0
let yVelocity = 0

function drawGame() {
    clearScreen()
    changeSnakePosition()
    drawSnake()
    setTimeout(drawGame, 1000/speed)
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
    ctx.fillStyle = 'orange'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
}

function changeSnakePosition() {
    headX = headX + xVelocity
    headY = headY + yVelocity
}

document.body.addEventListener('keydown', keyDown)

function keyDown(e) {
    // up
    if(e.keyCode == 87) {
        yVelocity = -1
        xVelocity = 0
    }

    // down
    if(e.keyCode == 83) {
        yVelocity = 1
        xVelocity = 0
    }

    // left
    if(e.keyCode == 65) {
        yVelocity = 0
        xVelocity = -1
    }

    // right
    if(e.keyCode == 68) {
        yVelocity = 0
        xVelocity = 1
    }
}

drawGame()