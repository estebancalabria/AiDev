class Weapon {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.bullets = [];
        this.fireRate = 0.1; // Tiempo entre disparos
        this.lastShot = 0;
        this.ammo = 30;
        this.maxAmmo = 30;
        this.reloadTime = 2; // Segundos
        this.isReloading = false;
        this.reloadStartTime = 0;
        
        this.createWeaponMesh();
        this.setupCrosshair();
    }
    
    createWeaponMesh() {
        // Crear arma (rifle simple)
        const weaponGroup = new THREE.Group();
        
        // Cañón
        const barrelGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
        const barrelMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
        barrel.rotation.z = Math.PI / 2;
        barrel.position.set(0.3, -0.2, -0.5);
        weaponGroup.add(barrel);
        
        // Cuerpo del arma
        const bodyGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.8);
        const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        body.position.set(0.1, -0.25, -0.3);
        weaponGroup.add(body);
        
        // Culata
        const stockGeometry = new THREE.BoxGeometry(0.2, 0.15, 0.4);
        const stockMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        const stock = new THREE.Mesh(stockGeometry, stockMaterial);
        stock.position.set(-0.1, -0.25, 0.2);
        weaponGroup.add(stock);
        
        // Posicionar arma en la cámara
        weaponGroup.position.set(0.3, -0.3, -0.5);
        this.camera.add(weaponGroup);
        
        this.weaponMesh = weaponGroup;
    }
    
    setupCrosshair() {
        // El crosshair se maneja en CSS, pero podemos agregar efectos aquí
        this.crosshairElement = document.getElementById('crosshair');
    }
    
    shoot() {
        const currentTime = Date.now() / 1000;
        
        if (currentTime - this.lastShot < this.fireRate || this.isReloading || this.ammo <= 0) {
            return;
        }
        
        this.lastShot = currentTime;
        this.ammo--;
        
        // Crear bala
        this.createBullet();
        
        // Efecto de retroceso
        this.addRecoil();
        
        // Efecto de fogonazo
        this.createMuzzleFlash();
        
        // Sonido (simulado con vibración si está disponible)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
        
        // Verificar si necesita recargar
        if (this.ammo <= 0) {
            this.startReload();
        }
    }
    
    createBullet() {
        const bulletGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const bulletMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffff00,
            emissive: 0x444400
        });
        
        const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
        
        // Posición inicial desde la cámara
        const startPosition = new THREE.Vector3();
        this.camera.getWorldPosition(startPosition);
        
        // Dirección de disparo
        const direction = new THREE.Vector3();
        this.camera.getWorldDirection(direction);
        
        bullet.position.copy(startPosition);
        bullet.userData = {
            direction: direction,
            speed: 50,
            life: 3, // Segundos de vida
            startTime: Date.now() / 1000
        };
        
        this.scene.add(bullet);
        this.bullets.push(bullet);
    }
    
    addRecoil() {
        // Retroceso simple
        const recoilAmount = 0.1;
        this.camera.rotation.x -= recoilAmount;
        
        // Volver a la posición original gradualmente
        setTimeout(() => {
            this.camera.rotation.x += recoilAmount;
        }, 100);
    }
    
    createMuzzleFlash() {
        const flashGeometry = new THREE.SphereGeometry(0.2, 8, 8);
        const flashMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffaa00,
            transparent: true,
            opacity: 0.8
        });
        
        const flash = new THREE.Mesh(flashGeometry, flashMaterial);
        
        // Posición del fogonazo
        const flashPosition = new THREE.Vector3();
        this.camera.getWorldPosition(flashPosition);
        const direction = new THREE.Vector3();
        this.camera.getWorldDirection(direction);
        flashPosition.add(direction.multiplyScalar(0.5));
        
        flash.position.copy(flashPosition);
        this.scene.add(flash);
        
        // Animar y remover el fogonazo
        const animateFlash = () => {
            flash.scale.multiplyScalar(0.9);
            flash.material.opacity *= 0.9;
            
            if (flash.material.opacity > 0.01) {
                requestAnimationFrame(animateFlash);
            } else {
                this.scene.remove(flash);
            }
        };
        
        animateFlash();
    }
    
    startReload() {
        if (this.isReloading) return;
        
        this.isReloading = true;
        this.reloadStartTime = Date.now() / 1000;
        
        // Efecto visual de recarga
        this.crosshairElement.style.borderColor = '#ff0000';
        
        setTimeout(() => {
            this.finishReload();
        }, this.reloadTime * 1000);
    }
    
    finishReload() {
        this.ammo = this.maxAmmo;
        this.isReloading = false;
        this.crosshairElement.style.borderColor = '#ffffff';
    }
    
    update(deltaTime) {
        // Actualizar balas
        this.bullets.forEach((bullet, index) => {
            const bulletData = bullet.userData;
            const currentTime = Date.now() / 1000;
            
            // Mover bala
            bullet.position.add(
                bulletData.direction.clone().multiplyScalar(bulletData.speed * deltaTime)
            );
            
            // Verificar tiempo de vida
            if (currentTime - bulletData.startTime > bulletData.life) {
                this.scene.remove(bullet);
                this.bullets.splice(index, 1);
            }
        });
    }
    
    getBullets() {
        return this.bullets;
    }
    
    getAmmo() {
        return this.ammo;
    }
    
    getMaxAmmo() {
        return this.maxAmmo;
    }
    
    isReloading() {
        return this.isReloading;
    }
}
