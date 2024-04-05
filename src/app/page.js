"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();

    useLayoutEffect(() => {
        if (session?.user) router.push("/dashboard");
        else router.push("/login");
    }, []);
}
