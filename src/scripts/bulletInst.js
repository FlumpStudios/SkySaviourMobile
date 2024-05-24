import { isOutsideTopOfLayout } from "./utils.js";

export default class BulletInst extends globalThis.ISpriteInstance {
    constructor() {
        super();
    }

    update = (runtime) => {
        if (isOutsideTopOfLayout(this)) {
            const player = runtime.objects.Player.getFirstInstance();
            this.x = player.x;
            this.y = player.y;
        }
    };
}