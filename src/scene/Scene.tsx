import { OrbitControls } from '@react-three/drei';

import { Lights } from './Lights';
import { Ground } from './Ground';
import { TurtleRenderer } from '../turtle/TurtleRenderer';
import { TurtleState } from '../turtle/TurtleState';
import { useMemo } from 'react';
import { TurtleInterpreter } from '../interpreter/TurtleInterpreter';
import { simpleTree } from '../presets/simpleTree';

export function Scene() {
    
    const interpreter = new TurtleInterpreter();

    const turtle = useMemo(() => {
        const t = new TurtleState();

        interpreter.execute( simpleTree, t);

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

            <TurtleRenderer turtle={turtle} />
        </>
    );
}