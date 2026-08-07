import * as THREE from 'three';
import { useMemo } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useControls } from 'leva';

import { Lights } from './Lights';
import { Ground } from './Ground';

import { TurtleRenderer } from '../turtle/TurtleRenderer';
import { TurtleState } from '../turtle/TurtleState';

import { TurtleInterpreter } from '../interpreter/TurtleInterpreter';

import { LSystem } from '../grammar/LSystem';
import { treeGrammar } from '../grammar/Grammar';

const interpreter = new TurtleInterpreter();
const lsystem = new LSystem();

export function Scene() {

    const grammarControls = useControls('Grammar', {
        iterations: {
            value: 4,
            min: 0,
            max: 8,
            step: 1,
        },
    });

    const turtleControls = useControls('Turtle', {
        step: {
            value: 0.5,
            min: 0.05,
            max: 2,
            step: 0.05,
        },

        angle: {
            value: 25,
            min: 0,
            max: 90,
            step: 1,
        },
    });

    const rendererControls = useControls('Renderer', {
        lineWidth: {
            value: 2,
            min: 1,
            max: 8,
            step: 1,
        },

        showTurtle: true,

        showGrid: true,

        showAxes: true,
    });

    const turtleState = useMemo(() => {

        const turtle = new TurtleState();

        const commands = lsystem.expand(
            treeGrammar,
            grammarControls.iterations
        );

        interpreter.execute(
            commands,
            turtle,
            {
                step: turtleControls.step,
                angle: THREE.MathUtils.degToRad(
                    turtleControls.angle
                ),
            }
        );

        return turtle;

    }, [
        grammarControls.iterations,
        turtleControls.step,
        turtleControls.angle,
    ]);

    return (
        <>
            <color attach="background" args={['#202025']} />

            <Lights />

            <Ground />

            {rendererControls.showAxes && (
                <axesHelper args={[2]} />
            )}

            {rendererControls.showGrid && (
                <gridHelper args={[20, 20]} />
            )}

            <OrbitControls makeDefault />

            <TurtleRenderer
                turtle={turtleState}
                lineWidth={rendererControls.lineWidth}
                showTurtle={rendererControls.showTurtle}
            />
        </>
    );
}