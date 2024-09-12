import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Upload, Camera } from "lucide-react";

const VideoUploadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [videoPreview, setVideoPreview] = useState(null);
  const [generatedThumbnail, setGeneratedThumbnail] = useState(null);
  const [uploadedThumbnailFile, setUploadedThumbnailFile] = useState(null); // Store the actual file
  const [uploadedThumbnailPreview, setUploadedThumbnailPreview] =
    useState(null); // For preview
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const videoRef = useRef(null);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("video", data.video[0]);

    // Check which thumbnail is selected (uploaded or generated)
    if (selectedThumbnail === generatedThumbnail) {
      const thumbnailFile = base64ToFile(
        generatedThumbnail,
        "generated-thumbnail.jpg"
      );
      formData.append("thumbnail", thumbnailFile);
    } else if (uploadedThumbnailFile) {
      formData.append("thumbnail", uploadedThumbnailFile);
    }

    // Handle form submission logic
    console.log(
      formData.get("title"),
      formData.get("description"),
      formData.get("video"),
      formData.get("thumbnail")
    );
  };

  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
      generateThumbnail(file);
    }
  };

  const generateThumbnail = (file) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);

    video.addEventListener("loadedmetadata", () => {
      const duration = video.duration;
      const captureTime = duration / 2;

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 320;
      canvas.height = 180;

      video.currentTime = captureTime;
      video.onseeked = () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const thumbnail = canvas.toDataURL();
        setGeneratedThumbnail(thumbnail);
        setSelectedThumbnail(thumbnail); // Set generated thumbnail as default
      };
    });

    video.onerror = (e) => {
      console.error("Error loading video:", e);
    };
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedThumbPreview = e.target.result;
        setUploadedThumbnailPreview(uploadedThumbPreview);
        setUploadedThumbnailFile(file); // Store the actual file
        setSelectedThumbnail(uploadedThumbPreview); // Set uploaded thumbnail as default
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              id="title"
              {...register("title", { required: "Title is required" })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter video title"
            />
            {errors.title && (
              <span className="text-red-500 text-xs italic">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              placeholder="Enter video description"
            />
          </div>
        </div>

        <div className="lg:w-1/2">
          <div className="mb-6">
            <label
              htmlFor="video"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Video
            </label>
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
              <input
                type="file"
                id="video"
                accept="video/*"
                {...register("video", { required: "Video is required" })}
                onChange={handleVideoChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {videoPreview ? (
                <div className="relative aspect-video">
                  <video
                    ref={videoRef}
                    src={videoPreview}
                    controls
                    className="w-full h-full rounded-lg"
                  />
                </div>
              ) : (
                <div className="py-12 aspect-video flex flex-col items-center justify-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Drag and drop your video here or click to select
                  </p>
                </div>
              )}
            </div>
            {errors.video && (
              <span className="text-red-500 text-xs italic">
                {errors.video.message}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Thumbnail
        </label>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Generated Thumbnail */}
          {generatedThumbnail && (
            <div
              className={`relative cursor-pointer ${
                selectedThumbnail === generatedThumbnail
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => setSelectedThumbnail(generatedThumbnail)}
            >
              <img
                src={generatedThumbnail}
                alt="Generated Thumbnail"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
          {/* Uploaded Thumbnail */}
          {uploadedThumbnailPreview && (
            <div
              className={`relative cursor-pointer ${
                selectedThumbnail === uploadedThumbnailPreview
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
              onClick={() => setSelectedThumbnail(uploadedThumbnailPreview)}
            >
              <img
                src={uploadedThumbnailPreview}
                alt="Uploaded Thumbnail"
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors aspect-video flex flex-col items-center justify-center">
            <input
              type="file"
              id="customThumbnail"
              accept="image/*"
              onChange={handleThumbnailUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
            />
            <Camera className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-2 text-xs text-gray-600">
              Upload custom thumbnail
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload Video
        </button>
      </div>
    </form>
  );
};

export default VideoUploadForm;
