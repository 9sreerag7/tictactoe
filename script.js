const cells = document.querySelectorAll('.cell');
const statusDisplay = document.querySelector('.status');
const restartButton = document.querySelector('.restart-button');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
const winningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (gameState[index] !== '' || checkWinner()) return;

  gameState[index] = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  if (checkWinner()) {
    showPopup(`Player ${currentPlayer} Wins!`);
    return;
  }

  if (!gameState.includes('')) {
    showPopup('It\'s a Draw!');
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  return winningConditions.some(combination => {
    return combination.every(index => gameState[index] === currentPlayer);
  });
}

function restartGame() {
  gameState = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  statusDisplay.textContent = "Player X's Turn";
  cells.forEach(cell => cell.classList.remove('x', 'o'));
}

function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.add('active');
}

function closePopup() {
  popup.classList.remove('active');
  restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);
popup.querySelector('button').addEventListener('click', closePopup);
