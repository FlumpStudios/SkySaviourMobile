import * as config from "./config.js";
import * as global from "./global.js";
import { clamp, waitForMillisecond } from "./utils.js";
import * as events from "./events.js";
import * as SfxManager from "./sfxManager.js";
export default class PlayerInst extends globalThis.ISpriteInstance {
    #hasSpawned = false;
    #bulletCount = config.maxBulletCount;
    #lastMousex = 0;
    #lastMousey = 0;
    #lastMouseClick = false;
    #shotCounter = 0;
    #isCharging = false;
    #lastx = 0;
    #chargeTicker = 0;
    #isInDestroyingCityState = false;
    #isInDeathState = false;
    #intialHeight = 0;
    #intialWidth = 0;
    #isReady = false;

    constructor() {
        super();
        this.x = config.playerStartPosition.x;
        this.y = config.playerStartPosition.y;
        this.#lastMousex = this.x;
        this.#lastMousey = this.y;
        this.resetVars();

        this.#intialHeight = this.height;
        this.#intialWidth = this.width;

        this.width = config.playerSpawnInSize;
        this.height = config.playerSpawnInSize;
    }


    controls = (runtime) => {
        if (this.x > this.#lastx) {
            this.setAnimation("Right");
        }
        else if (this.x < this.#lastx) {
            this.setAnimation("Left");
        }
        else {
            this.setAnimation("Normal");
        }

        this.#lastx = this.x;

        if (runtime.objects.Mouse.isMouseButtonDown(0)) {
            const x = runtime.objects.Mouse.getMouseX();
            const y = runtime.objects.Mouse.getMouseY();

            if (this.#lastMouseClick === false) {
                if (y > config.bombClickY) {
                    if (global.getBombCount() > 0) {
                        let bombline1 = runtime.objects.BombLine.createInstance(config.layers.game, this.x, this.y);
                        let bombLine2 = runtime.objects.BombLine.createInstance(config.layers.game, this.x, this.y);
                        bombLine2.angle = 1.57;
                        bombline1.angle = 4.71;
                        SfxManager.PlayBombSounds();
                        global.removeFromBombCount();
                    }
                }
            }

            else {
                if (x > this.#lastMousex) {
                    this.behaviors["8Direction"].simulateControl("right");
                }

                if (x < this.#lastMousex) {
                    this.behaviors["8Direction"].simulateControl("left");
                }

                if (y < this.#lastMousey) {
                    this.behaviors["8Direction"].simulateControl("up");
                }


                if (y > this.#lastMousey) {
                    this.behaviors["8Direction"].simulateControl("down");
                }
            }

            this.#lastMousex = runtime.objects.Mouse.getMouseX()
            this.#lastMousey = runtime.objects.Mouse.getMouseY()
            this.#lastMouseClick = true;
        }
        else {
            this.#lastMouseClick = false;
        }
    }

    resetVars = () => {
        this.#bulletCount = config.maxBulletCount;
        this.#lastMousex = 0;
        this.#lastMousey = 0;
        this.#shotCounter = 0;
        this.#isCharging = false;
        this.#lastx = 0;
        this.#chargeTicker = 0;
        this.#isInDestroyingCityState = false;
        this.x = config.playerStartPosition.x;
        this.y = config.playerStartPosition.y;
        global.setEnemyHasReachedCity(false);
        this.#isInDeathState = false;
        this.#isReady = false;
        this.#lastMouseClick = false;
    }

    spawnBullet(runtime) {
        if (this.getBulletCount() >= 0 && !global.getEnemyHasReachedCity()) {
            this.#shotCounter += runtime.dt;
            if (this.#shotCounter > config.shotInteval) {
                SfxManager.PlayPlayerShoot();
                if (global.getPowerLevel() < 1) {
                    runtime.objects.Bullet.createInstance(config.layers.game, this.x + config.shotOffsets.x, this.y + config.shotOffsets.y);
                    if (global.getDoubleShot()) {
                        waitForMillisecond(400).then(() => {
                            const secBullet = runtime.objects.Bullet.createInstance(config.layers.game, this.x + config.shotOffsets.x, this.y + config.shotOffsets.y);
                            secBullet.width = 24;
                            secBullet.height = 14;
                            secBullet.colorRgb = [0, 0.5, 1];
                            SfxManager.PlayPlayerShoot();

                        });
                    }
                }

                if (global.getPowerLevel() >= 1) {
                    runtime.objects.Bullet.createInstance(config.layers.game, this.x + config.shotOffsets.x + 10, this.y + config.shotOffsets.y);
                    runtime.objects.Bullet.createInstance(config.layers.game, this.x + config.shotOffsets.x - 10, this.y + config.shotOffsets.y);
                    if (global.getDoubleShot()) {
                        waitForMillisecond(400).then(() => {
                            const secBullet1 = runtime.objects.Bullet.createInstance(config.layers.game, this.x + config.shotOffsets.x + 10, this.y + config.shotOffsets.y);
                            const secBullet2 = runtime.objects.Bullet.createInstance(config.layers.game, this.x + config.shotOffsets.x - 10, this.y + config.shotOffsets.y);

                            secBullet1.width = 24;
                            secBullet1.height = 14;
                            secBullet1.colorRgb = [0, 0.5, 1];
                            secBullet2.width = 24;
                            secBullet2.height = 14;
                            secBullet2.colorRgb = [0, 0.5, 1];
                            SfxManager.PlayPlayerShoot();
                        });
                    }

                }

                if (global.getPowerLevel() >= 2) {
                    for (const turret of runtime.objects.Turret.getAllInstances()) {
                        const bullet = runtime.objects.Bullet.createInstance(config.layers.game, turret.x, turret.y);
                        bullet.colorRgb = [1, 1, 0];

                        if (global.getDoubleShot()) {
                            waitForMillisecond(400).then(() => {
                                const secBullet = runtime.objects.Bullet.createInstance(config.layers.game, turret.x, turret.y);
                                secBullet.width = 24;
                                secBullet.height = 14;
                                secBullet.colorRgb = [0, 0.5, 1];
                                secBullet.width = 24;
                                secBullet.height = 14;
                                secBullet.colorRgb = [1, 0.5, 0];
                                SfxManager.PlayPlayerShoot();
                            });

                        }

                    }
                }

                this.#shotCounter = 0;
                this.removeBullet();
            }
        }
    }

    removeBullet = () => this.#bulletCount --;
    addBullet = () => {
        if (this.#bulletCount < config.maxBulletCount)
            this.#bulletCount ++
    };
    getBulletCount = () => this.#bulletCount;
    getIsCharging = () => this.#isCharging;

    handleWarning = (runtime) => {
        const warningMessage = runtime.objects.ChargeWarning.getFirstInstance();

        if (this.#bulletCount < 0) {
            warningMessage.isVisible = true;
        }
        else {
            warningMessage.isVisible = false;
        }

        warningMessage.x = this.x;
        warningMessage.y = this.y + ((this.height / 2) + 10);
    }

    #spawnCityExplosion = (runtime, delay, x, y) => {
        waitForMillisecond(delay).then(() => {
            runtime.objects.CityExplosion.createInstance(config.layers.game, x, y)
            SfxManager.PlayCityExplosion();
        });
    }

    #handleLivesUi = (runtime) => {
        const liveSprites = runtime.objects.Life_UI.getAllInstances();

        for (let i = 0; i < liveSprites.length; i++) {
            if (i >= global.getLives()) {
                liveSprites[i].isVisible = false;
            }
            else {
                liveSprites[i].isVisible = true;
            }
        }
    }

    updateMultiplier = (runtime) => {
        let m = 0;
        let multiplierText = runtime.objects.multiplierText.getFirstInstance();
        const horizony = runtime.objects.Horizon.getFirstInstance().y;

        if (this.#isCharging) {
            m = 0;
        }
        else {
            m = Math.ceil(((this.y / horizony * config.multiplierDivisor) - config.multiplierDivisor) * -1);
        }
        var r = clamp(m, 1, config.maxMultiplier);
        global.setMultiplier(r);
        multiplierText.text = "X" + r.toString();
    }

    #resetAfterKill = () => {
        SfxManager.PlayPlayerSpawnSfx();
        this.width = config.playerSpawnInSize;
        this.height = config.playerSpawnInSize;
        global.removeLife();
        window.dispatchEvent(new CustomEvent(events.restartAfterKill));
    }

    kill = (runtime) => {
        if (!this.#isInDeathState) {
            SfxManager.PlayPlayerKilled();
            runtime.objects.DeathParticles.createInstance(config.layers.game, this.x, this.y);
            runtime.objects.PlayerDeathEffect.createInstance(config.layers.game, this.x, this.y);
            this.#isInDeathState = true;
            waitForMillisecond(850).then(() => {
                this.resetVars();
                this.#resetAfterKill();
            });
        }
    }

    #handlePowerUpCollision = (runtime) => {
        const powerUp = runtime.objects.Powerup.getFirstInstance();
        if (!powerUp) { return; }

        if (powerUp.testOverlap(this)) {
            runtime.objects.PowerUpParticles.createInstance(config.layers.game, powerUp.x, powerUp.y);
            const powerUpType = powerUp.getCurrentPowerup();
            const powerUpText = runtime.objects.PowerUpText.createInstance(config.layers.game, powerUp.x, powerUp.y);

            switch (powerUpType) {
                case "Gun":
                    powerUpText.text = "Fire Power"
                    global.increasePowerLevel();
                    break;
                case "Speed":
                    powerUpText.text = "Speed Up";
                    global.increasePlayerSpeed(config.moveSpeedPowerUpBonus);
                    break;
                case "Points":
                    powerUpText.text = config.pointsBonusPickupAmount.toString();
                    global.addToScore(config.pointsBonusPickupAmount);
                    break;
                case "Bomb":
                    powerUpText.text = "Bomb";
                    global.addToBombCount(1);
                case "DoubleShot":
                    powerUpText.text = "Double Shot";
                    global.setDoubleShot(true);
                    break;
            }

            SfxManager.PlayPowerUpSounds();
            powerUp.destroy();
        }
    }

    getIsInDeathState = () => this.#isInDeathState;

    update = (runtime) => {
        if (!this.#hasSpawned) {
            SfxManager.PlayPlayerSpawnSfx();
            this.#hasSpawned = true;
        }

        if (global.getLives() < 0) {
            if (!global.getIsGameOver()) {
                waitForMillisecond(3000).then(() => runtime.goToLayout("MainMenu"));
            }
            global.setIsGameOver(true);
        }

        this.behaviors["8Direction"].maxSpeed = global.getPlayerMoveSpeed();

        this.#handlePowerUpCollision(runtime);

        for (const turret of runtime.objects.Turret.getAllInstances()) {
            if (global.getPowerLevel() < 2) {
                turret.isVisible = false;
            }
            else {
                turret.isVisible = true;
            }
        }

        if (this.#isInDeathState || global.getIsGameOver()) {
            this.x = -1000;
            return;
        }

        this.updateMultiplier(runtime);
        this.handleWarning(runtime);
        this.#handleLivesUi(runtime);

        if (!this.#isReady) {
            if (this.height > this.#intialHeight) {
                this.width -= runtime.dt * 1500;
                this.height = this.width;
                this.isCollisionEnabled = false;
            } else {
                this.height = this.#intialHeight;
                this.width = this.#intialWidth;
                this.#isReady = true;
                this.isCollisionEnabled = true;
            }
        }

        const elec = runtime.objects.ElectricEffect.getFirstInstance();
        const chargeSparks = runtime.objects.ChargeSparks.getFirstInstance();
        runtime.objects.ChargeSparks.getFirstInstance();

        const bullets = runtime.objects.Bullet_UI.getAllInstances();
        for (let i = 0; i < bullets.length; i++) {
            if (i > this.#bulletCount) {
                bullets[i].setAnimation("Empty");
            }
            else {
                bullets[i].setAnimation("Full");
            }
        }
        // Bullet charging
        if (this.y < runtime.objects.Horizon.getFirstInstance().y + (this.width / 2)) {
            elec.isVisible = false;
            this.behaviors["Sine"].isEnabled = false;
            this.opacity = 1;
            chargeSparks.isEnabled = false;
            chargeSparks.isVisible = false;
            chargeSparks.x = -1000;
            chargeSparks.y = -1000;
            this.#isCharging = false;
            this.#chargeTicker = 0;
            this.spawnBullet(runtime);
        }
        else {
            this.#shotCounter = config.shotInteval
            this.#isCharging = true;

            if (this.#bulletCount < config.maxBulletCount) {
                chargeSparks.x = this.x;
                chargeSparks.y = this.y;
                chargeSparks.isEnabled = true;
                elec.isVisible = true;
                this.behaviors["Sine"].isEnabled = true;
                chargeSparks.isVisible = true;
                this.#chargeTicker += runtime.dt;
                if (this.#chargeTicker > config.chargeInteval) {
                    this.addBullet();
                    this.#chargeTicker = 0;
                }
            }
            else {
                elec.isVisible = false;
                this.behaviors["Sine"].isEnabled = false;
                this.opacity = 1;
                chargeSparks.isEnabled = false;
                chargeSparks.isVisible = false;
                chargeSparks.x = -1000;
                chargeSparks.y = -1000;
                // this.#chargeTicker = 0;
            }
        }

        elec.y = this.y;
        if (global.getEnemyHasReachedCity()) {
            this.behaviors["8Direction"].isEnabled = false;
            if (!this.#isInDestroyingCityState) {
                this.#isInDestroyingCityState = true;
                this.#spawnCityExplosion(runtime, 0, 160, 998);
                this.#spawnCityExplosion(runtime, 50, 438, 1014);
                this.#spawnCityExplosion(runtime, 100, 574, 990);
                this.#spawnCityExplosion(runtime, 150, 74, 1134);
                this.#spawnCityExplosion(runtime, 200, 328, 1128);
                this.#spawnCityExplosion(runtime, 250, 506, 1118);
                this.#spawnCityExplosion(runtime, 300, 640, 1108);
                this.#spawnCityExplosion(runtime, 350, 204, 1208);
                this.#spawnCityExplosion(runtime, 400, 410, 1220);
                this.#spawnCityExplosion(runtime, 450, 602, 1218);
                this.#spawnCityExplosion(runtime, 500, 160, 998);
                this.#spawnCityExplosion(runtime, 550, 438, 1014);
                this.#spawnCityExplosion(runtime, 600, 574, 990);
                this.#spawnCityExplosion(runtime, 650, 74, 1134);
                this.#spawnCityExplosion(runtime, 700, 328, 1128);
                this.#spawnCityExplosion(runtime, 750, 506, 1118);
                this.#spawnCityExplosion(runtime, 800, 640, 1108);
                this.#spawnCityExplosion(runtime, 850, 204, 1208);
                this.#spawnCityExplosion(runtime, 900, 410, 1220);
                this.#spawnCityExplosion(runtime, 950, 602, 1218);
                waitForMillisecond(950).then(() => {
                    global.removeLife();
                    window.dispatchEvent(new CustomEvent(events.restartAfterKill));
                    this.resetVars();
                    this.#resetAfterKill();
                });
            }
        }
        else {
            this.controls(runtime);
            this.behaviors["8Direction"].isEnabled = true;
        }
    };
}