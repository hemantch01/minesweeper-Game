import { makeBoard } from "./internals.js";

const BOARD_SIZE = 2;
const NUMBER_OF_MINES = 2;
const board = makeBoard(BOARD_SIZE,NUMBER_OF_MINES);
const page = document.querySelector(".board");
console.log(board);
board.forEach(row =>{
    row.forEach(tile=>{
        page.append(tile.element);
    })
})
page.style.setProperty('--size',BOARD_SIZE)