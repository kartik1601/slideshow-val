import { ReactNode } from "react";
import Navbar from "@/components/navbar";

export default function Layout({children}: { children: ReactNode }) {
    return(
        <div>
            <Navbar/>
            <div>
                {children}
            </div>
        </div>
    );
}