import * as THREE from 'three';

import type { Branch } from './TurtleState';

export function isTerminalBranch(branch: Branch) {
    return branch.children.length === 0;
}

export function getPointOnBranch(
    branch: Branch,
    t: number
) {
    return new THREE.Vector3().lerpVectors(
        branch.start,
        branch.end,
        THREE.MathUtils.clamp(t, 0, 1)
    );
}

export function getDirectionOnBranch(
    branch: Branch
) {
    return branch.direction.clone().normalize();
}


export function getBranchQuaternion(
    branch: Branch
) {
    const direction = branch.direction
        .clone()
        .normalize();

    return new THREE.Quaternion()
        .setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction
        );
}

export function getLeafQuaternion(
    branch: Branch,
    angle: number,
    spread: number,
    twist: number,
    droop: number,
) {
    const branchDirection =
        branch.direction.clone().normalize();

    // Find a stable vector perpendicular
    // to the branch.
    const reference = new THREE.Vector3(0, 0, 1);

    if (
        Math.abs(
            branchDirection.dot(reference)
        ) > 0.99
    ) {
        reference.set(1, 0, 0);
    }

    const side = new THREE.Vector3()
        .crossVectors(
            branchDirection,
            reference
        )
        .normalize();

    const up = new THREE.Vector3()
        .crossVectors(
            side,
            branchDirection
        )
        .normalize();

    /*
     * Start with the leaf pointing sideways
     * from the branch.
     */
    const leafDirection = side.clone();

    /*
     * Spread rotates the sideways direction
     * around the branch.
     */
    leafDirection.applyAxisAngle(
        branchDirection,
        spread
    );

    /*
     * Angle controls how much the leaf
     * follows the branch instead of pointing
     * completely sideways.
     */
    leafDirection.applyAxisAngle(
        up,
        angle - Math.PI / 2
    );

    /*
     * Droop bends the leaf toward world down.
     */
    const worldDown =
        new THREE.Vector3(0, -1, 0);

    const droopAxis = new THREE.Vector3()
        .crossVectors(
            leafDirection,
            worldDown
        )
        .normalize();

    if (droopAxis.lengthSq() > 0.0001) {
        leafDirection.applyAxisAngle(
            droopAxis,
            droop
        );
    }

    /*
     * Our leaf geometry's local X axis
     * is its length direction.
     */
    const quaternion =
        new THREE.Quaternion()
            .setFromUnitVectors(
                new THREE.Vector3(1, 0, 0),
                leafDirection
            );

    /*
     * Twist around the leaf's own direction.
     */
    const twistQuaternion =
        new THREE.Quaternion()
            .setFromAxisAngle(
                leafDirection,
                twist
            );

    quaternion.multiply(
        twistQuaternion
    );

    return quaternion;
}