"use client";
import { useState } from "react";
import { axiosClient } from "../config";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"login" | "forgot" | "reset">("login");

const api=axiosClient
  const handleLogin = async () => {
    try {
      const res = await api.post("/login", { email, password });
      setTimeout(()=>{localStorage.setItem("token", JSON.stringify(res.data.user))

        toast.success("تم تسجيل الدخول بنجاح", {
          style: {
            color: "green",
            background: "transparent",
            backdropFilter: "blur(10px)",
            boxShadow: "0 0 2px green",
          },
        })
        if(localStorage.getItem("token")){window.location.href = "/"}
      },1000)
      
      console.log(res.data);
    } catch (err) {
      toast.error("خطأ في تسجيل الدخول");
    }
  };

  // نسيت كلمة المرور
  const handleForgot = async () => {
    try {
      const res = await api.post("/forgotPassword", { email });
      toast.success("تم إرسال كود إعادة التعيين إلى بريدك", {
        style: {
          color: "green",
          background: "transparent",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 2px green",
        },
      })
      console.log(res.data);
      setStep("reset");
    } catch (err) {
      toast.error("حدث خطأ أثناء إرسال الكود");
    }
  };

  // إعادة التعيين
  const handleReset = async () => {
    try {
      const res = await api.patch("/resetPassword", {
        email,
        resetCode: Number(resetCode), // الكود من البريد
        newPassword,
      });
      toast.success("تم إعادة تعيين كلمة المرور");
      console.log(res.data);
      setStep("login");
    } catch (err) {
      toast.error("خطأ في إعادة التعيين");
    }
  };

  return (
    <div className="flex flex-col rounded-3xl  gap-6 space-y-5 p-6 max-w-sm translate-y-20 shadow-md backdrop-blur-2xl shadow-black mx-auto  ">
      {step === "login" && (
        <div className="space-y-4">
          <h2 className=" text-center tracking-[3px] text-xl font-bold">
            Login
          </h2>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-md border-b-2 w-full p-2 rounded outline-0"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-md border-b-2 w-full p-2 rounded outline-0"
          />
          <div className="flex justify-between flex-col ">
            <button
              onClick={handleLogin}
              className=" text-white p-2 rounded-full border-2 border-blue-900/50 ring-1 ring-white/50 duration-500 hover:shadow-2xl hover:translate-y-1"
            >
              Login
            </button>
            <div className="flex justify-between flex-col">
              <div className="flex mt-2 p-2">
                <span> Don't have an account? </span>
                <Link
                  href="/Registar"
                  className="text-blue-500  cursor-pointer"
                >
                  Registar
                </Link>
              </div>
              <button
                onClick={() => setStep("forgot")}
                className="text-blue-700 cursor-pointer"
              >
                forgotPassword?
              </button>
            </div>
          </div>
        </div>
      )}

      {step === "forgot" && (
        <>
          <h2 className="text-xl font-bold">Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={handleForgot}
            className=" text-white p-2 rounded-full border-2 border-blue-900/50 ring-1 ring-white/50 duration-500 hover:shadow-2xl hover:translate-y-1"
          >
            Send Reset Code
          </button>
          <button
            onClick={() => setStep("login")}
            className="text-gray-500 underline"
          >
            back
          </button>
        </>
      )}

      {step === "reset" && (
        <>
          <h2 className="text-xl font-bold tracking-[3px] text-center">Reset Password</h2>
          <input
            type="text"
            placeholder="Enter your reset code"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={handleReset}
            className=" text-white p-2 rounded-full border-2 border-blue-900/50 ring-1 ring-white/50 duration-500 hover:shadow-2xl hover:translate-y-1"
          >
            Save
          </button>
          <button
            onClick={() => setStep("login")}
            className="text-gray-500 underline"
          >
            back
          </button>
        </>
      )}
    </div>
  );
}
