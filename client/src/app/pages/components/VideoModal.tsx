import React from "react";

type VideoModalProps = {
  videoUrl: string;
  onClose: () => void;
};

const VideoModal = ({ videoUrl, onClose }: VideoModalProps) => {
  const videoId = videoUrl.split("v=")[1];
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      onClick={onClose}
    >
      <div className="bg-white p-6 rounded-lg relative w-11/12 max-w-2xl">
        <button
          className="absolute top-3 ml-auto right-3 text-2xl text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <iframe
          className="w-full  h-64 md:h-96"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          onClick={onClose}
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
};

export default VideoModal;
