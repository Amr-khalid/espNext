"use client";
import { useEffect, useState, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import Effect from "./bits/Effect";
import MainButton from "./ui/MainButton";
import axios from "axios";
import { axiosClient } from "../config";
import Particles from "../Login/Particles";
import Link from "next/link";
import { LogOut, Power, PowerOff, Mail, Atom, Bluetooth } from "lucide-react";
import LightRays from "./bits/LightRays";
import { motion } from "motion/react";
import Motion from "./ui/Motion";
import {BlinkBlur} from"react-loading-indicators"
import Blutoth from "./Blutoth";
const BACKEND_URL = "https://esp32express-production.up.railway.app";

//Component with default values
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
  const [fire_detected, setFireDetected] = useState(false);
  const [idAddress, setIdAddress] = useState(
    "https://dad773c0a325.ngrok-free.app"
  );

  const state = useMemo(
    () => (gasValue !== null && gasValue > 500 || fire_detected ? "danger" : "normal"),
    [gasValue, fire_detected]
  );

  const fetchStatus = useCallback(async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/?url=${idAddress}`);
      console.log(res.data);
      setGasValue(res.data.gas);
      setFireDetected(res.data.fireDetected);
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

    if (state === "danger" && !isDangerSent || fire_detected) {
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


  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1 }}
      className="overflow-hidden "
    >
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          overflow: "hidden",
          zIndex: -1,
          background: `linear-gradient(360deg, ${
            isDangerSent ? "rgba(231, 33, 33, 0.2)" : "rgba(0, 255, 255, 0.2)"
          } 0%, #000 100%)`,
        }}
      >
        {/* <Particles
          particleColors={["#B72121", "#B72121"]}
          particleCount={900}
          particleSpread={10}
          speed={1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        /> */}
        <LightRays
          raysOrigin="top-center"
          raysColor={isDangerSent ? "#E72121" : "#00ffff"}
          raysSpeed={2.5}
          lightSpread={0.8}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.5}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <motion.div
        initial={{ opacity: 0.4, translateY: -20, scale: 0.5 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, translateY: 1.5, scale: 1 }}
        className="flex justify-between items-center w-full gap-4 "
      >
        <Link href={"/profile"}>
          <h1 className="text-lg sm:text-2xl font-bold text-center text-gray-500 mt-4">
            <span className="font-bold text-[12px] sm:text-2xl text-white">
              {user?.username ?? "Guest"}
            </span>
          </h1>
        </Link>
        
        <input
          className="outline-0 text-[12px] text-center sm:text-[20px] shadow-2xl w-[100%] mt-4 m-auto sm:w-[80%] shadow-white/50 hover:shadow-md duration-300 rounded-2xl h-8"
          type="text"
          placeholder="ENTER YOUR CONNECTION ID"
          value={idAddress} // ✅ ربط القيمة بالحالة
          onChange={(e) => {
            const newAddress = e.target.value;
            setIdAddress(
              JSON.stringify(localStorage.setItem("esp_url", newAddress))
            ); // ✅ حفظ في الحالة
            localStorage.setItem("esp_url", newAddress); // ✅ حفظ في localStorage
            setTimeout(() => {
              toast.success("IP Address updated successfully", {
                duration: 3000,
                position: "top-center",
                style: { background: "#333", color: "#fff", width: "300px" },
              });
              fetchStatus();
            }, 3000);
          }}
        />
        <button
          aria-label="Logout"
          onClick={() => {
            localStorage.removeItem("token");
            location.reload();
          }}
          className="rounded-full  text-white/80 sm:text-2xl shadow-md shadow-black duration-500 ring-1 px-2  ring-green-900/30 hover:shadow-2xl hover:translate-y-1"
        >
          <LogOut />
        </button>
      </motion.div>
      <Motion className="z-900 fixed top-[35%] right-[4%]">
        <div>
          {gasValue !== null ? (
            <div className="relative text-gray-200/80 sm:top-0 left-1/6  w-4  h-4 mb-20 sm:text-[4rem] text-[2rem] font-black flex  ">
              <p className=" font-semibold">{gasValue }</p>
              <p className=" font-semibold mx-2"> ppm </p>
              <p
                className={`font-semibold mx-5 capitalize ${
                  state === "danger"
                    ? "text-red-600"
                    : "text-[#209a9a69] opacity-50 contrast-200"
                }`}
              >
                ({state})
              </p>
            </div>
          ) : (
            <div className="relative left-1/6 w-4 h-4 mb-4">
              <BlinkBlur
                color="rgb(193,188,188,0.6)"
                size="medium"
                text=""
                textColor=""
              />{" "}
            </div>
          )}
        </div>
      </Motion>
      <Motion className="z-1000 fixed top-[50%] right-[6%]">
        {gasValue !== null ? (
          <p className=" bottom-0  graw font-sans text-[2.5rem] left-1/8 sm:left-0 sm:text-8xl z-999 relative sm:translate-x-55  ">
            Gas Sensor Reading
          </p>
        ) : (
          <div className="relative left-1/6 w-8 h-8 mb-4">
            <BlinkBlur
              color="rgb(193,188,188,0.5)"
              style={{ fontSize: "1.6rem", fontWeight: "bold" }}
              size="large"
            />{" "}
          </div>
        )}
      </Motion>      

      <div className="flex gap-4 bottom-0 fixed w-full   p-4 h-10 mb-2">
        <MainButton
          aria-label="Turn On LED"
          className="w-full shadow-md text-center flex justify-center cursor-pointer shadow-blue-600/50 bg-blue-600/20 font-bold duration-500 hover:translate-y-1"
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
          className="w-full shadow-md flex justify-center cursor-pointer shadow-red-600/50 bg-red-600/20 duration-500 hover:translate-y-1"
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
          className="w-full flex justify-center shadow-md cursor-pointer shadow-green-600/50 bg-black-600/20 duration-500 hover:translate-y-1"
          onClick={handleEmail}
        >
          <Mail />
        </MainButton>
      </div>
    </motion.div>
  );
}
