import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectStatistic, selectLearnedWords } from '../../../redux/selectors/statistic.selectors';
import './Graph.scss';

function wordsOfAnyTextLog (x) {
    return -59.9864 + 18.0353*Math.log(x);
}

function wordsOfAnyTextLine (x) {
    return 17/70*x;
}

const procentWordsOfAnyText = (x) => {
    if (x>70){return Math.round(wordsOfAnyTextLog (x))}
    if (x<=70){return Math.round(wordsOfAnyTextLine (x))}
    return 0
}

const heightGraph = 430;
const widthGraph = 800;

const Graph = () => {
    const canvasRef = React.useRef(null);
    const learnedWordsNumber = useSelector(selectLearnedWords);
    const statistic = useSelector(selectStatistic);

    function drawGraph () {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, widthGraph, heightGraph);

        context.beginPath();
        context.strokeStyle = 'black';
        context.moveTo(0, 0);
        context.lineTo(widthGraph, 0);
        context.lineTo(widthGraph, heightGraph);
        context.lineTo(0, heightGraph);
        context.lineTo(0, 0);
        context.stroke();

        context.beginPath();
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
        let i = 0;
        context.strokeStyle = 'blue';
        context.moveTo(0 + 35, heightGraph-20);
        for (i=0; i<=5000; i += 1) {
            if (i>70){
                context.lineTo(35 + i/5000*widthGraph*0.9, heightGraph-20 - wordsOfAnyTextLog (i)/100*heightGraph*0.9);  
            }
            if (i<=70){
                context.lineTo(35 + i/5000*widthGraph*0.9, heightGraph-20 - wordsOfAnyTextLine (i)/100*heightGraph*0.9);
            }
        }
        context.lineTo(35 + i/5000*widthGraph*0.9,heightGraph-20);
        context.lineTo(35 ,heightGraph-20);
        context.fillStyle = 'rgba(0, 0, 200, 0.1)';
        context.fill()
        context.stroke();

        context.beginPath();
        let j = 0;
        context.strokeStyle = 'blue';
        context.moveTo(0 + 35, heightGraph-20);
        for (j=0; j<=learnedWordsNumber; j += 1) {
            if (j>70){
                context.lineTo(35 + j/5000*widthGraph*0.9, heightGraph-20 - wordsOfAnyTextLog (j)/100*heightGraph*0.9);  
            }
            if (i<=70){
                context.lineTo(35 + j/5000*widthGraph*0.9, heightGraph-20 - wordsOfAnyTextLine (j)/100*heightGraph*0.9);
            }
        }
        context.lineTo(35 + j/5000*widthGraph*0.9,heightGraph-20);
        context.lineTo(35 ,heightGraph-20);
        context.fillStyle = 'rgba(3, 15, 200, 1)';
        context.fill()
        context.stroke();
    }
    
    useEffect(() => {
        drawGraph ()
    },[statistic, learnedWordsNumber]);
    
    return (
        <>
            <p className="statistic__text">
                Всего изучено слов {learnedWordsNumber}. Теперь Вы должны понимать {procentWordsOfAnyText(learnedWordsNumber)} % слов любого текста.
            </p>
            <canvas ref={canvasRef} width={widthGraph} height={heightGraph} />
        </>
    );
  };
  
  export default Graph;