import * as config from "./config.js";
import { waitForMillisecond } from "./utils.js";

export default class EnemyBase extends globalThis.ISpriteInstance {
	health = 0;

	constructor() {
		super();
	}


	checkBulletCollision(runtime)
	{
		for (const bullet of runtime.objects.Bullet.instances()) {
            if (bullet.testOverlap(this)) {
				this.health --;
				this.isVisible = false;
				waitForMillisecond(10).then(() => this.isVisible = true);
				runtime.objects.BulletHitParticles.createInstance(config.layers.player, bullet.x, bullet.y);
                bullet.y = -200;
            }
        }	
	}

	update(runtime)
	{
		this.checkBulletCollision(runtime);				
	}
}