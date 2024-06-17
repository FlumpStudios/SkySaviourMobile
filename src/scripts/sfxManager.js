import { AudioManager } from "./audioManager.js";
import { random } from "./utils.js";
let audioManager = null;
let playerShoot = null;
let playerSpawn = null;
let explosions = [];
let levelEnd = null;
let powerup = null;

export const init = (async runtime => {
    // Initialise the audio manager. See AudioManager.js for details.
    audioManager = new AudioManager(runtime);

    // During the loading screen, load both sound files as
    // AudioBuffers and the music track all in parallel, so
    // they are ready for immediate playback on startup.
    [playerShoot, explosions[0], explosions[1], explosions[2], explosions[3], explosions[4], explosions[5], explosions[6], explosions[7], explosions[8], explosions[9], playerSpawn, levelEnd, powerup] = await Promise.all([
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
        audioManager.loadSound("Starpower__007.webm"),
        audioManager.loadSound("Powerup__004.webm"),
        audioManager.loadSound("Powerup__009.webm")
    ]);
});

export function PlayPlayerShoot() {
    audioManager.playSound(playerShoot);
}

export function PlayPlayerSpawnSfx() {
    audioManager.playSound(playerSpawn);
}

export function PlayEnemyExplosion() {
    audioManager.playSound(explosions[2]);
}

export function PlayCityExplosion() {
    audioManager.playSound(explosions[9]);
}


export function PlayPlayerKilled() {
    audioManager.playSound(explosions[3]);
}

export function PlayLevelEnd() {
    audioManager.playSound(levelEnd);
}

export function PlayPowerUpSounds() {
    audioManager.playSound(powerup);
}

export function PlayBombSounds() {
    audioManager.playSound(explosions[6]);
}

export function SetVolume(vol) {
    if (audioManager) {
        audioManager.changeVolume(vol)
    }
}