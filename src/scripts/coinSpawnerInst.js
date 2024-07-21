import * as config from "./config.js";
import { getIsGameOver } from "./global.js";
export default class CoinSpawnerInst extends globalThis.ISpriteInstance {
    spawnInterval = 0.25;
    #spawnTick = 0;
    #coinSpeed = 100;
    #spawnCount = 0;
    constructor() {
        super();
    }

    update = (runtime) => {
        if (getIsGameOver()) { return };
        
        if (this.#spawnCount > 100) { return; }

        this.#spawnTick += runtime.dt;
        this.#coinSpeed += (runtime.dt * 20);
        if (this.behaviors["Sine"].period > 0.15) {
            this.behaviors["Sine"].period -= 0.002;
        }
        if (this.#spawnTick > this.spawnInterval) {
            const coin = runtime.objects.Coin.createInstance(config.layers.game, this.x, this.y);
            this.#spawnCount ++;
            coin.behaviors["Bullet"].speed = this.#coinSpeed;
            this.#spawnTick = 0;
        }
    }
}