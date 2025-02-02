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

export default function HomePage() {
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
    <div className="min-h-screen bg-gradient-to-r from-gray-700 via-rose-500 to-orange-400">
      {/* Main Content */}
      <div className="pt-24 h-screen flex flex-col">
        {/* Spotify Player - 1/3 height */}
        <div className="h-1/3 px-8 pb-8 flex items-center justify-center">
          <iframe 
            src={`https://open.spotify.com/embed/playlist/7JBNZLL0Pp1Ur1ywcRNDLV?utm_source=generator&autoplay=1`}
            width="80%" 
            height="152"
            className="rounded-2xl shadow-xl w-full md:w-[80%]"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>

        {/* Swiper Slideshow - 2/3 height */}
        <div className="h-2/3 relative group">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            loop={true}
            className="h-full w-full"
          >
            {images.map((img:any, index) => (
              <SwiperSlide key={index}>
                <div className="flex items-center justify-center h-full">
                  <CldImage
                    src={img.secure_url} 
                    width={400} 
                    height={400}
                    className="object-cover rounded-2xl shadow-2xl transition-transform duration-700 hover:scale-105"
                    alt={`Slide ${index+1}`}
                  />
                </div>
              </SwiperSlide>
            ))}
            
            {/* Custom Navigation Arrows */}
            <div className="swiper-button-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 font-black hover:text-amber-500 transition-all duration-300 opacity-0 group-hover:opacity-100">
            </div>
            <div className="swiper-button-next absolute right-4 top-1/2 z-10 -translate-y-1/2 font-black hover:text-emerald-600 transition-all duration-300 opacity-0 group-hover:opacity-100">
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}