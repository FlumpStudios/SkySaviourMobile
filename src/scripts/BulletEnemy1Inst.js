
import * as config from "./config.js";
import enemyBase from "./enemyBase.js";

export default class BulletEnemy1Inst extends enemyBase {
    #bulletSpawner = null;
    constructor() {
        super();
        this.health = 3;
        this.worth = 25;
        this.#bulletSpawner = this.runtime.objects.EnemyBulletSpawner1.createInstance(config.layers.game, this.x, this.y);
        this.#bulletSpawner.behaviors["Rotate"].isEnabled = false;
        this.#bulletSpawner.behaviors["Sine"].isEnabled = false;
        this.#bulletSpawner.instVars.SpawnInterval = 1;
        this.#bulletSpawner.instVars.BulletSpeed = 250;
        
        // this.#bulletSpawner.behaviors["Sine"].isEnabled = true;
        // this.#bulletSpawner.behaviors["Sine"].period = 4;
        // this.#bulletSpawner.behaviors["Sine"].magnitude = 0.75;
    }

    #pinSpawner = () => {
        if (this.#bulletSpawner) {
            this.#bulletSpawner.x = this.x;
            this.#bulletSpawner.y = this.y;
        }
    }

    update(runtime) {
        super.update(runtime);
        try {
            this.#pinSpawner();
        }
        catch { };
        if (this.health < 0) {
            runtime.objects.SquareShotEffect.createInstance(config.layers.game, this.x, this.y);
            runtime.objects.ExplosionParticle.createInstance(config.layers.game, this.x, this.y);
        }

        if (this.y > 200 && this.behaviors["Bullet"].speed > 0) {
            this.behaviors["Bullet"].speed -= (runtime.dt * 100);
        }
    }
}