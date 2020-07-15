import React from 'react';
import { useSelector } from 'react-redux';

import { selectShowExample } from '../../../redux/selectors/settings.selectors';
import Word from './Word';

const TextExample = ({
  wordObj,
  isShowAnswear,
  setUserWord,
  wordImput,
  retfocus,
}) => {
  const showExample = useSelector(selectShowExample);

  function firstPartSentens() {
    let textMeaning;
    let textShowString;
    const regexp = /<b>/i;
    if (wordObj) {
      textMeaning = wordObj.textExample;
      if (regexp.test(textMeaning)) {
        const [seatchtSring] = textMeaning.split('<b>');
        textShowString = seatchtSring;
      }
    }
    return textShowString;
  }

  function secondPartSentens() {
    let textMeaning;
    const regexp = /<\/b>/i;
    let textShowString;
    if (wordObj) {
      textMeaning = wordObj.textExample;
      if (regexp.test(textMeaning)) {
        const [, seatchtSring] = textMeaning.split('</b>');
        textShowString = seatchtSring;
      }
    }
    return textShowString;
  }

  return (
    <>
      <span className={showExample ? '' : 'none'}>{firstPartSentens()}</span>
      <Word
        wordObj={wordObj}
        isShowAnswear={isShowAnswear}
        setUserWord={setUserWord}
        wordImput={wordImput}
        retfocus={retfocus}
      />
      <span className={showExample ? '' : 'none'}>{secondPartSentens()}</span>
    </>
  );
};

export default TextExample;
