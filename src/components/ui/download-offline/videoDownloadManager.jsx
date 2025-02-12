import { useState, useEffect, useCallback } from 'react';
import { ArrowDownToLine, Check, Loader } from 'lucide-react';
import { Button, useDisclosure } from '@nextui-org/react';
import { toast } from 'sonner';

import { useUserStoreSelectors } from '../../../store/userSlice';
import db from '../../../helpers/db';
import CustomModal from '../modal';

const VideoDownloadManager = ({ videoData }) => {
  const user = useUserStoreSelectors.use.user();
  const [downloadStatus, setDownloadStatus] = useState('none'); // none, downloading, downloaded
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const checkDownloadStatus = useCallback(async () => {
    const downloadedVideo = await db.videos.get(videoData._id);
    setDownloadStatus(downloadedVideo ? 'downloaded' : 'none');
  }, [videoData._id]);

  useEffect(() => {
    checkDownloadStatus();
  }, [checkDownloadStatus]);

  const ensureHttpsUrl = (url) => {
    return url.replace(/^http:\/\//i, 'https://');
  };

  const downloadVideo = async () => {
    try {
      setDownloadStatus('downloading');

      // Ensure HTTPS URLs
      const secureVideoUrl = ensureHttpsUrl(videoData.videoFile.url);
      const secureThumbnailUrl = ensureHttpsUrl(videoData.thumbnail.url);

      // Download video file
      const videoResponse = await fetch(secureVideoUrl);
      if (!videoResponse.ok) {
        throw new Error(`HTTP error! status: ${videoResponse.status}`);
      }
      const videoBlob = await videoResponse.blob();

      // Validate download
      if (!videoBlob || videoBlob.size === 0) {
        throw new Error('Video download failed or incomplete.');
      }

      const contentLength = videoResponse.headers.get('Content-Length');
      if (contentLength && parseInt(contentLength, 10) !== videoBlob.size) {
        throw new Error('Video size mismatch: Download incomplete.');
      }

      // Download thumbnail
      const thumbnailResponse = await fetch(secureThumbnailUrl);
      if (!thumbnailResponse.ok) {
        throw new Error(`HTTP error! status: ${thumbnailResponse.status}`);
      }
      const thumbnailBlob = await thumbnailResponse.blob();

      // Store in IndexedDB
      await db.videos.put({
        _id: videoData._id,
        videoFile: videoBlob,
        thumbnail: thumbnailBlob,
        title: videoData.title,
        description: videoData.description,
        duration: videoData.duration,
        ownerDetails: videoData.ownerDetails,
      });

      setDownloadStatus('downloaded');
      toast.success('Download completed!');
    } catch (error) {
      console.error('Download failed:', error);
      toast.error('Download failed :(');
      setDownloadStatus('none');
    }
  };

  const deleteDownload = async () => {
    try {
      await db.videos.delete(videoData._id);
      setDownloadStatus('none');
      toast.info('Video deleted from downloads!');
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete video');
    }
  };

  const renderButton = () => {
    switch (downloadStatus) {
      case 'none':
        return (
          <Button
            isDisabled={user !== null ? false : true}
            onClick={downloadVideo}
            radius="full"
            variant="solid"
            className="bg-primary-background text-default-700 flex-shrink-0 whitespace-nowrap"
            startContent={<ArrowDownToLine size={20} strokeWidth={1.5} />}
          >
            Download
          </Button>
        );

      case 'downloading':
        return (
          <Button
            radius="full"
            variant="solid"
            className="bg-primary-background text-default-700 flex-shrink-0 whitespace-nowrap"
            startContent={
              <Loader
                size={20}
                strokeWidth={1.5}
                className="motion-safe:animate-spin"
              />
            }
          >
            Downloading
          </Button>
        );

      case 'downloaded':
        return (
          <>
            <Button
              onPress={onOpen}
              radius="full"
              variant="solid"
              className="bg-primary-background text-default-700 flex-shrink-0 whitespace-nowrap"
              startContent={<Check size={20} strokeWidth={1.5} />}
            >
              Downloaded
            </Button>
            <CustomModal
              isOpen={isOpen}
              onClose={onOpenChange}
              title="Delete video from downloads?"
              content={<p>The video won't be available to watch offline.</p>}
              onAction={deleteDownload}
            />
          </>
        );
    }
  };

  return renderButton();
};

export default VideoDownloadManager;
