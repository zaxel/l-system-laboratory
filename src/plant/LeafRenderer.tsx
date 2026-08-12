import { Leaf } from './Leaf';

import {
    getBranchQuaternion,
    getPointOnBranch,
    isTerminalBranch,
} from '../turtle/BranchUtils';

import type { TurtleState } from '../turtle/TurtleState';

type Props = {
    turtle: TurtleState;
};

export function LeafRenderer({ turtle }: Props) {
    return (
        <>
            {turtle.branches
                .filter(isTerminalBranch)
                .map((branch) => {
                    const position = getPointOnBranch(
                        branch,
                        1
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