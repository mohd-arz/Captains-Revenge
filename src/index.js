/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */

import './style/style.css';
import { calling, GridCreation } from './DOM';

function Ship(name, length) {
  this.name = name;
  this.length = length;
  this.noOfHits = 0;
  this.isSunk = false;
  this.hit = function () {
    if (this.noOfHits + 1 < this.length) {
      this.noOfHits += 1;
    } else {
      // for the fifth time the noOfHits is still 4 so incrementing it
      this.noOfHits += 1;
      this.isSunk = true;
    }
  };
}

function GameBoard() {
  let allSunk = false;
  const shipsArr = [];
  const board = [];

  // Board Creating
  for (let i = 0; i < 5; i += 1) {
    board[i] = [];
    for (let j = 0; j < 5; j += 1) {
      board[i][j] = '';
    }
  }

  // Placing Ship
  function placeShip(ship, i, j) {
    const temp = j;

    // Checking Whether the Ship can be placed or not.
    for (let k = 0; k < ship.length; k += 1) {
      if (board[i][j] === undefined || board[i][j] !== '') {
        return false; // If can't return false
      }
      j += 1;
    }
    j = temp; // resetting the j's value

    // Actual placing
    for (let k = 0; k < ship.length; k += 1) {
      if (board[i][j] === '') {
        board[i][j] = ship.name;
      }
      j += 1;
    }
    return true;
  }

  //   function receiveAttack(i, j, player) {
  //     if (board[i][j] === undefined || board[i][j] === 'hit' || board[i][j] === 'miss') return 'Not a Valid Place';

  //     if (board[i][j] !== '') {
  //       for (const ship of shipsArr) {
  //         // console.log(board[i][j]);
  //         if (ship.name === board[i][j]) {
  //           board[i][j] = 'hit';
  //           ship.hit();
  //           if (ship.isSunk) {
  //             const result = document.querySelector('.result');
  //             result.textContent = `${player.name}'s ${ship.name} Sunk`;
  //             return 'Sunk';
  //           }
  //         }
  //       }
  //       return 'Hit';
  //     }
  //     if (board[i][j] === '') {
  //       board[i][j] = 'miss';
  //       return 'Miss';
  //     }
  //   }

  // Receiving an Attack with i and j coordinate and who's been attacked.
  function receiveAttack(i, j, whos) {
    let result = document.querySelector('.result');
    let sunkResult = document.querySelector('.sunk-result');
    if (board[i][j] === undefined || board[i][j] === 'hit' || board[i][j] === 'miss') return false;

    if (board[i][j] !== '') {
      shipsArr.forEach((ship) => {
        if (ship.name === board[i][j]) {
          board[i][j] = 'hit';
          ship.hit();
          result.textContent = `It's a Hit for ${whos.name}`;

          if (ship.isSunk) {
            sunkResult.textContent = `${whos.name}'s ${ship.name} Sunk`;
          }
        }
      });
    }
    if (board[i][j] === '') {
      board[i][j] = 'miss';
      result.textContent = `It's a Miss for ${whos.name}`;
    }
    return true;
  }

  function allSunkFn() {
    if (allSunk === true) return true;
    for (const ship of shipsArr) {
      if (ship.isSunk === false) return false;
    }
    allSunk = true;
    return true;
  }

  return {
    allSunkFn,
    receiveAttack,
    placeShip,
    shipsArr,
    board,
  };
}

function shipPlacement(gameBoardpara, shipsArr) {
  shipsArr.forEach((ship) => {
    let i; let j;
    do {
      i = Math.floor(Math.random() * 5);
      j = Math.floor(Math.random() * 5);
    } while (!(gameBoardpara.placeShip(ship, i, j)));
  });
}

function Player(name) {
  let winStatus = false;
  return {
    name,
    winStatus,
  };
}
const gameInitialize = (function () {
  const gameBoard = new GameBoard();
  const gameBoardPC = new GameBoard();
  const player = new Player('Arsh');
  const pc = new Player('Mac');

  function shipInitializePlace(gameBoardpara, callback) {
    const ship5 = new Ship('Carrier', 5);
    const ship4 = new Ship('Battleship', 4);
    const ship3 = new Ship('Cruiser', 3);
    const ship21 = new Ship('Destroyer', 3);
    const ship22 = new Ship('Patrol Boat', 2);

    gameBoardpara.shipsArr.push(ship5);
    gameBoardpara.shipsArr.push(ship4);
    gameBoardpara.shipsArr.push(ship3);
    gameBoardpara.shipsArr.push(ship21);
    gameBoardpara.shipsArr.push(ship22);

    callback(gameBoardpara, gameBoardpara.shipsArr);
  }

  return {
    gameBoard,
    gameBoardPC,
    shipInitializePlace,
    player,
    pc,
  };
}());

gameInitialize.shipInitializePlace(gameInitialize.gameBoard, shipPlacement);
gameInitialize.shipInitializePlace(gameInitialize.gameBoardPC, shipPlacement);

const playerContainer = document.querySelector('.player-container');
const pcContainer = document.querySelector('.pc-container');

GridCreation(gameInitialize.gameBoard, playerContainer);
GridCreation(gameInitialize.gameBoardPC, pcContainer);

calling(gameInitialize.gameBoard, gameInitialize.gameBoardPC, gameInitialize.player, gameInitialize.pc);
