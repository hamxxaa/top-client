import Action from "./Action";

export default class extends Action {
    constructor(object, text) {
        super(object);
        this.text = text;
    }

    run() {
        this.object.setText(this.text)
    }
}