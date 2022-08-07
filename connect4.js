/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = "1"; // active player: 1 or 2
var board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  for (let i = 0; i < HEIGHT; i++) {
    board.push([])
    for (let j = 0; j < WIDTH; j++) {
      board[i].push([])
    }
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board')
  // TODO: add comment for this code
  //creates a table row for the top of gameBoard
  var top = document.createElement("tr");
  //gives the top tr id of column-top
  top.setAttribute("id", "column-top");
  //adds event to listen for click 
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    //adds 7 td to the top tr each cell has id of x colum
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (var y = 0; y < HEIGHT; y++) {
    //creat a game board row
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      //make 6 cells for the one row
      const cell = document.createElement("td");
      //cells have an id between 0-0 & 5-6
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let i = HEIGHT - 1; i >= 0; i--) {
    if (!board[i][x].length) {
      return i;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const div = document.createElement('div');
  div.classList.add('piece');
  div.setAttribute('data-player', currPlayer);
  const td = document.getElementById(`${y}-${x}`);
  td.append(div);
  board[y][x] = currPlayer;
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  //why does 
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every((row) => { return row.every((col) => { return col.length === 1 }) })) {
    endGame("Tie Game!");
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = nextTurn();
}
const nextTurn = () => { return currPlayer === "1" ? "2" : "1" }

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.
  //loop over the board array using a grid of four cells long. 
  //note this checks the entire board every time a move is made
  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      //starts at board[0][0]+4 positions out. give these indices to _win()
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      //starts at board[0][0]+4 positions down. give these indices to _win() 
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      //starts at board[0][0]+4 positions diagnal. so first time throught the loop
      //we get 0,0 1,1 2,2 3,3 as posions to check that they all have the same player. 
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      //this is the same but starting at board[0][0] and going 4 positions off the grid
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //check if all 4 posions on the board === current player.
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
