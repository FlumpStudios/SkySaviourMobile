import enemyBase from "./enemyBase.js";
import { toRadians } from "./utils.js";
import { addToScore } from "./global.js";
import * as SfxMangager from "./sfxManager.js";
import * as config from "./config.js";
import { angleTo } from "./utils.js";

export default class SnakeSegmentInst extends enemyBase {
    #bulletSpeed = 300;
    snakeId = 0;
    #isSwitched = false;

    constructor() {
        super();
    };

    #spawnBullet = (runtime) => {
        const bullet = runtime.objects.EnemyBullet.createInstance(config.layers.game, this.x, this.y);        
        bullet.behaviors["Bullet"].speed = this.#bulletSpeed;
        bullet.behaviors["Bullet"].angleOfMotion = Math.PI / 2;
        bullet.setAnimation("1");
    }

    // Over rides enemy base
    kill = (runtime) => {
        this.#spawnBullet(runtime);
        addToScore(this.worth);
        SfxMangager.PlayEnemyExplosion();
        for (const snakeSegment of runtime.objects.Snake.getAllInstances()) {
            if (snakeSegment.snakeId === this.snakeId) {
                snakeSegment.destroy();
                break;
            }
        }

        this.health = 0;

    }

    update = (runtime) => {
        if (this.x > 680 && !this.#isSwitched) {
            this.#isSwitched = true;
        }

        if (this.x < 40 && this.#isSwitched) {
            this.#isSwitched = false;
        }

        if (this.#isSwitched) {
            this.behaviors["Bullet"].angleOfMotion = toRadians(170);
        }
        else {
            this.behaviors["Bullet"].angleOfMotion = toRadians(10);
        }

        super.update(runtime);
    }
}