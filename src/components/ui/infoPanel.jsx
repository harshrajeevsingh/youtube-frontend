// components/ui/InfoPanel.jsx
import { Image } from '@nextui-org/react';

const InfoPanel = ({ title, user, itemCount, thumbnail }) => {
  return (
    <div className="md:w-[28%] w-full md:p-7 p-4 md:rounded-2xl bg-gradient-to-t from-[#020024] via-[#3d0979] to-[#00d4ff]">
      <div className="relative rounded-lg mb-8">
        <Image src={thumbnail} alt="Thumbnail" />
        <img
          src={thumbnail}
          alt="Thumbnail Bg"
          className="absolute -bottom-9 blur-xl"
        />
      </div>
      <h3 className="text-2xl font-semibold md:mb-5 mb-2">{title}</h3>
      <p className="text-lg font-semibold mb-1">{user}</p>
      <p className="text-sm text-default-600 font-semibold">
        {itemCount} videos
      </p>
    </div>
  );
};

export default InfoPanel;
