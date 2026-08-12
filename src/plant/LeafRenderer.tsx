import * as THREE from 'three';
import { Leaf } from './Leaf';

import {
    getBranchQuaternion,
    getPointOnBranch,
} from '../turtle/BranchUtils';

import type { LeafPlacement } from './LeafPlacement';
import type { TurtleState } from '../turtle/TurtleState';

type Props = {
    turtle: TurtleState;
    leafPlacements: LeafPlacement[];
};

export function LeafRenderer({ turtle, leafPlacements }: Props) {

    return (
        <>
            {leafPlacements.map(({ branchIndex, roll, t, tilt }) => {
                const branch =
                    turtle.branches[branchIndex];

                const position = getPointOnBranch(
                    branch,
                    t
                );

                const quaternion =
                    getBranchQuaternion(branch);

                const rollQuaternion =
                    new THREE.Quaternion().setFromAxisAngle(
                        new THREE.Vector3(0, 1, 0),
                        roll
                    );
                const tiltQuaternion =
                    new THREE.Quaternion().setFromAxisAngle(
                        new THREE.Vector3(1, 0, 0),
                        tilt
                    );

                quaternion.multiply(
                    rollQuaternion
                );

                quaternion.multiply(
                    tiltQuaternion
                );

                return (
                    <Leaf
                        key={branchIndex}
                        position={position}
                        quaternion={quaternion}
                        size={branch.radius * 15}
                    />
                );
            })}
        </>
    );
}