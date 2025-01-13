import { Player } from '@lottiefiles/react-lottie-player';
import { Spinner } from '@nextui-org/react';

const CenteredMessage = ({ message, className = '', status }) => {
  return (
    <div
      className={`w-full md:h-screen min-h-svh grid place-content-center${className}`}
    >
      {status === 'empty' && (
        <Player
          src={'/lottie/polar-bear.json'}
          autoplay
          loop
          style={{ height: '400px', width: '400px' }}
          className="mb-4"
        />
      )}
      {status === 'loading' && <Spinner />}
      {message && (
        <p className="text-center text-xl font-semibold text-default-600 line-clamp-2 mt-1">
          {message}
        </p>
      )}
    </div>
  );
};

export default CenteredMessage;
