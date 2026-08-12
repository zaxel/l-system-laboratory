import * as THREE from 'three';

import { isTerminalBranch, TurtleState } from './TurtleState';
import { BranchMesh } from './BranchMesh';

type Props = {
    turtle: TurtleState;
    showTurtle: boolean;
};

export function PlantRenderer({
    turtle,
    showTurtle,
}: Props) {
    return (
        <>
            {turtle.branches.map((branch) => (
                <BranchMesh
                    key={branch.index}
                    branch={branch}
                />
            ))}

            {turtle.branches
                .filter(isTerminalBranch)
                .map((branch) => (
                    <mesh
                        key={`tip-${branch.index}`}
                        position={branch.end}
                    >
                        <sphereGeometry args={[branch.radius * 1.5, 8, 8]} />
                        <meshStandardMaterial color="orange" />
                    </mesh>
                ))}

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