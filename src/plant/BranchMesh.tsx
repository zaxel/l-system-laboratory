import * as THREE from 'three';

import type { Branch } from '../turtle/TurtleState';

type Props = {
    branch: Branch;
};

export function BranchMesh({ branch }: Props) {
    const direction = new THREE.Vector3()
        .subVectors(branch.end, branch.start);

    const length = direction.length();

    const midpoint = new THREE.Vector3()
        .addVectors(branch.start, branch.end)
        .multiplyScalar(0.5);

    const quaternion = new THREE.Quaternion();

    quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 1, 0),
        direction.normalize()
    );

    const junctionRadius = branch.radius * 1.15;

    return (
        <>
            <mesh
                position={midpoint}
                quaternion={quaternion}
            >
                <cylinderGeometry
                    args={[
                        branch.radius * 0.65,
                        branch.radius,
                        length,
                        8,
                    ]}
                />

                <meshStandardMaterial color="white" />
            </mesh>
            {branch.parentBranch !== undefined && (
                <mesh position={branch.start}>
                    <sphereGeometry
                        args={[
                            junctionRadius,
                            8,
                            8,
                        ]}
                    />

                    <meshStandardMaterial color="white" />
                </mesh>
            )}
        </>
    );
}