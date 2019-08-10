export const options = {
    canvas: { random: true },
    sketch: {
        drawComponents: true,
        drawingPistons: {
            min: 1,
            max: 3,
            rodLength: { min: 30 },
            lineWidth: { min: 0.3, max: 0.7 },
            centerDistance: { min: 0.5, max: 0.8 },
            sides: { min: 4, max: 12 },
            common: {
                speeds: [.03, .04, .05, .06],
                pathTypes: ["circle", "polygon", "polygon"]
            },
            gearSecondary: {
                number: { min: 2, max: 3 },
                centerDistance: { min: 0.10, max: 0.35 },
                sides: { min: 4, max: 8 }
            }
        }
    }
};
