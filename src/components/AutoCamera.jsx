import { useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"

export function AutoCamera({ sceneReady }) {
  const { camera } = useThree()
  const progress = useRef(0)

  // 🎥 Posiciones ajustadas
  const startPos = new THREE.Vector3(0, 2.4, 7.5)     // empieza más atrás y centrado
  const endPos = new THREE.Vector3(0, 1.45, 2.35)     // justo frente al lienzo
  const lookTarget = new THREE.Vector3(0, 1.0, 0)    // punto medio del lienzo

  useEffect(() => {
    if (sceneReady) {
      progress.current = 0
      camera.position.copy(startPos)
    }
  }, [sceneReady])

  useFrame((_, delta) => {
    if (!sceneReady) return
    if (progress.current < 1) {
      progress.current += delta * 0.18
      const t = Math.min(progress.current, 1)

      // easing cubic out
      const easedT = 1 - Math.pow(1 - t, 3)

      camera.position.lerpVectors(startPos, endPos, easedT)
      camera.lookAt(lookTarget)
    }
  })

  return null
}
