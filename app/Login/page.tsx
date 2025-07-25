"use client";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MainButton from "../components/ui/MainButton";
import { Link } from "lucide-react";

export default function page() {
  const Schema=z.object({
    email:z.string().email("Invalid email address"),
    password:z.string().min(6,"Password must be at least 6 characters"),
  })
  const {register,handleSubmit,formState:{errors}}=useForm<z.infer<typeof Schema>>({resolver:zodResolver(Schema)})
  const onsubmit=(data:z.infer<typeof Schema>)=>{
    console.log(data);
    
  }
  return (
    <form className="flex flex-col m-auto shadow-md shadow-black backdrop-blur-2xl w-[350px]  sm:w-[400px] p-6 sm:rounded-3xl  gap-6 translate-y-40" onSubmit={handleSubmit(onsubmit)}>
      <label htmlFor="email"> Email</label>
      <input
        type="text"
        id="email"
        {...register("email")}
        placeholder="example@gmail.com"
        className="h-12 border-b-2 outline-0"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      <label htmlFor="Password"> Password</label>
      <input
        type="text"
        id="Password"
        {...register("password")}
        className="h-12 border-b-2 outline-0"
        placeholder="***********"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <Link href="/register" className="text-blue-500 hover:underline "><button>
        <p className="text-white">Don't have an account? Register</p>
    </button>  </Link>
      
      <MainButton className="cursor-pointer hover:bg-white/10 tracking-[2px]">Submit</MainButton>
      
    </form>
  );
}
