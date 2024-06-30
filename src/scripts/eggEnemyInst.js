import * as config from "./config.js";
import enemyBase from "./enemyBase.js";

export default class EggEnemyInst extends enemyBase {
    bulletTicker = 0;
    bulletSpawnInterval = 20;
    bulletSpeed = 100;

    constructor() {
        super();
        this.health = 1;
        this.worth = 10;
    }

    #spawnBullets = (runtime) => {
        if (this.bulletTicker > this.bulletSpawnInterval) {
            this.bulletTicker = 0;
            const bullet = runtime.objects.EnemyBullet.createInstance(config.layers.game, this.x, this.y);
            bullet.behaviors["Bullet"].speed = this.bulletSpeed;
            bullet.behaviors["Bullet"].angleOfMotion = this.angle;
            bullet.setAnimation("0");
        }
    }
    
    update(runtime) {
        this.bulletTicker += runtime.dt * 100;

        if (this.health < 0) {
            runtime.objects.SquareShotEffect.createInstance(config.layers.game, this.x, this.y);
            runtime.objects.ExplosionParticle.createInstance(config.layers.game, this.x, this.y);
        }

        if (this.y > 50) {
            this.#spawnBullets(runtime)
        }

        super.update(runtime);
    }
}