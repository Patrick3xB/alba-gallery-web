import { useGLTF } from "@react-three/drei"

export function MuseumHall({ onLoaded }) {
  const { scene } = useGLTF("/models/neoclassical_room.glb", true)

  // Notificar cuando se haya cargado completamente
  if (onLoaded) onLoaded()

  return <primitive object={scene} position={[0, 0, 0]} />
}
