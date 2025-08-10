import FuzzyText from "./FuzzyText";
import React from "react";

export default function Effect({
  children,
  hoverIntensity,
  enableHover,
  className,
  w,
  h,
  fontFamily,
  fontWeight,
  color
}: {
  children: React.ReactNode;
  hoverIntensity?: number;
  enableHover?: boolean;
  className?: string;
  w?: any;
  h?: string;
  fontFamily?: "auto"|"serif"|"sans-serif"|"monospace"|"cursive"|"fantasy"|"<custom>";
  fontWeight?: number;
  color?: string;
}) {
  return (
    <div className={className}>
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={hoverIntensity}
        enableHover={enableHover}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        color={color}
        fontSize={`clamp(2rem, ${w}, ${h})`}
      
      >
        {children}
      </FuzzyText>
    </div>
  );
}
