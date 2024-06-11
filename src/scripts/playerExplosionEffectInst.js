export default class PlayerExplosionEffectInst extends globalThis.ISpriteInstance {
    constructor() {
        super();
    }
    
    update = (runtime) => {
        this.width -= (2000 * runtime.dt);
        this.height -= (2000 * runtime.dt);
        if (this.height < 10) {
            this.destroy();
        }
    }
}