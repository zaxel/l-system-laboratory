import * as THREE from 'three';
import type { Branch } from '../turtle/TurtleState';
import { SeededRandom } from '../random/SeededRandom'; 

export interface LeafPlacement {
    branchIndex: number;
    t: number;

    angle: number;
    spread: number;
    twist: number;
    droop: number;
}

export function shouldPlaceLeaf(
    branch: Branch,
    random: SeededRandom
) {
    return (
        branch.children.length === 0 &&
        random.chance(0.8)
    );
}

export function getLeafPosition(
    random: SeededRandom
) {
    return random.range(0.7, 1);
}

export function getLeafRotation(random: SeededRandom) {
    return {
        angle: random.range(
            THREE.MathUtils.degToRad(35),
            THREE.MathUtils.degToRad(75)
        ),

        spread: random.range(
            -Math.PI,
            Math.PI
        ),

        twist: random.range(
            -0.4,
            0.4
        ),

        droop: random.range(
            -0.25,
            0.25
        ),
    };
}

export function generateLeafPlacements(
    branches: Branch[],
    random: SeededRandom
): LeafPlacement[] {
    const placements: LeafPlacement[] = [];

    for (const branch of branches) {
        if (!shouldPlaceLeaf(branch, random)) {
            continue;
        }

        const t = getLeafPosition(random);

        const {
            angle,
            spread,
            twist,
            droop,
        } = getLeafRotation(random);

        placements.push({
            branchIndex: branch.index,
            t,
            angle,
            spread,
            twist,
            droop,
        });
    }

    return placements;
}