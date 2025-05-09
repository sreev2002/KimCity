
import * as THREE from 'three';
import { createCamera } from './camera.js';
import { createAssetInstance } from './assets.js';




export function createScene(){
    const gameWindow = document.getElementById('render-target')
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);

    const camera = createCamera(gameWindow);

    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth,gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);


   
  

    let  terrain = [];
    let buildings = [];
    function initialize(city){
        scene.clear();
        terrain = [];
        buildings = [];
        for ( let x=0 ; x < city.size ; x++){
            const column = [];
            for( let y=0 ; y < city.size ; y++){
             

                const mesh = createAssetInstance('grass',x,y)
              
                scene.add(mesh);
                column.push(mesh);



                
            }
            terrain.push(column);
            buildings.push([...Array(city.size)]); //This will create a colmn of undefined values and the elements in the column will be city.size
        }
        setupLights();
    }

    function update(city){
        for ( let x=0 ; x < city.size ; x++){
        
            for( let y=0 ; y < city.size ; y++){
          


                //Using the .slice method to get the last charecter from the string
                //code for building
                const tile = city.data[x][y];

                if (tile.building && tile.building.startsWith('building')){
                const mesh = createAssetInstance(tile.building,x,y);
                if(buildings[x][y]){
                    scene.remove(buildings[x][y]);
                }
                scene.add(mesh);
                buildings[x][y] = mesh;
                }
            }
 
        }   
    }

   function setupLights () {
    const lights = [
        new THREE.AmbientLight(0xffffff, 0.2),
        new THREE.DirectionalLight(0xffffff,0.3),
        new THREE.DirectionalLight(0xffffff,0.3),
        new THREE.DirectionalLight(0xffffff,0.3),
    ];

    lights[1].position.set(0,1,0);
    lights[1].position.set(1,1,0); // arbitrary
    lights[1].position.set(0,1,1);
    
    scene.add(...lights);
    
    }


   


    function draw(){

        renderer.render(scene, camera.camera);

    }


    function start(){
        renderer.setAnimationLoop(draw);

    }


    function stop(){
        renderer.setAnimationLoop(null);
        


    }


    function onMouseUp(event){
        camera.onMouseUp(event);

    }


    
    function onMouseDown(event){
        camera.onMouseDown(event);
    }

    function onMouseMove(event){
       camera.onMouseMove(event);
    }


    

    return{
        start,
        initialize,
        update,
        stop,
        onMouseDown,
        onMouseMove,
        onMouseUp
    }
}