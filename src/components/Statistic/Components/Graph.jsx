import React, { useEffect } from 'react';

import './Graph.scss';

const arrWordCount = [7,10,5,12,10,10,5,3,8,7,6,12]
const allWordCount = arrWordCount.reduce(function(item, current) {
    return item + current
  });
 const  horizontalGridLines = 5;
const minUnitGraph = () =>{
   let minNumberhorizontalGrid = allWordCount / horizontalGridLines
   let i=0;
   while (minNumberhorizontalGrid > 10) { 
    minNumberhorizontalGrid /= 10;
    i+=1;
   }
   return Math.round(minNumberhorizontalGrid) * 10 ** i;
}



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
                let coordPasteTextY = 0
                for (let i=0; i<allWordCount; i += minUnitGraph()){
  
                   context.fillText(coordPasteTextY, 2, heightGraph-2- coordPasteTextY/allWordCount*heightGraph); 
                   context.moveTo(0, heightGraph - coordPasteTextY/allWordCount*heightGraph);
                   context.lineTo(widthGraph, heightGraph - coordPasteTextY/allWordCount*heightGraph);
                   coordPasteTextY += minUnitGraph();
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
                <canvas ref={canvasRef} width={700} height={420} />
            </>
    );
  };
  
  export default Graph;