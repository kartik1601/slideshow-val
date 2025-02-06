"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { CldImage } from 'next-cloudinary';
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";

interface Image {
  secure_url: string,
}

export default function HomePage() {
  const path = usePathname();
  const [images, setImages] = useState<Image[]>([]);

  const fetchImages = async (folderName: string) => {
    try {
      const res = await axios.post('/api/users/gallery', { folderName: folderName });

      if (res.data.success) {
        setImages(res.data.images as Image[]);
        toast.success("Images fetched successfully.");
      } else {
        toast.error("Failed to fetch images!");
        throw new Error("Failed to fetch images!");
      }
    } catch (error: any) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    const folderName = path === "/home" ? "favourites" : "personal";
    fetchImages(folderName);
  }, [path]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-300 via-amber-400 to-rose-300 text-white">
      <div className="pt-16 px-1 flex flex-col items-center justify-center space-y-5">
        <motion.h1
          className="text-4xl sm:text-5xl font-extrabold tracking-tight px-5 flex flex-wrap justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Our <span className="text-pink-700 ml-2">Cupid Space</span>
        </motion.h1>

        {/* Spotify Player */}
        <motion.div
          className="w-full max-w-lg rounded-2xl shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <iframe
            src="https://open.spotify.com/embed/playlist/7JBNZLL0Pp1Ur1ywcRNDLV?utm_source=generator&autoplay=1"
            width="100%"
            height="152"
            className="w-full rounded-2xl"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </motion.div>

        {/* Swiper Slideshow */}
        <motion.div
          className="w-full max-w-4xl h-72 relative"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={true}
            loop={true}
            className="h-full w-full"
          >
            {images.map((img: any, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center h-full">
                  <CldImage
                    src={img.secure_url}
                    width={400}
                    height={400}
                    className="w-[400px] h-[250px]  object-cover overflow-hidden rounded-2xl shadow-md hover:scale-105 transition-transform duration-700"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </div>
  );
}
