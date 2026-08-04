import * as THREE from 'three';
import { TurtleState } from './TurtleState';
import { Line } from '@react-three/drei';


type Props = {
    turtle: TurtleState;
    lineWidth: number;
    showTurtle: boolean;
};

export function TurtleRenderer({ turtle, lineWidth, showTurtle }: Props) {
    return (
        <>
            {turtle.segments.map((segment, i) => (
                <Line
                    key={i}
                    color="white"
                    points={[segment.start, segment.end]}
                    lineWidth={lineWidth}
                />
            ))}

            {showTurtle && (
                <mesh position={turtle.position}>
                    <sphereGeometry args={[0.07]} />
                    <meshStandardMaterial color="orange" />
                </mesh>)}

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