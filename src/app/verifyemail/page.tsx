'use client'
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function VerifyEmail () {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", {token});

      setVerified(true);
      console.log("Email verified successfully.")
      toast.success("Email verified.");
      setError(false);

    } catch (error:any) {
      setError(true);
      console.log(error.message);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=")[1];
    
    // const { query } = router;
    // const urlToken = query.token;
    
    setToken(urlToken || "");
  }, []);

  // useEffect(() => {
  //   if (token.length > 0) {
  //     verifyUserEmail();
  //   }
  // }, [token]);

  return (
    <div className=''>
      <h1 className=''>Verify Email</h1>
      <h2 className=''>
        { token ? `${token}` : 'No Token'}
      </h2>

      <button
        onClick={verifyUserEmail}
      >
        Verify
      </button>

      { verified && (
        <div>
          <h2>Verified</h2>
          <Link href='/login'>Login</Link>
        </div>
      )}

      { error && (
        <div>
          <h2>Error: Token Expired.</h2>
        </div>
      )}
    </div>
  )
}