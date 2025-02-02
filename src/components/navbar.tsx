'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function Navbar() {
    const router = useRouter();
    const path = usePathname();

    const logout = async () => {
        try {
            const res = await axios.get('/api/users/logout');

            if (res.data.success) {
                toast.success('Logged out successfully!');
                router.push('/');
            } else {
                toast.error('Error logging out.');
            }
        } catch (error:any) {
            toast.error(error.message);
            throw new Error(error.message);
        }
    }

    const NavLink = ({href, children}: {href: string, children: string}) => (
        <Link
            href={href}
            className={`px-3 py-2 rounded-md text-sm font-md transition-all duration-300 hover:scale-105 ${
                path === href 
                ? 'text-pink-500 shadow-xl scale-110 font-bold border-b-2 border-l-2 border-rose-300'
                : 'text-gray-200 hover:text-white hover:font-bold'
            }`}
        >
            {children}
        </Link>
    );

    return(
        <nav className="fixed w-full top-0 z-50 bg-black/30 backdrop-blur-lg border-b border-white/75">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex space-x-8">
                        <NavLink href="/home">HOME</NavLink>
                        <NavLink href="/gallery">GALLERY</NavLink>
                        <NavLink href="/calendar">CALENDAR</NavLink>
                    </div>
                    <button 
                        onClick={logout}
                        className="font-bold px-4 py-2 bg-red-500/90 hover:bg-red-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    )
};