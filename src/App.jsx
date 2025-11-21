import { Canvas } from "@react-three/fiber"
import { Environment, Html } from "@react-three/drei"
import { MuseumHall } from "./components/MuseumHall"
import { Suspense, useState } from "react"
import { AutoCamera } from "./components/AutoCamera"
import { CameraTransition } from "./components/CameraTransition"
import { PhotoSet } from "./components/PhotoSet"
import { GalleryScene } from "./components/GalleryScene"
import "./index.css"

// 📸 Usa tus propias imágenes reales (ya optimizadas)
const IMAGES = [
  "https://plus.unsplash.com/premium_photo-1710965560034-778eedc929ff?q=70&w=1600&fm=webp&auto=format",
  "https://plus.unsplash.com/premium_photo-1710965560034-778eedc929ff?q=70&w=1600&fm=webp&auto=format",
  "https://plus.unsplash.com/premium_photo-1710965560034-778eedc929ff?q=70&w=1600&fm=webp&auto=format",
  "https://plus.unsplash.com/premium_photo-1710965560034-778eedc929ff?q=70&w=1600&fm=webp&auto=format",
  "https://plus.unsplash.com/premium_photo-1710965560034-778eedc929ff?q=70&w=1600&fm=webp&auto=format"
]

export default function App() {
  const [sceneReady, setSceneReady] = useState(false)
  const [activeScene, setActiveScene] = useState("museum")

  // 🚀 Maneja el cambio de escena al terminar la transición
  const handleSceneChange = (next) => {
    if (next === "gallery-ready") setActiveScene("gallery-ready")
  }

  // 🎬 Cuando se pulsa una opción del set
  const handleSelect = (option) => {
    if (option === "Galería") {
      setActiveScene("transition")
    }
  }

  return (
    <>
      {/* 🕰️ Pantalla de carga */}
      {!sceneReady && (
        <div className="loading-overlay">
          Abriendo las puertas del museo...
        </div>
      )}

      {/* 🎥 Canvas principal */}
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ fov: 65, near: 0.1, far: 50, position: [0, 1.6, 4.5] }}
      >
        <color attach="background" args={["#191920"]} />
        <fog attach="fog" args={["#191920", 0, 15]} />

        {/* Luces base */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />

        {/* 🔄 Escenas bajo Suspense */}
        <Suspense fallback={<Html center>Cargando escena...</Html>}>

          {/* 🏛️ Museo siempre visible */}
          <MuseumHall onLoaded={() => setSceneReady(true)} />

          {/* 🚀 Transición de cámara */}
          {activeScene === "transition" && (
            <CameraTransition
              activeScene="gallery"
              onSceneChange={handleSceneChange}
            />
          )}

          {/* 🖼️ Galería dentro del museo */}
          {activeScene === "gallery-ready" && (
            <GalleryScene images={IMAGES} insideMuseum />
          )}

          {/* 🎥 Cámara automática solo en la intro */}
          {activeScene === "museum" && <AutoCamera sceneReady={sceneReady} />}

          <Environment preset="city" />
        </Suspense>
      </Canvas>

      {/* 🎬 Set fotográfico con menú (solo al inicio) */}
      {sceneReady && activeScene === "museum" && (
        <PhotoSet onSelect={handleSelect} />
      )}
    </>
  )
}
