
import * as config from "./config.js";
let enemyHasReachedCity = false;
let playerLives = config.startingLives;
let levelTime = -5;
let currentWave = config.startingLevel;
let score = 0;
let chain = 0;
let multiplier = 0;
let isGameOver = false;
let bombCount = 1;
let powerLevel = 0;
let doubleShot = false;
let playerMoveSpeed = config.moveSpeed;
let collectedPeople = 0;


export const addToCollectedPeople = () => collectedPeople++;
export const getCollectedPeople = () => collectedPeople;
export const resetCollectedPeopl = () => collectedPeople = 0;

export const getPlayerMoveSpeed = () => playerMoveSpeed;

export const increasePlayerSpeed = (speed) => { playerMoveSpeed += speed }
export const decreasePlayerSpeed = (speed) => { playerMoveSpeed -= speed }

export const getDoubleShot = () => doubleShot;
export const setDoubleShot = (set) => { doubleShot = set };

export const getPowerLevel = () => powerLevel;
export const increasePowerLevel = () => powerLevel++;
export const decreasePowerLevel = () => powerLevel--;
export const resetPowerLevel = () => powerLevel = 0;

export const getIsGameOver = () => isGameOver;
export const setIsGameOver = (gameOver) => { isGameOver = gameOver }

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

export const getBombCount = () => bombCount;
export const addToBombCount = (b) => bombCount += b;
export const removeFromBombCount = () => bombCount--;

export const resetAllGlobals = () => {
    enemyHasReachedCity = false;
    playerLives = config.startingLives;
    levelTime = -5;
    currentWave = config.startingLevel;
    score = 0;
    chain = 0;
    isGameOver = false;
    bombCount = 1;
    powerLevel = 0;
    doubleShot = false;
    playerMoveSpeed = config.moveSpeed;
    collectedPeople = 0;
}

