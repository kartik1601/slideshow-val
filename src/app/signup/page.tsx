'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);

      console.log("Signup Success!", res.data);
      toast.success("Signup successful. Please Login");

      router.push('/login');

    } catch (error: any) {
      console.log("Signup Failed!")
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    }
  }, [user]);

  return(
    <div className=''>
      <h1>{ loading ? "Processing" : "Signup"}</h1>
      <hr/>
      
      {/* Username */}
      <label 
        className=''
        htmlFor='username'>
          Username
      </label>
      <input
        className=''
        id='username'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        type='text'
      />
      
      {/* Email */}
      <label 
        className=''
        htmlFor='email'>
          Email
      </label>
      <input
        className=''
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        type='email'
      />

      {/* Password */}
      <label 
        className=''
        htmlFor='password'>
          Password
      </label>
      <input
        className=''
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        type='password'
      />

      {!buttonDisabled && (
        <button
          onClick={onSignup}
          className=''
        >
          Sign Up  
        </button>
      )}
      <Link href='/login' className=''>Login</Link>
    </div>
  )
}