import Vector from './vector.js';
import Asteroid from './asteroid.js';
import { drawCircle } from './helper.js';

class Gear {
    constructor ({main, secondary}) {
        const mainAsteroid = new Asteroid(main);

        let tempLast = mainAsteroid;
        const secondaryAsteroids = secondary.map(
            childOptions => {
                const child = new Asteroid(
                    Object.assign(childOptions, {center: tempLast})
                );
                tempLast = child;

                return child;
            }
        );

        this.components = [mainAsteroid].concat(secondaryAsteroids);
        this.last = this.components[this.components.length - 1];
    }

    draw (ctx) {
        this.components.forEach(element => element.draw(ctx));
    }

    update () {
        this.components.forEach(element => element.update());
    }
};

export default class DrawingPiston {
    constructor ({gear1, gear2, common, rodLength, penColor, lineWidth}) {
        // create 2 gears
        this.gear1 = new Gear({
            main: Object.assign(gear1.main, common),//{...gear1.main, ...common}
            secondary: gear1.secondary
        });
        this.gear2 = new Gear({
            main: Object.assign(gear2.main, common),//{...gear2.main, ...common}
            secondary: gear2.secondary
        });

        // rod
        this.rodLength = rodLength;
        this.penColor = penColor;
        this.lineWidth = lineWidth;
        [this.headPoint, this.penPoint, this.endPoint] = this.getRodPoints();
    }

    getRodPoints () {
        const direction = Vector.sub(
            this.gear2.last.currentPosition,
            this.gear1.last.currentPosition
        ).normalize();

        const headPoint = this.gear1.last.currentPosition.copy();
        const endPoint = this.gear2.last.currentPosition.copy();
        const penPoint = headPoint.copy().add(direction.copy().mul(this.rodLength));

        return [headPoint, penPoint, endPoint];
    }
    
    draw (ctx) {
        this.gear1.draw(ctx);
        this.gear2.draw(ctx);

        // rod
        ctx.beginPath();
        ctx.moveTo(this.headPoint.x, this.headPoint.y);
        ctx.lineTo(this.endPoint.x, this.endPoint.y);
        ctx.stroke();

        // pen point
        drawCircle(ctx, this.penColor, 5, this.penPoint);
    }

    update () {
        this.gear1.update();
        this.gear2.update();

        [this.headPoint, this.penPoint, this.endPoint] = this.getRodPoints();
    }
}
