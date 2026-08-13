import type { SeededRandom } from "../random/SeededRandom";
import type { Branch } from "../turtle/TurtleState";

export interface FoliagePlacement {
    branchIndex: number;
    t: number;
    density: number;
}

export function generateFoliagePlacements(
    branches: Branch[],
    random: SeededRandom
): FoliagePlacement[] {
    const placements: FoliagePlacement[] = [];

    for (const branch of branches) {
        // For now, only branches that actually
        // have room for foliage.
        if (branch.depth < 2) {
            continue;
        }

        // Terminal branches are more likely
        // to carry foliage.
        const probability =
            branch.children.length === 0
                ? 0.9
                : 0.2;

        if (!random.chance(probability)) {
            continue;
        }

        placements.push({
            branchIndex: branch.index,
            t: random.range(0.4, 1),
            density: random.range(0.2, 1), 
        });
    }

    return placements;
}