import type { FoliagePlacement } from './FoliagePlacement';
import { SeededRandom } from '../random/SeededRandom';
import type { FoliageSettings } from '../presets/PlantPreset';

export interface ClusterLeaf {
    angle: number;
    spread: number;
    twist: number;
    droop: number;
    length: number;
    width: number;
    offset: number;
}

export function generateLeafCluster(
    placement: FoliagePlacement,
    settings: FoliageSettings,
    random: SeededRandom
): ClusterLeaf[] {
    const count = Math.max(
        1,
        Math.round(
            placement.density *
            settings.maxLeaves
        )
    );

    const leaves: ClusterLeaf[] = [];

    for (let i = 0; i < count; i++) {
        leaves.push({
            angle: random.range(
                Math.PI / 6, 
                Math.PI / 2
            ),

            twist: random.range(
                -Math.PI,
                Math.PI
            ),

            droop: random.range(
                0,
                0.4
            ),

            spread:
                (i / count) *
                settings.spread +
                random.range(-0.25, 0.25),

            length: random.range(
                settings.leafLength.min,
                settings.leafLength.max
            ),

            width: random.range(
                settings.leafWidth.min,
                settings.leafWidth.max
            ),

            offset: random.range(
                0.05,
                0.2
            ),
        });
    }

    return leaves;
}