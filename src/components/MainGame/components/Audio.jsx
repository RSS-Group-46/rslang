import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';

import {selectShowExample, selectShowDescribe } from '../../../redux/selectors/settings.selectors';
import  {goAudio}  from './utils';


const Audio = forwardRef((props, ref) => {

const {wordObj} =props;
const showExample = useSelector(selectShowExample);
const showDescribe = useSelector(selectShowDescribe);

const [isAudioPlau, setAudioPlau] = useState(true);

console.log (isAudioPlau)
 
useImperativeHandle(ref, () => ({

  playAudio (){ 

    goAudio(wordObj,showExample,showDescribe,isAudioPlau,setAudioPlau)
  }


}));


    return (
        <>

        </>
    );
  });
  
  export default Audio;