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
           case "ArrowLeft":LeftArrow();
           break;
           case "ArrowRight":RigthArrow();
           break;
           case "ArrowUp":UpArrow();
           break;
           case "ArrowDown":DownArrow();
           break;
       }
       currentBlock.className = `${Tiles.Space}`;
       mainGrid.children[PositionY].children[PositionX].className = `${Tiles.Space} ${Entities.Character}`;
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
    console.log(GoalPosition);
    return GoalPosition.every(position => position.className === `${Tiles.Space} ${Entities.Block}`)
}
const LeftArrow = ()=>{
    let SpaceFound = false;
    let foundBoxesOnFront = 0;
   
    for (let i = (PositionX - 1); 0 < i && !SpaceFound; i--) {
        const BlockOnFront = mainGrid.children[PositionY].children[i];
        if(BlockOnFront.className.includes(Entities.Block)){
            foundBoxesOnFront++;
        }else{
            SpaceFound = true;
        }
    };
    
    const theLastBoxOnFront = mainGrid.children[PositionY].children[PositionX - (foundBoxesOnFront + 1)]
    if(!theLastBoxOnFront.className.includes(Tiles.Wall)){
        if(foundBoxesOnFront > 0){
            for (let B = 1; B < foundBoxesOnFront + 1; B++) {
                const FrontBox = mainGrid.children[PositionY].children[PositionX - (B + 1)]
                FrontBox.className = `${Tiles.Space} ${Entities.Block}`
            }
        };
        PositionX--;
    }
}
const RigthArrow = () =>{
    let SpaceFound = false;
    let foundBoxesOnFront = 0;

    for (let i = (PositionX + 1); i < tileMap01.width && !SpaceFound; i++) {
        const BlockOnFront = mainGrid.children[PositionY].children[i];
        if(BlockOnFront.className.includes(Entities.Block)){
            foundBoxesOnFront++;
        }else{
            SpaceFound = true;
        }
    };
    
    const theLastBoxOnFront = mainGrid.children[PositionY].children[PositionX + (foundBoxesOnFront + 1)]
    if(!theLastBoxOnFront.className.includes(Tiles.Wall)){
        if(foundBoxesOnFront > 0){
            for (let B = 1; B < foundBoxesOnFront + 1; B++) {
                const FrontBox = mainGrid.children[PositionY].children[PositionX + (B + 1)]
                FrontBox.className = `${Tiles.Space} ${Entities.Block}`
            }
        };
        PositionX++;
    }
}
const UpArrow = ()=>{
    let SpaceFound = false;
    let foundBoxesOnFront = 0;
   
    for (let i = (PositionY - 1); 0 < i && !SpaceFound; i--) {
        const BlockOnFront = mainGrid.children[i].children[PositionX];
        if(BlockOnFront.className.includes(Entities.Block)){
            foundBoxesOnFront++;
        }else{
            SpaceFound = true;
        }
    };
    
    const theLastBoxOnFront = mainGrid.children[PositionY- (foundBoxesOnFront + 1)].children[PositionX]
    if(!theLastBoxOnFront.className.includes(Tiles.Wall)){
        if(foundBoxesOnFront > 0){
            for (let B = 1; B < foundBoxesOnFront + 1; B++) {
                const FrontBox = mainGrid.children[PositionY - (B + 1)].children[PositionX]
                FrontBox.className = `${Tiles.Space} ${Entities.Block}`
            }
        };
        PositionY--;
    }
}
const DownArrow = ()=>{
    let SpaceFound = false;
    let foundBoxesOnFront = 0;

    for (let i = (PositionY + 1); i < tileMap01.width && !SpaceFound; i++) {
        const BlockOnFront = mainGrid.children[i].children[PositionX];
        if(BlockOnFront.className.includes(Entities.Block)){
            foundBoxesOnFront++;
        }else{
            SpaceFound = true;
        }
    };
    
    const theLastBoxOnFront = mainGrid.children[PositionY + (foundBoxesOnFront + 1)].children[PositionX]
    if(!theLastBoxOnFront.className.includes(Tiles.Wall)){
        if(foundBoxesOnFront > 0){
            for (let B = 1; B < foundBoxesOnFront + 1; B++) {
                const FrontBox = mainGrid.children[PositionY + (B + 1)].children[PositionX]
                FrontBox.className = `${Tiles.Space} ${Entities.Block}`
            }
        };
        PositionY++;
    }
}
        