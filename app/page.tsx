"use client";
import { useEffect, useState } from "react";
import HomeUser from "./components/HomeUser";
import Page from "./Registar/page";

export default function Speedometer() {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        setHasToken(true);
      }
    }
  }, []);

  return <>{hasToken ? <HomeUser /> : <Page/>}</>;
}
