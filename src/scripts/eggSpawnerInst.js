import * as config from "./config.js";
export default class EggSpawnerInst extends globalThis.ISpriteInstance {
    #spawnTick = 0;
    constructor() {
        super();
    }

    update = (runtime) => {
        this.#spawnTick += runtime.dt;
        if (this.#spawnTick > config.eggSpawnInterval) {
            runtime.objects.EggEnemy.createInstance(config.layers.game, this.x, this.y);
            this.#spawnTick = 0;
        }
    }
}