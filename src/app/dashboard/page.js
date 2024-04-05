"use client";

import { useSession } from "next-auth/react";
function DashBoard() {
    return (
        <>
            <div className="min-h-full w-full flex justify-center items-center">
                <p className="text-2xl font-bold text-[#6e7377]">HỌC KÌ II NĂM HỌC 2023-2024</p>
            </div>
        </>
    );
}

export default DashBoard;
