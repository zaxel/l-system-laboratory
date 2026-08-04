import * as THREE from 'three';

export class TurtleState {
    position = new THREE.Vector3();
    heading = new THREE.Vector3(0, 1, 0);
    segments: {
        start: THREE.Vector3;
        end: THREE.Vector3;
    }[] = [];

    step(distance: number) {
        const start = this.position.clone();

        this.position.addScaledVector(this.heading, distance);
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
}