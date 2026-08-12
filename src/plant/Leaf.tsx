import * as THREE from 'three';

type Props = {
    position: THREE.Vector3;
    quaternion: THREE.Quaternion;
    size?: number;
};

export function Leaf({
    position,
    quaternion,
    size = 0.5,
}: Props) {
    return (
        <mesh
            position={position}
            quaternion={quaternion}
            scale={[size, size, size]}
        >
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial
                color="green"
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}