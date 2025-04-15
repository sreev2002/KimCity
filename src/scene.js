
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


    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({color: 0xffffff});
    const mesh = new THREE.Mesh(geometry,material);
    mesh.position.set(0,0,0);
    


    scene.add(mesh);

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
        stop,
        onMouseDown,
        onMouseMove,
        onMouseUp
    }
}