'use client';

import React, { useEffect, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function About() {
    const [images, setImages] = useState([]);
    const [user, setUser] = useState({
        username: "",
        email: "",
    });

    const fetchImage = async (folderName) => {
        try {
            const res = await axios.post('/api/users/gallery', { folderName });
            if (res.data.success) {
                setImages(res.data.images);
                toast.success('Profile picture loaded successfully');
            } else {
                toast.error('Failed to load profile picture.');
            }
        } catch (error) {
            toast.error('Error fetching image');
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
        } catch (error) {
            toast.error('Error fetching user details');
        }
    };

    useEffect(() => {
        fetchImage('profile-picture');
        fetchUser();
    }, []);

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 text-white p-6'>
            <motion.div 
                className='flex flex-col items-center bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md'
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                {images.length > 0 && (
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        className='w-40 h-40 overflow-hidden rounded-full border-4 border-gray-500 shadow-2xl'
                    >
                        <CldImage
                            src={images[0].secure_url}
                            width={200}
                            height={200}
                            className='object-cover w-full h-full'
                            alt='Profile Picture'
                        />
                    </motion.div>
                )}

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
            </motion.div>
        </div>
    );
}