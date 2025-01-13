import { Image, Button, useDisclosure } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import CustomModal from '../modal';
import { Trash } from 'lucide-react';
import { formatDuration } from '../../../helpers/formatVideoDuration';

const DownloadedVideoCard = ({ data, action, onNavigate }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="px-3 md:px-0 flex items-center justify-between gap-4 mb-5">
      <div className="flex-shrink-0">
        <Button
          onPress={() => onOpen()}
          isIconOnly
          radius="full"
          variant="solid"
          size="sm"
          className="bg-primary-background text-default-700 whitespace-nowrap"
        >
          <Trash size={20} strokeWidth={1.5} />
        </Button>
        <CustomModal
          isOpen={isOpen}
          onClose={onOpenChange}
          title="Delete video from downloads?"
          content={<p>The video won't be available to watch offline.</p>}
          onAction={() => {
            action();
          }}
        />
      </div>
      <Link to={onNavigate} className="flex gap-3 flex-1">
        <div className="relative md:w-3/12 w-5/12 aspect-video">
          <Image src={URL.createObjectURL(data?.thumbnail)} />
          <div
            className={`absolute bottom-2 right-2 px-1 bg-black/55 z-10 rounded-md text-default dark:text-primary-foreground`}
          >
            {formatDuration(data?.duration)}
          </div>
        </div>
        <div className="md:w-9/12 w-7/12">
          <p className="text-large font-medium leading-snug text-default-600 line-clamp-2">
            {data?.title}
          </p>
          <p className="text-sm text-default-500 line-clamp-2 pt-1">
            {data?.ownerDetails?.username}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default DownloadedVideoCard;
