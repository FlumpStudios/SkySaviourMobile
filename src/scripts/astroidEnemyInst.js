import * as config from "./config.js";
import enemyBase from "./enemyBase.js";
import { randomRangeFloat, randomRange } from "./utils.js";

export default class AstroidEnemyInst extends enemyBase {
    constructor() {
        super();
        this.health = 0;
        this.worth = 10;
        this.behaviors["Bullet"].speed = randomRange(50, 150);
        this.behaviors["Rotate"].speed = randomRangeFloat(-6.28, 6.28);
        const scale = randomRange(50, 110);
        this.width = scale;
        this.height = scale;
    }

    update(runtime) {
        super.update(runtime);
        if (this.health < 0) {
            runtime.objects.SquareShotEffect.createInstance(config.layers.game, this.x, this.y);
            runtime.objects.ExplosionParticle.createInstance(config.layers.game, this.x, this.y);
        }
    }
}