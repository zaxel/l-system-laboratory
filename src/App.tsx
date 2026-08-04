import './App.css'
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import { Scene } from './scene/Scene';

function App() {

  return (
    <>
      <Canvas
        camera={{
          position: [0, 3, 8],
          fov: 50,
        }}
      >
        <Scene />
      </Canvas>

      <Leva collapsed={false} />
    </>
  )
}

export default App
