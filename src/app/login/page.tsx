'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Resend } from 'resend';
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    // const resend = new Resend(`${process.env.RESEND_API!}`);

    const [user, setUser] = useState({
        email: "",
        password: "",
        otp: "",
    });
    
    const [otp, setOtp] = useState("");
    const [otpButton, setOtpButton] = useState(false);
    const [verifyButton, setVerifyButton] = useState(false);
    const [disableResend, setDisableResend] = useState(false);
    const [error, setError] = useState(false);

    const sendOtp = async () => {
        try {
            setVerifyButton(true);
            setDisableResend(true);
    
            {/* Send OTP Verification */}
            const otpCode = Math.floor(100000 + Math.random() * 900000);

            {/* Axios post request */}
            const updatedUser = { ...user, otp: otpCode.toString() };
            
            const res = await axios.post("/api/users/otp", updatedUser);
            
            setUser(updatedUser);

            if (res.data.success){
                toast.success("OTP Sent successfully!");
                console.log(res.data);
    
                setTimeout(() => setDisableResend(false), 180000); // 3 minutes

            } else {
                setVerifyButton(false);
                setDisableResend(false);
                setError(true);
                console.log(res);
            }

            // const res = await sendOtpEmail({email: user.email, otpCode});
    
            // const res = await resend.emails.send({
            //     from: 'SLDVAL <val@resend.dev>',
            //     to: user.email,
            //     subject: 'OTP for Verification',
            //     html: `<h1>Use the following OTP for verification:</h1> </br> <h2>${otpCode}</h2>`
            // });
    
            // console.log(res);

        } catch (error:any) {
            setVerifyButton(false);
            setDisableResend(false);
            setError(true);
            setTimeout(() => location.reload(), 10000); // 10 seconds
            throw new Error(error.message);
        }
    }
    
    const verifyOtp = async () => {
        try {
            if (otp === user.otp) {
                await axios.post("/api/users/login", user);
                router.push('/home');
                toast.success("Login Successful")

            } else {
                toast.error("Incorrect OTP.")
            }

        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 ) {
            setOtpButton(true);
        } else {
            setOtpButton(false);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold">
                Login
            </h1>
            <input
                type="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                className="p-2 border border-gray-300 rounded-md mt-4"
            />
            <input
                type="password"
                placeholder="Enter Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value})}
                className="p-2 border border-gray-300 rounded-md mt-4"
            />

            {otpButton && !error && (
                <button
                    onClick={() => sendOtp()}
                    disabled={disableResend}
                    className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-4 ${disableResend ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white" }` }
                >
                    {verifyButton ? ( disableResend ? "Resend OTP (Wait...)" : "Resend OTP" ) : "Send OTP"}
                </button>
            )}

            {verifyButton && (
                <div className="flex flex-col ">
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        maxLength={6}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            if (val.length <= 6) {
                                setOtp(val);
                            }
                        }}
                        className="p-2 border rounded-md mt-4 border-green-500"
                    />
                    <button
                        onClick={() => verifyOtp()}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
                    >
                        Verify
                    </button>
                </div>
            )}

            {error && (
                <button className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 cursor-not-allowed">
                    Unauthorized
                </button>
            )}


        </div>
    );
}