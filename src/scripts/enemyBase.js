import * as config from "./config.js";
import { waitForMillisecond } from "./utils.js";
import { getEnemyHasReachedCity, setEnemyHasReachedCity } from "./global.js";

export default class EnemyBase extends globalThis.ISpriteInstance {
	health = 0;
	isSeaking = false;

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

		if (getEnemyHasReachedCity()) {
			if (this.behaviors["Sine"]) {
				this.behaviors["Sine"].isEnabled = false
			}

			if (this.behaviors["Sine2"]) {
				this.behaviors["Sine2"].isEnabled = false
			}

			if (this.behaviors["Bullet"]) {
				this.behaviors["Bullet"].isEnabled = false
			}
		}

		if (config.isOutsideBottomOfLayout) {
			this.destroy();
		}

		if (runtime.objects.Horizon.getFirstInstance().testOverlap(this)) {
			setEnemyHasReachedCity(true);
		}

		this.checkBulletCollision(runtime);
	}
}