
import * as THREE from 'three';
import { createCamera } from './camera.js';





export function createScene(){
    const gameWindow = document.getElementById('render-target')
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);

    const camera = createCamera(gameWindow);

    
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth,gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);


   
  

    let  meshes = [];

    function initialize(city){
        scene.clear();
        meshes = [];
        for ( let x=0 ; x < city.size ; x++){
            const column = [];
            for( let y=0 ; y < city.size ; y++){
                // 1- Load mesh to the specific/corresponding tile(x,y coordinate)
                // 2-  Add that mesh to scene
                // 3- add that mesh to meshes array
                // THE REASON WE USE AN ARRAY IS IF A TILE UPDATES ITS STATE THEN WE CAM UPDATE THE CORRESPONDING MESH
                // THe below code creates grass

                const geometry = new THREE.BoxGeometry(1,1,1);
                const material = new THREE.MeshLambertMaterial({color: 0x00aa00});
                const mesh = new THREE.Mesh(geometry,material);
                mesh.position.set (x, -0.5,y);  
                scene.add(mesh);
                column.push(mesh);



                //Using the .slice method to get the last charecter from the string
                //code for building
                const tile = city.data[x][y];

                if (tile.building && tile.building.startsWith('building')){
                const height = Number(tile.building.slice(-1));
                const buildingGeometry = new THREE.BoxGeometry(1,height,1);
                const buildingMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
                const buildingMesh = new THREE.Mesh(buildingGeometry,buildingMaterial);
                buildingMesh.position.set (x, height/2,y);  
                scene.add(buildingMesh);
                column.push(buildingMesh);
                }
            }
            meshes.push(column);
        }
        setupLights();
    }

    function update(city){
        
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
        stop,
        onMouseDown,
        onMouseMove,
        onMouseUp
    }
}