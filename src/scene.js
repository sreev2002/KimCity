import * as THREE from 'three';


export function createScene(){
    const gameWindow = document.getElementById('render-target');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);

    const camera = new THREE.PerspectiveCamera(75, gameWindow.offsetWidth / gameWindow.offsetHeight, 0.1, 1000);

    const renderer = new THREE.WebGL3DRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);
    scene.add(mesh);

    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshBasicMaterial({color :0xff0000});
    const mesh = new THREE.Mesh(geometry,material);

    function draw (){
        renderer.render(scene,camera);
    }


    function start(){
        renderer.setAnimationLoop(draw);
    }

    function stop(){
        renderer.setAnimationLoop(null);
    }


    return{
        start,
        stop
    }
}