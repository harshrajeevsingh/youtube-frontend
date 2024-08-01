import { useRef, useEffect } from "react";

export const useVideoBackground = () => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canvasRef = useRef();
  const videoRef = useRef();

  const init = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    let step;

    if (mediaQuery.matches) {
      return;
    }

    const ctx = canvas.getContext("2d");

    ctx.filter = "blur(1px)";

    const draw = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    };

    const drawLoop = () => {
      draw();
      step = window.requestAnimationFrame(drawLoop);
    };

    const drawPause = () => {
      window.cancelAnimationFrame(step);
      step = undefined;
    };

    // Initialize
    video.addEventListener("loadeddata", draw, false);
    video.addEventListener("seeked", draw, false);
    video.addEventListener("play", drawLoop, false);
    video.addEventListener("pause", drawPause, false);
    video.addEventListener("ended", drawPause, false);

    // Run cleanup on unmount event
    return () => {
      video.removeEventListener("loadeddata", draw);
      video.removeEventListener("seeked", draw);
      video.removeEventListener("play", drawLoop);
      video.removeEventListener("pause", drawPause);
      video.removeEventListener("ended", drawPause);
    };
  };

  useEffect(init, []);

  return {
    canvasRef,
    videoRef,
  };
};
