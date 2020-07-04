import React, { useEffect } from 'react';

import './Graph.scss';

const arrWordCount = [7,10,5,12,10,10,5,3,8,7,6,12]
const allWordCount = arrWordCount.reduce(function(item, current) {
    return item + current
  });
 // const  horizontalGridLines = 5;

 /*
const minUnitGraph = () =>{
   let minNumberhorizontalGrid = allWordCount / horizontalGridLines
   let i=0;
   while (minNumberhorizontalGrid > 10) { 
    minNumberhorizontalGrid /= 10;
    i+=1;
   }
   return Math.round(minNumberhorizontalGrid) * 10 ** i;
} */



const getDadaForExperement = () =>{
    const localsTime = 'ru'
    const optionsTime = {
        year: "numeric",
        month: "numeric",
        day: "numeric"
      };

    const arrData = [];
    for (let i=0;i<arrWordCount.length;i +=1){
        let newDate = new Date()
        newDate.setDate(newDate.getDate() - i);
        newDate = newDate.toLocaleString(localsTime, optionsTime);
        arrData[i] = newDate;
    }
    return arrData.reverse()
}

function wordsOfAnyText (x) {
    // y = -3E-19x6 + 5E-15x5 - 3E-11x4 + 1E-07x3 - 0,0002x2 + 0,1699x
    return -3*(10**(-19))*x**6 + 5*(10**(-15))*x**5 - 3*(10**(-11))*x**4 + (10**(-7))*x**3  - 0.0002*x**2 + 0.1699*x;
}


const heightGraph = 400;
const widthGraph = 700;

const Graph = () => {
    const canvasRef = React.useRef(null);

        function drawGraph () {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');  

                context.beginPath();
                context.strokeStyle = 'black';
                context.moveTo(0, 0);
                context.lineTo(widthGraph, 0);
                context.lineTo(widthGraph, heightGraph);
                context.lineTo(0, heightGraph);
                context.lineTo(0, 0);
               
                for (let i=0; i<=100; i += 20){
                   context.fillText(i + " %", 3, heightGraph-3- i/100*heightGraph*0.9-20); 
                   context.moveTo(0, heightGraph - i/100*heightGraph*0.9-20);
                   context.lineTo(widthGraph, heightGraph - i/100*heightGraph*0.9-20);
                }

                for (let i=0; i<=5000; i += 1000){
                    context.fillText(i, 35 + i/5000*widthGraph*0.9 , heightGraph-5); 
                    context.moveTo(35 + i/5000*widthGraph*0.9, heightGraph-20);
                    context.lineTo(35 + i/5000*widthGraph*0.9, 0);
                 }
                context.stroke();

                context.beginPath();
                context.moveTo(0 + 35, heightGraph-20);
                for (let i=0; i<=5000; i += 1) {
                   context.lineTo(35 + i/5000*widthGraph*0.9, heightGraph-20 - wordsOfAnyText (i)/100*heightGraph*0.9);
                }
                context.stroke();

                context.beginPath();
                let wordCount = 0;
                for (let i=0;i<arrWordCount.length;i +=1){
                    wordCount += arrWordCount[i];
                    context.strokeStyle = 'blue';
                    context.lineWidth=5;
                    context.moveTo(i*1/arrWordCount.length*widthGraph+30,heightGraph);
                    context.lineTo(i*1/arrWordCount.length*widthGraph+30, heightGraph - wordCount/allWordCount*heightGraph)
                    context.fillText(getDadaForExperement()[i],
                     i*1/arrWordCount.length*widthGraph+5, heightGraph+10);
                
                }

                context.stroke();
                context.onmouseover = function () {
                    context.color = 'red'
                }
        }
    
    useEffect(() => {
        drawGraph ()
    },[]);
    
    return (
            <>
                <canvas ref={canvasRef} width={widthGraph} height={heightGraph} />
            </>
    );
  };
  
  export default Graph;