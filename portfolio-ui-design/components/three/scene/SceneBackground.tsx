'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const PortfolioSceneCanvas = dynamic(
  () =>
    import('./PortfolioSceneCanvas').then((m) => ({
      default: m.PortfolioSceneCanvas,
    })),
  { ssr: false }
)

export function SceneBackground() {
  const [count, setCount] = useState(400)

  useEffect(() => {
    if (window.innerWidth < 768) setCount(180)
  }, [])

  return <PortfolioSceneCanvas particleCount={count} />
}
