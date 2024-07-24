import { random } from "./utils.js";
import * as config from "./config.js";
import * as global from "./global.js";
export default class PowerUpInst extends globalThis.ISpriteInstance {
    constructor() {
        super();
        const a = random(Math.PI * 2);
        this.behaviors["Bullet"].angleOfMotion = a;
        this.#chooseRandomPowerUp();
    }

    #timer = 0;

    #currentPowerUp = "";

    getCurrentPowerup = () => this.#currentPowerUp;

    #chooseRandomPowerUp = () => {
        const r = random(5);
        let response = "";

        switch (r) {
            case 0:
                if (global.getPowerLevel() >= config.maxPowerLevel) {
                    this.#chooseRandomPowerUp();
                    return;
                }
                response = "DoubleShot";
                break;
            case 1:
                if (global.getPlayerMoveSpeed() >= config.maxMoveSpeed) {
                    this.#chooseRandomPowerUp();
                    return;
                }
                response = "DoubleShot";
                break;
            case 2:
                response = "DoubleShot";
                break;
            case 3:
                if (global.getBombCount() >= config.maxBombCount) {
                    this.#chooseRandomPowerUp();
                    return;
                }
                response = "DoubleShot";
                break;
            case 4:
                if (global.getDoubleShot()) {
                    this.#chooseRandomPowerUp();
                    return;
                }
                response = "DoubleShot";
                break;
            default:
                response = "DoubleShot";
                break;
        }
        if (this.#currentPowerUp === response) {
            this.#chooseRandomPowerUp();
            return;
        }

        this.#currentPowerUp = response;
        this.setAnimation(response);
    }



    update = (runtime) => {
        this.#timer += runtime.dt;
        if (this.#timer > config.powerUpSwitchTime) {
            this.#chooseRandomPowerUp();
            this.#timer = 0;
        }
    }
}