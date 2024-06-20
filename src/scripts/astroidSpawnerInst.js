import * as config from "./config.js";
import { getIsGameOver } from "./global.js";
export default class AstroidSpawnerInst extends globalThis.ISpriteInstance {
    #spawnTick = 0;
    constructor() {
        super();
    }

    update = (runtime) => {
        if (getIsGameOver()) { return };
        this.#spawnTick += runtime.dt;
        if (this.#spawnTick > config.eggSpawnInterval) {
            runtime.objects.Astroid.createInstance(config.layers.game, this.x, this.y);
            this.#spawnTick = 0;
        }
    }
}