export default class FileButton {
    constructor ({text, scope, prop = undefined, type = 'image'}) {
        this.scope = scope;
        this.prop = prop;
        this.type = type;

        this.text = text;
        this.fileInput = Object.assign(
            document.createElement('input'),
            {type: 'file', id: prop}
        );

        this.render();
        this.eventListener();
    }

    render () {
        const ui = document.querySelector('#ui');

        const label = Object.assign(
            document.createElement('label'),
            {textContent: this.text}
        );
        label.classList.add('file-btn');

        label.appendChild(this.fileInput);
        ui.appendChild(label);
    }

    eventListener () {
        this.fileInput.addEventListener('change', this.eventHandler.bind(this));
    }

    eventHandler (event) {
        const reader = new FileReader();

        reader.onload = file => {
            // either url or not yet parsed json
            const result = (this.type === 'json')
                ? JSON.parse(file.target.result)
                : file.target.result;

            const options = (this.prop) ? {[this.prop]: result} : result;

            this.scope.init(options);
        }

        if (this.type === 'image') reader.readAsDataURL(event.target.files[0]);
        if (this.type === 'json') reader.readAsText(event.target.files[0]);
    }
}
