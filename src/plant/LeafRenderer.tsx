import { Leaf } from './Leaf';

import {
    getBranchQuaternion,
    getPointOnBranch,
} from '../turtle/BranchUtils';

import {
    getLeafPositionT,
    shouldPlaceLeaf,
} from './LeafPlacement';

import type { TurtleState } from '../turtle/TurtleState';

type Props = {
    turtle: TurtleState;
};

export function LeafRenderer({ turtle }: Props) {
    return (
        <>
            {turtle.branches
                .filter(shouldPlaceLeaf)
                .map((branch) => {
                    const t = getLeafPositionT();

                    const position = getPointOnBranch(
                        branch,
                        t
                    );

                    const quaternion =
                        getBranchQuaternion(branch);

                    return (
                        <Leaf
                            key={branch.index}
                            position={position}
                            quaternion={quaternion}
                            size={branch.radius * 15}
                        />
                    );
                })}
        </>
    );
}