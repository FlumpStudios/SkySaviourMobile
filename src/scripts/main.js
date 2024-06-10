import PlayerInst from "./playerInst.js";
import BulletInst from "./bulletInst.js";
import EggEnemyInst from "./eggEnemyInst.js";
import SquareExplosionEffectInst from "./shapeExplosionEffectInst.js";
import EggSpawnerInst from "./eggSpawnerInst.js";
import { runGamescript } from "./gameScript.js";
import { resetAllGlobals } from "./global.js";
import * as config from "./config.js";

runOnStartup(async runtime => {
	runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
	runtime.objects.Player.setInstanceClass(PlayerInst);
	runtime.objects.Bullet.setInstanceClass(BulletInst);
	runtime.objects.EggEnemy.setInstanceClass(EggEnemyInst);
	runtime.objects.SquareShotEffect.setInstanceClass(SquareExplosionEffectInst);
	runtime.objects.EggSpawner.setInstanceClass(EggSpawnerInst);
});

async function OnBeforeProjectStart(runtime) {
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.

	runtime.addEventListener("tick", () => Tick(runtime));

}

function Tick(runtime) {
	const currentLayout = runtime.layout.name;
	if (currentLayout === config.gameLayoutName) {
		runGamescript(runtime);
	}
	else {
		resetAllGlobals();
	}

	for (const player of runtime.objects.Player.instances()) {
		player.update(runtime);
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
}
