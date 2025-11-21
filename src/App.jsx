import { Canvas } from "@react-three/fiber"
import { Environment, Html } from "@react-three/drei"
import { MuseumHall } from "./components/MuseumHall"
import { Suspense, useState } from "react"
import { AutoCamera } from "./components/AutoCamera"
import { CameraTransition } from "./components/CameraTransition"
import { GalleryScene } from "./components/GalleryScene"
import { EaselLanding } from "./components/EaselLanding"
import "./index.css"

// 📸 Imágenes de galería
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

  return (
    <>
      {/* 🕰️ Pantalla de carga */}
      {!sceneReady && (
        <div className="loading-overlay">
          Abriendo las puertas de mi web...
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

        {/* 💡 Luces base */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />

        {/* 🔄 Escenas bajo Suspense */}
        <Suspense fallback={<Html center></Html>}>
          {/* 🏛️ Museo */}
          <MuseumHall onLoaded={() => setSceneReady(true)} />

          {/* 🖋️ Caballete (EaselLanding) visible solo en el hall */}
          {sceneReady && activeScene === "museum" && (
            <EaselLanding position={[0, -1.5, 0]} />
          )}

          {/* 🚀 Transición de cámara */}
          {activeScene === "transition" && (
            <CameraTransition
              activeScene="gallery"
              onSceneChange={handleSceneChange}
            />
          )}

          {/* 🖼️ Galería */}
          {activeScene === "gallery-ready" && (
            <GalleryScene images={IMAGES} insideMuseum />
          )}

          {/* 🎥 Cámara automática */}
          {activeScene === "museum" && <AutoCamera sceneReady={sceneReady} />}

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </>
  )
}
