import { useEffect, useRef, useState } from "react";

export default function LoadingOverlay({ loading, onFinish }) {
  const videoRef = useRef(null);
  const [playVideo, setPlayVideo] = useState(false);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setPlayVideo(true);
        videoRef.current?.play();
      }, 150);
    }
  }, [loading]);

  const handleTimeUpdate = () => {
    const t = videoRef.current.currentTime;

    if (t >= 4 && t < 4.2) {
      document.querySelector(".loading-overlay")?.classList.add("distort");
    }

    if (t >= 4.8) {
      const overlay = document.querySelector(".loading-overlay");
      overlay?.classList.add("fade-out");

      setTimeout(() => {
        if (onFinish) onFinish();
      }, 600);
    }
  };

  return (
    <div className="loading-overlay">
      <video
        ref={videoRef}
        src="/models/First-person_POV.mp4"
        className="door-video"
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
}
