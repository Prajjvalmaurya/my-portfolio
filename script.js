const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const xWinsDisplay = document.getElementById('xWins');
const oWinsDisplay = document.getElementById('oWins');
const drawsDisplay = document.getElementById('draws');

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

let xWins = 0;
let oWins = 0;
let draws = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = clickedCell.getAttribute('data-index');

    if (gameBoard[clickedIndex] !== '' || !gameActive) {
        return;
    }

    gameBoard[clickedIndex] = 'X';
    clickedCell.textContent = 'X';
    clickedCell.classList.add('x');

    if (checkWin('X')) {
        statusDisplay.textContent = "You Win!";
        gameActive = false;
        xWins++;
        xWinsDisplay.textContent = xWins;
        return;
    }

    if (isBoardFull()) {
        statusDisplay.textContent = "It's a Draw!";
        gameActive = false;
        draws++;
        drawsDisplay.textContent = draws;
        return;
    }

    statusDisplay.textContent = "Computer is thinking...";
    setTimeout(computerMove, 500);
}

function checkWin(player) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameBoard[a] === player && gameBoard[b] === player && gameBoard[c] === player) {
            return true;
        }
    }
    return false;
}

function isBoardFull() {
    return !gameBoard.includes('');
}

function computerMove() {
    if (!gameActive) return;

    let bestScore = -Infinity;
    let bestMove = -1;

    // Try to win
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = 'O';
            if (checkWin('O')) {
                makeMove(i);
                return;
            }
            gameBoard[i] = '';
        }
    }

    // Try to block player from winning
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = 'X';
            if (checkWin('X')) {
                gameBoard[i] = '';
                makeMove(i);
                return;
            }
            gameBoard[i] = '';
        }
    }

    // Use minimax for optimal play
    for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === '') {
            gameBoard[i] = 'O';
            let score = minimax(gameBoard, 0, false);
            gameBoard[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    if (bestMove !== -1) {
        makeMove(bestMove);
    }
}

function minimax(board, depth, isMaximizing) {
    if (checkWin('O')) return 10 - depth;
    if (checkWin('X')) return depth - 10;
    if (isBoardFull()) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function makeMove(index) {
    gameBoard[index] = 'O';
    cells[index].textContent = 'O';
    cells[index].classList.add('o');

    if (checkWin('O')) {
        statusDisplay.textContent = "Computer Wins!";
        gameActive = false;
        oWins++;
        oWinsDisplay.textContent = oWins;
        return;
    }

    if (isBoardFull()) {
        statusDisplay.textContent = "It's a Draw!";
        gameActive = false;
        draws++;
        drawsDisplay.textContent = draws;
        return;
    }

    statusDisplay.textContent = "Your Turn";
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusDisplay.textContent = "Your Turn (X)";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
