const gameBoard = ['','','','','','','','','']
let iterationCount = 0

const GameBoard = (e)=>{    
    const gridBox = document.getElementsByClassName('grid')[0]
    const gridPieces = document.querySelectorAll('div.box')
    console.log(gridPieces.length)
    if (e.target.textContent == 'X' || e.target.textContent == 'O'){
        e.target.classList.add('shake')
        setTimeout(function(){e.target.classList.remove('shake')},300)
    } else {
        e.target.classList.add('depress')
        setTimeout(function(){e.target.classList.remove('depress')},300)
        if (iterationCount %2 == 0){
            updateGameBoard('X')
            UpdatePlayer('Player 1')
        } else {
            updateGameBoard('O')
            UpdatePlayer('Player 2')
        }
    }
    function updateGameBoard(gameVariable){
        for(i=0;i<gridPieces.length;i++){
            if(e.target == gridPieces[i]){
                gameBoard.splice(i, 0,gameVariable)
                e.target.textContent = gameVariable
            }
        }
    }
    if (iterationCount >= 3){
        if (!gameBoard[0] == '' && gameBoard[0] == gameBoard[1] && gameBoard[1] == gameBoard[2]){console.log('win 1')}
        else if (!gameBoard[3] == '' && gameBoard[3] == gameBoard[4] && gameBoard[4] == gameBoard[5]){console.log('win 2')}
        else if (!gameBoard[6] == '' && gameBoard[6] == gameBoard[7] && gameBoard[7] == gameBoard[8]){console.log('win 3')}
        else if (!gameBoard[0] == '' && gameBoard[0] == gameBoard[3] && gameBoard[3] == gameBoard[6]){console.log('win 4')}
        else if (!gameBoard[1] == '' && gameBoard[1] == gameBoard[4] && gameBoard[4] == gameBoard[7]){console.log('win 5')}
        else if (!gameBoard[2] == '' && gameBoard[2] == gameBoard[5] && gameBoard[5] == gameBoard[8]){console.log('win 6')}
        else if (!gameBoard[0] == '' && gameBoard[0] == gameBoard[4] && gameBoard[4] == gameBoard[8]){console.log('win 7')}
        else if (!gameBoard[2] == '' && gameBoard[2] == gameBoard[4] && gameBoard[4] == gameBoard[6]){console.log('win 8')}
    }
    iterationCount++
    console.log(gameBoard)
}

const UpdatePlayer = (player) => {
    const displayPlayer = document.getElementsByClassName('display-player-box')[0]
    displayPlayer.textContent = `Your Turn ${player}`
    console.log('updated player')
}

const DisplayController = (()=>{
    const displayPlayerBox = document.getElementsByClassName('display-player-box')[0]
    const startButton = document.getElementsByClassName('start-button')[0]
    const giveUpButton = document.getElementsByClassName('give-up-button')[0]
    const giveUpButtonConfirm = document.getElementsByClassName('confirm-button')[0]
    const quitModal = document.getElementsByClassName('quit-container')[0]
    const modeModal = document.getElementsByClassName('mode-container')[0]
    const pvpButton = document.getElementsByClassName('pvp-mode')[0]
    const pveButton = document.getElementsByClassName('pve-mode')[0]
    const contentBoxes = document.querySelectorAll('div.box')
    let isRestarted = false
    contentBoxes.forEach(box => box.addEventListener('click',e=>{GameBoard(e)}))
    startButton.addEventListener('click', () => {
        contentBoxes.forEach(box => box.style.pointerEvents = 'all')
        modeModal.classList.add('show-modal')
    })
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
        emptyGameBoard()
    }

    function emptyGameBoard(){
        const timeout = 150
        for(i=0;i<contentBoxes.length;i++){
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

