import { useGLTF } from "@react-three/drei"
import { useEffect } from "react"

export function MuseumHall({ onLoaded }) {
  const gltf = useGLTF("/models/neoclassical_room.glb")

  useEffect(() => {
    if (gltf && onLoaded) onLoaded()
  }, [gltf, onLoaded])

  return <primitive object={gltf.scene} position={[0, 0, 0]} />
}
