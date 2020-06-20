import React from 'react';

const Picture = ({img}) => {
  const style = {
    backgroundImage: `url(https://raw.githubusercontent.com/irinainina/rslang-data/master/${img})`
  }
  return (
    <div className='picture' style={style} />
  )
};

export default Picture;