'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { Menu, X, User, LogOut } from "lucide-react";

export default function Navbar() {
    const router = useRouter();
    const path = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const logout = async () => {
        try {
            const res = await axios.get('/api/users/logout');
            if (res.data.success) {
                toast.success('Logged out successfully!');
                router.push('/');
            } else {
                toast.error('Error logging out.');
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    const NavLink = ({ href, children }: { href: string; children: string }) => (
        <Link
            href={href}
            className={`px-4 py-1 rounded-lg text-md transition-all hover:scale-105 duration-300  ${
                path === href 
                ? 'text-amber-300 font-extrabold  scale-110'
                : 'font-bold text-gray-200 hover:text-white '
            }`}
        >
            {children}
        </Link>
    );

    useEffect(() => {
        setIsMenuOpen(false);
        setIsProfileOpen(false);
    }, [path])

    return (
        <nav className="fixed w-full h-14 top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10 shadow-md">
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
                {/* Left-side Navigation (Mobile: Hamburger Menu) */}
                <div className="flex items-center space-x-4">
                    <button 
                        className={`sm:hidden text-white p-2 rounded-full transition-all duration-300 hover:bg-white hover:text-black`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={20} className=""/> : <Menu size={20} className=""/>}
                    </button>
                    <div className="hidden sm:flex space-x-6">
                        <NavLink href="/home">HOME</NavLink>
                        <NavLink href="/gallery">GALLERY</NavLink>
                        <NavLink href="/calendar">CALENDAR</NavLink>
                    </div>
                </div>

                {/* Profile Icon with Dropdown */}
                <div className="relative">
                    <button 
                        className="text-white font-bold p-2 mb-2 rounded-full hover:bg-white transition-all duration-300"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                        <User size={24} className=" hover:text-black transition-all duration-300"/>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-black/90 backdrop-blur-lg border border-white/10 rounded-lg shadow-md p-2 flex flex-col">
                            <Link href="/about" className="px-4 py-4 font-bold text-gray-200 hover:text-white transition-all hover:scale-105">Profile</Link>
                            <button 
                                onClick={logout} 
                                className="flex items-center space-x-2 px-4 py-2 text-red-400 hover:text-red-500 transition-all
                                font-semibold hover:font-bold hover:scale-105"
                            >
                                <LogOut size={20} className=""/> 
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="w-40 ml-5 md:hidden flex flex-col items-center space-y-6 py-4 rounded-xl bg-black/80 backdrop-blur-lg border-2 border-white/80">
                    <NavLink href="/home">HOME</NavLink>
                    <NavLink href="/gallery">GALLERY</NavLink>
                    <NavLink href="/calendar">CALENDAR</NavLink>
                </div>
            )}
        </nav>
    );
};
