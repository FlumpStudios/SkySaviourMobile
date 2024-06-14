import { AudioManager } from "./audioManager.js";
import { random } from "./utils.js";
let audioManager = null;
let playerShoot = null;
let playerSpawn = null;
let explosions = [];
export const init = (async runtime => {
    // Initialise the audio manager. See AudioManager.js for details.
    audioManager = new AudioManager(runtime);

    // During the loading screen, load both sound files as
    // AudioBuffers and the music track all in parallel, so
    // they are ready for immediate playback on startup.
    [playerShoot, explosions[0], explosions[1], explosions[2], explosions[3], explosions[4], explosions[5],explosions[6],explosions[7],explosions[8],explosions[9],playerSpawn] = await Promise.all([
        audioManager.loadSound("PlayerFire.webm"),
        audioManager.loadSound("Explosion__001.webm"),
        audioManager.loadSound("Explosion__002.webm"),        
        audioManager.loadSound("Explosion__003.webm"),
        audioManager.loadSound("Explosion__004.webm"),
        audioManager.loadSound("Explosion__005.webm"),
        audioManager.loadSound("Explosion__006.webm"),
        audioManager.loadSound("Explosion__007.webm"),
        audioManager.loadSound("Explosion__008.webm"),
        audioManager.loadSound("Explosion__009.webm"),
        audioManager.loadSound("Explosion__010.webm"),
        audioManager.loadSound("Starpower__007.webm")
    ]);
});

export function PlayPlayerShoot() {
    audioManager.playSound(playerShoot);
}

export function PlayPlayerSpawnSfx() {
    audioManager.playSound(playerSpawn);
}


let lastExplosionIndex = -1;
export function PlayEnemyExplosion() {

    const i = random(explosions.length - 1);

    if (i === lastExplosionIndex) {
        PlayEnemyExplosion();
        return;
    }
    lastExplosionIndex = i;
    audioManager.playSound(explosions[i]);
}

export function SetVolume(vol) {
    if (audioManager) {
        audioManager.changeVolume(vol)
    }
}