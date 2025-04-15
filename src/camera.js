import * as THREE from 'three';
export function createCamera(gameWindow) {
    
    const LEFT_MOUSE_BUTTON = 0;
    const MIDDLE_MOUSE_BUTTON = 1;
    const RIGHT_MOUSE_BUTTON = 2;
    
    const MIN_CAMERA_RADIUS = 2;
    const MAX_CAMERA_RADIUS = 10;

    const Y_AXIS = new THREE.Vector3(0,1,0);
    const DEG2RAD = Math.PI / 180;



    const camera = new THREE.PerspectiveCamera(75, gameWindow.offsetWidth / gameWindow.offsetHeight, 0.1, 1000);
      
        let cameraOrigin = new THREE.Vector3(0,0,0);
        let cameraRadius = 4;
        let cameraAzimuth  = 0;
        let cameraElevation = 0;
        let isMiddleMouseDown = false;
        let isRightMouseDown = false;
        let isLeftMouseDown = false;
        let prevMouseX = 0;
        let prevMouseY = 0;
        updateCameraPosition();



        
    function onMouseUp(event){
        console.log('mouseup')
        if(event.button == LEFT_MOUSE_BUTTON){
            isLeftMouseDown = false;

        }
        if(event.button == RIGHT_MOUSE_BUTTON){
            isRightMouseDown = false;
        }
        if(event.button == MIDDLE_MOUSE_BUTTON){
            isMiddleMouseDown = false;
        }
    }


    
    function onMouseDown(event){
        console.log('mousedown')
        if(event.button == LEFT_MOUSE_BUTTON){
            isLeftMouseDown = true;

        }
        if(event.button == RIGHT_MOUSE_BUTTON){
            isRightMouseDown = true;
        }
        if(event.button == MIDDLE_MOUSE_BUTTON){
            isMiddleMouseDown = true;
        }
    }

    function onMouseMove(event){
        console.log('mousemove')

        const deltaX = (event.clientX - prevMouseX);
        const deltaY = (event.clientY - prevMouseY);
// Handles the rotation of the camera
        if ( isLeftMouseDown){
            cameraAzimuth += -(deltaX * 0.5);
            cameraElevation += (deltaY * 0.5);
            cameraElevation = Math.min(180, Math.max(0,cameraElevation));
            updateCameraPosition();
 
        }
// Handles the panning of the camera
        if ( isMiddleMouseDown){
            const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
            const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
            cameraOrigin.add(forward.multiplyScalar(-0.01*deltaY));
            cameraOrigin.add(forward.multiplyScalar(-0.01*deltaX));
            updateCameraPosition();
            
        }
// handles the zoom of the camera
        if (isRightMouseDown){
            cameraRadius += deltaY * 0.02;
            cameraRadius = Math.min(MAX_CAMERA_RADIUS, Math.max(MIN_CAMERA_RADIUS,cameraRadius));
            updateCameraPosition();
        }

        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
    }


    function updateCameraPosition(){
        camera.position.x = cameraRadius * Math.sin(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);
        
        camera.position.y = cameraRadius * Math.sin(cameraElevation * DEG2RAD);

        camera.position.z = cameraRadius * Math.sin(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);

        camera.position.add(cameraOrigin);

        camera.lookAt(cameraOrigin);

        camera.updateMatrix();
    }
    return {
            camera,
            onMouseDown,
            onMouseUp,
            onMouseMove
    }
}