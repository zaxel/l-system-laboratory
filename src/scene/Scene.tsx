import * as THREE from 'three';
import { useMemo } from 'react';
import { OrbitControls, Stats } from '@react-three/drei';
import { useControls } from 'leva';

import { Lights } from './Lights';
import { Ground } from './Ground';

import { PlantRenderer } from '../plant/PlantRenderer';
import { TurtleState } from '../turtle/TurtleState';

import { TurtleInterpreter } from '../interpreter/TurtleInterpreter';

import { LSystem } from '../grammar/LSystem';
import { treeGrammar } from '../grammar/Grammar';
import { SeededRandom } from '../random/SeededRandom';

const interpreter = new TurtleInterpreter();
const lsystem = new LSystem();

export function Scene() {

    const grammarControls = useControls('Grammar', {
        iterations: {
            value: 3,
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
        showTurtle: true,
        showGrid: true,
        showAxes: true,
    });

    const randomControls = useControls('Random', {
        seed: {
            value: 12345,
            min: 0,
            max: 999999,
            step: 1,
        },
    });

    const random = useMemo(
        () => new SeededRandom(randomControls.seed),
        [randomControls.seed]
    );

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
            <Stats />

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

            <PlantRenderer
                turtle={turtleState}
                showTurtle={rendererControls.showTurtle}
                random={random}
            />
        </>
    );
}