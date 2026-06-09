'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// cyber-blue: #00e5ff, cyber-purple: #8b5cf6
const CYBER_BLUE: [number, number, number] = [0, 0.898, 1]
const CYBER_PURPLE: [number, number, number] = [0.545, 0.361, 0.965]

export function ParticleField({ count = 400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 24
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10

      const [r, g, b] = Math.random() > 0.38 ? CYBER_BLUE : CYBER_PURPLE
      col[i * 3]     = r
      col[i * 3 + 1] = g
      col[i * 3 + 2] = b
    }

    return [pos, col]
  }, [count])

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.012
    ref.current.rotation.x += delta * 0.004
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        vertexColors
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}
