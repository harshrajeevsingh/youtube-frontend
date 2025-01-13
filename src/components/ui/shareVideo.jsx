// import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { Forward, Copy } from 'lucide-react';
import {
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaEnvelope,
  FaReddit,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Link,
  Input,
} from '@nextui-org/react';

const ShareVideo = ({ videoUrl, videoTitle }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const encodedUrl = encodeURIComponent(videoUrl);
  const encodedTitle = encodeURIComponent(videoTitle);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Link copied to clipboard!');
  };

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    reddit: `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    email: `mailto:?subject=Check%20this%20video&body=${encodedTitle}%20${encodedUrl}`,
  };

  return (
    <>
      <Button
        onPress={onOpen}
        radius="full"
        variant="solid"
        className="bg-primary-background text-default-700 flex-shrink-0 whitespace-nowrap"
        startContent={<Forward size={20} strokeWidth={1.5} />}
      >
        Share
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="sm"
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Share</ModalHeader>
          <ModalBody>
            <div className="flex gap-2 justify-between">
              <Link
                href={shareLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700"
              >
                <FaFacebook size={30} />
              </Link>
              <Link
                href={shareLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-default-400"
              >
                <FaXTwitter size={30} />
              </Link>
              <Link
                href={shareLinks.reddit}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500"
              >
                <FaReddit size={30} />
              </Link>
              <Link
                href={shareLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800"
              >
                <FaLinkedin size={30} />
              </Link>
              <Link
                href={shareLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600"
              >
                <FaWhatsapp size={30} />
              </Link>
              <Link
                href={shareLinks.email}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500"
              >
                <FaEnvelope size={30} />
              </Link>
            </div>
          </ModalBody>
          <ModalFooter className="w-full flex content-center gap-2 rounded-lg shadow-md">
            <Input
              readOnly
              value={videoUrl}
              size="sm"
              fullWidth
              className="text-ellipsis"
            />

            <Button
              isIconOnly
              size="sm"
              auto
              color="primary"
              onClick={copyToClipboard}
              className="rounded-lg"
            >
              <Copy size={18} />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ShareVideo;
