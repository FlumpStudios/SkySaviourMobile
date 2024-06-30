import enemyBase from "./enemyBase.js";
import { toRadians } from "./utils.js";
export default class SnakeSegmentInst extends enemyBase {
    snakeId = 0;
    #isSwitched = false;

    constructor() {
        super();
    };

    update = (runtime) => {
        if (this.x > 680 && !this.#isSwitched) {
            this.#isSwitched = true;
        }

        if (this.x < 40 && this.#isSwitched) {
            this.#isSwitched = false;
        }

        if (this.#isSwitched) {
            this.behaviors["Bullet"].angleOfMotion = toRadians(170);
        }
        else {
            this.behaviors["Bullet"].angleOfMotion = toRadians(10);
        }
        super.update(runtime);
    }
}