import * as config from "./config.js";

export default class ShapeExplosionEffectInst extends globalThis.ISpriteInstance {
    constructor() {
        super();
    }
    
    update = (runtime) => {
        this.width -= (config.shapeEffectShrinkSpeed * runtime.dt);
        this.height -= (config.shapeEffectShrinkSpeed * runtime.dt);
        if (this.height < 10) {
            this.destroy();
        }
    }
}