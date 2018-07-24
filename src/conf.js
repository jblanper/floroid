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
            sides: { min: 3, max: 8 },
            common: {
                speeds: [0.05, 0.07, 0.09, 0.03],
                pathTypes: ["circle", "polygon", "polygon"]
            },
            gearSecondary: {
                number: { min: 2, max: 4 },
                centerDistance: { min: 0.15, max: 0.45 },
                sides: { min: 3, max: 6 }
            }
        }
    }
};
