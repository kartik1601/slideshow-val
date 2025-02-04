"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function CalendarPage() {
  const path = usePathname();

  const today = new Date(2023, 7, 10);
  const [date, setDate] = useState(
    `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
  );

  const [memoryExists, setMemoryExists] = useState(false);
  const [allDates, setAllDates] = useState([]);
  const [data, setData] = useState({
    createdById: "",
    updatedById: "",
    memories: [],
  });

  const fetchMemory = async () => {
    try {
      setMemoryExists(false);
      const res = await axios.post("/api/users/fetch-single-memory", { date });

      if (res.data.success) {
        setMemoryExists(true);
        setData({
          createdById: res.data.memory.createdById,
          updatedById: res.data.memory.updatedById,
          memories: res.data.memory.data,
        });

        toast.success("Memory fetched successfully");
      } else {
        setMemoryExists(false);
        toast.error("No memory found.");
      }
    } catch (error: any) {
      setMemoryExists(false);
      toast.error("Error fetching memory");
    }
  };

  const fetchAllDates = async () => {
    try {
      const res = await axios.post('/api/users/fetch-all-memories');

      console.log(res);

      if (res.data.success) {
        setAllDates(res.data.res);
        console.log(res.data.res);
        toast.success("Fetched successfully");
      } else {
        toast.error("Problem in Fetching data.");
      }

    } catch (error:any) {
      toast.error(error.message);
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    fetchMemory();
  }, [date]);

  useEffect(() => {
    if(path === '/calendar'){
      fetchAllDates();
    }
  }, [path]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-24 flex flex-col md:flex-row items-center w-auto md:w-full max-w-5xl justify-between"
      >
        <div className="ml-2 md:w-1/2 w-full px-4 md:px-0">
          <h1 className="text-3xl font-extrabold flex items-center gap-2">
            <CalendarIcon className="w-7 h-7 text-rose-500" /> Memories Calendar
          </h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-6 bg-white/10 backdrop-blur-lg shadow-lg rounded-2xl p-5 w-full max-w-md flex items-center justify-center"
          >
            <Calendar
              onChange={(newDate) => {
                const strDate = new Date(Number(newDate?.valueOf()));
                const validDate = `${strDate.getFullYear()}-${String(strDate.getMonth() + 1).padStart(2, "0")}-${String(strDate.getDate()).padStart(2, "0")}`;
                
                setDate(validDate);
              }}
              defaultActiveStartDate={new Date(2023, 7, 10)}
              minDate={new Date(2023, 7, 10)}
              maxDate={new Date(2025, 6, 14)}
              value={date}
              className="w-full rounded-lg text-black font-extrabold border-none outline shadow-lg p-5 transition-all duration-300"
              tileClassName={({ date }) => {
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
                return allDates.some(d => d.date.split("T")[0] === formattedDate) 
                  ? "bg-slate-700 text-blue-500  overline hover:no-underline hover:bg-gray-900 hover:text-amber-500"
                  : "text-gray-300 font-md hover:text-green-500 transition-all duration-200";
              }}
            />

          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 w-full max-w-md flex justify-center items-center"
          >
            <Link
              href="/addmemories"
              className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 transition duration-300 text-white font-semibold rounded-lg shadow-lg"
            >
              <PlusCircle className="w-5 h-5" /> Add Memory
            </Link>
          </motion.div>
        </div>

        <div className="mr-2 mb-5 md:w-1/2 w-full px-4 md:px-0 md:pl-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 w-full max-w-md"
          >
            <h1 className="text-3xl font-black text-center">Memory Details</h1>
            <hr />
            {!memoryExists ? (
              <p className="text-gray-300 text-center mt-3">No memory found for this date.</p>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-gray-700 p-5 rounded-lg mt-4 shadow-md"
              >
                <p className="text-sm text-gray-300">
                  Created by: <span className="font-bold text-white">{data.createdById}</span>
                </p>
                
                <ul className="mt-3 space-y-2">
                  {data.memories.map((msg: string, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="text-gray-100 bg-gray-800 p-2 rounded-md"
                    >
                      {msg}
                    </motion.li>
                  ))}
                </ul>

                <p className="mt-4 text-sm text-gray-300">
                  Updated by: <span className="font-bold text-white">{data.updatedById}</span>
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
