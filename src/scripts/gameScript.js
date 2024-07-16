
import { getLevelTime, getCurrentWave, increaseLevelTime, increaseCurrentWave, resetLevelTime } from "./global.js";
import * as config from "./config.js";
import * as events from "./events.js";
import * as sfxManager from "./sfxManager.js";
import { spawnSnake } from "./Snake.js";

const runEndofLevel = () => {
    window.dispatchEvent(new CustomEvent(events.levelEnd));
    sfxManager.PlayLevelEnd();
    increaseCurrentWave();
    resetLevelTime();
}

let powerUpSpawned = false;

export const runGamescript = (runtime) => {
    increaseLevelTime(runtime.dt);
    const t = Math.round(getLevelTime());
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
            runtime.objects.AstroidSpawner.createInstance(config.layers.game, 352, -32);
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
        if (t === 20) {
            runEndofLevel();
            increaseLevelTime(1);
        }
    }

    if (currentWave === 3) {
        if (t === 0) {
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