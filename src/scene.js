
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

                const geometry = new THREE.BoxGeometry(1,1,1);
                const material = new THREE.MeshBasicMaterial({color: 0xffffff});
                const mesh = new THREE.Mesh(geometry,material);
                mesh.position.set (x, 0,y);  
                scene.add(mesh);
                column.push(mesh);
            }
            meshes.push(column);
        }

    }

   function setupLights () {
    const lights = {
        new THREE.AmbientLight(0xffffff, 0.2),
        new THREE.DirectionalLight(0xffffff,0.3),
    }

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