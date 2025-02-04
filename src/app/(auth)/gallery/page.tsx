"use client";
import axios from "axios";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GalleryPage() {
  const path = usePathname();
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fetchImages = async (folderName: string) => {
    try {
      const res = await axios.post("/api/users/gallery", { folderName });
      if (res.data.success) {
        setImages(res.data.images);
        toast.success("Images fetched successfully.");
      } else {
        toast.error("Failed to fetch images!");
      }
    } catch (error:any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const folderName = path === "/home" ? "favourites" : "personal";
    fetchImages(folderName);
  }, [path]);

  const handleKeyDown = (e:any) => {
    if (selectedIndex !== null) {
      if (e.key === "ArrowRight" && selectedIndex < images.length - 1) {
        setSelectedIndex((prev) => prev + 1);
      } else if (e.key === "ArrowLeft" && selectedIndex > 0) {
        setSelectedIndex((prev) => prev - 1);
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
        <h1 className="text-3xl font-bold text-center">
          <span className="text-red-500">The </span>
          <span className="text-yellow-500">Valley </span>
          <span className="text-green-500">of </span>
          <span className="text-blue-500">Visions </span>
        </h1>
        <hr />

        {/* Upload Button */}
        <div className="flex justify-center mt-6">
          <CldUploadButton 
            options={{ multiple: true, sources: ["local", "url", "camera", "google_drive"] }}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!}
            className="bg-blue-500 text-white px-5 py-2 flex items-center gap-2 rounded-lg shadow-lg hover:bg-blue-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14m7-7H5"></path></svg>
            <span>Upload</span>
          </CldUploadButton>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 p-5">
          {images.map((img, index) => (
            <motion.div key={index} className="cursor-pointer overflow-hidden rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
              <CldImage
                src={img.secure_url}
                width={200}
                height={200}
                className="w-full h-full object-cover aspect-square"
                alt={`Image ${index + 1}`}
                onClick={() => setSelectedIndex(index)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Carousel */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <motion.img 
              src={images[selectedIndex].secure_url} 
              className="max-w-full max-h-[80%] rounded-lg shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            />
            {/* Navigation Buttons */}
            {selectedIndex > 0 && (
              <button onClick={() => setSelectedIndex((prev) => prev - 1)} className="absolute left-5 text-white bg-gray-800 p-2 rounded-full">
                <ChevronLeft size={32} />
              </button>
            )}
            {selectedIndex < images.length - 1 && (
              <button onClick={() => setSelectedIndex((prev) => prev + 1)} className="absolute right-5 text-white bg-gray-800 p-2 rounded-full">
                <ChevronRight size={32} />
              </button>
            )}
            {/* Close Overlay */}
            <div className="absolute inset-0" onClick={() => setSelectedIndex(null)}></div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
