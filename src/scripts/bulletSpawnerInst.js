import * as config from "./config.js";
import * as events from "./events.js";
export default class BulletSpawnerInst extends globalThis.ISpriteInstance {
    #bulletSpeed = 0;
    #spawnInterval = 0;;
    #spawntimer = 0;

    constructor() {
        super();
        this.#spawnInterval = this.instVars.SpawnInterval;
        this.#bulletSpeed = this.instVars.BulletSpeed;
    }

    update = (runtime) => {
        this.#spawntimer += runtime.dt;
        if (this.#spawntimer > this.#spawnInterval) {
            let bullet = runtime.objects.EnemyBullet1.createInstance(config.layers.game, this.x, this.y);
            bullet.behaviors["Bullet"].speed = this.#bulletSpeed;
            bullet.behaviors["Bullet"].angleOfMotion = this.angle;
            this.#spawntimer = 0;
        }
    }
}