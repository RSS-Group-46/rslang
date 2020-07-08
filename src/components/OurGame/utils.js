// eslint-disable-next-line import/prefer-default-export
export const cleaningSentence = ({ textExample }) => {
  const startSentence = textExample.slice(0, textExample.indexOf('<b>'));
  const middleSentence = textExample.slice(textExample.indexOf('<b>') + 3, textExample.indexOf('</b>'))
  const endSentence = textExample.slice(textExample.indexOf('</b>') + 4, textExample.length - 1)
  const result = startSentence + middleSentence + endSentence
  return result.toLowerCase().split(' ');
} 