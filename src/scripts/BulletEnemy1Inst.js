
import * as config from "./config.js";
import enemyBase from "./enemyBase.js";

export default class BulletEnemy1Inst extends enemyBase {
    #bulletSpawner = null;
    constructor() {
        super();
        this.health = 3;
        this.worth = 25;
        this.#bulletSpawner = this.runtime.objects.EnemyBulletSpawner1.createInstance(config.layers.game, this.x, this.y);
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
    }
}