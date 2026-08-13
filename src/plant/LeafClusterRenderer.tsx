import * as THREE from 'three';

import { Leaf } from './Leaf';

import {
    getLeafQuaternion,
    getPointOnBranch,
} from '../turtle/BranchUtils';

import type { TurtleState } from '../turtle/TurtleState';
import type { FoliagePlacement } from './FoliagePlacement';
import {
    generateLeafCluster,
    type ClusterLeaf,
} from './LeafCluster';

import { SeededRandom } from '../random/SeededRandom';

type Props = {
    turtle: TurtleState;
    placements: FoliagePlacement[];
    seed: number;
};

export function LeafClusterRenderer({
    turtle,
    placements,
    seed,
}: Props) {
    return (
        <>
            {placements.map((placement) => {
                const branch =
                    turtle.branches[
                        placement.branchIndex
                    ];

                const position =
                    getPointOnBranch(
                        branch,
                        placement.t
                    );

                /*
                 * Give every cluster its own
                 * deterministic random stream.
                 */
                const random = new SeededRandom(
                    seed + placement.branchIndex
                );

                const leaves =
                    generateLeafCluster(
                        placement,
                        random
                    );

                return leaves.map(
                    (leaf, index) => {
                        const quaternion =
                            getLeafQuaternion(
                                branch,
                                leaf.angle,
                                leaf.spread,
                                leaf.twist,
                                leaf.droop
                            );

                        const leafPosition =
                            position.clone();

                        return (
                            <Leaf
                                key={`${placement.branchIndex}-${index}`}
                                position={leafPosition}
                                quaternion={quaternion}
                                size={branch.radius * 15}
                            />
                        );
                    }
                );
            })}
        </>
    );
}