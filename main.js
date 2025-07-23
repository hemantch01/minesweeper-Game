import { makeBoard,mark,setMineCounter } from "./internals.js";

const BOARD_SIZE = 10;
export const NUMBER_OF_MINES = 5;
const board = makeBoard(BOARD_SIZE,NUMBER_OF_MINES);
const page = document.querySelector(".board");
console.log(board);
board.forEach(row =>{
    row.forEach(tile=>{
        page.append(tile.element);
        tile.element.addEventListener('click',()=>{    //adding the click functionality 

        });
        tile.element.addEventListener('contextmenu',e=>
        {
            e.preventDefault();// e.preventDefault() will help us in not letting the contextmenu open
            mark(tile);
            setMineCounter(board,NUMBER_OF_MINES);
        }
        )
    })
})
document.getElementById("minesLeft").textContent = NUMBER_OF_MINES;
page.style.setProperty('--size',BOARD_SIZE);

