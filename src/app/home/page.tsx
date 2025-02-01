"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const favoriteImages = ["/image1.jpg", "/image2.jpg", "/image3.jpg"];

export default function HomePage() {
  const router = useRouter();

  const logout = async () => {
    try {
      const res = await axios.get('/api/users/logout');

      if (res.data.success) {
        toast.success('Logged out successfully!');
        console.log(res.data);
        router.push('/');
      } else {
        toast.error('Error logging out!');
        console.log(res);
      }

    } catch (error:any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  return (
    <div className="p-6">
      <nav>
        <button 
          onClick={logout} 
          className="p-2 rounded-lg bg-red-500 text-white "
        >
          Logout
        </button>
      </nav>
      <h1 className="text-2xl font-bold">Ours Forever</h1>

      {/* Spotify Embed */}
      <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1EJCdBEXAoXxuJ?utm_source=generator" width="100%" height="160" loading="lazy"></iframe>
      
      {/* Slideshow */}
      <Swiper pagination={{ clickable: true }} className="mt-6">
        {favoriteImages.map((img, index) => (
          <SwiperSlide key={index}>
            <Image src={img} width={50} height={50} className="rounded-lg" alt="Favorite" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}