import { OrbitControls } from '@react-three/drei';

import { Lights } from './Lights';
import { Ground } from './Ground';
import { Turtle } from '../turtle/Turtle';
import { TurtleState } from '../turtle/TurtleState';
import { useMemo } from 'react';

export function Scene() {
    const turtle = useMemo(() => {
        const t = new TurtleState();
        t.step(2);

        t.branch(() => {
            t.turnLeft(Math.PI / 4);
            t.step(1);

            t.branch(() => {
                t.turnLeft(Math.PI / 6);
                t.step(0.6);
            });

            t.branch(() => {
                t.turnRight(Math.PI / 6);
                t.step(0.6);
            });
        });

        t.branch(() => {
            t.turnRight(Math.PI / 4);
            t.step(1);

            t.branch(() => {
                t.turnLeft(Math.PI / 6);
                t.step(0.6);
            });

            t.branch(() => {
                t.turnRight(Math.PI / 6);
                t.step(0.6);
            });
        });

        return t;
    }, []);


    return (
        <>
            <color attach="background" args={['#202025']} />

            <Lights />

            <Ground />

            <axesHelper args={[2]} />

            <gridHelper args={[20, 20]} />

            <OrbitControls makeDefault />

            <Turtle turtle={turtle} />
        </>
    );
}