'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { CalendarIcon, Save, ArrowLeftCircle } from 'lucide-react';

export default function AddMemory() {
    const router = useRouter();
    const [memoryData, setMemoryData] = useState({
        message: "",
        date: "",
        userId: ""
    });

    const addFunction = async () => {
        try {
            const user = await axios.post('/api/users/about');
            const updatedMemoryData = {
                ...memoryData,
                userId: user.data.data._id,
            };

            setMemoryData(updatedMemoryData);
            const res = await axios.post('/api/users/addmemories', updatedMemoryData);

            if (res.data.success) {
                toast.success("Memory added successfully");
                location.reload();
            } else {
                toast.error(`Failed adding memory. Try again + ${res.data}`);
                throw new Error(res.data);
            }
        } catch (error: any) {
            toast.error(error.message);
            throw new Error(error.message);
        }
    };

    useEffect(() => {
        const today = new Date();
        setMemoryData({
            ...memoryData,
            date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
        });
    }, []);

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white flex flex-col items-center justify-center px-6'>
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className='bg-white shadow-lg rounded-2xl p-6 w-full max-w-md'
            >
                <h1 className='text-2xl font-extrabold flex items-center gap-2 text-gray-900'>
                    <CalendarIcon className='w-6 h-6 text-rose-500' /> Add Memory
                </h1>
                <div className='flex flex-col py-4'>
                    <input
                        onChange={(e) => setMemoryData({ ...memoryData, message: e.target.value })}
                        type='text'
                        placeholder='Enter the message'
                        className='p-3 my-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900 '
                    />
                    <input
                        defaultValue={memoryData.date}
                        onChange={(e) => setMemoryData({ ...memoryData, date: e.target.value! })}
                        type='date'
                        className='p-3 my-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-gray-900'
                    />
                </div>
                <div className='flex flex-col items-center md:flex-row md:justify-between'>
                    <button 
                        onClick={addFunction}
                        className='flex items-center gap-2 mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 transition duration-300 text-white font-semibold rounded-lg shadow-lg'
                    >
                        <Save className='w-5 h-5' /> Save
                    </button>
                    <button
                        onClick={() => router.push('/calendar')}
                        className='flex items-center gap-2 mb-4 px-4 py-2 bg-green-500 hover:bg-green-600 transition duration-300 text-white font-semibold rounded-lg shadow-lg'
                    >
                        <ArrowLeftCircle className='w-5 h-5' /> Go to Calendar
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
