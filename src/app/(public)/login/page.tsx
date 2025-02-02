'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();

    const [user, setUser] = useState({ email: "", password: "", otp: "" });
    const [otp, setOtp] = useState("");
    const [otpButton, setOtpButton] = useState(false);
    const [verifyButton, setVerifyButton] = useState(false);
    const [disableResend, setDisableResend] = useState(false);
    const [error, setError] = useState(false);

    const sendOtp = async () => {
        try {
            setVerifyButton(true);
            setDisableResend(true);
            const otpCode = Math.floor(100000 + Math.random() * 900000);

            const updatedUser = { ...user, otp: otpCode.toString() };
            
            const res = await axios.post("/api/users/otp", updatedUser);

            setUser(updatedUser);

            if (res.data.success) {
                toast.success("OTP Sent successfully!");
                setTimeout(() => setDisableResend(false), 60000);
            } else {
                setVerifyButton(false);
                setDisableResend(false);
                setError(true);
            }
        } catch (error:any) {
            setVerifyButton(false);
            setDisableResend(false);
            setError(true);
            setTimeout(() => location.reload(), 10000);
            console.log(error.message);
        }
    };

    const verifyOtp = async () => {
        try {
            const res = await axios.post("/api/users/login", user);
            if (res.data.success) {
                router.push('/home');
                toast.success("Login Successful");
            } else {
                toast.error("Incorrect OTP.");
            }
        } catch (error) {
            toast.error("Login failed.");
        }
    };

    useEffect(() => {
        setOtpButton(user.email.length > 0 && user.password.length > 0);
    }, [user]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-red-200 via-rose-400 to-pink-600 text-white p-6">
            <div className="w-full max-w-5xl flex flex-col md:flex-row shadow-xl rounded-3xl overflow-hidden backdrop-blur-lg bg-opacity-70 bg-gray-600 transition-all duration-500">
                {/* Login Section */}
                <div className="md:w-1/2 flex flex-col justify-center p-10 shadow-2xl">
                    <h1 className="text-5xl font-extrabold text-white mb-6 text-center">LOGIN</h1>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={user.email}
                        onChange={(e) => setUser({...user, email: e.target.value})}
                        className="w-full p-4 border border-gray-600 rounded-xl bg-gray-800 text-white focus:border-pink-500 focus:ring focus:ring-pink-300 transition duration-300"
                    />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={user.password}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                        className="w-full p-4 border border-gray-600 rounded-xl bg-gray-800 text-white mt-4 focus:border-pink-500 focus:ring focus:ring-pink-300 transition duration-300"
                    />
                    {otpButton && !error && (
                        <button
                            onClick={sendOtp}
                            disabled={disableResend}
                            className={`w-full py-4 mt-6 font-bold rounded-xl transition duration-300 shadow-lg ${disableResend ? "bg-gray-600 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600 text-white hover:shadow-pink-400/50 transform hover:scale-105"}`}
                        >
                            {verifyButton ? (disableResend ? "Resend OTP (Wait...)" : "Resend OTP") : "Send OTP"}
                        </button>
                    )}
                    {verifyButton && (
                        <div className="flex flex-col mt-4">
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]{6}"
                                maxLength={6}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                className="w-full p-4 border rounded-xl bg-gray-800 text-white border-green-500 focus:border-green-500 focus:ring focus:ring-green-300 transition duration-300"
                            />
                            <button
                                onClick={verifyOtp}
                                className="w-full py-4 mt-4 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:bg-green-600 transform hover:scale-105 transition duration-300 hover:shadow-green-400/50"
                            >
                                Verify OTP
                            </button>
                        </div>
                    )}
                    {error && (
                        <button className="w-full py-4 mt-4 bg-red-500 text-white font-bold rounded-xl shadow-lg cursor-not-allowed">
                            Unauthorized
                        </button>
                    )}
                    <button
                        onClick={() => router.push('/signup')}
                        className="w-full py-4 mt-6 bg-blue-500 text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transform hover:scale-105 transition duration-300 hover:shadow-blue-400/50"
                    >
                        Sign Up
                    </button>
                </div>
                {/* Image Section */}
                <div className="md:w-1/2 relative flex items-center justify-center p-6">
                    <Image src="/av05.avif" alt="Valentine's Illustration" width={600} height={600} className="rounded-2xl object-cover shadow-2xl transition-transform duration-500 hover:scale-105" />
                </div>
            </div>
        </div>
    );
}
