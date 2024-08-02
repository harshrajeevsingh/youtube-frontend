import { useVideoBackground } from "../hooks/UseVideoBg";

// import "./VideoWithBackground.css";

export const VideoWithBackground = (props) => {
  const { videoRef, canvasRef } = useVideoBackground();

  //   useEffect(() => {
  //     const handleFullscreenChange = () => {
  //       const isFullscreenNow = document.fullscreenElement === videoRef.current;
  //       setIsFullscreen(isFullscreenNow);
  //     };

  //     document.addEventListener("fullscreenchange", handleFullscreenChange);

  //     return () => {
  //       document.removeEventListener("fullscreenchange", handleFullscreenChange);
  //     };
  //   }, [videoRef, canvasRef]);

  return (
    <section className="relative   my-0 max-w-7xl w-full h-full">
      {" "}
      <video
        ref={videoRef}
        controls
        className={`lg:w-[65%] md:w-[calc(100%_-_12rem)] mt-7 ml-8 aspect-video rounded-xl`} //${isFullscreen ? "p-0" : "p-20"}
        {...props}
      />
      <canvas
        width="10"
        height="6"
        aria-hidden="true"
        className="absolute -top-16 left-0 -z-10 w-10/12 h-[700px] dark:opacity-10 opacity-30"
        ref={canvasRef}
      />
      <div className="pointer-events-none absolute -top-16 left-0 -z-10 w-10/12 h-[700px]">
        <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent dark:from-background" />
        {/* <div className="absolute left-0 top-0 w-5 h-full bg-gradient-to-r  from-background to-transparent dark:from-background" /> */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent dark:from-background" />
        <div className="absolute left-0 top-0 w-full h-32 bg-gradient-to-b to-10% from-background to-transparent dark:from-background" />
      </div>
    </section>
  );
};
