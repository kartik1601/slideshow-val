"use client";
import axios from "axios";
import { CldImage, CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

export default function GalleryPage() {
  const path = usePathname();
  const [images, setImages] = useState([]);

  const fetchImages = async (folderName: string) => {
    try {
      const res = await axios.post('/api/users/gallery', { folderName: folderName });

      if (res.data.success) {
        setImages(res.data.images);
        toast.success("Images fetched successfully.")
      } else {
        toast.error("Failed to fetch images!");
        throw new Error("Failed to fetch images!");
      }
    } catch (error:any) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const folderName = (path === '/home') ? 'favourites' : 'personal';

    fetchImages(folderName);
  }, [path]);

  return (
    <div className="min-h-screen bg-gradient-to-t from-zinc-500 via-stone-600 to-zinc-900">
      <div className="pt-24 h-screen flex flex-col">
        <h1 className="text-xl font-md font-serif p-3 text-center text-white italic">with you,</h1>
        <h1 className="text-2xl font-bold p-3 text-center text-fuchsia-400 font-sans">The Valley of Visions</h1>

        {/* UPLOAD FROM CLOUDINARY */}
        <div className="p-2 flex justify-center items-center">
          <CldUploadButton 
            options={{ 
              multiple: true,
              sources: ['local', 'url', 'unsplash', 'camera', 'google_drive'],
            }}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!}
            className="bg-blue-700 py-2 px-3 rounded border mt-4 text-white hover:bg-sky-400 hover:text-black transition ease-in-out font-semibold font-mono"
          >
            <span>UPLOAD IMAGES</span>
          </CldUploadButton>
        </div>

        {/* IMAGES FROM CLOUDINARY */}
        <div className="flex flex-row p-5 justify-between items-end">

          <div className="grid grid-cols-3 gap-4 mt-6">
            {images.map((img:any, index) => (
              <CldImage
                key={index}
                src={img.secure_url} 
                width={400} 
                height={400}
                className="object-cover rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-125"
                alt={`Slide ${index+1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
