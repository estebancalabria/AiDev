class Scene {
    constructor(scene) {
        this.scene = scene;
        this.setupLighting();
        this.createEnvironment();
        this.createSkybox();
    }
    
    setupLighting() {
        // Luz ambiental
        const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
        this.scene.add(ambientLight);
        
        // Luz direccional (sol)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -20;
        directionalLight.shadow.camera.right = 20;
        directionalLight.shadow.camera.top = 20;
        directionalLight.shadow.camera.bottom = -20;
        this.scene.add(directionalLight);
        
        // Luz puntual para ambiente nocturno
        const pointLight = new THREE.PointLight(0x4444ff, 0.5, 30);
        pointLight.position.set(0, 5, 0);
        pointLight.castShadow = true;
        this.scene.add(pointLight);
    }
    
    createEnvironment() {
        // Crear suelo
        const groundGeometry = new THREE.PlaneGeometry(100, 100);
        const groundMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x2d5016,
            transparent: true,
            opacity: 0.8
        });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);
        
        // Crear obstáculos/edificios
        this.createBuildings();
        
        // Crear decoraciones
        this.createDecorations();
    }
    
    createBuildings() {
        const buildingPositions = [
            { x: 10, z: 10 },
            { x: -15, z: 8 },
            { x: 5, z: -20 },
            { x: -8, z: -12 },
            { x: 20, z: -5 },
            { x: -25, z: 15 }
        ];
        
        buildingPositions.forEach(pos => {
            const building = this.createBuilding();
            building.position.set(pos.x, building.geometry.parameters.height / 2, pos.z);
            this.scene.add(building);
        });
    }
    
    createBuilding() {
        const group = new THREE.Group();
        
        // Base del edificio
        const width = 3 + Math.random() * 4;
        const height = 4 + Math.random() * 6;
        const depth = 3 + Math.random() * 4;
        
        const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
        const buildingMaterial = new THREE.MeshLambertMaterial({ 
            color: new THREE.Color().setHSL(0.1, 0.3, 0.3 + Math.random() * 0.3)
        });
        const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
        building.castShadow = true;
        building.receiveShadow = true;
        group.add(building);
        
        // Ventanas
        for (let i = 0; i < 3; i++) {
            const windowGeometry = new THREE.PlaneGeometry(0.5, 0.8);
            const windowMaterial = new THREE.MeshBasicMaterial({ 
                color: 0x87CEEB,
                transparent: true,
                opacity: 0.7
            });
            const window = new THREE.Mesh(windowGeometry, windowMaterial);
            window.position.set(
                width / 2 + 0.01,
                -height / 2 + 1 + i * 1.5,
                0
            );
            group.add(window);
        }
        
        return group;
    }
    
    createDecorations() {
        // Crear árboles
        for (let i = 0; i < 20; i++) {
            const tree = this.createTree();
            const angle = Math.random() * Math.PI * 2;
            const distance = 15 + Math.random() * 25;
            tree.position.set(
                Math.cos(angle) * distance,
                0,
                Math.sin(angle) * distance
            );
            this.scene.add(tree);
        }
        
        // Crear rocas
        for (let i = 0; i < 15; i++) {
            const rock = this.createRock();
            const angle = Math.random() * Math.PI * 2;
            const distance = 10 + Math.random() * 20;
            rock.position.set(
                Math.cos(angle) * distance,
                0,
                Math.sin(angle) * distance
            );
            this.scene.add(rock);
        }
    }
    
    createTree() {
        const group = new THREE.Group();
        
        // Tronco
        const trunkGeometry = new THREE.CylinderGeometry(0.3, 0.5, 2, 8);
        const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        trunk.position.y = 1;
        trunk.castShadow = true;
        group.add(trunk);
        
        // Copa
        const crownGeometry = new THREE.SphereGeometry(1.5, 8, 6);
        const crownMaterial = new THREE.MeshLambertMaterial({ 
            color: new THREE.Color().setHSL(0.3, 0.7, 0.3 + Math.random() * 0.2)
        });
        const crown = new THREE.Mesh(crownGeometry, crownMaterial);
        crown.position.y = 2.5;
        crown.castShadow = true;
        group.add(crown);
        
        return group;
    }
    
    createRock() {
        const geometry = new THREE.DodecahedronGeometry(0.5 + Math.random() * 1, 0);
        const material = new THREE.MeshLambertMaterial({ 
            color: new THREE.Color().setHSL(0.1, 0.2, 0.3 + Math.random() * 0.2)
        });
        const rock = new THREE.Mesh(geometry, material);
        rock.position.y = 0.5;
        rock.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        rock.castShadow = true;
        return rock;
    }
    
    createSkybox() {
        // Crear cielo con gradiente
        const skyGeometry = new THREE.SphereGeometry(200, 32, 32);
        const skyMaterial = new THREE.ShaderMaterial({
            uniforms: {
                topColor: { value: new THREE.Color(0x0077ff) },
                bottomColor: { value: new THREE.Color(0x000033) },
                offset: { value: 33 },
                exponent: { value: 0.6 }
            },
            vertexShader: `
                varying vec3 vWorldPosition;
                void main() {
                    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
                    vWorldPosition = worldPosition.xyz;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 topColor;
                uniform vec3 bottomColor;
                uniform float offset;
                uniform float exponent;
                varying vec3 vWorldPosition;
                void main() {
                    float h = normalize(vWorldPosition + offset).y;
                    gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
                }
            `,
            side: THREE.BackSide
        });
        
        const sky = new THREE.Mesh(skyGeometry, skyMaterial);
        this.scene.add(sky);
    }
    
    addParticleEffect(position, color = 0xff0000, count = 10) {
        const particles = new THREE.Group();
        
        for (let i = 0; i < count; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.05, 4, 4);
            const particleMaterial = new THREE.MeshBasicMaterial({ 
                color: color,
                transparent: true,
                opacity: 0.8
            });
            
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            particle.position.copy(position);
            particle.velocity = new THREE.Vector3(
                (Math.random() - 0.5) * 10,
                Math.random() * 5 + 2,
                (Math.random() - 0.5) * 10
            );
            
            particles.add(particle);
        }
        
        this.scene.add(particles);
        
        // Animar partículas
        const animateParticles = () => {
            particles.children.forEach(particle => {
                particle.position.add(particle.velocity);
                particle.velocity.y -= 0.1; // Gravedad
                particle.material.opacity -= 0.02;
            });
            
            if (particles.children[0].material.opacity > 0) {
                requestAnimationFrame(animateParticles);
            } else {
                this.scene.remove(particles);
            }
        };
        
        animateParticles();
    }
}
