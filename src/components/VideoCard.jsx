import { useVideoBackground } from "../hooks/UseVideoBg";

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
    <section className="relative max-w-7xl w-full h-max">
      {" "}
      <video
        ref={videoRef}
        controls
        // className={`md:static fixed top-16 left-0 right-0 lg:w-[60%] xl:w-[65%] lg:mt-7 lg:ml-8 aspect-video md:rounded-xl`}
        // className={`md:static fixed top-16 left-0 right-0 lg:w-[65%]  lg:mt-7 lg:ml-8 aspect-video md:rounded-xl`}
        {...props}
      />
      <canvas
        width="10"
        height="6"
        aria-hidden="true"
        className="absolute -top-16 left-0 -z-10 lg:w-10/12 w-full h-[700px] dark:opacity-10 opacity-30"
        ref={canvasRef}
      />
      <div className="pointer-events-none absolute -top-16 left-0 -z-10 lg:w-10/12 w-full h-[700px]">
        <div className="absolute hidden lg:block right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent dark:from-background" />
        <div className="absolute hidden lg:block left-0 top-0 w-14 h-full bg-gradient-to-r from-background to-transparent dark:from-background" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent dark:from-background" />
        <div className="absolute left-0 top-0 w-full h-32 bg-gradient-to-b to-10% from-background to-transparent dark:from-background" />
      </div>
    </section>
  );
};
