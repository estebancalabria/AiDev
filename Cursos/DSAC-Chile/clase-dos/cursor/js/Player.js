class Player {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.speed = 5;
        this.jumpSpeed = 8;
        this.isGrounded = true;
        this.velocity = new THREE.Vector3();
        this.gravity = -20;
        
        this.createMesh();
        this.setupControls();
    }
    
    createMesh() {
        // Crear geometría del jugador (cápsula invisible)
        const geometry = new THREE.CapsuleGeometry(0.5, 1, 4, 8);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x00ff00, 
            transparent: true, 
            opacity: 0.3,
            wireframe: true
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(0, 1, 0);
        this.mesh.castShadow = true;
        this.scene.add(this.mesh);
        
        // Crear cámara como hijo del jugador
        this.camera.position.set(0, 1.6, 0);
        this.mesh.add(this.camera);
    }
    
    setupControls() {
        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false,
            space: false
        };
    }
    
    update(deltaTime) {
        this.handleMovement(deltaTime);
        this.handleGravity(deltaTime);
        this.updatePosition();
    }
    
    handleMovement(deltaTime) {
        const moveSpeed = this.speed * deltaTime;
        const direction = new THREE.Vector3();
        
        // Movimiento basado en la dirección de la cámara
        const cameraDirection = new THREE.Vector3();
        this.camera.getWorldDirection(cameraDirection);
        cameraDirection.y = 0;
        cameraDirection.normalize();
        
        const right = new THREE.Vector3();
        right.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0));
        
        if (this.keys.w) {
            direction.add(cameraDirection);
        }
        if (this.keys.s) {
            direction.sub(cameraDirection);
        }
        if (this.keys.a) {
            direction.sub(right);
        }
        if (this.keys.d) {
            direction.add(right);
        }
        
        if (direction.length() > 0) {
            direction.normalize();
            this.velocity.x = direction.x * moveSpeed;
            this.velocity.z = direction.z * moveSpeed;
        } else {
            this.velocity.x *= 0.8; // Fricción
            this.velocity.z *= 0.8;
        }
        
        // Salto
        if (this.keys.space && this.isGrounded) {
            this.velocity.y = this.jumpSpeed;
            this.isGrounded = false;
        }
    }
    
    handleGravity(deltaTime) {
        if (!this.isGrounded) {
            this.velocity.y += this.gravity * deltaTime;
        }
        
        // Verificar colisión con el suelo
        if (this.mesh.position.y <= 1 && this.velocity.y <= 0) {
            this.mesh.position.y = 1;
            this.velocity.y = 0;
            this.isGrounded = true;
        }
    }
    
    updatePosition() {
        this.mesh.position.add(this.velocity);
    }
    
    reset() {
        this.mesh.position.set(0, 1, 0);
        this.velocity.set(0, 0, 0);
        this.isGrounded = true;
    }
    
    getPosition() {
        return this.mesh.position;
    }
}
