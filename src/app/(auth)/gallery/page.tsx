"use client";
import axios from "axios";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Media {
  secure_url: string,
}

export default function GalleryPage() {
  const [images, setImages] = useState<Media[]>([]);
  const [videos, setVideos] = useState<Media[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mediaType, setMediaType] = useState<"images" | "videos">("images");

  const fetchMedia = async (folderName: string) => {
    try {
      const res = await axios.post("/api/users/gallery", { folderName });
      if (res.data.success) {

        if (folderName == 'personal') {
          setImages(res.data.images as Media[]);
        } else {
          setVideos(res.data.images as Media[]);
        }
        toast.success(`${mediaType === "images" ? "Images" : "Videos"} fetched successfully.`);
      } else {
        toast.error(`Failed to fetch ${mediaType}!`);
      }
    } catch (error: any) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    fetchMedia("personal");
    fetchMedia("personal-videos");
  }, []);

  const handleKeyDown = (e: any) => {
    if (selectedIndex !== null) {
      if (e.key === "ArrowRight" && selectedIndex < ((mediaType === 'images') ? images.length - 1 : videos.length - 1)) {
        setSelectedIndex((prev) => { return prev===null ? null : prev + 1; });
      } else if (e.key === "ArrowLeft" && selectedIndex > 0) {
        setSelectedIndex((prev) => { return prev===null ? null : prev - 1; });
      } else if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    }
  };

  useEffect(() => {
    if (selectedIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="pt-20 max-w-6xl mx-auto px-4">
      <h1 className="text-xl text-center italic font-thin font-sans text-slate-500">with you,</h1>
        <h1 className="text-3xl font-bold text-center mb-4">
          <span className="text-red-500">The </span>
          <span className="text-yellow-500">Valley </span>
          <span className="text-green-500">of </span>
          <span className="text-blue-500">Visions </span>
        </h1>
        <hr />

        {/* Button Group */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-4 ml-4">
            <button
              className={`px-4 py-2 rounded-full ${mediaType === "images" ? "bg-yellow-500 text-white" : "bg-gray-200"}`}
              onClick={() => setMediaType("images")}
            >
              Images
            </button>
            <button
              className={`px-4 py-2 rounded-full ${mediaType === "videos" ? "bg-red-500 text-white" : "bg-gray-200"}`}
              onClick={() => setMediaType("videos")}
            >
              Videos
            </button>
          </div>

          <CldUploadButton
            options={{ multiple: true, sources: ["local", "url", "camera", "google_drive"] }}
            uploadPreset={mediaType === 'images' ? process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME_IMAGES! : process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME_VIDEOS!}
            className="mr-5 bg-blue-500 text-white px-5 py-2 flex items-center gap-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14m7-7H5"></path>
            </svg>
            <span>Upload</span>
          </CldUploadButton>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-5">
          {(mediaType === "images" ? images : videos).map((item, index) => (
            <motion.div key={index} className="cursor-pointer overflow-hidden shadow-lg" whileHover={{ scale: 1.05 }}>
              {mediaType === "images" ? (
                <CldImage
                  src={item.secure_url}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover aspect-square"
                  alt={`Image ${index + 1}`}
                  onClick={() => setSelectedIndex(index)}
                />
              ) : (
                <video
                  src={item.secure_url}
                  className="w-full h-full object-cover aspect-square"
                  controls
                  onClick={() => setSelectedIndex(index)}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Media Carousel */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex items-center justify-center z-50 px-2">
            <div className="absolute inset-0 z-0" onClick={() => setSelectedIndex(null)}></div>
            {mediaType === "images" ? (
              <motion.img
                src={images[selectedIndex].secure_url}
                className="max-w-full max-h-[80%] rounded-lg shadow-2xl z-10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              />
            ) : (
              <motion.video
                src={videos[selectedIndex].secure_url}
                className="max-w-full max-h-[80%] rounded-lg shadow-2xl z-10"
                controls
                autoPlay
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              />
            )}
            {/* Navigation Buttons */}
            {selectedIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => { return prev===null ? null : prev+1; });
                }}
                className="absolute left-5 text-white bg-gray-800 p-3 rounded-full z-20"
              >
                <ChevronLeft size={32} />
              </button>
            )}
            {selectedIndex < ((mediaType === 'images') ? images.length - 1 : videos.length - 1) && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex((prev) => { return prev===null ? null : prev+1; });
                }}
                className="absolute right-5 text-white bg-gray-800 p-3 rounded-full z-20"
              >
                <ChevronRight size={32} />
              </button>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
