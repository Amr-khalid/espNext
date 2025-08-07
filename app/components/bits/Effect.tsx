import FuzzyText from "./FuzzyText";
import React from "react";

export default function Effect({
  children,
  hoverIntensity,
  enableHover,
  className,
  w,
  h
}: {
  children: React.ReactNode;
  hoverIntensity?: number;
  enableHover?: boolean;
  className?: string;
  w?: any;
  h?: string;
}) {
  return (
    <div className={className}>
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={hoverIntensity}
        enableHover={enableHover}
        fontSize={`clamp(2rem, ${w}, ${h})`}
      
      >
        {children}
      </FuzzyText>
    </div>
  );
}
