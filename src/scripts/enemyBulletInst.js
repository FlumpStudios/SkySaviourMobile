import { getEnemyHasReachedCity } from "./global.js"
import * as events from "./events.js";

export default class EnemyBulletInst extends globalThis.ISpriteInstance {
    constructor() {
        super();

        window.addEventListener(
            events.restartAfterKill,
            this.#handleRestartAfterKill,
            false
        );

        window.addEventListener(
            events.levelEnd,
            this.#handleLevelEnd,
            false
        );
    }
    
    #handleLevelEnd = () => {
        this.destroy();
    }

    #handleRestartAfterKill = () => {
        this.destroy();
    }

    #handlePlayerCollision = (runtime) => {
        const player = runtime.objects.Player.getFirstInstance();

        if (runtime.objects.HitPoint.getFirstInstance().testOverlap(this)) {
            player.kill(runtime);
            this.destroy();
        }
    }

    update = (runtime) => {
        if (getEnemyHasReachedCity()) {
            if (this.behaviors["Bullet"]) {
                this.behaviors["Bullet"].isEnabled = false
            }
        }
        else {
            this.#handlePlayerCollision(runtime);
        }
    }
}