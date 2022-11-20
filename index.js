let iterationCount = 0
let gameBoard = ['','','','','','','','','']

const GameBoard = (e)=>{
    const gridPieces = document.querySelectorAll('div.box')
    if (e.target.textContent === 'X' || e.target.textContent === 'O'){
        e.target.classList.add('shake')
        setTimeout(function(){e.target.classList.remove('shake')},300)
    } else if (e.target.textContent === ''){
        e.target.classList.add('depress')
        setTimeout(function(){e.target.classList.remove('depress')},300)
        if (iterationCount %2 == 0){
            updateGameBoard('X')
            UpdatePlayer('Player 2')
            
        } else {
            updateGameBoard('O')
            UpdatePlayer('Player 1')
        }
    }
    function updateGameBoard(gameVariable){
        for(let i=0;i<gridPieces.length;i++){
            if(e.target == gridPieces[i]){
                gameBoard.splice(i, 0,gameVariable)
                e.target.textContent = gameVariable
            }
        }
    }
    iterationCount++
    if (iterationCount > 4){checkForWin()}
}

const checkForWin = ()=>{
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
                console.log(arr[i])
                isEmpty = true
                return false
            }
            if (isEmpty === false){
               return new Set(arr).size === 1
            }
        }
    }
    if (allTheSame(gameBoardGroupOne) === true){
        console.log('winner')
    } else if (allTheSame(gameBoardGroupTwo) === true){
        console.log('winner 2')
    } else if (allTheSame(gameBoardGroupThree) === true){
        console.log('winner 3')
    } else if (allTheSame(gameBoardGroupFour) === true){
        console.log('winner 4')
    } else if (allTheSame(gameBoardGroupFive) === true){
        console.log('winner 5')
    } else if (allTheSame(gameBoardGroupSix) === true){
        console.log('winner 6')
    } else if (allTheSame(gameBoardGroupSeven) === true){
        console.log('winner 7')
    } else if (allTheSame(gameBoardGroupEight) === true){
        console.log('winner 8')
    }
    
}

const UpdatePlayer = (player) => {
    const displayPlayer = document.getElementsByClassName('display-player-box')[0]
    displayPlayer.textContent = `Your Turn ${player}`
}

const DisplayController = (()=>{
    const displayPlayerBox = document.getElementsByClassName('display-player-box')[0],
    startButton = document.getElementsByClassName('start-button')[0],
    giveUpButton = document.getElementsByClassName('give-up-button')[0],
    giveUpButtonConfirm = document.getElementsByClassName('confirm-button')[0],
    quitModal = document.getElementsByClassName('quit-container')[0],
    modeModal = document.getElementsByClassName('mode-container')[0],
    pvpButton = document.getElementsByClassName('pvp-mode')[0],
    pveButton = document.getElementsByClassName('pve-mode')[0],
    contentBoxes = document.querySelectorAll('div.box')
    let isRestarted = false
    contentBoxes.forEach(box => box.addEventListener('click',e=>{GameBoard(e)}))
    startButton.addEventListener('click',()=>{modeModal.classList.add('show-modal')})
    pvpButton.addEventListener('click', switchToModal)
    pveButton.addEventListener('click', switchToModal)
    giveUpButton.addEventListener('click',()=>{quitModal.classList.add('show-modal')})
    giveUpButtonConfirm.addEventListener('click', ()=>{
        startButton.style.visibility = 'visible'
        giveUpButton.style.visibility = 'hidden'
        displayPlayerBox.style.visibility = 'hidden'
        quitModal.classList.remove('show-modal')  
        isRestarted = true
        emptyGameBoard()
    })

    function switchToModal(){
        startButton.style.visibility = 'hidden'
        modeModal.classList.remove('show-modal')
        displayPlayerBox.style.visibility = 'visible' 
        giveUpButton.style.visibility = 'visible'
        setTimeout(()=>{contentBoxes.forEach(box => box.style.pointerEvents = 'all')},1350)
        emptyGameBoard()
    }

    function emptyGameBoard(){
        const timeout = 150
        for(let i=0;i<contentBoxes.length;i++){
            emptyBoxes(i)
        }
        function emptyBoxes(i){
            setTimeout(function(){
                contentBoxes[i].textContent = ''
            },timeout*i)
        }
        if (isRestarted == true){
            for (i=0;i<contentBoxes.length;i++){
                fillBoxes(i)
            }
            function fillBoxes(i){
                setTimeout(function(){
                    contentBoxes[i].textContent = 'X'
                },timeout*i)
            }
            isRestarted = false
        }
    }
})()


const test = ['1','','3']
const test2 = [test[0],test[2]]

console.log(test2[0])