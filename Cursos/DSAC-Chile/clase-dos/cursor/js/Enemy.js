class Enemy {
    constructor(scene, player) {
        this.scene = scene;
        this.player = player;
        this.health = 2;
        this.maxHealth = 2;
        this.speed = 2;
        this.isDead = false;
        this.attackCooldown = 0;
        this.attackRate = 1; // Ataques por segundo
        
        this.createMesh();
        this.setRandomPosition();
    }
    
    createMesh() {
        // Crear geometría del enemigo
        const geometry = new THREE.ConeGeometry(0.5, 1.5, 8);
        const material = new THREE.MeshLambertMaterial({ 
            color: 0xff0000,
            transparent: true,
            opacity: 0.8
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        this.scene.add(this.mesh);
        
        // Crear barra de vida
        this.createHealthBar();
    }
    
    createHealthBar() {
        const healthBarGeometry = new THREE.PlaneGeometry(1, 0.1);
        const healthBarMaterial = new THREE.MeshBasicMaterial({ 
            color: 0x00ff00,
            transparent: true,
            opacity: 0.8
        });
        
        this.healthBar = new THREE.Mesh(healthBarGeometry, healthBarMaterial);
        this.healthBar.position.set(0, 1.2, 0);
        this.mesh.add(this.healthBar);
    }
    
    setRandomPosition() {
        // Posicionar enemigo en un lugar aleatorio alrededor del jugador
        const angle = Math.random() * Math.PI * 2;
        const distance = 15 + Math.random() * 10;
        
        this.mesh.position.set(
            Math.cos(angle) * distance,
            0.75,
            Math.sin(angle) * distance
        );
    }
    
    update(deltaTime) {
        if (this.isDead) return;
        
        this.moveTowardsPlayer(deltaTime);
        this.updateHealthBar();
        this.updateAttackCooldown(deltaTime);
    }
    
    moveTowardsPlayer(deltaTime) {
        const direction = new THREE.Vector3();
        direction.subVectors(this.player.getPosition(), this.mesh.position);
        direction.y = 0; // No moverse en Y
        direction.normalize();
        
        // Mover hacia el jugador
        this.mesh.position.add(direction.multiplyScalar(this.speed * deltaTime));
        
        // Rotar para mirar al jugador
        this.mesh.lookAt(
            this.player.getPosition().x,
            this.mesh.position.y,
            this.player.getPosition().z
        );
    }
    
    updateHealthBar() {
        const healthPercentage = this.health / this.maxHealth;
        this.healthBar.scale.x = healthPercentage;
        
        // Cambiar color según la salud
        if (healthPercentage > 0.6) {
            this.healthBar.material.color.setHex(0x00ff00);
        } else if (healthPercentage > 0.3) {
            this.healthBar.material.color.setHex(0xffff00);
        } else {
            this.healthBar.material.color.setHex(0xff0000);
        }
    }
    
    updateAttackCooldown(deltaTime) {
        if (this.attackCooldown > 0) {
            this.attackCooldown -= deltaTime;
        }
    }
    
    takeDamage(amount) {
        this.health -= amount;
        
        if (this.health <= 0) {
            this.die();
        }
    }
    
    die() {
        this.isDead = true;
        this.mesh.material.opacity = 0.3;
        this.healthBar.visible = false;
        
        // Efecto de muerte
        this.createDeathEffect();
    }
    
    createDeathEffect() {
        // Crear partículas de muerte
        const particleCount = 20;
        const particles = new THREE.Group();
        
        for (let i = 0; i < particleCount; i++) {
            const particleGeometry = new THREE.SphereGeometry(0.05, 4, 4);
            const particleMaterial = new THREE.MeshBasicMaterial({ 
                color: 0xff0000,
                transparent: true,
                opacity: 0.8
            });
            
            const particle = new THREE.Mesh(particleGeometry, particleMaterial);
            
            particle.position.copy(this.mesh.position);
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
