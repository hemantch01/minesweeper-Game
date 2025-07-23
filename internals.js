import { NUMBER_OF_MINES } from "./main.js";
const states = {
    HIDDEN:'hidden',
    MINE :'mine',
    NUMBER:'number',
    MARKED:'marked'

}
// make a board with element having custom key-value (dataset: DOMstringMap)
// then add it to the board 
// then define some getter and setter to change status of mine
export function makeBoard (size,numberOfMines){
    let arr = [];
    const minePositions = getMinePositions(size,numberOfMines);
    console.log(minePositions);
    for(let j=0;j<size;j++){
        let arr2 = [];
        for(let i =0;i<size;i++){
            const element = document.createElement('div');
            element.dataset.status = states.HIDDEN;
            arr2.push({
                element,
                i,j,
                mine: minePositions.some(mine=>mine.x===i&&mine.y===j),
            get status(){
                return this.element.dataset.status;
            },
            set status(newStatus){
                this.element.dataset.status = newStatus;
            }});
        }
        arr.push(arr2);
    }
    return arr;
}

function isvalid(pos,minesPos){
    let flag = true;
    for(let i=0;i<minesPos.length;i++){
        if(pos.x===minesPos[i].x&&pos.y===minesPos[i].y){
            flag = false;
        }
    }
    return flag;
}

function getRandomEle(boardSize){
    return Math.floor(Math.random()*boardSize);
}
function getMinePositions(boardSize ,numberOfMines){
    const minesPos = [];
    while(minesPos.length<numberOfMines){
        const pos = {
            x: getRandomEle(boardSize),
            y: getRandomEle(boardSize)
        }
        if(isvalid(pos,minesPos)){
            minesPos.push(pos);
        }
    }
    return minesPos;
}

export function mark(tile){
    if(tile.status!==states.HIDDEN&&tile.status!==states.MARKED)return;
    else if(tile.status==states.MARKED){
        tile.status= states.HIDDEN;
    }
    else if(tile.status==states.HIDDEN){
        tile.status= states.MARKED;
    }
}

export function setMineCounter(board,NUMBER_OF_MINES){// update the number of mines according to the board.
    let ctr = 0;
    board.forEach(row => {
     row.forEach(tile=>{
        if(tile.status==states.MARKED)ctr++;
     })   
    });
    NUMBER_OF_MINES= NUMBER_OF_MINES-ctr;
    document.getElementById("minesLeft").textContent = NUMBER_OF_MINES;
}