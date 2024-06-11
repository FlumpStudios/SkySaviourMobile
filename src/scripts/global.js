
import * as config from "./config.js";
let enemyHasReachedCity = false;
let playerLives = config.startingLives;
let levelTime = -5;
let currentWave = 1;
let score = 0;
let chain = 0;
let multiplier = 0;

export const getMultiplier = () => multiplier;
export const setMultiplier = (m) => { multiplier = m };

export const getEnemyHasReachedCity = () => enemyHasReachedCity;
export const setEnemyHasReachedCity = (hasReached) => { enemyHasReachedCity = hasReached }

export const getLives = () => playerLives; 1
export const addLife = () => playerLives++;
export const removeLife = () => playerLives--;

export const getLevelTime = () => levelTime;
export const increaseLevelTime = (t) => levelTime += t;
export const resetLevelTime = () => levelTime = -5;

export const getCurrentWave = () => currentWave;
export const increaseCurrentWave = () => currentWave++;

export const getScore = () => score;
export const addToScore = (s) => { score += (s * multiplier) };

export const getChain = () => chain;
export const addToChain = (c) => chain += c;

export const resetAllGlobals = () => {
    enemyHasReachedCity = false;
    playerLives = config.startingLives;
    levelTime = 0;
    currentWave = 0;
    score = 0;
    chain = 0;
}