import { useState, useEffect, useCallback } from 'react';
import { ArrowDownToLine, Check, Loader } from 'lucide-react';
import { Button, useDisclosure } from '@nextui-org/react';

import db from '../../../helpers/db';
import CustomModal from '../modal';

const VideoDownloadManager = ({ videoData }) => {
  const [downloadStatus, setDownloadStatus] = useState('none'); // none, downloading, downloaded
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const checkDownloadStatus = useCallback(async () => {
    const downloadedVideo = await db.videos.get(videoData._id);
    setDownloadStatus(downloadedVideo ? 'downloaded' : 'none');
  }, [videoData._id]);

  useEffect(() => {
    checkDownloadStatus();
  }, [checkDownloadStatus]);
  /*
  const downloadVideo = async () => {
    try {
      setDownloadStatus('downloading');

      // Download video file
      const videoResponse = await fetch(videoData.videoFile.url);
      const videoBlob = await videoResponse.blob();

      // Download thumbnail
      const thumbnailResponse = await fetch(videoData.thumbnail.url);
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
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus('none');
    }
  };
*/
  const downloadVideo = async () => {
    try {
      setDownloadStatus('downloading');

      // Download video file
      const videoResponse = await fetch(videoData.videoFile.url);
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
      const thumbnailResponse = await fetch(videoData.thumbnail.url);
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
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadStatus('none');
    }
  };

  const deleteDownload = async () => {
    try {
      await db.videos.delete(videoData._id);
      setDownloadStatus('none');
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const renderButton = () => {
    switch (downloadStatus) {
      case 'none':
        return (
          <Button
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
