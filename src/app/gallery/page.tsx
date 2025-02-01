"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("/api/gallery") // Fetch images from Cloudinary
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Gallery</h1>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {images.map((img, index) => (
          <Image key={index} src={img.url} alt="Gallery" className="rounded-lg" />
        ))}
      </div>
    </div>
  );
}
