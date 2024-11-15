import Action from "./Action";

export default class extends Action {
    constructor(object, x) {
        super(object);
        this.x = x;
    }

    run() {
        this.object.setcx(this.x)
    }
}