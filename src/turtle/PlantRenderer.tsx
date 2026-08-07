import * as THREE from 'three';
import { Line } from '@react-three/drei';

import { TurtleState } from './TurtleState';

type Props = {
    turtle: TurtleState;
    lineWidth: number;
    showTurtle: boolean;
};

export function PlantRenderer({
    turtle,
    lineWidth,
    showTurtle,
}: Props) {
    return (
        <>
            {turtle.branches.map((branch) => (
                <Line
                    key={branch.index}
                    points={[
                        branch.start,
                        branch.end,
                    ]}
                    color="white"
                    lineWidth={lineWidth}
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