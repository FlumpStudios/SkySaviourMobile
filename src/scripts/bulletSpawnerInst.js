import * as config from "./config.js";

export default class BulletSpawnerInst extends globalThis.ISpriteInstance {
    bulletType = 0;

    #bulletSpeed = 0;
    #spawnInterval = 0;;
    #spawntimer = 0;

    constructor() {
        super();
    }

    update = (runtime) => {
        this.#spawnInterval = this.instVars.SpawnInterval;
        this.#bulletSpeed = this.instVars.BulletSpeed;

        if (this.y < 20) { return; }
        this.#spawntimer += runtime.dt;
        if (this.#spawntimer > this.#spawnInterval) {
            let bullet = runtime.objects.EnemyBullet.createInstance(config.layers.game, this.x, this.y);
            bullet.behaviors["Bullet"].speed = this.#bulletSpeed;
            bullet.behaviors["Bullet"].angleOfMotion = this.angle;
            bullet.setAnimation(this.bulletType.toString());
            this.#spawntimer = 0;
        }
    }
}
