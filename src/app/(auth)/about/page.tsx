'use client';

import React, { useEffect, useState } from 'react';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function About() {
    const [images, setImages] = useState([]);
    const [user, setUser] = useState({
        username: "",
        email: "",
    });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const fetchImage = async (folderName: string) => {
        try {
            const res = await axios.post('/api/users/gallery', { folderName });
            if (res.data.success) {
                setImages(res.data.images);
                toast.success('Profile pictures loaded successfully');
            } else {
                toast.error('Failed to load profile pictures.');
            }
        } catch (error:any) {
            toast.error('Error fetching images');
            throw new Error(error.message);
        }
    };

    const fetchUser = async () => {
        try {
            const res = await axios.post('/api/users/about');
            if (res.data.success) {
                setUser({
                    username: res.data.data.username,
                    email: res.data.data.email,
                });
                toast.success('User details loaded!');
            } else {
                toast.error('Failed to load user details.');
            }
        } catch (error:any) {
            toast.error('Error fetching user details');
            throw new Error(error.message);
        }
    };

    useEffect(() => {
        fetchImage('profile-picture');
        fetchUser();
    }, []);

    // Slider navigation functions
    const slideLeft = () => {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
    };

    const slideRight = () => {
        setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6'>
            <motion.div 
                className='flex flex-col items-center bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className='flex items-center justify-center gap-4'>
                    {/* Left Button */}
                    {images.length > 1 && (
                        <button 
                            onClick={slideLeft} 
                            className='text-white p-2 bg-blue-900 border-2 rounded-full hover:bg-slate-200 hover:text-blue-900 hover:border-blue-900 transition-all duration-500'
                        >
                            <ChevronLeft size={20} />
                        </button>
                    )}

                    {/* Profile Picture & Upload */}
                    <div className='relative w-40 h-40 overflow-hidden rounded-full border-4 border-gray-500 bg-slate-700 hover:border-blue-500 shadow-2xl cursor-pointer'>
                        <CldUploadWidget 
                            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME_PROFILE}
                            options={{
                                cropping: true,
                                croppingAspectRatio: 1,
                                showAdvancedOptions: true,
                                singleUploadAutoClose: false,
                                folder: "profile-picture",
                                clientAllowedFormats: ["jpg", "png", "jpeg"],
                            }}
                            onUploadAddedAction={(result) => {
                                if (result.event === "success") {
                                    window.location.reload();
                                }
                            }}
                        >
                            {({ open }) => (
                                <>
                                    {images.length > 0 && (
                                        <CldImage
                                            src={images[selectedIndex].secure_url}
                                            width={200}
                                            height={200}
                                            className='object-cover w-full h-full'
                                            alt='Profile Picture'
                                        />
                                    )}
                                    {/* Upload Button Inside Picture */}
                                    <motion.div 
                                        className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity'
                                    >
                                        <button 
                                            onClick={() => open()} 
                                            className='text-black hover:text-white font-semibold px-4 py-2 bg-blue-100 rounded-full shadow-lg hover:bg-green-600 transition-all'
                                        >
                                            Upload
                                        </button>
                                    </motion.div>
                                </>
                            )}
                        </CldUploadWidget>
                    </div>

                    {/* Right Button */}
                    {images.length > 1 && (
                        <button 
                            onClick={slideRight} 
                            className='text-white p-2 bg-blue-900 border-2 rounded-full hover:bg-slate-200 hover:text-blue-900 hover:border-blue-900 transition-all duration-500'
                        >
                            <ChevronRight size={20} />
                        </button>
                    )}
                </div>

                <motion.h2 
                    className='text-2xl font-semibold mt-6'
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {user.username || "Loading..."}
                </motion.h2>
                
                <motion.hr 
                    className='w-2/3 my-4 border-gray-500'
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6 }}
                />
                
                <motion.p 
                    className='text-gray-400'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    {user.email || "Fetching email..."}
                </motion.p>

                <motion.hr 
                    className='w-2/3 my-4 border-gray-500'
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6 }}
                />

                <motion.h2 
                    className='text-2xl font-semibold'
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    ABOUT
                </motion.h2>

                <motion.p 
                    className='text-gray-300 font-medium mt-2'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                >
                    Our Meetup: 11-MAY-2034. Don't Forget!
                </motion.p>

            </motion.div>
        </div>
    );
}
