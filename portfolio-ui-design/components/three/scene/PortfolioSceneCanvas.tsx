'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ParticleField } from '../objects/ParticleField'

interface Props {
  particleCount: number
}

export function PortfolioSceneCanvas({ particleCount }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 70 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <ParticleField count={particleCount} />
      </Suspense>
    </Canvas>
  )
}
