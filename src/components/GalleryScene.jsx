import * as THREE from "three"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { Image, Text, useCursor } from "@react-three/drei"
import { easing } from "maath"
import getUuid from "uuid-by-string"

const GOLDENRATIO = 1.61803398875

export function GalleryScene({ images, insideMuseum = false }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(null)
  useCursor(!!hovered)

  return (
    <group ref={groupRef} position={insideMuseum ? [0, 0, -3] : [0, -0.5, 0]}>
      {/* Marcos a la izquierda */}
      {images.slice(0, 3).map((url, i) => (
        <Frame key={url} url={url} position={[-2.5, 0, i * 2 - 2]} rotation={[0, Math.PI / 2.2, 0]} />
      ))}
      {/* Marcos a la derecha */}
      {images.slice(2).map((url, i) => (
        <Frame key={url} url={url} position={[2.5, 0, i * 2 - 2]} rotation={[0, -Math.PI / 2.2, 0]} />
      ))}
    </group>
  )
}

function Frame({ url, position, rotation, ...props }) {
  const image = useRef()
  const frame = useRef()
  const [hovered, hover] = useState(false)
  const [rnd] = useState(() => Math.random())
  const name = getUuid(url)

  useFrame((state, dt) => {
    image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
    easing.damp3(
      image.current.scale,
      [0.85 * (hovered ? 0.9 : 1), 0.9 * (hovered ? 0.9 : 1), 1],
      0.1,
      dt
    )
    easing.dampC(frame.current.material.color, hovered ? "orange" : "white", 0.1, dt)
  })

  return (
    <group position={position} rotation={rotation} {...props}>
      <mesh
        onPointerOver={(e) => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
        <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
      </mesh>
      <Text
        maxWidth={0.1}
        anchorX="left"
        anchorY="top"
        position={[0.55, GOLDENRATIO, 0]}
        fontSize={0.03}
      >
        {name.split("-").join(" ")}
      </Text>
    </group>
  )
}
