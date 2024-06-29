import * as config from "./config.js";
import { getIsGameOver } from "./global.js";
export default class EggSpawnerInst extends globalThis.ISpriteInstance {
    spawnInterval = 1;    
    #spawnTick = 0;
    constructor() {
        super();
    }

    update = (runtime) => {
        if (getIsGameOver()) { return };
        this.#spawnTick += runtime.dt;
        if (this.#spawnTick > this.spawnInterval) {
            runtime.objects.EggEnemy.createInstance(config.layers.game, this.x, this.y);
            this.#spawnTick = 0;
        }
    }
}