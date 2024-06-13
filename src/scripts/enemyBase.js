import * as config from "./config.js";
import { waitForMillisecond } from "./utils.js";
import { addToScore, getEnemyHasReachedCity, setEnemyHasReachedCity } from "./global.js";
import * as events from "./events.js";

export default class EnemyBase extends globalThis.ISpriteInstance {
	worth = 10;
	health = 0;
	isSeaking = false;

	handleRestartAfterKill = () => {
		this.destroy();
	}

	handleLevelEnd = () => {
		this.health = -1;
	}

	constructor() {
		super();
		
		window.addEventListener(
			events.restartAfterKill,
			this.handleRestartAfterKill,
			false,
		);

		window.addEventListener(
			events.levelEnd,
			this.handleLevelEnd,
			false,
		);
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
		if (this.health < 0) {
			console.log("SCORE");
			addToScore(this.worth);
			this.destroy();
		}

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

		const player = runtime.objects.Player.getFirstInstance();

		if (runtime.objects.Horizon.getFirstInstance().testOverlap(this)) {
			if (!player.getIsInDeathState()) {
				setEnemyHasReachedCity(true);
			}
		}

		if (runtime.objects.Player.getFirstInstance().testOverlap(this)) {
			player.kill(runtime);
		}

		this.checkBulletCollision(runtime);
	}
}