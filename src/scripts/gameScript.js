
import { getLevelTime, getCurrentWave, increaseLevelTime, increaseCurrentWave, resetLevelTime } from "./global.js";
import * as config from "./config.js";
import * as events from "./events.js";
import * as sfxManager from "./sfxManager.js";
import { spawnSnake } from "./Snake.js";
import { randomRange } from "./utils.js";

let truckSpawnTime = 7;
let powerUpSpawned = false;

const resetTruck = (runtime) => {
    const truck = runtime.objects.Truck.getFirstInstance();
    let switchDirection = randomRange(0, 10) < 5;

    if (switchDirection) {
        truck.x = 1166;
        truck.width = -90;
        truck.behaviors["Bullet"].speed = -250;
    } else {
        truck.width = 90
        truck.x = -112;
        truck.behaviors["Bullet"].speed = 250;
    }

    const man = runtime.objects.Man.getFirstInstance();
    if (!man) {
        runtime.objects.Man.createInstance(config.layers.background, -112, 0);
    }
}

const runEndofLevel = () => {
    window.dispatchEvent(new CustomEvent(events.levelEnd));
    sfxManager.PlayLevelEnd();
    increaseCurrentWave();
    resetLevelTime();
}

export const runGamescript = (runtime) => {
    increaseLevelTime(runtime.dt);

    const t = Math.round(getLevelTime());
    
    if (t > 0 && t === truckSpawnTime) {
        resetTruck(runtime);
    }
    const currentWave = getCurrentWave();
    const introMessage = runtime.objects.IntroMessage.getFirstInstance();

    if (t === -5) {
        introMessage.isVisible = true;
        introMessage.text = "Wave " + getCurrentWave().toString();
    }

    if (t === -3) {
        introMessage.text = "Get Ready!";
    }

    if (t === -1) {
        introMessage.isVisible = false;
    }

    if (currentWave > 1) {
        if (t === 0) {
            if (!powerUpSpawned) {
                runtime.objects.Powerup.createInstance(config.layers.game, 344, 72);
                powerUpSpawned = true;
            }
        }
        if (t > 0) {
            powerUpSpawned = false;
        }
    }

    if (currentWave === 1) {
        if (t === 0) {
            truckSpawnTime = 7;
            const spawner = runtime.objects.AstroidSpawner.createInstance(config.layers.game, 352, -32);
            spawner.spawnRate = 100;
            increaseLevelTime(1);
        }
        if (t === 15) {
            runtime.objects.AstroidSpawner.getFirstInstance().destroy();
            runEndofLevel();
            increaseLevelTime(1);
        }
    }

    if (currentWave === 2) {
        if (t === 0) {
            truckSpawnTime = randomRange(5, 15);
            runtime.objects.BulletEnemy1.createInstance(config.layers.game, 98, -100);
            increaseLevelTime(1);
        }

        if (t === 3) {
            runtime.objects.BulletEnemy1.createInstance(config.layers.game, 584, -100);
            increaseLevelTime(1);
        }

        if (t === 4) {
            increaseLevelTime(1);
            runtime.objects.BulletEnemy1.createInstance(config.layers.game, 310, -188);
        }

        if (t > 4 && runtime.objects.BulletEnemy1.getAllInstances().length <= 0) {
            runEndofLevel();
        }

        if (t === 20) {
            runEndofLevel();
            increaseLevelTime(1);
        }
    }

    if (currentWave === 3) {
        if (t === 0) {
            truckSpawnTime = randomRange(5, 20);
            const spawner = runtime.objects.EggSpawner.createInstance(config.layers.game, 352, -32);
            spawner.spawnInterval = 2.5;
            increaseLevelTime(1);
        }
        if (t === 25) {
            runtime.objects.EggSpawner.getFirstInstance().destroy();
            runEndofLevel();
            increaseLevelTime(1);
        }
    }

    if (currentWave === 4) {
        if (t === 0) {
            truckSpawnTime = randomRange(5, 20);
            spawnSnake(runtime, 5, 10, -20)
            increaseLevelTime(1);
        }

        if (t === 5) {
            spawnSnake(runtime, 4, 250, -20)
            increaseLevelTime(1);
        }

        if (t === 10) {
            spawnSnake(runtime, 5, 500, -20)
            increaseLevelTime(1);
        }

        if (t > 10 && runtime.objects.Snake.getAllInstances().length <= 0) {
            runEndofLevel();
        }
    }
}

//BulletEnemy1