import Vector from './vector.js';
import { drawCircle } from './helper.js';

export default class Asteroid {
    constructor (
        {center, radius, speed, centerDistance, startingIndex, pathType, sides}
    ) {
        // asteroid around which it orbits
        this.center = center;
        this.radius = radius;
        this.speed = speed;

        // gen orbiting path
        this.path = [];
        this.genPath({
            centerDistance: centerDistance,
            startingIndex: startingIndex,
            pathType: pathType,
            sides: sides
        });

        // set currentIndex from startingIndex (from 0 to 1)
        this.currentIndex = Math.floor((this.path.length - 1) * startingIndex);

        // get first position in path
        this.currentPosition = null;
        this.updatePosition();
    }

    updatePosition () {
        this.currentPosition = this.path[this.currentIndex].copy();
        this.currentPosition.add(this.center.currentPosition);
    }

    genPath ({centerDistance, startingIndex, pathType = 'circle', sides = 3}) {
        // options
        const pathTypes = new Map([
            ['circle', radius => radius],
            ['polygon', (radius, angle, sides = 3) => {
                const n = (sides > 2) ? sides : 3;
                radius = radius * 
                         Math.cos(Math.PI / n) /
                         Math.cos(
                             (angle % ((Math.PI * 2) / n)) -
                             (Math.PI / n)
                         );
                return radius;
            }],
            ['crazy', (radius, angle) => {
                return radius * Math.cos(angle) * Math.sin(10) *
                    Math.sin(angle * radius) + 100;
            }]
        ]);

        // set path points
        const numPoints = Math.floor((Math.PI * 2) / this.speed);

        this.path = Array.from({length: numPoints}, (_, i) => {
            const angle = i * this.speed;
            const pathRadius = pathTypes.get(pathType)(centerDistance, angle, sides);

            return Vector.fromPolar(pathRadius, angle);
        });
    }

    draw (ctx) {
        // draw asteroid
        drawCircle(ctx, '#fff', this.radius, this.currentPosition);

        // update path points
        const pathPoints = this.path.map(
            point => point.copy().add(this.center.currentPosition)
        );

        // draw path
        ctx.beginPath();
        pathPoints.forEach(point => ctx.lineTo(point.x, point.y));
        ctx.closePath();
        ctx.stroke();
    }

    update () {
        // update currentIndex
        this.currentIndex++;
        this.currentIndex = this.currentIndex % this.path.length;

        this.updatePosition()
    }
};
