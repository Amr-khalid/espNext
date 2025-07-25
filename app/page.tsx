"use client";
import { Home } from "lucide-react";
import { useEffect } from "react";
import HomeUser from "./components/HomeUser";
export default function Speedometer() {

  

  return (
    <>
      {localStorage.getItem("token") ? <HomeUser />:null}
    </>
  );
}
