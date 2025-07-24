import { makeBoard,mark,revealTile,setMineCounter,checkLose,checkWin, states,  } from "./internals.js";

const BOARD_SIZE = 10;
export const NUMBER_OF_MINES = 10;
const board = makeBoard(BOARD_SIZE,NUMBER_OF_MINES);
const page = document.querySelector(".board");
const message = document.querySelector(".subtext");
board.forEach(row =>{
    row.forEach(tile=>{
       if(page) page.append(tile.element);
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
const minesleftElement = document.getElementById("minesLeft")
if(minesleftElement)  minesleftElement.textContent = NUMBER_OF_MINES.toString();
if (page instanceof HTMLElement) page.style.setProperty('--size', BOARD_SIZE.toString());

function checkWinOrLose(){
    const win =  checkWin(board);
    const lose = checkLose(board);
    if(win){
        if(message)message.textContent="YOU WIN!"
    }
    else if(lose){
        if(message)message.textContent="YOU LOSE!"
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
        if(page)page.addEventListener('click',(e)=>{
            e.stopImmediatePropagation();
        },{capture:true});
        if(page)page.addEventListener('click',(e)=>{
            e.stopImmediatePropagation();
        },{capture:true})
    }
    
}