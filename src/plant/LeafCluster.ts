import type { FoliagePlacement } from './FoliagePlacement';
import { SeededRandom } from '../random/SeededRandom';

export interface ClusterLeaf {
    angle: number;
    spread: number;
    twist: number;
    droop: number;
    length: number;
    width: number;
}

export function generateLeafCluster(
    placement: FoliagePlacement,
    random: SeededRandom
): ClusterLeaf[] {
    const count = Math.max(
        1,
        Math.round(placement.density * 6)
    );

    const leaves: ClusterLeaf[] = [];

    for (let i = 0; i < count; i++) {
        leaves.push({
            angle: random.range(
                Math.PI / 6,
                Math.PI / 2
            ),

            spread:
                (i / count) * Math.PI * 2 +
                random.range(-0.25, 0.25),

            twist: random.range(
                -Math.PI,
                Math.PI
            ),

            droop: random.range(
                0,
                0.4
            ),

            length: random.range(
                0.7,
                1.2
            ),

            width: random.range(
                0.35,
                0.65
            ),
        });
    }

    return leaves;
}