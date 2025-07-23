
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
    for(let j=0;j<size;j++){
        let arr2 = [];
        for(let i =0;i<size;i++){
            const element = document.createElement('div');
            element.dataset.status = states.HIDDEN;
            arr2.push({
                element,i,j,
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