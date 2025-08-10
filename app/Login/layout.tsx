"use client";
import { Geist, Geist_Mono } from "next/font/google";
import Particles from "./Particles";
import { ThemeProvider } from "../components/theme-provider";
import LightRays from "../components/bits/LightRays";
// the component will fill the height/width of its parent container, edit the CSS to change this
// the options below are the default values


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

        <div style={{ width: "100%", height: "100vh", position: "absolute",overflow:"hidden",zIndex:-1 }}>
           {/*<Particles
            particleColors={["#ffffff", "#ffffff"]}
            particleCount={900}
            particleSpread={10}
            speed={1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          /> */}
            <LightRays
                    raysOrigin="bottom-center"
                    raysColor={ "#00ffff"}
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
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
