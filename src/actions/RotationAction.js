import Action from "./Action";

export default class extends Action {
    constructor(object, angle) {
        super(object);
        this.angle = angle;
    }

    run() {
        this.object.setAngle(this.angle)
    }
}