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
            const tile = createTile(x,y);
            
            column.push(tile);
        }
        data.push(column);
    }
 }

    function update () { 
        console.log(`Updating city`);
        for( let x = 0 ; x < size ; x++ ){
            for ( let y = 0; y < size; y++){
                data[x][y].update();
            }
        }
    }

    function createTile(x,y){
        return { 
            x , 
            y,
            terrainId: 'grass',
            buildingId : undefined,
            update() {
               const x = Math.random();
               if ( x < 0.01){
                    if( this.buildingId === undefined){
                        this.buildingId = 'building-1';

                    }
                else if (this.buildingId === 'building-1'){
                    this.buildingId = 'building-2'
                }
                else if (this.buildingId === 'building-2'){
                    this.buildingId = 'building-3'
                }
               }
            }
        };
    }

    return{
        size,
        data,
        update
    }
}
