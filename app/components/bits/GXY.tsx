import React from 'react'



import Galaxy from './Galaxy';

// Basic usage

export default function GXY() {
  return (
    <div className='absolute top-0 left-0 w-full h-full 'style={{zIndex: -1}}>

      <div style={{ width: "100%", height: "100vh", position: "relative", overflow: "hidden" }}>
        <Galaxy
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
        />
      </div>
    </div>
  );
}
