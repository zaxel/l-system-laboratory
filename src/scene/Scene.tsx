import { OrbitControls } from '@react-three/drei';

import { Lights } from './Lights';
import { Ground } from './Ground';

export function Scene() {
    return (
        <>
            <color attach="background" args={['#202025']} />

            <Lights />

            <Ground />

            <axesHelper args={[2]} />

            <gridHelper args={[20, 20]} />

            <OrbitControls makeDefault />
        </>
    );
}