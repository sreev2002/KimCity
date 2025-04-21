//city is a grid and the size defined one side of the size of that grid
// we build the 2d array column by column 
// for each pair of x&y coordintaes we need the data at that location

export function createCity(size) {
 const data = [];

initialize();

 function initialize (){
    for (let x = 0 ; x < size ;x++){
        const column = [];
        for(let y=0; y< size ; y++){
            const tile = { x , y};
            column.push(tile);
        }
        data.push(column);
    }
 }

    return{
        size,
        data
    }
}
