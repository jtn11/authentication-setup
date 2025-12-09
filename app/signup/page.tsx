"use client"
import { useRouter } from "next/router";
import { useState } from "react";

export default function Signup(){

    const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
    });
    const router = useRouter();

    const handleSubmit = async(e : React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await fetch("/api/auth/signup" , {
            method : "POST", 
            body : JSON.stringify(form)
        })

        router.push("/signin");
    }

    return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        type="email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button type="submit">Signup</button>
    </form>
  );
}