import * as THREE from 'three';
const geometry = new THREE.BoxGeometry(1,1,1);

// will serve as asset lib  , its a dict the maps an asset i to a func which creates the obj
const assets = {
    'grass':(x,y) => {
          // THe below code creates grass

          
          const material = new THREE.MeshLambertMaterial({color: 0x00aa00});
          const mesh = new THREE.Mesh(geometry,material);
          mesh.position.set (x, -0.5,y);  
          return mesh;
    },
    'building-1':(x,y) =>{
        const material = new THREE.MeshLambertMaterial({color: 0x777777});
        const mesh = new THREE.Mesh(geometry,material);
        mesh.position.set (x, 0.5,y);
        return mesh;

    },
    'building-2':(x,y) =>{

        const material = new THREE.MeshLambertMaterial({color: 0x777777});
        const mesh = new THREE.Mesh(geometry,material);
        mesh.position.set (x, 1,y);
        mesh.scale.set(1,2,1);
        return mesh;
    },
    'building-3':(x,y) => {

        const material = new THREE.MeshLambertMaterial({color: 0x777777});
        const mesh = new THREE.Mesh(geometry,material);
        mesh.position.set (x, 1.5,y);
        mesh.scale.set(1,3,1);
        return mesh;
    }

}

export function createAssetInstance(assetID , x , y){
    if(assetID in assets) { 
        return assets[assetID](x,y);

    }
    else {
        console.warn(`asset id ${assetID} is not found.`);
        return undefined;
    }   
}