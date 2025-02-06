'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function VerifyEmail() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      setError(false);
      await axios.post("/api/users/verifyemail", { token });

      setVerified(true);
      console.log("Email verified successfully.");
      toast.success("Email verified.");
      setError(false);

    } catch (error: any) {
      setError(true);
      console.log(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  // useEffect(() => {
  //   if (token.length > 0) {
  //     verifyUserEmail();
  //   }
  // }, [token]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md transform transition-all duration-500 ">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Verify Email</h1>
        
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-lg text-gray-300 truncate">
              {token ? `Token: ${token}` : 'No Token'}
            </h2>
          </div>

          {!verified && !error && (
            <button
              onClick={verifyUserEmail}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              Verify Email
            </button>
          )}

          {verified && (
            <div className="text-center animate-fade-in">
              <h2 className="text-2xl font-semibold text-green-400 mb-4">Email Verified Successfully!</h2>
              <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                Proceed to Login
              </Link>
            </div>
          )}

          {error && (
            <div className="text-center animate-fade-in">
              <h2 className="text-2xl font-semibold text-red-400 mb-4">Error: Token Expired or Invalid</h2>
              <p className="text-gray-400">Please request a new verification link.</p>
              <button
                onClick={verifyUserEmail}
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
              >
                Resend Verification Email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}