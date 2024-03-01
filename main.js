const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
const board = document.getElementById('board');
let circleTurn;
const cellEl = document.querySelectorAll('[data-cell]');
const winningMessageEl = document.getElementById('winning-message')
const winningMessageTextEl = document.querySelector('[data-winning-message-text]');
const restarButton = document.getElementById('restartButton');
restarButton.addEventListener('click',startGame);

startGame();

function startGame(){
    circleTurn = false;
    cellEl.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click',handclick);
    cell.addEventListener('click',handclick,{once: true})
})
    setBoardHoverClass();
    winningMessageTextEl.classList.remove("show");
    winningMessageTextEl.innerText='';

}


function handclick(e){
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    //placeMark
    placeMark(cell,currentClass)
    //Check For Win
    if (checkWin(currentClass)) {
       endGame(false)
    }else if(isDraw()){
    //Check for draw
    endGame(true)
    }else{
    //switch turns
    swapTurns()
    setBoardHoverClass()
    }

}

function endGame(draw){
    if (draw) {
        winningMessageTextEl.innerText='Draw!'
    } else {
        winningMessageTextEl.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageTextEl.classList.add("show");
}

function isDraw(){
    return [...cellEl].every(cell => {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}


function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellEl[index].classList.contains(currentClass)
        })
    })
}














