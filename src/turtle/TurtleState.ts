import * as THREE from 'three';

export interface TurtleSnapshot {
    position: THREE.Vector3;
    rotation: THREE.Quaternion;

    radius: number;
    depth: number;
    parentBranch?: number;
}

export interface Branch {
    index: number;

    start: THREE.Vector3;
    end: THREE.Vector3;

    direction: THREE.Vector3;
    
    radius: number;
    depth: number;
    length: number;
    
    parentBranch?: number;
    children: number[];
}

export class TurtleState {
    private stack: TurtleSnapshot[] = [];

    position = new THREE.Vector3();
    rotation = new THREE.Quaternion();
    
    radius = 0.2;
    radiusDecay = 0.75;
    depth = 0;

    parentBranch?: number;
    branches: Branch[] = [];

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
        const end = this.position.clone();
        const index = this.branches.length;

        this.position.addScaledVector(forward, distance);
        
        const branch: Branch = {
            index,
            start,
            end,

            radius: this.radius,
            depth: this.depth,
            length: distance,

            direction: forward.clone(),

            parentBranch: this.parentBranch,
            children: [],
        };

        this.branches.push(branch);

        if (this.parentBranch !== undefined) {
            this.branches[this.parentBranch].children.push(index);
        }

        this.parentBranch = index;
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

            radius: this.radius,
            depth: this.depth,

            parentBranch: this.parentBranch,
        });
        this.depth++;
        this.radius *= this.radiusDecay;
    }

    pop() {
        const state = this.stack.pop();
        if (!state) return;

        this.position.copy(state.position);
        this.rotation.copy(state.rotation);
        
        this.radius = state.radius;
        this.depth = state.depth;

        this.parentBranch = state.parentBranch;
    }
    reset(){
        this.stack.length = 0;
        this.branches.length = 0;

        this.position.set(0, 0, 0);
        this.rotation.identity();

        this.radius = 0.2;
        this.depth = 0;
        this.parentBranch = undefined;
    }
}