const root = document.querySelector(':root')

const playerA = document.querySelector('.player-a')
const playerAScore = document.querySelector('.player-a-score')
const gameStatus = document.querySelector('.game-status')
const playerBScore = document.querySelector('.player-b-score')
const playerB = document.querySelector('.player-b')

const gameGridContainer = document.querySelector('.game-grid-container')

const reset = document.querySelector('.reset')
const mainMenu = document.querySelector('.main-menu')

const gameSetup = document.querySelector('.game-setup')
const player1Name = document.getElementById('player1')
const player1Color = document.getElementById('player1-color')
const player2Name = document.getElementById('player2')
const player2Color = document.getElementById('player2-color')
const rows = document.getElementById('rows')
const columns = document.getElementById('cols')
const start = document.querySelector('.submit')

let numberOfRows
let numberOfColumns


mainMenu.addEventListener("click", setupHandler)
function setupHandler () {
    gameSetup.style.display = "flex"
}

start.addEventListener("click", startHandler)
function startHandler () {
    gameSetup.style.display = "none"
    root.style.setProperty("--player1-color", player1Color.value)
    root.style.setProperty("--player2-color", player2Color.value)
    numberOfRows = Number(rows.value)
    numberOfColumns = Number(columns.value)
    playerA.innerText = player1Name.value
    playerB.innerText = player2Name.value
    player1Name.value = ""
    player2Name.value = ""
    gameGridContainer.innerHTML = ""
    gameGridGenerator()
}


const gameGridGenerator = () => {
    const largestNumber = numberOfRows > numberOfColumns ? numberOfRows : numberOfColumns
    const lineWidth = 100 / ((largestNumber * 10) + largestNumber + 1)
    const boxWidth = (100 * 10) / ((largestNumber * 10) + largestNumber + 1)
    const rowsGridArray = Array(numberOfRows*2+1).fill(0).map((_,i) => i)
    const columnsGridArray = Array(numberOfColumns*2+1).fill(0).map((_,i) => i)
    let rowsGridPattern = ""
    let colsGridPattern = ""
    rowsGridArray.forEach(i => i % 2 == 0 ? rowsGridPattern += `${lineWidth}% ` : rowsGridPattern += `${boxWidth}% `)
    columnsGridArray.forEach(i => i % 2 == 0 ? colsGridPattern += `${lineWidth}% ` : colsGridPattern += `${boxWidth}% `)
    root.style.setProperty("--rows", rowsGridPattern)
    root.style.setProperty("--columns", colsGridPattern)
    
    console.log(rowsGridArray)
    console.log(columnsGridArray)

    for (let i = 0; i < columnsGridArray.length; i++) {
        if (i % 2 == 0) {
            for (let j = 0; j < rowsGridArray.length; j++) {
                if (j % 2 == 0) {
                    const dot = document.createElement("div")
                    dot.setAttribute("id", "dot")
                    gameGridContainer.appendChild(dot)
                } else {
                    const line = document.createElement("div")
                    line.setAttribute("id", "line")
                    gameGridContainer.appendChild(line)
                }
            }
        } else {
            for (let k = 0; k < rowsGridArray.length; k++) {
                if (k % 2 == 0) {
                    const line = document.createElement("div")
                    line.setAttribute("id", "line")
                    gameGridContainer.appendChild(line)
                } else {
                    const box = document.createElement("div")
                    box.setAttribute("id", "box")
                    gameGridContainer.appendChild(box)
                }
            }
        }
    }

}

