import FuzzyText from "./FuzzyText";
import React from "react";

export default function Effect({
  children,
  hoverIntensity,
  enableHover,
  className
}: {
  children: React.ReactNode;
  hoverIntensity?: number;
  enableHover?: boolean;
  className?:string
}) {
  return (
    <div className={className}>
      <FuzzyText
        baseIntensity={0.2}
        hoverIntensity={hoverIntensity}
        enableHover={enableHover}
      >
        {children}
      </FuzzyText>
    </div>
  );
}
