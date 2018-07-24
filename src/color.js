export default class HslColor {
    constructor ({h, s, l}) {
        this.original = {h, s, l};
        [this.h, this.s, this.l] = [h, s, l];
    }

    static getRandom () {
        return {
            h: getRandomNum(0, 300),
            s: getRandomNum(0, 100),
            l: getRandomNum(0, 100)
        };
    }

    reset () {
        [this.h, this.s, this.l] = this.original;
        return this;
    }

    toOpposite () {
        this.h = (this.h + 180) % 300;
        this.s = (this.s + 50) % 100;
        this.l = (this.l + 50) % 100;

        return this;
    }

    randomize ({maxH = 150, maxS = 10, maxL = 10} = {}) {
        this.h = (getRandomNum(0, maxH) + this.h) % 300;
        this.s = (getRandomNum(0, maxS) + this.s) % 100;
        this.l = (getRandomNum(0, maxL) + this.l) % 100;

        return this;
    }

    toString () {
        return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
    }

    hslToRgb() {
        // https://gist.github.com/mjackson/5311256
        let r, g, b;

        if (this.s == 0) {
            r = g = b = this.l; // achromatic
        }
        else {
            function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            const q = (this.l < 0.5)
                ? this.l * (1 + this.s)
                : this.l + this.s - this.l * this.s;

            const p = 2 * this.l - q;

            r = hue2rgb(p, q, this.h + 1/3);
            g = hue2rgb(p, q, this.h);
            b = hue2rgb(p, q, this.h - 1/3);
        }

        return {r: r * 255, g: g * 255, b: b * 255};
    }
}

function getRandomNum (min, max, round = true) {
    const rnd = _ => Math.random() * (max - min) + min;
    return (round) ? Math.floor(rnd()) : rnd();
}
