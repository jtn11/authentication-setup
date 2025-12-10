"use client"
import { useRouter } from "next/navigation";

export default function Dashboard(){

    const router = useRouter();

    async function handleLogout (){
        await fetch("/api/auth/logout" , {
            method : "POST"
        })
        router.push("/signin")
    }
    return (
        <div>
            <h1>Dashboard Page</h1>
            <br />
            <button onClick={handleLogout}>Logout </button>
        </div>
    )
}