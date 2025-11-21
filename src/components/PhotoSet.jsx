export function PhotoSet({ onSelect }) {
  return (
    <div className="photo-set">
      <div className="tripod left"></div>
      <div className="tripod right"></div>
      <div className="crossbar"></div>
      <div className="backdrop">
        <h2>Museo Alba Somada</h2>
        <nav>
          <button onClick={() => onSelect("Galería")}>Galería</button>
          <button onClick={() => onSelect("Beauty Dream")}>Beauty Dream</button>
          <button onClick={() => onSelect("Warm Room")}>Warm Room</button>
          <button onClick={() => onSelect("About Me")}>About Me</button>
        </nav>
      </div>
    </div>
  )
}
