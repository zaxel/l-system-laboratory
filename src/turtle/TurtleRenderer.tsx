import * as THREE from 'three';
import { TurtleState } from './TurtleState';
import { Line } from '@react-three/drei';


type Props = {
    turtle: TurtleState;
};

export function TurtleRenderer({turtle}: Props) {
    return (
        <>
            {turtle.segments.map((segment, i) => (
                <Line
                    key={i}
                    points={[segment.start, segment.end]}
                    color="white"
                    lineWidth={2}
                />
            ))}

            <mesh position={turtle.position}>
                <sphereGeometry args={[0.07]} />
                <meshStandardMaterial color="orange" />
            </mesh>

            <primitive
                object={
                    new THREE.ArrowHelper(
                        turtle.heading,
                        turtle.position,
                        0.5,
                        'yellow'
                    )
                }
            />
        </>
    );
}