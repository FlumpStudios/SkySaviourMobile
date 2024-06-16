import { random } from "./utils.js";
import * as config from "./config.js";
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
        const r = random(4);
        let response = "";

        switch (r) {
            case 0:
                response = "Gun";
                break;
            case 1:
                response = "Speed";
                break;
            case 2:
                response = "Points";
                break;
            case 3:
                response = "Bomb";
                break;
            default:
                response = "Points";
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