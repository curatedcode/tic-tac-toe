const gameBoard = []

const GameBoard = (e)=>{
    const playerOne = 'Player 1'
    const playerTwo = 'Player 2'
    const displayPlayer = document.getElementsByClassName('display-player-box')[0]
    const gridBox = document.getElementsByClassName('grid')[0]
    if (e.target.textContent == 'X' || e.target.textContent == 'O'){
        e.target.classList.add('shake')
        setTimeout(function(){e.target.classList.remove('shake')},500)
    } else {
        e.target.classList.add('depress')
        setTimeout(function(){e.target.classList.remove('depress')},300)
        if (gameBoard.length %2 == 0 || gameBoard.length == 0){
            gameBoard.push('X')
            e.target.textContent = 'X'
        } else if (!gameBoard.length%2 == 0){
            gameBoard.push('O')
            e.target.textContent = 'O'
        }
    }
    console.log(gameBoard)
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
    const contentBoxes = document.getElementsByClassName('box')
    let restart = false
    document.querySelectorAll('div.box').forEach(box => box.addEventListener('click',e=>{GameBoard(e)}))
    startButton.addEventListener('click', () => {modeModal.classList.add('show-modal')})
    pvpButton.addEventListener('click', switchToModal)
    pveButton.addEventListener('click', switchToModal)
    giveUpButton.addEventListener('click',()=>{quitModal.classList.add('show-modal')})
    giveUpButtonConfirm.addEventListener('click', ()=>{
        startButton.style.visibility = 'visible'
        giveUpButton.style.visibility = 'hidden'
        displayPlayerBox.style.visibility = 'hidden'
        quitModal.classList.remove('show-modal')  
        restart = true
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
        if (restart == true){
            for (i=0;i<contentBoxes.length;i++){
                fillBoxes(i)
            }
            function fillBoxes(i){
                setTimeout(function(){
                    contentBoxes[i].textContent = 'X'
                },timeout*i)
            }
            restart = false
        }
    }
})()

