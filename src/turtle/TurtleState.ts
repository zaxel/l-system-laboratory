import * as THREE from 'three';

export interface TurtleSnapshot {
    rotation: THREE.Quaternion;
    position: THREE.Vector3;
}

export class TurtleState {
    private stack: TurtleSnapshot[] = [];
    position = new THREE.Vector3();
    rotation = new THREE.Quaternion();
    heading = new THREE.Vector3(0, 1, 0);
    segments: {
        start: THREE.Vector3;
        end: THREE.Vector3;
    }[] = [];

    private getForward() {
        return new THREE.Vector3(0, 1, 0)
            .applyQuaternion(this.rotation);
    }

    private getRight() {
        return new THREE.Vector3(1, 0, 0)
            .applyQuaternion(this.rotation);
    }

    private getUp() {
        return new THREE.Vector3(0, 0, 1)
            .applyQuaternion(this.rotation);
    }

    private rotate(axis: THREE.Vector3, angle: number) {
        const q = new THREE.Quaternion();

        q.setFromAxisAngle(axis, angle);

        this.rotation.multiply(q);
    }

    step(distance: number) {
        const forward = this.getForward();

        const start = this.position.clone();

        this.position.addScaledVector(forward, distance);

        this.segments.push({
            start,
            end: this.position.clone(),
        });
    }

    turn(angle: number) {
        this.heading.applyAxisAngle(
            new THREE.Vector3(0, 0, 1),
            angle
        );
    }

    turnLeft(angle: number) {
        this.rotate(this.getUp(), angle);
    }

    turnRight(angle: number) {
        this.rotate(this.getUp(), -angle);
    }

    pitch(angle: number) {
        this.rotate(this.getRight(), angle);
    }

    roll(angle: number) {
        this.rotate(this.getForward(), angle);
    }

    branch(callback: () => void) {
        this.push();
        callback();
        this.pop();
    }

    push() {
        this.stack.push({
            position: this.position.clone(),
            rotation: this.rotation.clone(),
        });
    }

    pop() {
        const state = this.stack.pop();

        if (!state) return;

        this.position.copy(state.position);
        this.rotation.copy(state.rotation);
    }
}