"use client";
import React, { useEffect, useState } from "react";
import MainButton from "../components/ui/MainButton";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosClient } from "../config";
import toast from "react-hot-toast";
import Link from "next/link";
import {Leaf}from "lucide-react"
export default function Page() {
  const [user, setUser] = useState<{
    id: string;
    username: string;
    email: string;
    address: string;
    phone: string;
    temp: number;
  }>({
    id: "",
    username: "Guest",
    email: "",
    address: "",
    phone: "",
    temp: 0,
  });

  const [loading, setLoading] = useState(false);

  // ✅ Schema للتحقق من البيانات
  const schema = z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    address: z.string().min(6, "Address must be at least 6 characters"),
  });

  // ✅ تهيئة useForm مع defaultValues
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  // ✅ تحميل بيانات المستخدم من localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in");
      setTimeout(() => (window.location.href = "/Registar"), 1000);
    } else {
      try {
        const u = JSON.parse(token);
        setUser(u);
        reset({
          username: u.username || "",
          email: u.email || "",
          phone: u.phone || "",
          address: u.address || "",
        });
      } catch {
        console.error("Invalid token format");
      }
    }
  }, [reset]);

  // ✅ إرسال البيانات إلى السيرفر
  const onsubmit = async (data: z.infer<typeof schema>) => {
    if (!user.id) {
      return toast.error("User ID not found, please login again!");
    }

    console.log("Data to send:", data);
    setLoading(true);

    try {
      const { data: resData } = await axiosClient.patch(
        `/update/${user.id}`,
        data
      );

      if (resData.error) return toast.error(resData.error);

      // ✅ تحديث التوكن بعد التعديل
      localStorage.setItem("token", JSON.stringify(data));

      toast.success("Account updated successfully", {
        style: {
          color: "green",
          background: "transparent",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 2px green",
        },
      });

      setTimeout(() => (window.location.href = "/"), 500);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong", {
        style: {
          color: "red",
          background: "transparent",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 2px white",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const style =
    "outline-0 h-12 border-b-2 w-full focus:border-green-900 duration-300 hover:translate-y-1 shadow-xl focus:shadow-green-900/30 bg-transparent";

  return (
    <section className="bg-white/20 bg-linear-360 to-black from-green-950 ">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover  lg:block lg:w-2/5"
          style={{ backgroundImage: `url('/tree3.jpg')` }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">              <Link href="/" className="rotate-90"><Leaf/></Link>

            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Update your profile.
            </h1>

            <form
              className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
              onSubmit={handleSubmit(onsubmit)}
            >

              <div className="col-span-2">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  User Name
                </label>
                <input
                  className={style}
                  {...register("username")}
                  type="text"
                  placeholder="Enter your user name"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Email address
                </label>
                <input
                  className={style}
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Phone Number
                </label>
                <input
                  className={style}
                  {...register("phone")}
                  type="text"
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Address
                </label>
                <input
                  className={style}
                  {...register("address")}
                  type="text"
                  placeholder="Enter your address"
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <MainButton
                disabled={loading}
                className="col-span-2 w-full rounded-3xl cursor-pointer tracking-widest"
              >
                <span>{loading ? "Updating..." : "Update"}</span>
              </MainButton>

              <p className="text-gray-500 dark:text-gray-400">
                Already have an account?
                <span className="text-green-900">
                  <Link href="/Login"> Login</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
