import * as THREE from 'three';
import { Leaf } from './Leaf';

import {
    getBranchQuaternion,
    getLeafQuaternion,
    getPointOnBranch,
} from '../turtle/BranchUtils';

import type { LeafPlacement } from './LeafPlacement';
import type { TurtleState } from '../turtle/TurtleState';

type Props = {
    turtle: TurtleState;
    placements: LeafPlacement[];
};

export function LeafRenderer({ turtle, placements }: Props) {

    return (
        <>
            {placements.map(({ branchIndex, t, angle, droop, spread, twist }) => {
                const branch =
                    turtle.branches[branchIndex];

                const position = getPointOnBranch(
                    branch,
                    t
                );

                const quaternion =
                    getLeafQuaternion(
                        branch,
                        angle,
                        spread,
                        twist,
                        droop
                    );

                return (
                    <Leaf
                        key={branchIndex}
                        position={position}
                        quaternion={quaternion}
                        width={1}
                        length={0.6}
                    />
                );
            })}
        </>
    );
}