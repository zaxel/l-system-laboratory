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
        t.push();
        t.turn(Math.PI / 4);
        t.step(1);
        t.pop();
        t.turn(-Math.PI / 4);
        t.step(1);

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