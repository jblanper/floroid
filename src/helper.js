export function drawCircle (ctx, color, radius, point) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2, false);
    ctx.fill();
}

export function getRandomNum (min, max, round = true) {
    const rnd = _ => Math.random() * (max - min) + min;
    return (round)
        ? Math.floor(rnd())
        : rnd();
}
