let GridMap = tileMap01.mapGrid
let mainGrid = document.getElementById("mainGrid");
let rows = document.getElementsByClassName("rows");
let PositionX = 1;
let PositionY = 10;

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
        }else{
            rows[i].innerHTML += `<div class="${Tiles.Space}" />`
        }
    }
}

mainGrid.children[PositionY].children[PositionX].className = `${Tiles.Space} entity-player`

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
    const UpdatedPosition = mainGrid.children[PositionY].children[PositionX].className = `${Tiles.Space} ${Entities.Character}`;
})
const CheckAllNextBlocks = ()=> {
    for (let i = 0; i < tileMap01.height; i++) {
        for (let r = 0; r < tileMap01.width; r++) {
            const NextBlock = mainGrid.children[i].children[PositionX];
            
        }
    }
}
const LeftArrow = ()=>{
    const NextBlock = mainGrid.children[PositionY].children[PositionX - 1];
    if(!NextBlock.className.includes(`${Tiles.Wall}`)){
        PositionX--;
    }
}

const RigthArrow = () =>{
    let SpaceFound = false;
    let foundBoxesOnFront = 0;
    //Loop to see if i find a block in front if yes then add to the foundBoxesOnFront and stop looping in find a space
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
    const NextBlock = mainGrid.children[PositionY - 1].children[PositionX];
    if(!NextBlock.className.includes(`${Tiles.Wall}`)){
        PositionY--;
    }
}
const DownArrow = ()=>{
    const NextBlock = mainGrid.children[PositionY + 1].children[PositionX]; 
    if(!NextBlock.className.includes(`${Tiles.Wall}`)){
        PositionY++;
    }
}
        // //Loop Position X and find how many box are infront of the blue box
        // //return false once No box is found on front
        // let cantMoveBoxes = false;
        // let SpaceFound = false;
        // let foundBoxesOnFront = 0;
        // //start from next position and loop horizontal all the way
        // for (let i = (PositionX + 1); i < tileMap01.width && SpaceFound === false ; i++) {
        //     const BlockOnFront = mainGrid.children[PositionY].children[i];
        //     if(BlockOnFront.className.includes(Entities.Block)){
        //         foundBoxesOnFront++;
        //     }else{
        //         SpaceFound = true;
        //     }
        // }
        // if(foundBoxesOnFront > 0){
        //     const theLastBoxOnFront = mainGrid.children[PositionY].children[PositionX + (foundBoxesOnFront + 1)]

        //     if(!theLastBoxOnFront.className.includes(Tiles.Wall)){
        //         for (let B = 1; B < foundBoxesOnFront + 1; B++) {
        //             const FrontBox = mainGrid.children[PositionY].children[PositionX + (B + 1)]
        //             FrontBox.className = `${Tiles.Space} ${Entities.Block}`
        //         }
        //     }else {
        //         cantMoveBoxes = true;
        //     }
        // }
        // if(!cantMoveBoxes){
        //     PositionX++;
        // }