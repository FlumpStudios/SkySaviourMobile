import * as SfxManager from "./sfxManager.js";
import { addToCollectedPeople } from "./global.js";
import * as config from "./config.js";

export default class manInst extends globalThis.ISpriteInstance {

    #pinToTruck = (runtime) => {
        const truck = runtime.objects.Truck.getFirstInstance();
        if (truck) {
            if (truck.width < 0) { 
                this.x = truck.x + 25;
                this.y = truck.y - 10;
            }
            else {
                this.x = truck.x - 25;
                this.y = truck.y - 10;
            }
        }
    }

    #checkCollisionWithPlayer = (runtime) => {
        const player = runtime.objects.Player.getFirstInstance();

        if (player.testOverlap(this)) {
            SfxManager.PlayManCollect();
            addToCollectedPeople();
            runtime.objects.PowerUpParticles.createInstance(config.layers.game, this.x, this.y);
            this.destroy();
        }   
    }

    update = (runtime) => {
        this.#pinToTruck(runtime);
        this.#checkCollisionWithPlayer(runtime);
    }
}