import * as config from "./config.js";
import { getEnemyHasReachedCity, getLives, removeLife, setEnemyHasReachedCity } from "./global.js";
import { waitForMillisecond } from "./utils.js";
import * as events from "./events.js";

export default class PlayerInst extends globalThis.ISpriteInstance {
    #bulletCount = config.maxBulletCount;
    #lastMousex = 0;
    #lastMousey = 0;
    #shotCounter = 0;
    #isCharging = false;
    #lastx = 0;
    #chargeTicker = 0;
    #isInDestroyingCityState = false;

    constructor() {
        super();
        this.x = config.playerStartPosition.x;
        this.y = config.playerStartPosition.y;
        this.#lastMousex = this.x;
        this.#lastMousey = this.y;
        this.resetVars();
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

            this.#lastMousex = runtime.objects.Mouse.getMouseX()
            this.#lastMousey = runtime.objects.Mouse.getMouseY()
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
        setEnemyHasReachedCity(false);        
    }

    spawnBullet(runtime) {
        if (this.getBulletCount() >= 0 && !getEnemyHasReachedCity()) {
            this.#shotCounter += runtime.dt;
            if (this.#shotCounter > config.shotInteval) {
                runtime.objects.Bullet.createInstance(config.layers.game, this.x + config.shotOffsets.x, this.y + config.shotOffsets.y);
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
        waitForMillisecond(delay).then(() => runtime.objects.CityExplosion.createInstance(config.layers.game, x, y));
    }

    #handleLivesUi = (runtime) => {
        const liveSprites = runtime.objects.Life_UI.getAllInstances();

        for (let i = 0; i < liveSprites.length; i++) {
            if (i >= getLives()) {
                liveSprites[i].isVisible = false;
            }
            else {
                liveSprites[i].isVisible = true;
            }
        }
    }

    update = (runtime) => {
        this.handleWarning(runtime);
        this.#handleLivesUi(runtime);
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
        // TODO: Clean this up
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
                this.#chargeTicker = 0;
            }
        }

        elec.y = this.y;
        if (getEnemyHasReachedCity()) {
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
                    removeLife();
                    window.dispatchEvent(new CustomEvent(events.restartAfterKill));
                    this.resetVars();
                });


            }
        }
        else {
            this.controls(runtime);
            this.behaviors["8Direction"].isEnabled = true;
        }
    };
}