import Vector from './vector.js';
import DrawingPiston from './cycloidComponents.js';
import Menu from './ui/menu.js';
import ToggleButton from './ui/toggleButton.js';
import FileButton from './ui/fileButton.js';
import DownloadButton from './ui/downloadButton.js';
import PlayButton from './ui/playButton.js';
import Description from './ui/description.js';

export default class Sketch {
    constructor (ctx1, ctx2) {
        this.ctx1 = ctx1;
        this.ctx2 = ctx2;
        this.origin = new Vector(ctx1.canvas.width / 2, ctx1.canvas.height / 2);
    }

    init (options) {
        // options
        this.jsonOptions = JSON.stringify(options, null);

        this.backgroundColor = options.sketch.backgroundColor;
        this.drawComponents = options.sketch.drawComponents;
        this.componentsColor = options.sketch.componentsColor;

        // add to origin to center attribute of common
        this.drawingPistons = options.sketch.drawingPistons.map(dp => {
            if (!dp.common.center) {
                dp.common.center = {currentPosition: this.origin};
            }

            const drawingPiston = new DrawingPiston(dp);
            const previousPenPoint = drawingPiston.penPoint.copy();
            return {
                drawingPiston: drawingPiston,
                previousPenPoint: previousPenPoint
            };
        });

        this.setBindings();

        // setup canvases
        this.setupCanvas1();
        this.setupCanvas2();

        // initial draw
        this.draw();
    }

    setBindings () {
        this.menu = new Menu({scope: this, shouldUpdate: false});

        this.description = new Description(
            'Floroid', [
            `A crazy reinterpretation of the spirograph toy.`,
            `Press "play" to begin the animation. every "gear" that moves \
            the pen can be turned off.`,
            `There is always a random design with each page refresh. \
            The parameters of a specific design can be downloaded and \
            later uploaded to the page. Enjoy!`
        ]);

        this.menu.addSeparator();

        this.playBtn = new PlayButton({playText: 'play', stopText: 'stop', scope: this});

        this.gearsBtn = new ToggleButton({
            text: 'gears', scope: this, prop: 'drawComponents'
        });

        this.menu.addSeparator();

        this.uploadJsonBtn = new FileButton({
            text: 'up JSON', scope: this, type: 'json'
        });

        this.getJsonBtn = new DownloadButton({
            text: 'get JSON', scope: this, prop: 'json'
        });

        this.getImgBtn = new DownloadButton({
            text: 'get IMG', scope: this, prop: 'png' 
        });

        this.menu.addSignature();
    }

    get json () {
        return "data:text/json;charset=utf-8," + this.jsonOptions;
    }

    get png () {
        const cachedCanvasCtx = Object.assign(
            document.createElement('canvas'),
            {width: this.ctx1.canvas.width, height: this.ctx1.canvas.height}
        ).getContext('2d');

        // draw both canvases into cacheCanvas
        cachedCanvasCtx.drawImage(this.ctx1.canvas, 0, 0);
        cachedCanvasCtx.drawImage(this.ctx2.canvas, 0, 0);

        return cachedCanvasCtx.canvas.toDataURL('image/png');
    }

    setupCanvas1 () {
        this.ctx1.fillStyle = this.backgroundColor;
        this.ctx1.fillRect(0, 0, this.ctx1.canvas.width, this.ctx1.canvas.height);
    }

    setupCanvas2 () {
        this.ctx2.strokeStyle = this.componentsColor;
        this.ctx2.lineWidth = 2;
    }

    clean (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    
    draw () {
        this.clean(this.ctx2);

        this.drawingPistons.forEach(dp => {
            if (this.drawComponents) dp.drawingPiston.draw(this.ctx2);

            // drawing
            this.ctx1.strokeStyle = dp.drawingPiston.penColor;
            this.ctx1.lineWidth = dp.drawingPiston.lineWidth;

            this.ctx1.beginPath();
            this.ctx1.moveTo(dp.previousPenPoint.x, dp.previousPenPoint.y);
            this.ctx1.lineTo(
                dp.drawingPiston.penPoint.x,
                dp.drawingPiston.penPoint.y);
            this.ctx1.stroke();
        });
    }

    update () {
        this.drawingPistons.forEach(dp => {
            dp.previousPenPoint = dp.drawingPiston.penPoint.copy();
            dp.drawingPiston.update();
        });
    }
};
