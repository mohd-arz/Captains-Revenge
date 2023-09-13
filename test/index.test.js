/* eslint-disable no-undef */
import { GameBoard, Ship } from '../src';

let gameBoard;
let ship21;
let ship22;
let ship3;
let ship4;
let ship5;

beforeAll(() => {
  gameBoard = new GameBoard();

  ship5 = new Ship('ship5', 5);
  ship4 = new Ship('ship4', 4);
  ship3 = new Ship('ship3', 3);
  ship21 = new Ship('ship21', 2);
  ship22 = new Ship('ship22', 2);

  gameBoard.shipsArr.push(ship5);
  gameBoard.shipsArr.push(ship4);
  gameBoard.shipsArr.push(ship3);
  gameBoard.shipsArr.push(ship21);
  gameBoard.shipsArr.push(ship22);
});

test('No of Hits', () => {
  expect(ship5.isSunk).toBe(false);
});

test('place', () => {
  expect(gameBoard.placeShip(ship5, 0, 0)).toBe(true);
});

test('Board', () => {
  expect(gameBoard.board[0][4]).toBe('ship5');
});

test('attack Hit', () => {
  expect(gameBoard.receiveAttack(0, 0)).toBe('Hit');
  expect(gameBoard.receiveAttack(0, 1)).toBe('Hit');
  expect(gameBoard.receiveAttack(0, 2)).toBe('Hit');
  expect(gameBoard.receiveAttack(0, 3)).toBe('Hit');
  expect(gameBoard.receiveAttack(0, 4)).toBe('Hit');
});

test('is Sunk ?', () => {
  expect(ship5.isSunk).toBe(true);
});

test('attack miss', () => {
  expect(gameBoard.receiveAttack(0, 9)).toBe('Miss');
});

test('missed area', () => {
  expect(gameBoard.board[0][9]).toBe('miss');
});

test('attack invalid', () => {
  expect(gameBoard.receiveAttack(0, 10)).toBe('Not a Valid Place');
});

test('cant place', () => {
  expect(gameBoard.placeShip(ship4, 0, 6)).toBe(false);
});

afterAll(() => {
  console.log(gameBoard.board);
});
