
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