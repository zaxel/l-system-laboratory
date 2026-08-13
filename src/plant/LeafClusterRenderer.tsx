import * as THREE from 'three';

import { Leaf } from './Leaf';

import {
    getBranchFrame,
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
                    turtle.branches[placement.branchIndex];

                const position =
                    getPointOnBranch(
                        branch,
                        placement.t
                    );

                const random = new SeededRandom(
                    seed + placement.branchIndex
                );

                const leaves =
                    generateLeafCluster(
                        placement,
                        random
                    );

                return leaves.map((leaf, index) => {
                    const quaternion =
                        getLeafQuaternion(
                            branch,
                            leaf.angle,
                            leaf.spread,
                            leaf.twist,
                            leaf.droop
                        );

                    const frame = getBranchFrame(branch);

                    const offsetDirection =
                        frame.right.clone()
                            .multiplyScalar(
                                Math.cos(leaf.spread)
                            )
                            .add(
                                frame.up.clone()
                                    .multiplyScalar(
                                        Math.sin(leaf.spread)
                                    )
                            )
                            .normalize();

                    const leafPosition =
                        position.clone()
                            .addScaledVector(
                                offsetDirection,
                                leaf.offset
                            );

                    return (
                        <Leaf
                            key={`${placement.branchIndex}-${index}`}
                            position={leafPosition}
                            quaternion={quaternion}
                            length={leaf.length}
                            width={leaf.width}
                        />
                    );
                });
            })}
        </>
    );
}