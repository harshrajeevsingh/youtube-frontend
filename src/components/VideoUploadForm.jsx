import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { Upload, PlayCircle, Camera } from "lucide-react";

const VideoUploadForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [videoPreview, setVideoPreview] = useState(null);
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const videoRef = useRef(null);

  const onSubmit = (data) => {
    console.log({ ...data, selectedThumbnail });
    // Handle form submission here
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoUrl = URL.createObjectURL(file);
      setVideoPreview(videoUrl);
      generateThumbnails(file);
    }
  };

  const generateThumbnails = (file) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.addEventListener("loadedmetadata", () => {
      const duration = video.duration;
      const thumbnailTimes = [duration * 0.25, duration * 0.5, duration * 0.75];

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = 320; // Set a fixed width for thumbnails
      canvas.height = 180; // Maintain 16:9 aspect ratio

      const generateThumbnail = (time) => {
        return new Promise((resolve) => {
          video.currentTime = time;
          video.onseeked = () => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL());
          };
        });
      };

      Promise.all(thumbnailTimes.map(generateThumbnail)).then(
        (generatedThumbnails) => {
          setThumbnails(generatedThumbnails);
          setSelectedThumbnail(generatedThumbnails[0]);
        }
      );
    });
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedThumbnail(e.target.result);
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
                <div className="py-12">
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {thumbnails.map((thumbnail, index) => (
            <div
              key={index}
              className={`relative cursor-pointer ${
                selectedThumbnail === thumbnail ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedThumbnail(thumbnail)}
            >
              <img
                src={thumbnail}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors">
            <input
              type="file"
              id="customThumbnail"
              accept="image/*"
              onChange={handleThumbnailUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
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
