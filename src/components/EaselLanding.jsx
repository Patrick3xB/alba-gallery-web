import { useGLTF, Html } from "@react-three/drei"
import { useRef, useState } from "react"

export function EaselLanding({ goToGallery, ...props }) {
  const ref = useRef()
  const { scene } = useGLTF("/models/easel.glb")
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <group ref={ref} {...props} position={[0, 1, 1]} scale={[1, 1, 1]}>
      <primitive object={scene} />

      <Html
        transform
        position={[0, 0.1, 0.08]}
        rotation={[-0.15, -0.1, 0]}
        scale={0.41}
        distanceFactor={1.5}
      >
        <div className="canvas-landing fixed-size">
          <header className="navbar">
            <div className="navbar-container">
              <h1 className="somada-signature">
                Somada <span>fotografía</span>
              </h1>

              {/* MENÚ */}
              <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
                <button onClick={goToGallery}>Fashion</button>
                <button onClick={goToGallery}>Beauty</button>
                <button onClick={goToGallery}>Brand</button>
                <button onClick={goToGallery}>Portrait</button>
              </nav>

              <div
                className={`menu-toggle ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </header>

          <main className="hero">
            <img src="/images/landing.jpg" alt="Alba Somada Fotografía" />
          </main>

          <footer className="contact">
            <h2>CONTACT</h2>
            <p>Alba Somada Obrero</p>
            <p>albasomadafotografia@gmail.com</p>
            <p>Tel: (+34) 627 87 45 33</p>
          </footer>
        </div>
      </Html>
    </group>
  )
}

useGLTF.preload("/models/easel.glb")
