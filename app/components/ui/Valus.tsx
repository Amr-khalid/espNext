import React from 'react'
import GaugeComponent from 'react-gauge-component';


export default function Valus({value,className}:{value:number,className?:string}) {
    const kbitsToMbits = (value: number) => {
      if (value >= 1000) {
        value = value / 1000;
        if (Number.isInteger(value)) {
          return value.toFixed(0) + " mbit/s";
        } else {
          return value.toFixed(1) + " mbit/s";
        }
      } else {
        return value.toFixed(0) + " kbit/s";
      }
    };

  return (
    <div>
      <GaugeComponent className={`  ${className}`}
        arc={{
          nbSubArcs: 150,
          colorArray: ["#5BE12C", "#FF8C00", "#EA4228"],
          width: 0.2,  
          padding: .003,
        }}
        // labels={{
        //   valueLabel: {
        //     style: { fontSize: 40 },
        //     formatTextValue: kbitsToMbits,
        //   },
        //   tickLabels: {
        //     type: "outer",
        //     ticks: [
        //       { value: 100 },
        //       { value: 200 },
             
        //       { value: 2000 },
        //       { value: 2500 },
        //       { value: 3000 },
        //     ],
        //     defaultTickValueConfig: {
        //       formatTextValue: kbitsToMbits,
        //     },
        //   },
        // }}
        minValue={0}
        value={value}
        maxValue={1000}
      />
    </div>
  );
}
