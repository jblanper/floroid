import { getRandomNum } from './helper.js';
import HslColor from './color.js';

// functions that create components
function setSecondaryGears (options) {
    const speed = options.speeds[getRandomNum(0, options.speeds.length)];

    return Array.from(
        {length: getRandomNum(options.number.min, options.number.max)},
        _ => {
            return {
                radius: 4,
                startingIndex: Math.random(), 
                speed: speed,
                centerDistance: getRandomNum(
                    options.centerDistance.min,
                    options.centerDistance.max
                ),
                pathType: options.pathTypes[getRandomNum(0, options.pathTypes.length)],
                sides: getRandomNum(
                    options.sides.min,
                    options.sides.max
                )
            };
        }
    );
}

function setDrawingPiston (options, baseColor) {
    const startingIndex = getRandomNum(0.1, 0.3, false);
    const centerDistance = getRandomNum(
        options.centerDistance.min,
        options.centerDistance.max
    );
    const rodLength = getRandomNum(
        options.rodLength.min,
        centerDistance
    );

    return { 
        rodLength: rodLength,
        penColor: baseColor.randomize().toString(),
        lineWidth: getRandomNum(options.lineWidth.min, options.lineWidth.max, false),
        common: {
            center: null,
            speed: options.common.speeds[getRandomNum(0, options.common.speeds.length)],
            centerDistance: centerDistance,
            pathType: options.common.pathTypes[getRandomNum(
                0, options.common.pathTypes.length
            )],
            sides: getRandomNum(options.sides.min, options.sides.max)
        },
        gear1: {
            main: { radius: 5, startingIndex: startingIndex },
            secondary: setSecondaryGears(
                Object.assign(options.gearSecondary, options.common)
            )
        },
        gear2: {
            main: {
                radius: 5,
                startingIndex: startingIndex + getRandomNum(0.3, 0.6, false)
            },
            secondary: setSecondaryGears(
                Object.assign(options.gearSecondary, options.common)
            )
        }
    };
};

function adapt2screen (options) {
    const screenSmallerHalf = Math.min(window.innerWidth, window.innerHeight) / 2;

    options.centerDistance.min *= screenSmallerHalf;
    options.centerDistance.max *= screenSmallerHalf;

    return options;
}

// function that generates the random options
export default function parseRandomOptions (origOptions) {
    // constants
    const sketchParam = origOptions.sketch;
    const baseColor = new HslColor(HslColor.getRandom());

    //adapt distances to screen size
    sketchParam.drawingPistons =  adapt2screen(sketchParam.drawingPistons);
    sketchParam.drawingPistons.gearSecondary = adapt2screen(
        sketchParam.drawingPistons.gearSecondary
    );

    const sketchOptions = {
        backgroundColor: baseColor.toString(),
        drawComponents: sketchParam.drawComponents,
        componentsColor: baseColor.toOpposite().toString(),
        drawingPistons:  Array.from(
            {length: getRandomNum(
                sketchParam.drawingPistons.min,
                sketchParam.drawingPistons.max
            )},
            _ => setDrawingPiston(sketchParam.drawingPistons, baseColor)
        )
    };

    return {
        canvas: origOptions.canvas,
        sketch: sketchOptions
    };
}
