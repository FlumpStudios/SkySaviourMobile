import { waitForMillisecond, isMirrored } from "./utils.js"

export default class PlayerInst extends globalThis.ISpriteInstance {
    #lastx = 0;
    #lasty = 0;

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

    update = (runtime) => {
        this.controls(runtime);
    };
}