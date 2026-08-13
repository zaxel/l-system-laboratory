import * as THREE from 'three';

type Props = {
    position: THREE.Vector3;
    quaternion: THREE.Quaternion;
    length: number;
    width: number;
};

export function Leaf({
    position,
    quaternion,
    length = 1.2,
    width = 0.7,
}: Props) {
    return (
        <group
            position={position}
            quaternion={quaternion}
        >
            <mesh position={[0, width / 2, 0]}>
                <planeGeometry
                    args={[length, width]}
                />

                <meshStandardMaterial
                    color="green"
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}