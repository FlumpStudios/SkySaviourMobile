import { waitForMillisecond, isMirrored } from "./utils.js"
import * as config from "./config.js";

export default class PlayerInst extends globalThis.ISpriteInstance {
    #lastx = 0;
    #lasty = 0;
    #shotCounter = 0;

    constructor() {
        super();
        this.#lastx = this.x;
        this.#lasty = this.y;
    }

    controls = (runtime) => {
        if (runtime.objects.Mouse.isMouseButtonDown(0)) {
            const x = runtime.objects.Mouse.getMouseX();
            const y = runtime.objects.Mouse.getMouseY();
            if (x > this.#lastx) {
                this.behaviors["8Direction"].simulateControl("right");
            }

            if (x < this.#lastx) {
                this.behaviors["8Direction"].simulateControl("left");
            }

            if (y < this.#lasty) {
                this.behaviors["8Direction"].simulateControl("up");
            }


            if (y > this.#lasty) {
                this.behaviors["8Direction"].simulateControl("down");
            }

            this.#lastx = runtime.objects.Mouse.getMouseX()
            this.#lasty = runtime.objects.Mouse.getMouseY()
        }
    }

    spawnBullet(runtime) {
        this.#shotCounter += runtime.dt;
        if (this.#shotCounter > config.shotInteval) {
            runtime.objects.Bullet.createInstance(config.layers.player, this.x + config.shotOffsets.x, this.y + config.shotOffsets.y);
            this.#shotCounter = 0;
        }
    }

    update = (runtime) => {
        const elec = runtime.objects.ElectricEffect.getFirstInstance();
        const chargeSparks = runtime.objects.ChargeSparks.getFirstInstance();
        if (this.y < runtime.objects.Horizon.getFirstInstance().y + (this.width / 2)) {
            this.spawnBullet(runtime);
            elec.isVisible = false;
            this.behaviors["Sine"].isEnabled = false;
            this.opacity = 1;            
            chargeSparks.isEnabled = false;            
            chargeSparks.isVisible = false;            
            chargeSparks.x = -1000;
            chargeSparks.y = -1000;
            
            console.log(chargeSparks);
        }
        else {
            chargeSparks.x = this.x;
            chargeSparks.y = this.y;
            elec.isVisible = true;
            chargeSparks.isEnabled = true;
            this.behaviors["Sine"].isEnabled = true;
            chargeSparks.isVisible = true;
        }


        //elec.x = this.x;
        elec.y = this.y;
        

        this.controls(runtime);
    };
}