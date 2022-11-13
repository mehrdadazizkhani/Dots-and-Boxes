const root = document.querySelector(':root')

const playerA = document.querySelector('.player-a')
const playerAScore = document.querySelector('.player-a-score')
const gameStatus = document.querySelector('.game-status')
const playerBScore = document.querySelector('.player-b-score')
const playerB = document.querySelector('.player-b')

const gameBoard = document.querySelector('.game-board')
const gameGridContainer = document.querySelector('.game-grid-container')

const reset = document.querySelector('.reset')
const mainMenu = document.querySelector('.main-menu')

const score = document.querySelector('.score')
const scoreText = document.querySelector('.score-text')

const gameSetup = document.querySelector('.game-setup')
const player1Name = document.getElementById('player1')
const player1Color = document.getElementById('player1-color')
const player2Name = document.getElementById('player2')
const player2Color = document.getElementById('player2-color')
const rows = document.getElementById('rows')
const columns = document.getElementById('cols')
const start = document.querySelector('.submit')



let lineContainer
let boxContainer
let numberOfRows
let numberOfColumns
let windowHeight
let windowWidth
let playerTurn = true
let numberOfLines

let player1Points = 0
let player2Points = 0

let lineWidth
let boxWidth
let rowsGridArray
let columnsGridArray
let rowsGridPattern = ""
let colsGridPattern = ""

reset.addEventListener("click", startHandler)
mainMenu.addEventListener("click", setupHandler)
function setupHandler () {
    gameSetup.style.display = "flex"
}

start.addEventListener("click", startHandler)

function startHandler () {
    windowWidth = gameBoard.offsetWidth - 50
    windowHeight = gameBoard.offsetHeight - 210
    gameSetup.style.display = "none"
    root.style.setProperty("--player1-color", player1Color.value)
    root.style.setProperty("--player2-color", player2Color.value)
    root.style.setProperty("--hover-color", player1Color.value)
    numberOfRows = Number(rows.value)
    numberOfColumns = Number(columns.value)
    player1Name.value ? playerA.innerText = player1Name.value : playerA.innerText = "Player 1"
    player2Name.value ? playerB.innerText = player2Name.value : playerB.innerText = "Player 2"
    player1Points = 0
    player2Points = 0
    playerAScore.innerText = player1Points
    playerBScore.innerText = player2Points
    gameGridContainer.innerHTML = ""
    gameGridGenerator()
    numberOfLines = ((numberOfRows + 1) * numberOfColumns) + ((numberOfColumns + 1) * numberOfRows)
    playerTurn = true
    reset.innerText = "reset"
    gameStatus.innerText = `${playerA.innerText}'s turn`
}


gameGridGenerator = () => {

    adjustGrid()
    
    for (let i = 0; i < rowsGridArray.length; i++) {
        if (i % 2 == 0) {
            for (let j = 0; j < columnsGridArray.length; j++) {
                if (j % 2 == 0) {
                    const dot = document.createElement("div")
                    dot.classList.add("dot")
                    gameGridContainer.appendChild(dot)
                } else {
                    const line = document.createElement("div")
                    line.classList.add("line")
                    line.setAttribute("id", `h-${i/2}-${(j-1)/2}`)
                    gameGridContainer.appendChild(line)
                }
            }
        } else {
            for (let k = 0; k < columnsGridArray.length; k++) {
                if (k % 2 == 0) {
                    const line = document.createElement("div")
                    line.classList.add("line")
                    line.setAttribute("id", `v-${(i-1)/2}-${k/2}`)
                    gameGridContainer.appendChild(line)
                } else {
                    const box = document.createElement("div")
                    box.classList.add("box")
                    box.setAttribute("id", `box-${(i-1)/2}-${(k-1)/2}`)
                    gameGridContainer.appendChild(box)
                }
            }
        }
    }

    lineContainer = document.querySelectorAll(".line")
    lineContainer.forEach(i => i.addEventListener("click", clickHandler))
}

adjustGrid = () => {

    lineWidthCalculator()

    rowsGridArray = Array(numberOfRows*2+1).fill(0).map((_,i) => i)
    columnsGridArray = Array(numberOfColumns*2+1).fill(0).map((_,i) => i)

    rowsGridPattern = ""
    colsGridPattern = ""
    
    rowsGridArray.forEach(i => i % 2 == 0 ? rowsGridPattern += `${lineWidth}px ` : rowsGridPattern += `${boxWidth}px `)
    columnsGridArray.forEach(i => i % 2 == 0 ? colsGridPattern += `${lineWidth}px ` : colsGridPattern += `${boxWidth}px `)
    root.style.setProperty("--rows", rowsGridPattern)
    root.style.setProperty("--columns", colsGridPattern)

    root.style.setProperty("--font-size", `${boxWidth/8}px`)
    root.style.setProperty("--line-border-radius", `${lineWidth/2}px`)
}

lineWidthCalculator = () => {
    const lineWidthX = windowHeight / ((numberOfRows * 10) + numberOfRows + 1)
    const boxWidthX = (windowHeight * 10) / ((numberOfRows * 10) + numberOfRows + 1)    
    const lineWidthY = windowWidth / ((numberOfColumns * 10) + numberOfColumns + 1)
    const boxWidthY = (windowWidth * 10) / ((numberOfColumns * 10) + numberOfColumns + 1)



    if (windowHeight / windowWidth <= numberOfRows / numberOfColumns) {
        lineWidth = lineWidthX
        boxWidth = boxWidthX
    } else {
        lineWidth = lineWidthY
        boxWidth = boxWidthY
    }
}


clickHandler = (event) => {
    if(isSelected(event.target)) {
    } else {
        event.target.classList.remove("line")
        event.target.classList.add(playerTurn ? "player1-bg-color" : "player2-bg-color")
        numberOfLines--
    }
    playerTurn = !playerTurn
    winCondition()
    playerTurn ? gameStatus.innerText = `${playerA.innerText}'s turn` : gameStatus.innerText = `${playerB.innerText}'s turn`
    playerTurn ? root.style.setProperty("--hover-color", player1Color.value) : root.style.setProperty("--hover-color", player2Color.value)
    playerAScore.innerText = player1Points
    playerBScore.innerText = player2Points

   if (numberOfLines <= 0) {
    reset.innerText = "new game"
    scoreText.innerText = `${player1Points > player2Points ? playerA.innerText : playerB.innerText} WON THE GAME`
    root.style.setProperty("--winner-color", player1Points > player2Points ? player1Color.value : player2Color.value)
    scoreHandler()
    if (player1Points > player2Points) {
        gameStatus.innerText = `${playerA.innerText} won the game`
    } else if (player1Points < player2Points) {
        gameStatus.innerText = `${playerB.innerText} won the game`
    } else {
        gameStatus.innerText = "Draw"
    }
   }
}

isSelected = (line) => {
    if (line.classList.contains("player1-bg-color") || line.classList.contains("player2-bg-color")) {
        return true
    } else {
        return false
    }
}

winCondition = () => {
    boxContainer = document.querySelectorAll(".box")
    numberOfBoxes = boxContainer.length
    boxContainer.forEach(element => {
        const boxElement = element.id.split("-")
        if (
            isSelected(document.getElementById(`h-${boxElement[1]}-${boxElement[2]}`)) &&
            isSelected(document.getElementById(`v-${boxElement[1]}-${boxElement[2]}`)) &&
            isSelected(document.getElementById(`h-${Number(boxElement[1])+1}-${boxElement[2]}`)) &&
            isSelected(document.getElementById(`v-${boxElement[1]}-${Number(boxElement[2])+1}`))
        ) {
            element.classList.add(playerTurn ? "player2-bg-color" : "player1-bg-color")
            element.innerText = playerTurn ? playerB.innerText : playerA.innerText
            playerTurn ? player2Points++ : player1Points++
            element.classList.remove("box")
        }
    });
    newBoxes = document.querySelectorAll(".box")
    numberOfBoxes > newBoxes.length ? playerTurn = !playerTurn : playerTurn = playerTurn
    
}




resizer = () => {
    windowWidth = gameBoard.offsetWidth - 50
    windowHeight = gameBoard.offsetHeight - 210
    adjustGrid()
    console.log(gameGridContainer.offsetHeight)
    console.log(windowHeight)
    console.log(windowHeight < gameGridContainer.offsetHeight)
}

const scoreHandler = () => {
    score.classList.add("score-active")
    scoreText.classList.add("score-text-active")
    reset.removeEventListener("click" ,startHandler)
    mainMenu.removeEventListener("click" ,setupHandler)
    setTimeout(() => {
        scoreClear()
        reset.addEventListener("click", startHandler)
        mainMenu.addEventListener("click", setupHandler)
    }, 5000)
}

const scoreClear = () => {
    score.classList.remove("score-active")
    scoreText.classList.remove("score-text-active")
}

addEventListener("resize", resizer)