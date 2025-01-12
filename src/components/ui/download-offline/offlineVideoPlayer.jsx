import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import db from '../../../helpers/db';

const OfflineVideoPlayer = () => {
  const { videoId } = useParams();
  const [videoData, setVideoData] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  /*
  const loadOfflineVideo = useCallback(async () => {
    try {
      const video = await db.videos.get(videoId);
      if (video) {
        setVideoData(video);
        setVideoUrl(URL.createObjectURL(video.videoFile));
      }
    } catch (error) {
      console.error('Error loading offline video:', error);
    }
  }, [videoId]);

  useEffect(() => {
    loadOfflineVideo();
  }, [loadOfflineVideo]);

  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);
  */

  const loadOfflineVideo = useCallback(async () => {
    try {
      const video = await db.videos.get(videoId);
      if (video) {
        setVideoData(video);

        // Create object URLs for video and thumbnail
        const videoBlobUrl = URL.createObjectURL(video.videoFile);

        setVideoUrl(videoBlobUrl);
      } else {
        console.error('No video found in IndexedDB for ID:', videoId);
      }
    } catch (error) {
      console.error('Error loading offline video:', error);
    }
  }, [videoId]);

  useEffect(() => {
    loadOfflineVideo();

    // Cleanup on unmount
    return () => {
      if (videoUrl) URL.revokeObjectURL(videoUrl);
    };
  }, [loadOfflineVideo, videoUrl]);

  if (!videoData || !videoUrl) {
    return <div>Loading offline video...</div>;
  }

  return (
    <div className="w-full h-svh lg:mt-4 ">
      <video
        controls
        className="aspect-video lg:rounded-xl"
        preload="auto"
        autoPlay
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="mt-4 mx-4">
        <h1 className="text-xl font-bold">{videoData.title}</h1>
        <p className="text-sm text-default-700 mt-2">
          @{videoData?.ownerDetails?.username}
        </p>
      </div>
    </div>
  );
};

export default OfflineVideoPlayer;
