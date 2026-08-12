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