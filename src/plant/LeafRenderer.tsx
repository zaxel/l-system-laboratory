import { Leaf } from './Leaf';

import {
    getBranchQuaternion,
    getPointOnBranch,
} from '../turtle/BranchUtils';

import {
    getLeafPosition,
    shouldPlaceLeaf,
} from './LeafPlacement';

import type { TurtleState } from '../turtle/TurtleState';
import { SeededRandom } from '../random/SeededRandom';

type Props = {
    turtle: TurtleState;
    random: SeededRandom;
};

export function LeafRenderer({ turtle, random }: Props) {
   
    return (
        <>
            {turtle.branches
                .filter(branch => shouldPlaceLeaf(branch, random))
                .map((branch) => {
                    const t = getLeafPosition(random);

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