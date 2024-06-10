
import { getLevelTime, getCurrentWave, increaseLevelTime, increaseCurrentWave, resetLevelTime } from "./global.js";
import * as config from "./config.js";
import * as events from "./events.js";


const runEndofLevel = () => {
    window.dispatchEvent(new CustomEvent(events.levelEnd));
    increaseCurrentWave();
    resetLevelTime();
}

export const runGamescript = (runtime) => {
    increaseLevelTime(runtime.dt);
    const t = Math.round(getLevelTime());
    const currentWave = getCurrentWave();
    const introMessage = runtime.objects.IntroMessage.getFirstInstance();

    if (t === -5) {
        // introMessage.behaviors.Fade.startFade();
        introMessage.isVisible = true;
        introMessage.text = "Wave " + getCurrentWave().toString();
    }

    if (t === -3) {
        introMessage.text = "Get Ready!";
    }

    if (t === -1) {
        introMessage.isVisible = false;
    }


    if (currentWave === 1) {
        if (t === 0) {
            runtime.objects.EggSpawner.createInstance(config.layers.game, 352, -32);
            increaseLevelTime(1);
        }
        if (t === 10) {
            runtime.objects.EggSpawner.getFirstInstance().destroy();
            runEndofLevel();
        }
    }
}



