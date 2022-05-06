let GridMap = tileMap01.mapGrid
let mainGrid = document.getElementById("mainGrid");
let rows = document.getElementsByClassName("rows");
let PositionX;
let PositionY;

for (let i = 0; i < GridMap.length; i++) {
    mainGrid.innerHTML +=`<div class="rows"/>`;
    let gridRow = GridMap[i];
    
    for(let r = 0; r < gridRow.length; r++){
        let box = gridRow[r];
        if(box.includes("W")){
            rows[i].innerHTML += `<div class="${Tiles.Space} ${Tiles.Wall}"/>`
        } else if(box.includes("G")){
            rows[i].innerHTML += `<div class="${Tiles.Space} ${Tiles.Goal}" />`
        }else if(box.includes("B")){
            rows[i].innerHTML += `<div class="${Tiles.Space} ${Entities.Block}"/>`
        }else if(box.includes("P")){
            rows[i].innerHTML += `<div class="${Tiles.Space} ${Entities.Character}"/>`
            PositionY = i;
            PositionX = r;
        }else{
            rows[i].innerHTML += `<div class="${Tiles.Space}" />`
        }
    }
}

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
document.addEventListener('keydown', (e)=>{
       const currentBlock = mainGrid.children[PositionY].children[PositionX];
       switch(e.key){
           case "ArrowLeft": MOVE("MinusX");
           break;
           case "ArrowRight":MOVE("PlusX");
           break;
           case "ArrowUp":MOVE("MinusY");;
           break;
           case "ArrowDown":MOVE("PlusY");
           break;
       }
       const updatedBlock = mainGrid.children[PositionY].children[PositionX]

       if(currentBlock.className.includes(Tiles.Goal)){
            currentBlock.className = `${Tiles.Space} ${Tiles.Goal}`
       }else {
            currentBlock.className = `${Tiles.Space}`;
       }
       if(updatedBlock.className.includes(Tiles.Goal)){
         updatedBlock.className = `${Tiles.Space} ${Tiles.Goal} ${Entities.Character}`;
       }else {
         updatedBlock.className = `${Tiles.Space} ${Entities.Character}`;
       }

       if(CheckBoxesReachedGoal()){
        mainGrid.innerHTML = `<div id="Finish">
                                <span>Congratulations you won!</span>
                              </div>`
       }
})
const CheckBoxesReachedGoal = ()=>{
    const GoalPosition = [];
    for (let m = 0; m < GridMap.length; m++) {
        let gridRow = GridMap[m];
        for(let r = 0; r < gridRow.length; r++){
            let box = gridRow[r];
            if(box.includes("G")){
                GoalPosition.push(rows[m].children[r])
            }
        }
    }
    return GoalPosition.every(position => position.className.includes(Entities.Block))
}

const MOVE = (equation)=>{
    let boxInFront;
    let twoStepForward;

    switch(equation){
        case "PlusX":
            boxInFront =  mainGrid.children[PositionY].children[PositionX + 1];
            twoStepForward = mainGrid.children[PositionY].children[PositionX + 2];
            break;
        case "MinusX":
            boxInFront =  mainGrid.children[PositionY].children[PositionX - 1];
            twoStepForward = mainGrid.children[PositionY].children[PositionX - 2];
            break;
        case "PlusY":
            boxInFront =  mainGrid.children[PositionY + 1].children[PositionX];
            twoStepForward = mainGrid.children[PositionY + 2].children[PositionX];
            break;
        case "MinusY":
            boxInFront =  mainGrid.children[PositionY - 1].children[PositionX];
            twoStepForward = mainGrid.children[PositionY -2].children[PositionX];
            break;
    }

    if(boxInFront.className.includes(Entities.Block)){
        if(!twoStepForward.className.includes(Entities.Block) && !twoStepForward.className.includes(Tiles.Wall)){
            if(twoStepForward.className.includes(Tiles.Goal)){
                twoStepForward.className = `${Tiles.Space} ${Tiles.Goal} ${Entities.Block}`
            }else{
                twoStepForward.className = `${Tiles.Space} ${Entities.Block}`
            }
            switch(equation){
                case "PlusX":PositionX++;
                    break;
                case "MinusX":PositionX--;
                    break;
                case "PlusY":PositionY++;
                    break;
                case "MinusY":PositionY--;
                    break;
            }
        }
    }else if(!boxInFront.className.includes(Tiles.Wall)) {
        switch(equation){
            case "PlusX":PositionX++;
                break;
            case "MinusX":PositionX--;
                break;
            case "PlusY":PositionY++;
                break;
            case "MinusY":PositionY--;
                break;
        }
    }
}