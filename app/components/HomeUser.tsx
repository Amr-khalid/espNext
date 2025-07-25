"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import Effect from "./bits/Effect";
import MainButton from "./ui/MainButton";
import axios from "axios";
import { axiosClient } from "../config";
import GXY from "./bits/GXY";

// ===== دالة عامة للتعامل مع API =====
async function handelButto(
  url: string,
  type: "post" | "get" | "delete" | "put"
) {
  try {
    const res = await axios[type](url);
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error("Error:", err);
  }
}

export default function HomeUser() {
  const idAddrees = "192.168.1.4";

  const [user, setUser] = useState<{
    username: string;
    email: string;
    address: string;
    phone: string;
    temp: number;
  }>({
    username: "Guest",
    email: "",
    address: "",
    phone: "",
    temp: 0,
  });

  const [gasValue, setGasValue] = useState<number | null>(null);
  const [ledState, setLedState] = useState<string>("off");
  const [isDangerSent, setIsDangerSent] = useState(false);

  // ✅ تحسين باستخدام useMemo
  const state = useMemo(
    () => (gasValue !== null && gasValue > 700 ? "danger" : "normal"),
    [gasValue]
  );

  // ✅ fetchStatus محسّن بـ useCallback
  const fetchStatus = useCallback(async () => {
    try {
      const res = await axios.get(`http://${idAddrees}/status`);
      console.log(res.data);

      setGasValue(res.data.gas_value);
      setLedState(res.data.led);
    } catch (err) {
      console.error("Error:", err);
    }
  }, [idAddrees]);

  // ✅ handleEmail محسّن بـ useCallback
  const handleEmail = useCallback(async () => {
    try {
      await axiosClient.post("/email", {
        email: user.email,
        username: user.username,
        address: user.address,
        phone: user.phone,
      });
      toast.success("Email sent successfully", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "black",
          color: "green",
          width: "400px",
        },
      });
    } catch (err) {
      console.error("Email Error:", err);
    }
  }, [user]);

  // ===== عند تحميل الصفحة =====
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not logged in");
      setTimeout(() => (window.location.href = "/Registar"), 1000);
    } else {
      try {
        setUser(JSON.parse(token));
      } catch {
        console.error("Invalid token format");
      }
    }

    fetchStatus();
    const interval = setInterval(fetchStatus, 500); // تحديث كل نصف ثانية
    return () => clearInterval(interval);
  }, [fetchStatus]);

  // ===== مراقبة الحالة الخطرة =====
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (state === "danger" && !isDangerSent) {
      timer = setTimeout(async () => {
        try {
          setIsDangerSent(true); // منع الإرسال المتكرر
          await axios.post("http://localhost:7000/call", {
            phone: "+201024556910",
          });
          await handleEmail();

          toast.error("⚠️ Gas level is high! Please take action.", {
            duration: 5000,
            position: "bottom-center",
            style: { background: "red", color: "white", width: "400px" },
          });
        } catch (err) {
          console.error("Call API Error:", err);
          toast.error("❌ Failed to send alert call!", {
            duration: 3000,
            position: "top-center",
          });
        }
      }, 2000);
    }

    if (state === "normal") {
      setIsDangerSent(false);
      clearTimeout(timer); // إعادة السماح عند عودة الوضع الطبيعي
    }

    return () => clearTimeout(timer); // تنظيف عند تحديث أو إلغاء الـ Effect
  }, [state, isDangerSent, handleEmail]);

  return (
    <div>
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold text-center text-gray-500 mt-4">
          welcome back{" "}
          <span className="font-bold text-2xl text-white">
            {user.username || "Guest"}
          </span>
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            location.reload();
          }}
          className="rounded-xl text-2xl shadow-md shadow-black duration-500 ring-1 px-2 py-1 ring-green-900/30 hover:shadow-2xl hover:translate-y-1"
        >
          Logout
        </button>
      </div>

      {/* عرض قيمة الغاز */}
      <Effect
        className={`translate-y-30 ${
          state === "danger" ? "text-red-600" : "text-green-600"
        }`}
      >
        {gasValue !== null ? `${gasValue} ppm` : "......يتبع"} ({state})
      </Effect>
      <Effect className="translate-y-30 w-80 sm:w-full">
        Gas Sensor Reading
      </Effect>

      <div className="flex gap-4 mt-65 p-4">
        <MainButton
          className="w-full shadow-md cursor-pointer shadow-blue-600/30 bg-blue-600/10 font-bold duration-500 hover:translate-y-1"
          onClick={() => {
            handelButto(`http://${idAddrees}/led/on`, "post").then(fetchStatus);
            toast.success("LED is ON", {
              duration: 3000,
              position: "top-center",
              style: { background: "#333", color: "#fff", width: "300px" },
            });
          }}
        >
          ON
        </MainButton>

        <MainButton
          className="w-full shadow-md cursor-pointer shadow-red-600/30 bg-red-600/10 duration-500 hover:translate-y-1"
          onClick={() => {
            handelButto(`http://${idAddrees}/led/off`, "post").then(
              fetchStatus
            );
            toast.success("LED is OFF", {
              duration: 3000,
              position: "bottom-center",
              style: { background: "#333", color: "#fff", width: "300px" },
            });
          }}
        >
          OFF
        </MainButton>

        <MainButton
          className="w-full shadow-md cursor-pointer shadow-green-600/30 bg-black-600/10 duration-500 hover:translate-y-1"
          onClick={handleEmail}
        >
          Report
        </MainButton>
      </div>
      <GXY />
    </div>
  );
}
