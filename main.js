import { makeBoard,mark,revealTile,setMineCounter,checkLose,checkWin, states,  } from "./internals.js";

const BOARD_SIZE = 10;
export const NUMBER_OF_MINES = 1;
const board = makeBoard(BOARD_SIZE,NUMBER_OF_MINES);
const page = document.querySelector(".board");
const message = document.querySelector(".subtext");
board.forEach(row =>{
    row.forEach(tile=>{
        page.append(tile.element);
        tile.element.addEventListener('click',()=>{    //adding the click functionality 
            // main revelaing function 
            revealTile(board,tile);
            checkWinOrLose(); 
        });
        tile.element.addEventListener('contextmenu',e=>
        {
            e.preventDefault();// e.preventDefault() will help us in not letting the contextmenu open
            mark(tile);
            setMineCounter(board,NUMBER_OF_MINES);
            checkWinOrLose(); 
        }
        )
    })
})
document.getElementById("minesLeft").textContent = NUMBER_OF_MINES;
page.style.setProperty('--size',BOARD_SIZE);

function checkWinOrLose(){
    const win =  checkWin(board);
    const lose = checkLose(board);
    if(win){
        message.textContent="YOU WIN!"
    }
    else if(lose){
        message.textContent="YOU LOSE!"
        board.forEach(row=>{
            row.forEach(tile=>{
                if(tile.status==states.MARKED)mark(tile);
                if(tile.mine){
                    revealTile(board,tile);
                }
            })
        })
    }
    
    if(win||lose){
        page.addEventListener('click',(e)=>{
            e.stopImmediatePropagation();
        },{capture:true});
        page.addEventListener('click',(e)=>{
            e.stopImmediatePropagation();
        },{capture:true})
    }
    
}