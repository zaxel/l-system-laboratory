import * as THREE from 'three';

import type { Branch } from './TurtleState';

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

    return (
        <mesh
            position={midpoint}
            quaternion={quaternion}
        >
            <cylinderGeometry
                args={[
                    branch.radius,
                    branch.radius,
                    length,
                    8,
                ]}
            />

            <meshStandardMaterial color="white" />
        </mesh>
    );
}