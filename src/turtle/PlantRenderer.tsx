import * as THREE from 'three';

import { TurtleState } from './TurtleState';
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