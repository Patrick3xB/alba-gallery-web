import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"

export function AutoCamera({ sceneReady }) {
  const { camera } = useThree()
  const progress = useRef(0)
  const startPos = new THREE.Vector3(0, 1.6, 4.5)
  const endPos = new THREE.Vector3(0, 1.6, 2.2) // donde termina, junto a la "mesa"

  useEffect(() => {
    if (sceneReady) progress.current = 0
  }, [sceneReady])

  useFrame((_, delta) => {
    if (!sceneReady) return
    if (progress.current < 1) {
      progress.current += delta * 0.2 // velocidad de transición
      camera.position.lerpVectors(startPos, endPos, progress.current)
      camera.lookAt(0, 1.6, 0)
    }
  })

  return null
}
