import type { TurtleState } from '../turtle/TurtleState';
import type { FoliagePlacement } from './FoliagePlacement';
import { getPointOnBranch } from '../turtle/BranchUtils';

type Props = {
    turtle: TurtleState;
    placements: FoliagePlacement[];
};

export function FoliagePlacementRenderer({
    turtle,
    placements,
}: Props) {
    return (
        <>
            {placements.map((placement) => {
                const branch =
                    turtle.branches[placement.branchIndex];

                const position = getPointOnBranch(
                    branch,
                    placement.t
                );

                const size =
                    0.08 + placement.density * 0.12;

                return (
                    <mesh
                        key={placement.branchIndex}
                        position={position}
                    >
                        <sphereGeometry
                            args={[size, 8, 8]}
                        />

                        <meshBasicMaterial
                            color="lime"
                            wireframe
                        />
                    </mesh>
                );
            })}
        </>
    );
}