
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


   
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let selectedObject = undefined ;

    let  terrain = [];
    let buildings = [];

    let onObjectSelected = undefined;

    function initialize(city){
        scene.clear();
        terrain = [];
        buildings = [];
        for ( let x=0 ; x < city.size ; x++){
            const column = [];
            for( let y=0 ; y < city.size ; y++){
             
                const terrainId = city.data[x][y].terrainId;
                const mesh = createAssetInstance(terrainId,x,y)
              
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
          
                const currentBuildingId = buildings[x][y]?.userData.id;
                const newBuildingId = city.data[x][y].buildingId;


                // building deletion 
                if ( !newBuildingId && currentBuildingId){
                    scene.remove(buildings[x][y]);
                    buildings[x][y] = undefined;
                }

                // update mesh if data model changed

                if (newBuildingId !== currentBuildingId){
                    scene.remove(buildings[x][y]);
                    buildings[x][y] = createAssetInstance(newBuildingId, x, y);
                    scene.add(buildings[x][y]);
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
        // need the normalized mouse position for the raycaster to identify mouse pos
        // normalzed postions are the x and y valus bw -1 and 1
        mouse.x = (event.clientX / renderer.domElement.clientWidth) *2 - 1;
        mouse.y = -(event.clientY / renderer.domElement.clientHeight) *2 + 1;
    
        raycaster.setFromCamera(mouse, camera.camera);

        let intersections = raycaster.intersectObjects(scene.children, false);

        if ( intersections.length > 0){
            if(selectedObject) selectedObject.material.emissive.setHex(0);
            selectedObject = intersections[0].object;
            selectedObject.material.emissive.setHex(0x555555);
            console.log(selectedObject.userData);

            if(this.onObjectSelected){
                this.onObjectSelected(selectedObject);
            }
        }
    }

    function onMouseMove(event){
       camera.onMouseMove(event);
    }


    

    return{
        onObjectSelected,
        start,
        initialize,
        update,
        stop,
        onMouseDown,
        onMouseMove,
        onMouseUp
    }
}