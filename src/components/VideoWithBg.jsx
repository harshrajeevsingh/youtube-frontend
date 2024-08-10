import { useVideoBackground } from "../hooks/UseVideoBg";

export const VideoWithBackground = (props) => {
  const { videoRef, canvasRef } = useVideoBackground();

  return (
    <section className=" sticky lg:static top-16 w-full h-max">
      <video
        ref={videoRef}
        controls
        className="w-full aspect-video lg:rounded-xl xl:mt-7"
        {...props}
      />
      <canvas
        width="10"
        height="6"
        aria-hidden="true"
        className="absolute -top-16 left-0 -z-10 lg:w-10/12 w-full h-[900px] dark:opacity-15 opacity-30"
        ref={canvasRef}
      />
      <div className="pointer-events-none absolute -top-16 left-0 -z-10 lg:w-10/12 w-full h-[900px]">
        <div className="absolute hidden lg:block right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent dark:from-background" />
        <div className="absolute hidden lg:block bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent dark:from-background" />
        <div className="absolute left-0 top-0 w-full h-32 bg-gradient-to-b to-10% from-background to-transparent dark:from-background" />
      </div>
    </section>
  );
};
