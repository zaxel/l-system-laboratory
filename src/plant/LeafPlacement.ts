import type { Branch } from '../turtle/TurtleState';
import { SeededRandom } from '../random/SeededRandom';

export interface LeafPlacement {
    branchIndex: number;
    t: number;
    roll: number;
    tilt: number;
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
        roll: random.range(-Math.PI, Math.PI),
        tilt: random.range(-0.4, 0.4),
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

        const position = getLeafPosition(random);
        const rotation = getLeafRotation(random);

        placements.push({
            branchIndex: branch.index,
            t: position,
            roll: rotation.roll,
            tilt: rotation.tilt,
        });
    }

    return placements;
}