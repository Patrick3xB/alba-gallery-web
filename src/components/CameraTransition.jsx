import { useThree, useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { easing } from "maath"

export function CameraTransition({ activeScene, onSceneChange }) {
  const { camera } = useThree()
  const progress = useRef(0)
  const transitionDone = useRef(false)

  // Posiciones
  const startPos = new THREE.Vector3(0, 1.6, 4.5)
  const endPos = new THREE.Vector3(2, 1.8, 2) // hacia la derecha, ligera rotación
  const endRot = new THREE.Euler(0, -Math.PI / 2.5, 0) // giro suave hacia la puerta

  useFrame((_, delta) => {
    if (transitionDone.current) return

    progress.current += delta * 0.4 // velocidad transición
    const t = Math.min(progress.current, 1)

    easing.damp3(camera.position, endPos, 0.6, delta)
    easing.dampE(camera.rotation, endRot, 0.6, delta)

    if (t >= 1 && !transitionDone.current) {
      transitionDone.current = true

      // 🔁 Espera breve para efecto cinematográfico
      setTimeout(() => {
        // Restablecer cámara al punto inicial del hall
        camera.position.copy(startPos)
        camera.rotation.set(0, 0, 0)
        onSceneChange("gallery-ready")
      }, 800)
    }
  })

  return null
}
