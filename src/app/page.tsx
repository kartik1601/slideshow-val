import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-black p-8 text-white">
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 animate-fade-in-down">
          Sanctum of <span className="text-yellow-400">Splendors</span>
        </h1>
        <p className="text-2xl sm:text-4xl font-semibold text-gray-300 animate-fade-in-up">
          Gallery 
        </p>
      </div>

      {/* Image Section */}
      <div className="flex flex-wrap justify-center gap-8 mb-16">
        <div className="hover:scale-105 transform transition duration-300 animate-fade-in-left">
          <Image
            src="/cherry01.gif"
            alt="Cherry"
            width={220}
            height={220}
            className="rounded-3xl shadow-lg"
          />
        </div>
        <div className="hover:scale-105 transform transition duration-300 animate-fade-in-right">
          <Image
            src="/itp.jpeg"
            alt="ITP Electronics"
            width={220}
            height={220}
            className="rounded-3xl shadow-lg"
          />
        </div>
      </div>

      {/* Button Section */}
      <div className="flex flex-wrap gap-6 animate-fade-in">
        <Link
          href="/login"
          className="py-3 px-6 rounded-3xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg shadow-md hover:bg-gradient-to-l hover:from-blue-600 hover:to-blue-800 transform hover:scale-105 transition duration-300"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="py-3 px-6 rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-lg shadow-md hover:bg-gradient-to-l hover:from-yellow-500 hover:to-yellow-700 transform hover:scale-105 transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}