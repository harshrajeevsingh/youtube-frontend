import VideoUploadForm from "../components/VideoUploadForm";

const VideoUploadPage = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upload Video</h1>
      <VideoUploadForm />
    </div>
  );
};

export default VideoUploadPage;
