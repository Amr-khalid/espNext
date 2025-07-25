"use client";
import React from "react";
import MainButton from "../components/ui/MainButton";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { axiosClient } from "../config";
import toast from "react-hot-toast";

export default function Page() {
  const schema = z.object({
    username: z.string().min(2, "First name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    address: z
      .string()
      .min(6, "adress must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onsubmit = async (data: z.infer<typeof schema>) => {
    try {
      const { data: resData } = await axiosClient.post("/register", data);

      if (resData.error) return toast.error(resData.error);

      localStorage.setItem("token", JSON.stringify(resData.user));
      toast.success("Account created successfully", {
        style: {
          color: "green",
          background: "transparent",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 2px green",
        },
      });

      setTimeout(() => (window.location.href = "/"), 100);
      console.log(resData);
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
    }

    console.log(data);
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
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Get your free account now.
            </h1>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>

            <form
              className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
              onSubmit={handleSubmit(onsubmit)}
            >
              <div className="col-span-2">
                <label className="block mb-2  text-sm text-gray-600 dark:text-gray-200">
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

              <div className="col-span-2 md:col-span-1">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Password
                </label>
                <input
                  className={style}
                  {...register("password")}
                  type="password"
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <MainButton className="col-span-2 w-full rounded-3xl cursor-pointer tracking-widest">
                <span>Sign Up </span>
              </MainButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
