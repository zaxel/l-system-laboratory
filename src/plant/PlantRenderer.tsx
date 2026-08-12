import * as THREE from 'three';

import { TurtleState } from '../turtle/TurtleState';
import { BranchMesh } from './BranchMesh';
import { LeafRenderer } from './LeafRenderer';
import type { SeededRandom } from '../random/SeededRandom';
import type { LeafPlacement } from './LeafPlacement';

type Props = {
    turtle: TurtleState;
    showTurtle: boolean;
    leafPlacements: LeafPlacement[];
};

export function PlantRenderer({
    turtle,
    showTurtle,
    leafPlacements
}: Props) {
    return (
        <>
            {turtle.branches.map((branch) => (
                <BranchMesh
                    key={branch.index}
                    branch={branch}
                />
            ))}
            {/* terminal branches visualization */}
            {/* {turtle.branches
                .filter(isTerminalBranch)
                .map((branch) => (
                    <mesh
                        key={`tip-${branch.index}`}
                        position={branch.end}
                    >
                        <sphereGeometry args={[branch.radius * 1.5, 8, 8]} />
                        <meshStandardMaterial color="orange" />
                    </mesh>
                ))} */}

            {/* branches between edges points visualization */}
            {/* {turtle.branches.map((branch) => {
                const point = getPointOnBranch(branch, 0.7);

                return (
                    <mesh
                        key={`marker-${branch.index}`}
                        position={point}
                    >
                        <sphereGeometry
                            args={[branch.radius * 1.2, 8, 8]}
                        />

                        <meshStandardMaterial color="blue" />
                    </mesh>
                );
            })} */}

            <LeafRenderer turtle={turtle} placements={leafPlacements} />

            {showTurtle && (
                <>
                    <mesh position={turtle.position}>
                        <sphereGeometry args={[0.07]} />
                        <meshStandardMaterial color="orange" />
                    </mesh>

                    <primitive
                        object={
                            new THREE.ArrowHelper(
                                turtle.getForward(),
                                turtle.position,
                                0.5,
                                'yellow'
                            )
                        }
                    />
                </>
            )}
        </>
    );
}