import * as config from "./config.js";
import enemyBase from "./enemyBase.js";

export default class EggEnemyInst extends enemyBase {
    constructor() {
        super();
        this.health = 10;
    }

    update(runtime) {
        super.update(runtime);
        if (this.health < 0) {
            runtime.objects.SquareShotEffect.createInstance(config.layers.player, this.x, this.y);
            runtime.objects.ExplosionParticle.createInstance(config.layers.player, this.x, this.y);
 
            this.destroy();
        }
    }
}