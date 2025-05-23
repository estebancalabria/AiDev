import * as THREE from 'three';

let scene, camera, renderer;
let floor;
let moveForward = false;
let moveBackward = false;
let rotateLeft = false;
let rotateRight = false;
let canJump = true;
let velocityY = 0;
const moveSpeed = 5.0;
const rotationSpeed = 1.5;
const jumpForce = 6.0;
const gravity = 9.8;
const playerHeight = 1.7;
const playerWidth = 0.5; 
const playerDepth = 0.5; 
const clock = new THREE.Clock();
const obstacles = []; 
let leftHand, rightHand; 

init();
animate();

function createGrassTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const context = canvas.getContext('2d');

    context.fillStyle = '#228B22'; 
    context.fillRect(0, 0, 256, 256);

    context.fillStyle = '#1A6A1A'; 
    for (let i = 0; i < 2000; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const length = Math.random() * 10 + 5;
        const angle = (Math.random() - 0.5) * Math.PI * 0.2; 
        context.save();
        context.translate(x, y);
        context.rotate(angle);
        context.fillRect(-1, -length / 2, 2, length); 
        context.restore();
    }

    context.fillStyle = '#3CB371'; 
    for (let i = 0; i < 1000; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const length = Math.random() * 8 + 4;
        const angle = (Math.random() - 0.5) * Math.PI * 0.2;
        context.save();
        context.translate(x, y);
        context.rotate(angle);
        context.fillRect(-0.5, -length / 2, 1, length);
        context.restore();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(50, 50); 
    return texture;
}

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.05, 1000);
    camera.position.y = playerHeight;
    camera.position.z = 5;
    scene.add(camera); 

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const handGeometry = new THREE.BoxGeometry(0.1, 0.12, 0.2); 
    const handMaterial = new THREE.MeshStandardMaterial({ color: 0xFFDBAC, roughness: 0.6 }); 

    leftHand = new THREE.Mesh(handGeometry, handMaterial);
    leftHand.position.set(-0.25, -0.2, -0.5); 
    camera.add(leftHand); 

    rightHand = new THREE.Mesh(handGeometry, handMaterial);
    rightHand.position.set(0.25, -0.2, -0.5); 
    camera.add(rightHand); 


    const floorGeometry = new THREE.PlaneGeometry(100, 100);
    const grassTexture = createGrassTexture();
    const floorMaterial = new THREE.MeshStandardMaterial({ map: grassTexture });
    floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    scene.add(floor);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.8 });

    const cubeGeometry1 = new THREE.BoxGeometry(2, 2, 2);
    const cube1 = new THREE.Mesh(cubeGeometry1, obstacleMaterial);
    cube1.position.set(-5, 1, -10);
    scene.add(cube1);
    obstacles.push(cube1);

    const cubeGeometry2 = new THREE.BoxGeometry(1, 4, 1);
    const cube2 = new THREE.Mesh(cubeGeometry2, obstacleMaterial);
    cube2.position.set(8, 2, -15);
    scene.add(cube2);
    obstacles.push(cube2);

    const cubeGeometry3 = new THREE.BoxGeometry(5, 1, 2);
    const cube3 = new THREE.Mesh(cubeGeometry3, obstacleMaterial);
    cube3.position.set(0, 0.5, -20);
    scene.add(cube3);
    obstacles.push(cube3);

    const sphereGeometry = new THREE.SphereGeometry(1.5, 32, 16);
    const sphere = new THREE.Mesh(sphereGeometry, obstacleMaterial);
    sphere.position.set(12, 1.5, -8);
    scene.add(sphere);
    obstacles.push(sphere);

    obstacles.forEach(obstacle => {
        obstacle.userData.boundingBox = new THREE.Box3().setFromObject(obstacle);
    });

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    window.addEventListener('resize', onWindowResize);
}

function onKeyDown(event) {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = true;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            rotateLeft = true;
            break;
        case 'ArrowDown':
        case 'KeyS':
            moveBackward = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            rotateRight = true;
            break;
        case 'Space':
             if (canJump === true) {
                 velocityY = jumpForce;
                 canJump = false;
             }
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = false;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            rotateLeft = false;
            break;
        case 'ArrowDown':
        case 'KeyS':
            moveBackward = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            rotateRight = false;
            break;
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function checkCollision(potentialPosition) {
    const playerBox = new THREE.Box3(
        new THREE.Vector3(potentialPosition.x - playerWidth / 2, 0.1, potentialPosition.z - playerDepth / 2),
        new THREE.Vector3(potentialPosition.x + playerWidth / 2, playerHeight, potentialPosition.z + playerDepth / 2)
    );

    for (const obstacle of obstacles) {
        if (playerBox.intersectsBox(obstacle.userData.boundingBox)) {
            return true; 
        }
    }
    return false; 
}

function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta();
    const moveDistance = moveSpeed * delta;

    if (rotateLeft) camera.rotateY(rotationSpeed * delta);
    if (rotateRight) camera.rotateY(-rotationSpeed * delta);

    const worldDirection = new THREE.Vector3();
    camera.getWorldDirection(worldDirection);
    const horizontalDirection = worldDirection.clone(); 
    horizontalDirection.y = 0;
    horizontalDirection.normalize();

    let moveZ = 0;
    if (moveForward) moveZ += moveDistance;
    if (moveBackward) moveZ -= moveDistance;

    let moveX = 0; 

    const displacementZ = horizontalDirection.clone().multiplyScalar(moveZ);
    const potentialPositionZ = camera.position.clone().add(displacementZ);

    if (!checkCollision(potentialPositionZ)) {
        camera.position.add(displacementZ); 
    }

    const displacementX = new THREE.Vector3(0, 0, 0); 
    const potentialPositionX = camera.position.clone().add(displacementX); 

    if (!checkCollision(potentialPositionX)) {
        camera.position.add(displacementX); 
    }

    velocityY -= gravity * delta;
    const verticalMoveAmount = velocityY * delta;
    const potentialYPosition = camera.position.y + verticalMoveAmount;

    if (potentialYPosition < playerHeight) {
        velocityY = 0;
        camera.position.y = playerHeight;
        canJump = true;
    } else {
         const potentialPositionVertical = camera.position.clone();
         potentialPositionVertical.y = potentialYPosition;

         let verticalCollision = false;
         if (velocityY < 0) { 
             const playerFeetBox = new THREE.Box3(
                new THREE.Vector3(camera.position.x - playerWidth / 2, potentialYPosition - 0.1, camera.position.z - playerDepth / 2), 
                new THREE.Vector3(camera.position.x + playerWidth / 2, potentialYPosition + 0.1, camera.position.z + playerDepth / 2) 
            );
             for (const obstacle of obstacles) {
                if (playerFeetBox.intersectsBox(obstacle.userData.boundingBox)) {
                     velocityY = 0;
                     const obstacleTopY = obstacle.userData.boundingBox.max.y;
                     camera.position.y = obstacleTopY + playerHeight;
                     canJump = true;
                     verticalCollision = true;
                     break; 
                }
            }
         }

         if (velocityY > 0) {
             const playerHeadBox = new THREE.Box3(
                new THREE.Vector3(camera.position.x - playerWidth / 2, potentialYPosition + playerHeight - 0.1, camera.position.z - playerDepth / 2),
                new THREE.Vector3(camera.position.x + playerWidth / 2, potentialYPosition + playerHeight + 0.1, camera.position.z + playerDepth / 2) 
            );
             for (const obstacle of obstacles) {
                if (playerHeadBox.intersectsBox(obstacle.userData.boundingBox)) {
                    velocityY = 0; 
                    verticalCollision = true;
                    break;
                }
             }
         }

         if (!verticalCollision && potentialYPosition >= playerHeight) {
             camera.position.y = potentialYPosition;
             if(velocityY !== 0) {
                 canJump = false;
             }
         }
    }

    renderer.render(scene, camera);
}