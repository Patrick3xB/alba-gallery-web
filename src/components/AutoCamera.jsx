import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"

export function AutoCamera({ sceneReady }) {
  const { camera } = useThree()
  const progress = useRef(0)

  const startPos = new THREE.Vector3(0, 2.4, 7.5)
  const endPos = new THREE.Vector3(0, 1.45, 2.35)
  const lookTarget = new THREE.Vector3(0, 1.0, 0)

  useEffect(() => {
    if (sceneReady) {
      progress.current = 0
      camera.position.copy(startPos)
    }
  }, [sceneReady])

  useFrame((_, delta) => {
    if (!sceneReady) return
    if (progress.current < 1) {
      progress.current += delta * 0.4   // más rápido para no quedarse pillado
      const t = Math.min(progress.current, 1)

      // Suavidad de entrada
      const easedT = t * t

      camera.position.lerpVectors(startPos, endPos, easedT)
      camera.lookAt(lookTarget)
    }
  })

  return null
}
