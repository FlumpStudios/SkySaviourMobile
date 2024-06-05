import * as config from "./config.js";
import { waitForMillisecond } from "./utils.js";

export default class EnemyBase extends globalThis.ISpriteInstance {
	health = 0;

	constructor() {
		super();
	}
	
	checkBulletCollision(runtime) {
		for (const bullet of runtime.objects.Bullet.instances()) {
			if (bullet.testOverlap(this)) {
				this.health--;
				this.isVisible = false;
				waitForMillisecond(10).then(() => {
					try {
						this.isVisible = true
					} catch { }
				}

				);
				runtime.objects.BulletHitParticles.createInstance(config.layers.game, bullet.x, bullet.y);
				bullet.y = -200;
			}
		}
	}

	update(runtime) {
		// May as well destory all enemies if the end up past the bottom of the screen.
		if(config.isOutsideBottomOfLayout){
			this.destroy();
		}

		this.checkBulletCollision(runtime);
	}
}