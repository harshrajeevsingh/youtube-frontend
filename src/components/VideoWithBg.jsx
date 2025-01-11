import { useVideoBackground } from '../hooks/UseVideoBg';

export const VideoWithBackground = ({ src }) => {
  const { videoRef, canvasRef } = useVideoBackground();

  return (
    <>
      {' '}
      <video
        ref={videoRef}
        controls
        autoPlay={true}
        className="video-container sticky lg:static w-full xl:w-4/6 top-16 aspect-video lg:rounded-xl lg:mt-4  z-20"
        src={src}
      />
      <canvas
        width="10"
        height="6"
        aria-hidden="true"
        className="absolute -top-16 lg:-left-4 left-0 -z-30 lg:w-11/12 w-full h-[900px]  dark:opacity-10 opacity-15"
        ref={canvasRef}
      />
      <div className="pointer-events-none absolute -top-16 lg:-left-4 left-0 -z-30 lg:w-11/12 w-full h-[900px]">
        <div className="absolute hidden lg:block right-0 top-0 w-32 h-full bg-gradient-to-l from-background to-transparent dark:from-background" />
        <div className="absolute  bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent dark:from-background" />
      </div>
    </>
  );
};
