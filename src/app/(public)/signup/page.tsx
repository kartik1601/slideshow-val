'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSignup = async () => {
    try {
      setError("");
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);

      console.log("Signup Success!", res.data);
      toast.success("Signup successful. Please Login");
      router.push('/login');

    } catch (error: any) {
      console.log("Signup Failed!");
      setError(error.response?.data?.error || "Signup failed. Please try again.");
      toast.error(error.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-pink-900/10">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src="/av04.avif"
              alt="Valentine's Illustration"
              fill
              sizes="100vw"
              className="rounded-2xl object-cover shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Signup Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-pink-600 mb-6 text-center md:text-left">
            {loading ? "Processing..." : "SIGN-UP"}
          </h1>
          
          {/* Form inputs remain the same */}
          {/* Username */}
          <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            type="text"
          />
          
          {/* Email */}
          <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
          />

          {/* Password */}
          <label className="block text-sm font-medium text-gray-300 mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full p-2 mb-6 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
          />

          {!buttonDisabled && (
            <button
              onClick={onSignup}
              className="w-full bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-700 transition duration-300 font-bold"
              disabled={loading}
            >
              {loading ? "Processing..." : "SIGN UP"}
            </button>
          )}

          {/* Error message display */}
          {error && (
            <div className="mt-4 text-center text-pink-400 text-sm animate-pulse">
              {error}
            </div>
          )}

          <div className="mt-4 text-center">
            <h3 className="text-pink-400">Already have an account?</h3>
            <hr className="my-2 border-pink-500/30" />
            <Link href="/login" className="text-pink-400 hover:text-pink-300 transition duration-300">
              <span className="font-bold">LOGIN</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}