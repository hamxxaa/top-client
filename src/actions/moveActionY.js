import Action from "./Action";

export default class extends Action {
    constructor(object, y) {
        super(object);
        this.y = y;
    }

    run() {
        this.object.setcy(this.y)
    }
}