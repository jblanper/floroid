export default class ToggleButton {
    constructor ({text, scope, prop, toggleValue = true}) {
        this.scope = scope;
        this.prop = prop;

        this.btn = Object.assign(
            document.createElement('button'),
            {textContent: text, id: prop}
        );

        this.toggleValue = toggleValue;
        this.btn.classList.add('toggle');

        this.render();
        this.eventListener();
    }

    render () {
        const div = document.querySelector('#ui');

        div.appendChild(this.btn);
    }

    eventListener () {
        this.btn.addEventListener('click', this.eventHandler.bind(this));
    }

    eventHandler (event) {
        this.btn.classList.toggle('deactivated');

        this.toggleValue = !this.toggleValue;
        this.scope[this.prop] = this.toggleValue;
    }
}
