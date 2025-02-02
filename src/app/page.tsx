import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black p-8 text-white">
      {/* Header Section */}
      <div className="text-center mb-16 cursor-default">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-gray-300 animate-fade-in-down tracking-wide">
          <span className="font-cursive text-blue-500">Sanctum </span> of <span className="text-pink-600">Splendors</span>
        </h1>
        <p className="text-2xl sm:text-4xl font-bold text-gray-400 animate-fade-in-up border border-gray-700 rounded-md shadow-blue-400/40 hover:text-white hover:border-gray-900">
          <span className="text-blue-600/80 font-bold">(●'◡'●) </span> 
          GLIMPSES OF US 
          <span className="text-pink-700/80 font-bold"> (❁´◡`❁)</span>
        </p>
      </div>

      {/* Image Section */}
      <div className="flex flex-wrap justify-center gap-8 mb-16">
        <div className="hover:scale-110 transform transition duration-300 animate-fade-in-left">
          <Image
            src="/av08.jpg"
            alt="female-avatar"
            width={220}
            height={220}
            className="rounded-3xl shadow-2xl border-4 border-pink-500 hover:shadow-red-500/50"
          />
        </div>
        <div className="hover:scale-110 transform transition duration-300 animate-fade-in-right">
          <Image
            src="/av02.jpg"
            alt="male-avatar"
            width={220}
            height={220}
            
            className="rounded-3xl shadow-2xl border-4 border-blue-500 hover:shadow-blue-500/50"
          />
        </div>
      </div>

      {/* Button Section */}
      <div className="flex flex-wrap gap-6 animate-fade-in">
        <Link
          href="/login"
          className="py-3 px-8 rounded-full bg-blue-500 text-white font-bold text-lg shadow-lg hover:bg-blue-600 transform hover:scale-110 transition duration-300 hover:shadow-blue-400/50 border-2 border-blue-700"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="py-3 px-8 rounded-full bg-pink-500 text-white font-bold text-lg shadow-lg hover:bg-pink-600 transform hover:scale-110 transition duration-300 hover:shadow-orange-400/50 border-2 border-red-700"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}
