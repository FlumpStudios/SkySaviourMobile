import PlayerInst from "./playerInst.js";
import BulletInst from "./bulletInst.js";
import EggEnemyInst from "./eggEnemyInst.js";
import BulletEnemy1Inst from "./BulletEnemy1Inst.js"
import AstroidEnemyInst from "./astroidEnemyInst.js";
import BulletSpawnerInst from "./bulletSpawnerInst.js"
import PowerUpInst from "./powerupinst.js";
import ShapeExplosionEffectInst from "./shapeExplosionEffectInst.js";
import PlayerExplosionEffectInst from "./playerExplosionEffectInst.js";
import EggSpawnerInst from "./eggSpawnerInst.js";
import AstroidSpawnerInst from "./astroidSpawnerInst.js";
import { runGamescript } from "./gameScript.js";
import { resetAllGlobals } from "./global.js";
import * as config from "./config.js";
import { getScore, getIsGameOver } from "./global.js";
import * as sfxManager from "./sfxManager.js";

runOnStartup(async runtime => {
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));	
	runtime.objects.Player.setInstanceClass(PlayerInst);	
	runtime.objects.BulletEnemy1.setInstanceClass(BulletEnemy1Inst);	
	
	runtime.objects.EnemyBulletSpawner1.setInstanceClass(BulletSpawnerInst);
	runtime.objects.Player.setInstanceClass(PlayerInst);	
	runtime.objects.Astroid.setInstanceClass(AstroidEnemyInst);
	runtime.objects.Powerup.setInstanceClass(PowerUpInst);	
	runtime.objects.Bullet.setInstanceClass(BulletInst);
	runtime.objects.EggEnemy.setInstanceClass(EggEnemyInst);
	runtime.objects.PlayerDeathEffect.setInstanceClass(PlayerExplosionEffectInst);
	runtime.objects.SquareShotEffect.setInstanceClass(ShapeExplosionEffectInst);
	runtime.objects.EggSpawner.setInstanceClass(EggSpawnerInst);
	runtime.objects.AstroidSpawner.setInstanceClass(AstroidSpawnerInst);
});

async function OnBeforeProjectStart(runtime) {
	runtime.addEventListener("tick", () => Tick(runtime));
	await sfxManager.init(runtime);
}

function Tick(runtime) {
	const currentLayout = runtime.layout.name;
	if (currentLayout === config.gameLayoutName) {
		runGamescript(runtime);
		for (const player of runtime.objects.Player.instances()) {
			player.update(runtime);
		}

		for (const astroid of runtime.objects.Astroid.instances()) {
			astroid.update(runtime);
		}

		for (const bullet of runtime.objects.Bullet.instances()) {
			bullet.update(runtime);
		}

		for (const bullet of runtime.objects.Bullet.instances()) {
			bullet.update(runtime);
		}

		for (const egg of runtime.objects.EggEnemy.instances()) {
			egg.update(runtime);
		}

		for (const eggSpawner of runtime.objects.EggSpawner.instances()) {
			eggSpawner.update(runtime);
		}

		for (const squareExplosionEffect of runtime.objects.SquareShotEffect.instances()) {
			squareExplosionEffect.update(runtime);
		}

		for (const playerExplosionEffectInst of runtime.objects.PlayerDeathEffect.instances()) {
			playerExplosionEffectInst.update(runtime);
		}

		for (const powerup of runtime.objects.Powerup.instances()) {
			powerup.update(runtime);
		}

		for (const astroidSpawner of runtime.objects.AstroidSpawner.instances()) {
			astroidSpawner.update(runtime);
		}

		for (const bulletSpawner of runtime.objects.EnemyBulletSpawner1.instances()) {
			bulletSpawner.update(runtime);
		}

		for (const bulletEnemy1 of runtime.objects.BulletEnemy1.instances()) {
			bulletEnemy1.update(runtime);
		}


		runtime.objects.ScoreText_ui.getFirstInstance().text = getScore().toString();
		if (getIsGameOver()) {
			let gameOverText = runtime.objects.GameOver.getFirstInstance();
			if (gameOverText.y < 540) {
				gameOverText.y += (runtime.dt * 300);
			}
		}
	}
	else {
		resetAllGlobals();
	}


}
