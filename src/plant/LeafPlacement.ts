import type { Branch } from '../turtle/TurtleState';
import { SeededRandom } from '../random/SeededRandom';

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