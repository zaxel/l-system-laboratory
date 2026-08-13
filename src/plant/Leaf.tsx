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
        <mesh
            position={position}
            quaternion={quaternion}
        >
            <planeGeometry
                args={[length, width]}
                onUpdate={(geometry) => {
                    geometry.translate(-0.5, 0, 0);
                }}
            />
            <meshStandardMaterial
                color="green"
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}