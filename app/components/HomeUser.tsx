"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import Effect from "./bits/Effect";
import MainButton from "./ui/MainButton";
import axios from "axios";
import { axiosClient } from "../config";
import Particles from "../Login/Particles";
import Link from "next/link";
import { LogOut, Power, PowerOff, Mail } from "lucide-react";

const BACKEND_URL = "https://esp32express-production.up.railway.app";

// ✅ دالة عامة للتعامل مع API
async function handleButton(
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
  const [user, setUser] = useState({
    username: "Guest",
    email: "",
    address: "",
    phone: "",
    temp: 0,
  });

  const [gasValue, setGasValue] = useState<number | null>(null);
  const [ledState, setLedState] = useState<string>("off");
  const [isDangerSent, setIsDangerSent] = useState(false);
  const [idAddress, setIdAddress] = useState(
    "https://dad773c0a325.ngrok-free.app"
  );

  const state = useMemo(
    () => (gasValue !== null && gasValue > 400 ? "danger" : "normal"),
    [gasValue]
  );

  const fetchStatus = useCallback(async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/?url=${idAddress}`);
      console.log(res.data);
      setGasValue(res.data.gas_value);
      setLedState(res.data.led);
    } catch (err) {
      console.error("Error:", err);
    }
  }, [idAddress]);

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
        style: { background: "black", color: "green", width: "400px" },
      });
    } catch (err) {
      console.error("Email Error:", err);
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUrl = localStorage.getItem("esp_url");

    if (storedUrl) {
      setIdAddress(storedUrl); // ✅ استرجاع العنوان المحفوظ
    }
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
    const interval = setInterval(fetchStatus, 500);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (state === "danger" && !isDangerSent) {
      timer = setTimeout(async () => {
        setIsDangerSent(true);
        await axios.post(`${BACKEND_URL}/call`, {
          phone: "+201024556910",
        });
        await handleEmail();
        toast.error("⚠️ Gas level is high! Please take action.", {
          duration: 5000,
          position: "bottom-center",
          style: { background: "red", color: "white", width: "400px" },
        });
      }, 2000);
    }

    if (state === "normal") {
      setIsDangerSent(false);
      if (timer) clearTimeout(timer);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [state, isDangerSent, handleEmail]);

  const screenX = typeof window !== "undefined" ? window.innerWidth : 1024;

  return (
    <div className="overflow-hidden">
      <div
        style={{
          width: "100%",
          height: "100vh",
          position: "absolute",
          overflow: "hidden",
          zIndex: -1,
        }}
      >
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={900}
          particleSpread={10}
          speed={1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <div className="flex justify-between w-full backdrop-blur-3xl">
        <Link href={"/profile"}>
          <h1 className="text-lg sm:text-2xl font-bold text-center text-gray-500 mt-4">
            <span className="font-bold text-2xl text-white">
              {user?.username ?? "Guest"}
            </span>
          </h1>
        </Link>

        <button
          aria-label="Logout"
          onClick={() => {
            localStorage.removeItem("token");
            location.reload();
          }}
          className="rounded-full bg-black text-white/80 sm:text-2xl shadow-md shadow-black duration-500 ring-1 px-2 py-1 ring-green-900/30 hover:shadow-2xl hover:translate-y-1"
        >
          <LogOut />
        </button>
      </div>

      <input
        className="outline-0 shadow-2xl w-[100%] mt-4 m-auto sm:w-[80%] shadow-white/50 hover:shadow-md duration-300 rounded-2xl h-8"
        type="text"
        placeholder="ENTER YOUR CONNECTION ID"
        value={idAddress} // ✅ ربط القيمة بالحالة
        onChange={(e) => {
          const newAddress = e.target.value;
          setIdAddress(newAddress);
          localStorage.setItem("esp_url", newAddress); // ✅ حفظ في localStorage
          setTimeout(() => {
            toast.success("IP Address updated successfully", {
              duration: 3000,
              position: "top-center",
              style: { background: "#333", color: "#fff", width: "300px" },
            });
            fetchStatus();
          }, 1000);
        }}
      />

      <Effect
        {...(screenX < 840
          ? { w: "2rem", h: "4rem" }
          : { w: "8rem", h: "6rem" })}
        enableHover={true}
        hoverIntensity={0.5}
        className={`translate-y-30 mr-4 w-24 sm:w-80 ${
          state === "danger" ? "text-red-600" : "text-green-600"
        }`}
      >
        {gasValue !== null ? `${gasValue} ppm` : "......يتبع"} ({state})
      </Effect>

      <Effect
        {...(screenX < 840
          ? { w: "2rem", h: "4rem" }
          : { w: "8rem", h: "6rem" })}
        enableHover={true}
        hoverIntensity={0.5}
        className="translate-y-30 mr-4 w-24 sm:w-80"
      >
        Gas Sensor Reading
      </Effect>

      <div className="flex gap-4 mt-117 sm:mt-80 p-4 h-18 bottom-0 mb-2">
        <MainButton
          aria-label="Turn On LED"
          className="w-full shadow-md text-center flex justify-center cursor-pointer shadow-blue-600/30 bg-blue-600/10 font-bold duration-500 hover:translate-y-1"
          onClick={() => {
            handleButton(`${BACKEND_URL}/on?url=${idAddress}`, "post").then(
              fetchStatus
            );
            toast.success("LED is ON", {
              duration: 3000,
              position: "top-center",
              style: { background: "#333", color: "#fff", width: "300px" },
            });
          }}
        >
          <Power />
        </MainButton>

        <MainButton
          aria-label="Turn Off LED"
          className="w-full shadow-md flex justify-center cursor-pointer shadow-red-600/30 bg-red-600/10 duration-500 hover:translate-y-1"
          onClick={() => {
            handleButton(`${BACKEND_URL}/off?url=${idAddress}`, "post").then(
              fetchStatus
            );
            toast.success("LED is OFF", {
              duration: 3000,
              position: "bottom-center",
              style: { background: "#333", color: "#fff", width: "300px" },
            });
          }}
        >
          <PowerOff />
        </MainButton>

        <MainButton
          aria-label="Send Email"
          className="w-full flex justify-center shadow-md cursor-pointer shadow-green-600/30 bg-black-600/10 duration-500 hover:translate-y-1"
          onClick={handleEmail}
        >
          <Mail />
        </MainButton>
      </div>
    </div>
  );
}
