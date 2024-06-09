import { isOutsideTopOfLayout } from "./utils.js";

export default class BulletInst extends globalThis.ISpriteInstance {
    constructor() {
        super();
    }

    update = (runtime) => {
        // if (isOutsideTopOfLayout(this)) {
        //     const player = runtime.objects.Player.getFirstInstance();
        //     if (!player.getIsCharging() && player.getBulletCount() >= 0) {
        //         player.removeBullet();
        //         this.x = player.x;
        //         this.y = player.y;
        //     } else {
        //         this.x = 1000;
        //         this.y = 0;
        //     }
        // }
    };
}