let iterationCount = 0
let gameBoard = ['','','','','','','','','']
let gameOver = false

const GameBoard = (e)=>{
    const playerOne = 'Player 1'
    const playerTwo = 'Player 2'
    let currentPlayer = playerOne
    const gridPieces = document.querySelectorAll('div.box')
    if (e.target.textContent === 'X' || e.target.textContent === 'O'){
        e.target.classList.add('shake')
        setTimeout(function(){e.target.classList.remove('shake')},300)
    } else if (e.target.textContent === ''){
        e.target.classList.add('depress')
        setTimeout(function(){e.target.classList.remove('depress')},300)
        if (iterationCount %2 == 0){
            e.target.style.color = '#808080'
            updateGameBoard('X')
            currentPlayer = playerOne
            updatePlayer(playerTwo)
        } else {
            updateGameBoard('O')
            currentPlayer = playerTwo
            updatePlayer(playerOne)
        }
    }
    function updateGameBoard(gameVariable){
        for(let i=0;i<gridPieces.length;i++){
            if(e.target === gridPieces[i]){
                gameBoard.splice(i, 1, gameVariable)
                e.target.textContent = gameVariable
            }
        }
    }
    function updatePlayer(player){
        const displayPlayer = document.getElementsByClassName('display-player-box')[0]
        displayPlayer.textContent = `Your Turn ${player}`
    }
    iterationCount++
    if (iterationCount > 4){checkForWin(currentPlayer)}
}

const checkForWin = (player)=>{
    const gameBoardGroupOne = [gameBoard[0],gameBoard[1],gameBoard[2]],
    gameBoardGroupTwo = [gameBoard[3],gameBoard[4],gameBoard[5]],
    gameBoardGroupThree = [gameBoard[6],gameBoard[7],gameBoard[8]],
    gameBoardGroupFour = [gameBoard[0],gameBoard[3],gameBoard[6]],
    gameBoardGroupFive = [gameBoard[1],gameBoard[4],gameBoard[7]],
    gameBoardGroupSix = [gameBoard[2],gameBoard[5],gameBoard[8]],
    gameBoardGroupSeven = [gameBoard[0],gameBoard[4],gameBoard[8]],
    gameBoardGroupEight = [gameBoard[2],gameBoard[4],gameBoard[6]]
    function allTheSame(arr){
        let isEmpty = false
        for(let i=0;i<arr.length;i++){
            if(arr[i] === ''){
                isEmpty = true
                return false
            }
        }
        if (isEmpty === false){return new Set(arr).size === 1}
    }
    if (allTheSame(gameBoardGroupOne) === true || allTheSame(gameBoardGroupTwo) === true || allTheSame(gameBoardGroupThree) === true ||
    allTheSame(gameBoardGroupFour) === true || allTheSame(gameBoardGroupFive) === true || allTheSame(gameBoardGroupSix) === true ||
    allTheSame(gameBoardGroupSeven) === true || allTheSame(gameBoardGroupEight) === true){
        const winBox = document.getElementsByClassName('win-container')[0]
        winBox.classList.add('show-modal')
        document.getElementsByClassName('win-header')[0].textContent = `${player} Wins!`
        setTimeout(()=>{
            setTimeout(()=>{winBox.classList.remove('show-modal')},1500)
            DisplayController.fullRestart()
        },2000)
    }
}

const DisplayController = (()=>{
    const displayPlayerBox = document.getElementsByClassName('display-player-box')[0],
    startButton = document.getElementsByClassName('start-button')[0],
    giveUpButton = document.getElementsByClassName('give-up-button')[0],
    giveUpButtonConfirm = document.getElementsByClassName('confirm-button')[0],
    quitModal = document.getElementsByClassName('quit-container')[0],
    contentBoxes = document.querySelectorAll('div.box')
    contentBoxes.forEach(box => box.addEventListener('click',e=>{GameBoard(e)}))
    startButton.addEventListener('click',startGame)
    giveUpButton.addEventListener('click',()=>{quitModal.classList.add('show-modal')})
    giveUpButtonConfirm.addEventListener('click',restartGame)
    function startGame(){
        startButton.style.visibility = 'hidden'
        displayPlayerBox.style.visibility = 'visible' 
        giveUpButton.style.visibility = 'visible'
        setTimeout(()=>{contentBoxes.forEach(box => box.style.pointerEvents = 'all')},1350)
        emptyGameBoard()
    }
    function emptyGameBoard(){
        for(let i=0;i<contentBoxes.length;i++){
            emptyBoxes(i)
        }
        function emptyBoxes(i){
            setTimeout(()=>{
                contentBoxes[i].textContent = ''
            },150*i)
        }
    }
    function restartGame(){
        startButton.style.visibility = 'visible'
        giveUpButton.style.visibility = 'hidden'
        displayPlayerBox.style.visibility = 'hidden'
        quitModal.classList.remove('show-modal')
        gameBoard = ['','','','','','','','','']
        iterationCount = 0
        emptyGameBoard()
        setTimeout(()=>{contentBoxes.forEach(box => box.textContent = 'X')},1350)
        setTimeout(()=>{contentBoxes.forEach(box => box.style.color = 'white')},1350)
        setTimeout(()=>{contentBoxes.forEach(box => box.style.pointerEvents = 'none')},1350)
    }
    return {
        fullRestart: restartGame
    }
})()