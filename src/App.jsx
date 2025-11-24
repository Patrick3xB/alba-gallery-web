import { Canvas } from "@react-three/fiber"
import { Environment, Html } from "@react-three/drei"
import { MuseumHall } from "./components/MuseumHall"
import { Suspense, useState } from "react"
import { AutoCamera } from "./components/AutoCamera"
import { CameraTransition } from "./components/CameraTransition"
import { GalleryScene } from "./components/GalleryScene"
import { EaselLanding } from "./components/EaselLanding"
import LoadingOverlay from "./components/LoadingOverlay"

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
  const [showOverlay, setShowOverlay] = useState(true)
  const [flash, setFlash] = useState(false)

  // 🚀 Cuando termina la transición
  const handleSceneChange = (next) => {
    if (next === "gallery-ready") setActiveScene("gallery-ready")
    if (next === "museum") setActiveScene("museum")
  }

  return (
    <>
      {/* 🕰️ Intro de puerta */}
      <LoadingOverlay
        loading={!sceneReady}
        onFinish={() => {
          setShowOverlay(false)

          // ✨ Flash blanco suave
          setFlash(true)
          setTimeout(() => setFlash(false), 350)

          // Volvemos al museo para ver el caballete
          setActiveScene("museum")
        }}
      />

      {/* ✨ Flash blanco encima del canvas */}
      {flash && <div className="screen-flash"></div>}

      {/* 🎥 Canvas principal */}
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ fov: 65, near: 0.1, far: 50, position: [0, 1.6, 4.5] }}
      >
        <color attach="background" args={["#191920"]} />
        <fog attach="fog" args={["#191920", 0, 15]} />

        {/* 💡 Luces */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={2} castShadow />

        <Suspense fallback={<Html center></Html>}>

          {/* 🏛️ Museo */}
          <MuseumHall onLoaded={() => setSceneReady(true)} />

          {/* 🖼️ Landing en el caballete */}
          {sceneReady && !showOverlay && activeScene === "museum" && (
            <EaselLanding
              position={[0, -1.5, 0]}
              goToGallery={() => setActiveScene("transition")}
            />
          )}

          {/* 🚀 Transición hacia galería */}
          {activeScene === "transition" && (
            <CameraTransition
              activeScene="gallery"
              onSceneChange={handleSceneChange}
            />
          )}

          {/* 🎨 Galería final */}
          {activeScene === "gallery-ready" && (
            <GalleryScene images={IMAGES} insideMuseum />
          )}

          {/* 🎥 AutoCamera SOLO cuando overlay no está */}
          {activeScene === "museum" && !showOverlay && (
            <AutoCamera sceneReady={sceneReady} />
          )}

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </>
  )
}
