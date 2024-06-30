import { random } from "./utils.js";
import * as config from "./config.js";

export const spawnSnake = (runtime, length, x, y) => {
    const id = random(1000000);
    for (let i = 0; i < length; i++) {
        let snakeSegment = runtime.objects.Snake.createInstance(config.layers.game,  x + (i * config.snakeSegmentDistance), y);
        snakeSegment.behaviors["Sine"].phase = ((i / length) * 4);
        snakeSegment.snakeId = id;
        if (i === length - 1) {
            snakeSegment.setAnimation("SnakeHead");
        }
        else {
            snakeSegment.setAnimation("SnakeBody");
        }
    }
}