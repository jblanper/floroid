import Sketch from './sketch.js';
import { options } from './conf.js';
import parseRandomOptions from './randomConf.js';

function main () {
    const canvas1 = document.querySelector('#canvas1');
    canvas1.width = window.innerWidth;
    canvas1.height = window.innerHeight;
    const ctx1 = canvas1.getContext('2d');

    const canvas2 = document.querySelector('#canvas2');
    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight;
    const ctx2 = canvas2.getContext('2d');

    const sketch = new Sketch(ctx1, ctx2);
    sketch.init(parseRandomOptions(options));
}

main();
