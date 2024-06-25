import * as config from "./config.js";
import { getEnemyHasReachedCity } from "./global.js"
export default class EnemyBulletInst extends globalThis.ISpriteInstance {
    constructor() {
        super();
    }

    update = (runtime) => {
        if (getEnemyHasReachedCity()) { 
            if (this.behaviors["Bullet"]) {
				this.behaviors["Bullet"].isEnabled = false
			}
        }
    }
}